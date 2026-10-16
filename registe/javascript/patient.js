
// 내담자 전용
import * as a from './accept.js';

// 내담자 정보 출력
function print_maker_p(i, p_user, prompt_list) {
    console.log(`${i}번 내담자`);

    for (const prompt of prompt_list) {
        console.log(`${prompt} : ${p_user[prompt]}`);
        console.log("-".repeat(30));
    }
}

// 내담자 전체 목록 조회
function all_patient_list(target_list, prompt_list) {
    target_list.forEach((p_user, index) => {
        print_maker_p(index + 1, p_user, prompt_list);
    });
}
