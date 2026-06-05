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

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        // Show loading
        loading.style.display = "block";
        errorMsg.style.display = "none";
        sentMsg.style.display = "none";

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
            });

    }, true);

});