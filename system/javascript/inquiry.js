// 상담사 조회/검색 기능 모듈
// 이 파일은 상담사 정보를 조회하고 검색해서 화면에 출력하는 역할만 담당합니다.

(function () {
    // 1) 결과 화면에 HTML 문자열을 넣는 공용 함수
    // targetId 기본값은 'result'이며, 키워드 검색 결과는 'keyword-result'로 보냅니다.
    function renderResult(message, targetId = 'result') {
        const box = document.getElementById(targetId);
        if (box) {
            box.innerHTML = message;
        }
    }

    // 2) 상담사 한 명의 카드 HTML을 생성하는 함수
    // prompt_list는 보여줄 항목명 목록(예: 이름, 자격증, 경력 등)
    function print_maker_c(i, c_user, prompt_list) {
        const details = prompt_list
            .map((prompt) => `<p><strong>${prompt}</strong> : ${c_user[prompt] ?? ''}</p>`)
            .join('');

        return `
            <div class="result-card">
                <h4>${i}번 상담사</h4>
                ${details}
            </div>
        `;
    }

    // 3) 전체 상담사 목록 조회
    // 등록된 상담사 배열을 모두 출력합니다.
    function all_counselor_list(target_list, prompt_list) {
        if (!target_list.length) {
            renderResult('<p>등록된 상담사가 없습니다.</p>', 'result');
            return;
        }

        const html = target_list
            .map((c_user, index) => print_maker_c(index + 1, c_user, prompt_list))
            .join('');

        renderResult(html, 'result');
    }

    // 4) 자격증별 상담사 목록 조회
    // 상담사들을 '보유자격증' 기준으로 묶고, 각 그룹별로 출력합니다.
    function show_license_list(prompt_list) {
        const license_dict = {};
        const c_list = window.accept?.counselor_list || [];

        for (const item of c_list) {
            const license = item['보유자격증'];
            if (!(license in license_dict)) {
                license_dict[license] = [];
            }
            license_dict[license].push(item);
        }

        const entries = Object.entries(license_dict);
        if (!entries.length) {
            renderResult('<p>등록된 상담사가 없습니다.</p>', 'result');
            return;
        }

        const html = entries
            .map(([license, counselor]) => {
                const listHtml = counselor
                    .map((c_user, index) => print_maker_c(index + 1, c_user, prompt_list))
                    .join('');

                return `
                    <div class="result-card">
                        <h4>자격증: ${license}</h4>
                        ${listHtml}
                    </div>
                `;
            })
            .join('');

        renderResult(html, 'result');
    }

    // 5) 키워드 검색
    // 입력한 문자열이 상담사 정보의 어떤 필드에도 포함되면 해당 상담사를 찾습니다.
    function search_word(target_list, prompt_list, search = null) {
        if (search === null || search === undefined) {
            search = window.prompt('검색어를 입력하세요 : ');
        }

        const keyword = String(search ?? '').trim();
        if (!keyword) {
            renderResult('<p>검색어를 입력해주세요.</p>', 'keyword-result');
            return;
        }

        const matchedItems = target_list.filter((c_user) =>
            prompt_list.some((p) => String(c_user[p] ?? '').includes(keyword))
        );

        if (!matchedItems.length) {
            renderResult('<p>검색 결과가 없습니다.</p>', 'keyword-result');
            return;
        }

        const html = matchedItems
            .map((c_user, index) => print_maker_c(index + 1, c_user, prompt_list))
            .join('');

        renderResult(html, 'keyword-result');
    }

    // 브라우저 전역 객체에 함수들을 연결해서 다른 JS에서 호출할 수 있게 만듭니다.
    window.counselor = Object.assign(window.counselor || {}, {
        all_counselor_list,
        show_license_list,
        search_word,
        print_maker_c
    });
})();