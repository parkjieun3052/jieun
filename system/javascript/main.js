
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
