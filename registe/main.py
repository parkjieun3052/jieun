import accept as a
import counselor as c
import patient as p

# ── [1단계: 공통 이름표 정의] ──
counselor_prompts = ["name", "license", "self-introduction"]
patient_prompts = ["name", "counseling"]


# ── [2단계: 메인 루프 시작] ──
while True:
    print("\n" + "="*10 + " 상담 연계 시스템 메뉴 " + "="*10)
    print("1. 상담사 등록")
    print("2. 내담자 등록")
    print("3. 자격증별 상담사 조회")
    print("4. 상담사 키워드 검색")
    print("5. 프로그램 종료")
    print("="*41)
    
    choice = input("원하시는 기능의 번호를 입력하세요: ")
    
    # ── [3단계: 선택에 따른 함수 호출 연결] ──
    if choice == "1":
        # 💡 아까 만든 마스터 등록 함수 호출
        a.register_manager(counselor_prompts, a.counselor_list, "🎉 상담사 등록이 완료되었습니다.")
        
    elif choice == "2":
        # 💡 내담자 등록 함수 호출
        a.register_manager(patient_prompts, a.patient_list, "🎉 상담 신청이 완료되었습니다.")
        
    elif choice == "3":
        # 💡 자격증별 목록 출력 함수 호출 (이름표 함께 전달)
        c.show_license_list(counselor_prompts)
        
    elif choice == "4":
        # 💡 상담사 검색 함수 호출
        c.search_word(a.counselor_list, counselor_prompts)
        
    elif choice == "5":
        print("\n👋 프로그램을 종료합니다. 이용해 주셔서 감사합니다.")
        # 💡 무한 루프를 탈출하여 프로그램을 끝냅니다.
        break 
        
    else:
        print("⚠️ 잘못된 입력입니다. 1번부터 5번 사이의 숫자를 입력해 주세요.")
