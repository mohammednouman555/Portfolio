const form = document.getElementId("ContactForm");
cont responseMsg = document.getElementById("responseMsg");

from.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim;
    const message = document.getElementById("message").value.trim;
    const button = form.querySelector("button");
    if (!name || !email || !message) {
        responseMsg.style.color = "red";
        responseMsg.innerText = "Please fill all fields.";
        return;
        }
    button.disabled = true;
    button.innerText = "Sending...";
    responseMsg.innerText = "";

    try {
    const res = await fetch("https://portfolio-backend-rgbj.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,message})
        });
        const data = await res.json();
        if (res.ok) {
            responseMsg.style.color = "green";
            responseMsg.innerText = "Message sent successfully!";
            form.reset();
        }
        else {
            responseMsg.style.color = "red";
            responseMsg.innerText = "Failed to send message.";
        }

    } catch (error) {
        responseMsg.style.color = "red";
        responseMsg.innerText = "Network error. Try again later.";
    }
    button.disabled = false;
    button.innerText = "Send Message";
});