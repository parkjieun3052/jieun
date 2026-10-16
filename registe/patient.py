import accept as a

# 내담자 정보 출력
def print_maker_p(i, p_user):
        print(f"{i}번 내담자")
        print(f"name : {p_user['name']}")
        print(f"consult content : {p_user['counseling']}")
        print(f"-" * 30)

# 내담자 목록 조회
def patient_list():
    p_list = a.patient_list

    for i, p_user in enumerate(p_list, start =1):
        print_maker_p(i, p_user)

