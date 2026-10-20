# Flask 서버 진입 파일
# 브라우저 또는 클라이언트에서 보낸 요청을 받아서 DB 작업을 처리하는 역할을 합니다.

from flask import Flask, jsonify, request

# DB 관련 함수들을 불러옵니다.
from db import (
    delete_user_by_id,
    init_db,
    insert_user,
    select_all_users,
    select_user_by_id,
    select_user_by_name,
    update_user_by_id,
)

app = Flask(__name__)

# 서버가 시작될 때 데이터베이스 테이블과 테스트 계정을 준비합니다.
init_db()

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response


# 회원 등록 API
# POST /add_user
# 클라이언트가 보낸 name, password를 받아 DB에 저장합니다.
@app.route('/add_user', methods=['POST', 'OPTIONS'])
def add_user():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json(silent=True) or {}
    name = (data.get('name') or data.get('username') or data.get('userid') or '').strip()
    password = (data.get('password') or '').strip()
    role = (data.get('memberType') or data.get('role') or 'patient').strip()
    if not name or not password:
        return jsonify({'message': '이름과 비밀번호를 모두 입력해주세요.'}), 400

    insert_user(name, password, role)
    return jsonify({'message': f'{name}님 회원가입이 완료되었습니다.'})


# 로그인 API
# POST /login
# 등록된 사용자 정보와 비교해 로그인 여부를 확인합니다.
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200

    data = request.get_json(silent=True) or {}
    userid = (data.get('userid') or data.get('username') or '').strip()
    password = (data.get('password') or '').strip()

    if not userid or not password:
        return jsonify({'message': '아이디와 비밀번호를 모두 입력해주세요.'}), 400

    user = select_user_by_name(userid)
    if user is None:
        return jsonify({'message': '존재하지 않는 사용자입니다.'}), 401

    if dict(user).get('password') != password:
        return jsonify({'message': '비밀번호가 올바르지 않습니다.'}), 401

    return jsonify({
        'message': '로그인 성공',
        'user': {
            'id': user['id'],
            'name': user['name'],
            'role': user['role'],
        }
    })


# 전체 사용자 조회 API
# GET /users
# 등록된 모든 사용자 목록을 JSON 형식으로 반환합니다.
@app.route('/users', methods=['GET'])
def get_all_users():
    return jsonify(select_all_users())


# 특정 사용자 조회 API
# GET /users/<user_id>
# id 값으로 특정 사용자를 찾습니다.
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = select_user_by_id(user_id)
    if user is None:
        return jsonify({'message': '사용자를 찾을 수 없습니다.'}), 404
    return jsonify(dict(user))


# 특정 사용자 삭제 API
# DELETE /users/<user_id>
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    delete_user_by_id(user_id)
    return jsonify({'message': '삭제되었습니다.'})


# 특정 사용자 수정 API
# PUT /users/<user_id>
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json(silent=True) or {}
    name = (data.get('name') or '').strip()
    password = (data.get('password') or '').strip()

    if not name or not password:
        return jsonify({'message': '수정할 이름과 비밀번호를 모두 입력해주세요.'}), 400

    update_user_by_id(user_id, name, password)
    return jsonify({'message': '수정되었습니다.'})


# 서버 실행 코드
# 이 파일을 직접 실행하면 Flask 개발 서버가 시작됩니다.
if __name__ == '__main__':
    init_db()  # 서버 실행 전에 DB 테이블을 준비합니다.
    app.run(host='0.0.0.0', port=5000, debug=True)

