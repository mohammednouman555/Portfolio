const apiKey = localStorage.getItem("ADMIN_API_KEY");

if (!apiKey) {
    alert("Unauthorized access");
    window.location.href = "admin.html";
}

function logout() {
    localStorage.removeItem("ADMIN_API_KEY");
    window.location.href = "admin.html";
}

fetch("https://portfolio-backend-rgbj.onrender.com/admin/messages", {
    headers: {
        "x-api-key": apiKey
    }
})
.then(res => {
    if (!res.ok) throw new Error();
    return res.json();
})
.then(data => {
    const container = document.getElementById("messages");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No messages found.</p>";
        return;
    }

    data.forEach(msg => {
        const div = document.createElement("div");
        div.className = `message ${msg.is_read ? "read" : "unread"}`;

        div.innerHTML = `
            <p><strong>Name:</strong> ${msg.name}</p>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p><strong>Message:</strong> ${msg.message}</p>
            <small>${new Date(msg.created_at).toLocaleString()}</small>
            ${msg.is_read ? "" : `<span class="mark-read" onclick="markRead(${msg.id})">Mark as read</span>`}
        `;

        container.appendChild(div);
    });
})
.catch(() => {
    alert("Invalid or expired API key");
    logout();
});

function markRead(id) {
    fetch(`https://portfolio-backend-rgbj.onrender.com/admin/messages/${id}/read`, {
        method: "PUT",
        headers: {
            "x-api-key": apiKey
        }
    })
    .then(res => {
        if (!res.ok) throw new Error();
        location.reload();
    })
    .catch(() => alert("Failed to update message"));
}