
// 내담자 전용

const patientApp = (() => {
    function renderResult(message) {
        const resultBox = document.getElementById("patient-result");

        if (resultBox) {
            resultBox.innerHTML = message;
        }
    }

    // 내담자 정보 출력
    function print_maker_p(i, p_user, prompt_list) {
        const details = prompt_list
            .map((prompt) => `<p><strong>${prompt}</strong> : ${p_user[prompt] ?? ""}</p>`)
            .join("");

        return `
            <div class="result-card">
                <h4>${i}번 내담자</h4>
                ${details}
            </div>
        `;
    }

    // 내담자 전체 목록 조회
    function all_patient_list(target_list, prompt_list) {
        if (!target_list.length) {
            renderResult("<p>등록된 내담자가 없습니다.</p>");
            return;
        }

        const html = target_list
            .map((p_user, index) => print_maker_p(index + 1, p_user, prompt_list))
            .join("");

        renderResult(html);
    }

    return {
        print_maker_p,
        all_patient_list
    };
})();

window.patient = patientApp;
