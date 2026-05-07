/* =========================
   PARTICLES BACKGROUND
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animateParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#38bdf8";
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        // bounce from walls
        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {
            particle.dx *= -1;
        }

        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {
            particle.dy *= -1;
        }
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

/* =========================
   RESPONSIVE CANVAS
========================= */

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

/* =========================
   CONTACT FORM
========================= */

const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document
        .getElementById("name")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim();

    const message = document
        .getElementById("message")
        .value
        .trim();

    const button = form.querySelector("button");

    if (!name || !email || !message) {

        responseMsg.style.color = "#ff4d4d";
        responseMsg.innerText = "Please fill all fields.";

        return;
    }

    button.disabled = true;
    button.innerText = "Sending...";

    responseMsg.innerText = "";

    try {

        const res = await fetch(
            "https://portfolio-backend-rgbj.onrender.com/contact",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            }
        );

        if (res.ok) {

            responseMsg.style.color = "#22c55e";
            responseMsg.innerText =
                "Message sent successfully!";

            form.reset();

        } else {

            responseMsg.style.color = "#ff4d4d";
            responseMsg.innerText =
                "Failed to send message.";
        }

    } catch (error) {

        responseMsg.style.color = "#ff4d4d";
        responseMsg.innerText =
            "Network error. Please try again later.";
    }

    button.disabled = false;
    button.innerText = "Send Message";
});

/* =========================
   CHATBOT
========================= */

function toggleChat() {

    const chatbox =
        document.getElementById("chatbox");

    if (
        chatbox.style.display === "flex"
    ) {
        chatbox.style.display = "none";
    } else {
        chatbox.style.display = "flex";
    }
}

function sendMessage() {

    const input =
        document.getElementById("chatInput");

    const chatBody =
        document.getElementById("chatBody");

    const message = input.value.trim();

    if (!message) return;

    // user message
    chatBody.innerHTML += `
        <div style="
            margin-bottom:12px;
            text-align:right;
        ">
            <span style="
                background:#38bdf8;
                color:#0f172a;
                padding:10px 14px;
                border-radius:12px;
                display:inline-block;
                max-width:80%;
            ">
                ${message}
            </span>
        </div>
    `;

    // bot response
    setTimeout(() => {

        let reply =
            "Ask me about projects, skills, AI systems, backend development, or experience.";

        const lower = message.toLowerCase();

        if (
            lower.includes("skills")
        ) {

            reply =
                "I work with Python, Java, FastAPI, Flask, AI/ML systems, databases, and full stack development.";
        }

        else if (
            lower.includes("project")
        ) {

            reply =
                "My featured projects include AI Mental Health Chatbot, AI IDS System, Green Store E-Commerce, and Full Stack Portfolio System.";
        }

        else if (
            lower.includes("contact")
        ) {

            reply =
                "You can contact me through the contact form or LinkedIn/GitHub links.";
        }

        else if (
            lower.includes("ai")
        ) {

            reply =
                "I have worked on AI systems including emotion classification, intrusion detection, and fake content detection.";
        }

        chatBody.innerHTML += `
            <div style="
                margin-bottom:12px;
                text-align:left;
            ">
                <span style="
                    background:rgba(255,255,255,0.08);
                    color:white;
                    padding:10px 14px;
                    border-radius:12px;
                    display:inline-block;
                    max-width:80%;
                ">
                    ${reply}
                </span>
            </div>
        `;

        chatBody.scrollTop =
            chatBody.scrollHeight;

    }, 600);

    input.value = "";

    chatBody.scrollTop =
        chatBody.scrollHeight;
}