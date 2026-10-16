# 1. 목록 조회
import accept as a

# 상담사 정보 출력
def print_maker_c(i, user_data, prompt_list):
    print(f"{i}번 상담사")

    for prompt in prompt_list:
        print(f"{prompt} : {user_data[prompt_list]}")
        print("-" * 30)


# 상담자 목록 조회
def counselor_list():
    c_list = a.counselor_list

    for i, c_user in enumerate(c_list, start =1):
        print_maker_c(i, c_user)

# 2. 목록 상세 조회

# 2-1. 자격증 별
# 자격증 별 리스트 나누기
def license_list():
    c_list = a.counselor_list 
    license_dict = {}

    for l in c_list:
        license = l["license"]
        if license not in license_dict:
            #license_dict 안의 [license] 칸에 빈리스트 새로 만들기
            license_dict[license] = []
        # 새로운 방안에 상담사 추가하기
        license_dict[license].append(l)

    return license_dict
    #return 시 함수 끝

# 함수 밖에서 결과 받기
result_dict = license_list()

# 자격증 별 상담사 리스트 출력
def show_license_list():
    for license, counselor in result_dict.items():
        print(f"----- {license} 자격 보유자 목록 -----")
        print("="* 30)

        for i, c_user in enumerate(counselor,start =1):
            print_maker_c(i, c_user)



# 2-2. 키워드 검색
# 입력받은 값이 들어간 값 나오게 하기
def search_word():
    search = input("검색어를 입력하세요")
    search_list = a.counselor_list
    # 스위치
    found = False

    for i, c_user in enumerate(search_list, start =1):
        if search in c_user["name"] or search in c_user["license"] or search in c_user["self-introduction"]:
            print_maker_c(i, c_user)

            found = True

        if not found :
            print("검색 결과가 없습니다.")



