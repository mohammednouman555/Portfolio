document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMsg = document.getElementById("responseMsg");

    try {
        const response = await fetch("https://portfolio-backend-rgbj.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        const result = await response.json();

        if (response.ok) {
            responseMsg.style.color = "green";
            responseMsg.innerText = "Message sent successfully!";
            document.getElementById("contactForm").reset();
        } else {
            responseMsg.style.color = "red";
            responseMsg.innerText = "Failed to send message.";
        }

    } catch (error) {
        responseMsg.style.color = "red";
        responseMsg.innerText = "Server error. Try again later.";
    }
});