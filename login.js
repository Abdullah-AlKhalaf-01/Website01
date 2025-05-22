document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById("loginBtn");
    const errorElement = document.getElementById("error");

    loginBtn.addEventListener("click", login);

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("keypress", e => {
            if (e.key === "Enter") login();
        });
    });

    document.querySelector(".toggle-password").addEventListener("click", togglePassword);

    function togglePassword() {
        const password = document.getElementById("password");
        const icon = document.querySelector(".toggle-password");
        const isHidden = password.type === "password";
        password.type = isHidden ? "text" : "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    }

    function login() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "owner" && password === "1234") {
            if (localStorage.getItem("isActive") === "true") {
                errorElement.textContent = "يرجى تسجيل الخروج من الجهاز السابق.";
            } else {
                localStorage.setItem("isActive", "true");
                localStorage.setItem("username", username);
                window.location.href = "home.html";
            }
        } else {
            errorElement.textContent = "اسم المستخدم أو كلمة السر غير صحيحة!";
        }
    }
});
