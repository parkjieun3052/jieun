// 상담자 전용

const counselorApp = (() => {
    function renderResult(message, targetId = "result") {
        const resultBox = document.getElementById(targetId);

        if (resultBox) {
            resultBox.innerHTML = message;
        }
    }

    // 상담사 정보 출력
    function print_maker_c(i, c_user, prompt_list) {
        const details = prompt_list
            .map((prompt) => `<p><strong>${prompt}</strong> : ${c_user[prompt] ?? ""}</p>`)
            .join("");

        return `
            <div class="result-card">
                <h4>${i}번 상담사</h4>
                ${details}
            </div>
        `;
    }



    // 상담사 전체 목록 조회
    function all_counselor_list(target_list, prompt_list) {
        if (!target_list.length) {
            renderResult("<p>등록된 상담사가 없습니다.</p>", "result");
            return;
        }

        const html = target_list
            .map((c_user, index) => print_maker_c(index + 1, c_user, prompt_list))
            .join("");

        renderResult(html, "result");
    }

    // 2-1. 자격증 별
    // 자격증 별 리스트 나누기
    function license_list() {
        const c_list = window.accept.counselor_list;
        const license_dict = {};

        for (const l of c_list) {
            const license = l["보유자격증"];

            if (!(license in license_dict)) {
                license_dict[license] = [];
            }

            license_dict[license].push(l);
        }

        return license_dict;
    }

    // 자격증 별 상담사 리스트 출력
    function show_license_list(prompt_list) {
        const result_dict = license_list();
        const entries = Object.entries(result_dict);

        if (!entries.length) {
            renderResult("<p>등록된 상담사가 없습니다.</p>", "result");
            return;
        }

        const html = entries
            .map(([license, counselor]) => {
                const listHtml = counselor
                    .map((c_user, index) => print_maker_c(index + 1, c_user, prompt_list))
                    .join("");

                return `
                    <div class="result-card">
                        <h4>자격증: ${license}</h4>
                        ${listHtml}
                    </div>
                `;
            })
            .join("");

        renderResult(html, "result");
    }

    // 2-2. 키워드 검색
    function search_word(target_list, prompt_list, search = null) {
        if (search === null || search === undefined) {
            search = window.prompt("검색어를 입력하세요 : ");
        }

        const keyword = String(search ?? "").trim();

        if (!keyword) {
            renderResult("<p>검색어를 입력해주세요.</p>", "keyword-result");
            return;
        }

        const matchedItems = target_list.filter((c_user) => {
            return prompt_list.some((p) => {
                return String(c_user[p] ?? "").includes(keyword);
            });
        });

        if (!matchedItems.length) {
            renderResult("<p>검색 결과가 없습니다.</p>", "keyword-result");
            return;
        }

        const html = matchedItems
            .map((c_user, index) => print_maker_c(index + 1, c_user, prompt_list))
            .join("");

        renderResult(html, "keyword-result");
    }

    return {
        print_maker_c,
        all_counselor_list,
        license_list,
        show_license_list,
        search_word
    };
})();

window.counselor = counselorApp;
