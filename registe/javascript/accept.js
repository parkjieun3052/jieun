
// 정보 등록 기능

const counselor_list = [];
const patient_list = [];

// 공통 등록기능 ([질문, 등록], 추가할 리스트, 완료메세지)
export function register_manager(prompt_list, target_list, success_msg) {
const gather = {};
let empty = false; // 빈칸 체크

for (const question of prompt_list) {
    const input_prompt = window.prompt(`${question} : `);

    if (input_prompt === "" || input_prompt === null) {
        empty = true;
    }

    gather[question] = input_prompt ?? "";
}

if (empty) {
    console.log("내용이 입력되지 않았습니다");
} else {
    console.log(success_msg);
    target_list.push(gather);
}
}
