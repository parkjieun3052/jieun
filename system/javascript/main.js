
// 등록할 정보의 항목
const counselor_prompt = [
    "이름",
    "보유자격증",
    "활동경력",
    "간단한 자기소개"
];

const patient_prompt = [
    "이름",
    "생년월일",
    "상담요청내용"
];

document.addEventListener("DOMContentLoaded", () => {
    const counselorRegisterButton = document.getElementById("counselor-register-button");
    const patientRegisterButton = document.getElementById("patient-register-button");
    const allCounselorSearchButton = document.getElementById("all-counselor-search");
    const licenseListSearchButton = document.getElementById("license-list-search");
    const searchResetButton = document.getElementById("search-reset-button");
    const keywordResetButton = document.getElementById("keyword-reset-button");
    const mapResetButton = document.getElementById("map-reset-button");
    const searchForm = document.getElementById("searchform");
    const patientListButton = document.getElementById("aii-patient");

    const requireLogin = () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            const redirectPath = location.pathname.includes("P_page")
                ? "../login/login.html"
                : "login/login.html";
            const target = new URL(redirectPath, window.location.href);
            target.searchParams.set("redirect", window.location.href);
            location.href = target.href;
            return false;
        }

        return true;
    };

    counselorRegisterButton?.addEventListener("click", () => {
        if (!requireLogin()) return;
        location.href = "Registration/counselor.html";
    });

    patientRegisterButton?.addEventListener("click", () => {
        if (!requireLogin()) return;
        location.href = "Registration/patient.html";
    });

    allCounselorSearchButton?.addEventListener("click", () => {
        window.counselor.all_counselor_list(
            window.accept.counselor_list,
            counselor_prompt
        );
    });

    licenseListSearchButton?.addEventListener("click", () => {
        window.counselor.show_license_list(counselor_prompt);
    });

    searchResetButton?.addEventListener("click", () => {
        const resultBox = document.getElementById("result");
        if (resultBox) {
            resultBox.innerHTML = '<p>조회 결과가 여기에 표시됩니다.</p>';
        }

        const countBadge = document.getElementById("counselor-count");
        if (countBadge) {
            countBadge.textContent = "0명";
        }

        const licenseFilter = document.getElementById("license-filter");
        if (licenseFilter) {
            licenseFilter.value = "";
        }
    });

    keywordResetButton?.addEventListener("click", () => {
        const keywordInput = document.getElementById("keyword-input");
        if (keywordInput) keywordInput.value = "";

        const keywordResult = document.getElementById("keyword-result");
        if (keywordResult) {
            keywordResult.innerHTML = '<p>키워드 검색 결과가 여기에 표시됩니다.</p>';
        }
    });

    mapResetButton?.addEventListener("click", () => {
        if (window.resetMapSession) {
            window.resetMapSession();
            return;
        }

        const centerSearchInput = document.getElementById("center-search-input");
        if (centerSearchInput) centerSearchInput.value = "";

        const statusText = document.getElementById("location-status");
        if (statusText) statusText.textContent = "검색어를 입력해주세요";

        const centerList = document.getElementById("center-list");
        if (centerList) centerList.innerHTML = "";
    });

    searchForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const search = document.getElementById("keyword-input")?.value ?? "";

        window.counselor.search_word(
            window.accept.counselor_list,
            counselor_prompt,
            search
        );
    });

    patientListButton?.addEventListener("click", () => {
        window.patient.all_patient_list(
            window.accept.patient_list,
            patient_prompt
        );
    });
});
