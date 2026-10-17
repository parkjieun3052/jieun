
// 상담자 전용
// 1. 목록 조회
import * as a from './accept.js';

// 상담사 정보 출력
export function print_maker_c(i, c_user, prompt_list) {
console.log(`${i}번 상담사`);

for (const prompt of prompt_list) {
    console.log(`${prompt} : ${c_user[prompt]}`);
    console.log("-".repeat(30));
}
}

// 상담자 전체 목록 조회
export function all_counselor_list(target_list, prompt_list) {
target_list.forEach((c_user, index) => {
    print_maker_c(index + 1, c_user, prompt_list);
});
}

// 2. 목록 상세 조회

// 2-1. 자격증 별
// 자격증 별 리스트 나누기
export function license_list() {
const c_list = a.counselor_list;
const license_dict = {};

for (const l of c_list) {
    const license = l["license"];

    if (!(license in license_dict)) {
        license_dict[license] = [];
    }

    license_dict[license].push(l);
}

return license_dict;
// return 시 함수 끝
}

// 자격증 별 상담사 리스트 출력
export function show_license_list(prompt_list) {
const result_dict = license_list(); // 최신 데이터 가져오기

for (const [license, counselor] of Object.entries(result_dict)) {
    console.log(`----- ${license} 자격 보유자 목록 -----`);
    console.log("=".repeat(30));

    counselor.forEach((c_user, index) => {
        print_maker_c(index + 1, c_user, prompt_list);
    });
}
}

// 2-2. 키워드 검색
// 입력받은 값이 들어간 값 나오게 하기
export function search_word(target_list, prompt_list) {
const search = prompt("검색어를 입력하세요 : ");
let found = false;

target_list.forEach((c_user, index) => {
    let matched = false;

    for (const p of prompt_list) {
        if (String(c_user[p] ?? "").includes(search)) {
            matched = true;
        }
    }

    if (matched) {
        print_maker_c(index + 1, c_user, prompt_list);
        found = true;
    }
});

if (!found) {
    console.log("검색 결과가 없습니다.");
}
}
