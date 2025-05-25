document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById("loginBtn");
    const errorElement = document.getElementById("error");

    loginBtn.addEventListener("click", login);

    document.querySelector(".toggle-password").addEventListener("click", togglePassword);

    function togglePassword() {
        const password = document.getElementById("password");
        const icon = document.querySelector(".toggle-password");
        const isHidden = password.type === "password";
        password.type = isHidden ? "text" : "password";
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    }

    async function login() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const db = firebase.firestore();
        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("username", "==", username).limit(1).get();

        if (snapshot.empty) {
            errorElement.textContent = "اسم المستخدم غير موجود.";
            return;
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password !== password) {
            errorElement.textContent = "كلمة المرور غير صحيحة.";
            return;
        }

        const currentDeviceId = getDeviceId();

        // التحقق من جهاز مرتبط مسبقاً
        if (userData.deviceId && userData.deviceId !== currentDeviceId) {
            errorElement.textContent = "هذا الحساب مستخدم على جهاز آخر.";
            return;
        }

        // تسجيل الدخول
        await usersRef.doc(userDoc.id).update({ deviceId: currentDeviceId });

        localStorage.setItem("isActive", "true");
        localStorage.setItem("username", username);
        window.location.href = "home.html";
    }

    function getDeviceId() {
        let deviceId = localStorage.getItem("deviceId");
        if (!deviceId) {
            deviceId = Math.random().toString(36).substring(2);
            localStorage.setItem("deviceId", deviceId);
        }
        return deviceId;
    }
});
