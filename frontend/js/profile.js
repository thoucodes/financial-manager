const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const nameDisplay = document.getElementById("user-name-display");
const emailDisplay = document.getElementById("user-email-display");
const registeredDisplay = document.getElementById("user-registered-date");

const editNameBtn = document.querySelectorAll(".action-item-btn")[0];
const changePasswordBtn = document.querySelectorAll(".action-item-btn")[1];

// Load and display user info
async function loadUser() {
    try {
        const response = await fetch("http://localhost:5500/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": token,
            },
        });

        const data = await response.json();

        if (data.success) {
            nameDisplay.textContent = data.user.fullname;
            emailDisplay.textContent = data.user.email;

            const joinedDate = new Date(data.user.createdAt);
            registeredDisplay.textContent = joinedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } else {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error(error);
    }
}

// Edit Name
editNameBtn.addEventListener("click", async () => {
    const newName = prompt("Enter new name:", nameDisplay.textContent);
    if (!newName) return;

    try {
        const response = await fetch("http://localhost:5500/api/auth/update-name", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({ fullname: newName }),
        });

        const data = await response.json();

        if (data.success) {
            alert("Name updated!");
            loadUser();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }
});

// Change Password
changePasswordBtn.addEventListener("click", async () => {
    const oldPassword = prompt("Enter current password:");
    if (!oldPassword) return;

    const newPassword = prompt("Enter new password:");
    if (!newPassword) return;

    try {
        const response = await fetch("http://localhost:5500/api/auth/change-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({ oldPassword, newPassword }),
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error(error);
    }
});

loadUser();