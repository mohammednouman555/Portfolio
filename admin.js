function login() {
    const apiKey = document.getElementById("apiKey").value;

    if (!apiKey) {
        document.getElementById("errorMsg").innerText = "API key required";
        return;
        }
    localStorage.setItem("ADMIN_API_KEY",apiKey);
    window.location.href="messages.html";
}