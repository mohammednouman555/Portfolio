const API_URL = "https://portfolio-backend-rgbj.onrender.com";

const token = localStorage.getItem("ADMIN_TOKEN");

if (!token) {
    window.location.href = "login.html";
}

// Logout
function logout() {
    localStorage.removeItem("ADMIN_TOKEN");
    window.location.href = "login.html";
}

// Load Messages
async function loadMessages() {

    const container = document.getElementById("messages");
    container.innerHTML = "<p>Loading...</p>";

    try {

        const res = await fetch(`${API_URL}/admin/messages`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!res.ok) {
            throw new Error("Unauthorized");
        }

        const data = await res.json();

        if (data.length === 0) {
            container.innerHTML = "<p>No messages yet.</p>";
            return;
        }

        container.innerHTML = "";

        data.forEach(msg => {

            const div = document.createElement("div");
            div.className = "message-card";

            div.innerHTML = `
                <h4>${msg.name}</h4>
                <p><b>Email:</b> ${msg.email}</p>
                <p>${msg.message}</p>
                <small>${new Date(msg.created_at).toLocaleString()}</small>
                <br><br>
                <button onclick="markRead(${msg.id})">Mark Read</button>
                <button onclick="deleteMsg(${msg.id})">Delete</button>
            `;

            container.appendChild(div);

        });

    } catch (err) {

        container.innerHTML = "<p style='color:red'>Session expired. Login again.</p>";
        logout();
    }
}

// Mark Read
async function markRead(id) {

    await fetch(`${API_URL}/admin/messages/${id}/read`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    loadMessages();
}

// Delete
async function deleteMsg(id) {

    if (!confirm("Delete this message?")) return;

    await fetch(`${API_URL}/admin/messages/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    loadMessages();
}

// Load on start
loadMessages();