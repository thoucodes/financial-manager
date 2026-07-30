const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://financial-manager-ulhs.onrender.com/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, password }),
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = "login.html";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }
});