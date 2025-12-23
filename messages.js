const apiKey = localStorage.getItem("ADMIN_API_KEY");

if (!apiKey) {
    alert("Unauthorized access");
    window.location.href = "admin.html";
}

fetch("https://portfolio-backend-rgbj.onrender.com/admin/messages", {
    headers: {
        "x-api-key": apiKey
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error("Unauthorized");
    }
    return response.json();
})
.then(data => {
    const container = document.getElementById("messages");

    if (data.length === 0) {
        container.innerHTML = "<p>No messages found.</p>";
        return;
    }

    data.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message";
        div.innerHTML = `
            <p><strong>Name:</strong> ${msg.name}</p>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p><strong>Message:</strong> ${msg.message}</p>
        `;
        container.appendChild(div);
    });
})
.catch(() => {
    alert("Invalid API key");
    localStorage.removeItem("ADMIN_API_KEY");
    window.location.href = "admin.html";
});