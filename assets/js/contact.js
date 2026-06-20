(function () {
    emailjs.init({
        publicKey: "N_WxrwyQPfRuySvod",
    });
})();

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");
    if (!form) return;

    const loading     = form.querySelector(".loading");
    const errorMsg    = form.querySelector(".error-message");
    const sentMsg     = form.querySelector(".sent-message");
    const submitBtn   = document.getElementById("submit-btn");
    const btnText     = document.getElementById("btn-text");
    const btnSpinner  = document.getElementById("btn-spinner");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const name    = this.querySelector("input[name='name']").value.trim();
        const email   = this.querySelector("input[name='email']").value.trim();
        const subject = this.querySelector("input[name='subject']").value.trim();
        const message = this.querySelector("textarea[name='message']").value.trim();

        if (!name || !email || !subject || !message) {
            errorMsg.textContent = "Please fill in all fields.";
            errorMsg.style.display = "block";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMsg.textContent = "Please enter a valid email address.";
            errorMsg.style.display = "block";
            return;
        }

        // Show loading state
        loading.style.display = "block";
        errorMsg.style.display = "none";
        sentMsg.style.display = "none";
        submitBtn.disabled = true;
        btnText.style.display = "none";
        btnSpinner.style.display = "inline";

        emailjs.sendForm("service_imskezg", "template_ger3vmj", this)
            .then(() => {
                loading.style.display = "none";
                sentMsg.style.display = "block";
                form.reset();
            })
            .catch((error) => {
                loading.style.display = "none";
                errorMsg.textContent = "Failed to send. Please try again.";
                errorMsg.style.display = "block";
                console.error("EmailJS error:", error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                btnText.style.display = "inline";
                btnSpinner.style.display = "none";
            });

    }, true);

});