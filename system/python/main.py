import registe.python.accept as a
import registe.python.counselor as c
import registe.python.patient as p

counselor_list=[]
patient_list =[]

counselor_prompt = ["이름","보유자격증","활동경력","간단한 자기소개"]
patient_prompt = ["이름","생년월일","상담요청내용"]
# 등록할 때 사용할 입력 항목 정의
# register_manager(prompt_list, target_list, success_msg)
#상담사 등록에 필요 - 상담사 등록 버튼에 연결할 것
a.register_manager(counselor_prompt,counselor_list,"등록 완료")

#내담자 등록에 필요 - 내담자 등록 버튼에 연결할 것
a.register_manager(patient_prompt,patient_list,"상담신청이 완료 되었습니다.")

# 상담사 목록을 화면에 표시하는 함수

#전체 상담사 조회하기 버튼에 연결할 것
c.all_counselor_list(counselor_list,counselor_prompt)

#자격증 별 상담사 조회하기 버튼에 연결할 것
c.show_license_list(counselor_prompt)

#키워드로 검색하기 <input id="keyword-input> 태그에 연결할 것
c.search_word(counselor_list,counselor_prompt)
#  함수 안의 print_maker_c가 검색결과 화면에 들어갈 것


# 상담사 전용 page 

# 내담자 조회기능
p.all_patient_list(patient_list,patient_prompt)
# 함수안의 print_maker_p가 결과 조회 화면에 연결될 것