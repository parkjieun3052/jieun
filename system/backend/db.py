# SQLite 데이터베이스 연결 및 CRUD 함수를 관리하는 파일입니다.
# 서버에서 사용자 정보를 저장하고 조회하는 핵심 로직이 들어 있습니다.

import sqlite3
from pathlib import Path

# 현재 파일 위치 기준으로 DB 파일 경로를 잡아줍니다.
# 이렇게 해야 실행 위치가 어디든 동일한 DB를 사용합니다.
DB_PATH = Path(__file__).resolve().with_name('system.db')


# DB 연결을 생성하는 함수입니다.
# sqlite3 연결 객체를 반환해 다른 함수들이 공통으로 사용하게 합니다.
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# users 테이블을 생성합니다.
# 서버 실행 전 한 번 호출되면, 테이블이 없을 때만 자동으로 만들어집니다.
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        '''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
        '''
    )
    conn.commit()
    conn.close()


# 사용자 추가 함수
# 회원가입 시 name, password를 DB에 삽입합니다.
def insert_user(name, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (name, password) VALUES (?, ?)",
        (name, password),
    )
    conn.commit()
    conn.close()


# 특정 이름으로 사용자 조회 함수
# 로그인 시 아이디(username)와 비밀번호를 비교할 때 사용합니다.
def select_user_by_name(name):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name = ?", (name,))
    user = cursor.fetchone()
    conn.close()
    return user


# 전체 사용자 조회 함수
# DB에 저장된 모든 유저 정보를 리스트 형태로 반환합니다.
def select_all_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()

    return [
        {
            'id': row['id'],
            'name': row['name'],
            'password': row['password'],
        }
        for row in users
    ]


# 특정 사용자 조회 함수
# user_id를 기준으로 한 명의 사용자 정보를 조회합니다.
def select_user_by_id(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()
    return user


# 특정 사용자 삭제 함수
# user_id에 해당하는 사용자를 DB에서 제거합니다.
def delete_user_by_id(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()


# 특정 사용자 수정 함수
# 이름과 비밀번호를 갱신합니다.
def update_user_by_id(user_id, name, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE users SET name = ?, password = ? WHERE id = ?",
        (name, password, user_id),
    )
    conn.commit()
    conn.close()
