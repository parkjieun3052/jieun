document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('member-information-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const selectedType = document.querySelector('input[name="membertype"]:checked')?.value;

        if (!selectedType) {
            alert('회원 유형을 선택해주세요.');
            return;
        }

        if (selectedType === 'trainee') {
            alert('수련생은 아직 준비 중입니다.');
            return;
        }

        const userid = form.querySelector('input[name="userid"]')?.value?.trim();
        const password = form.querySelector('input[name="password"]')?.value?.trim();
        const name = form.querySelector('input[name="name"]')?.value?.trim();

        if (!userid || !password || !name) {
            alert('아이디, 비밀번호, 이름을 모두 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userid,
                    name: name,
                    password: password,
                    memberType: selectedType,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || '회원가입에 실패했습니다.');
            }

            alert(result.message || '회원가입이 완료되었습니다.');

            if (selectedType === 'patient') {
                location.href = '../Registration/patient.html';
                return;
            }

            if (selectedType === 'counselor') {
                location.href = '../Registration/counselor.html';
            }
        } catch (error) {
            alert(error.message || '서버 연결에 실패했습니다.');
        }
    });
});
