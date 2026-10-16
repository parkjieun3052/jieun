# 정보 등록 기능

counselor_list = []
patient_list= []

# # 상담사 등록란
# def counselor():

#     a = input("name : ")
#     b = input("license : ")
#     c = input("self-introduction : ")

#     if a == "" or b == "" or c == "":
#         print ("내용이 입력되지 않았습니다.")
#     else :
#         print ("등록이 완료되었습니다.")

#         gather = {
#             "name": a ,
#             "license" : b ,
#             "self-introduction" : c
#         }
#         counselor_list.append(gather)

#     print(counselor_list)

# # 내담자 등록란
# def patient(): 

#     a = input("name : ")
#     b = input("What would you like to discuss? : ")

#     if a == "" or b == "" :
#         print ("내용이 입력되지 않았습니다.")
#     else :
#         print ("상담 신청이 완료되었습니다.")

#         gather = {
#             "name" : a,
#             "counseling" : b
#         }

#         patient_list.append(gather)

#     print(patient_list)
# ------------------------------------------------------------------



# 공통 등록기능 ([질문,등록], 추가할 리스트, 완료메세지)
def register_manager(prompt_list, target_list, success_msg):
    gather={}
    empty = False #빈칸체크

    for prompt in prompt_list:
        input_prompt = input(f"{prompt} : ") #질문 입력받기

        if input_prompt == "" :
            empty = True

        gather[prompt] = input_prompt #gather에 질문과 답변 저장

    if empty : 
        print("내용이 입력되지 않았습니다")
    else:
        print(success_msg)
        target_list.append(gather) #target_list에 gather 추가
