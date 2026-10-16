# 내담자 전용
import registe.python.accept as a

# 내담자 정보 출력
def print_maker_p(i, p_user, prompt_list):
    print(f"{i}번 내담자")

    for prompt in prompt_list:
        print(f"{prompt} : {p_user[prompt]}")
        print(f"-" * 30)

# 내담자 전체 목록 조회
def all_patient_list(target_list, prompt_list):
    for i, p_user in enumerate(target_list, start =1):
        print_maker_p(i, p_user, prompt_list)

