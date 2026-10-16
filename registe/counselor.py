# 상담자 전용
# 1. 목록 조회
import accept as a

# 상담사 정보 출력
def print_maker_c(i, c_user, prompt_list):
    print(f"{i}번 상담사")

    for prompt in prompt_list:
        print(f"{prompt} : {c_user[prompt]}")
        print("-" * 30)


# 상담자 전체 목록 조회
def all_counselor_list(target_list, prompt_list):
    for i, c_user in enumerate(target_list, start =1):
        print_maker_c(i, c_user, prompt_list)

# 2. 목록 상세 조회

# 2-1. 자격증 별
# 자격증 별 리스트 나누기
def license_list():
    c_list = a.counselor_list 
    license_dict = {}

    for l in c_list:
        license = l["license"]
        if license not in license_dict :
            license_dict[license] = []

        license_dict[license].append(l)

    return license_dict
    #return 시 함수 끝


# 자격증 별 상담사 리스트 출력
def show_license_list(prompt_list):
    result_dict = license_list() # 최신 데이터 가져오기

    for license, counselor in result_dict.items():
        print(f"----- {license} 자격 보유자 목록 -----")
        print("="* 30)

        for i, c_user in enumerate(counselor,start =1):
            print_maker_c(i, c_user, prompt_list)



# 2-2. 키워드 검색
# 입력받은 값이 들어간 값 나오게 하기
def search_word(target_list, prompt_list):
    search = input("검색어를 입력하세요 : ")
    found = False


    for i, c_user in enumerate(target_list, start =1):
        matched = False
        
        for p in prompt_list: 
            if search in c_user[p]:
                matched = True

        if matched :
            print_maker_c(i, c_user, prompt_list)
            found = True

    if not found :
            print("검색 결과가 없습니다.")



