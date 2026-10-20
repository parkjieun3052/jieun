
// 정보 등록 기능

const acceptApp = (() => {
    const counselor_list = [];
    const patient_list = [];

    function renderResult(message) {
        const resultBox = document.getElementById("result");

        if (resultBox) {
            resultBox.innerHTML = message;
        }
    }

    // 공통 등록기능 ([질문, 등록], 추가할 리스트, 완료메세지)
    function register_manager(prompt_list, target_list, success_msg) {
        const gather = {};
        let empty = false; // 빈칸 체크

        for (const question of prompt_list) {
            const input_prompt = window.prompt(`${question} : `);

            if (input_prompt === null || input_prompt.trim() === "") {
                empty = true;
                gather[question] = "";
            } else {
                gather[question] = input_prompt.trim();
            }
        }

        if (empty) {
            renderResult("<p>내용이 입력되지 않았습니다.</p>");
            return false;
        }

        target_list.push(gather);
        renderResult(`<p>${success_msg}</p>`);
        return true;
    }

    return {
        counselor_list,
        patient_list,
        register_manager
    };
})();

window.accept = acceptApp;
