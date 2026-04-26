
(function () {
    emailjs.init("EqE5RlRZwoEgRLH1f");
})();

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_qbte33i",
        "template_q9i6gmc",
        this
    )
        .then(() => {
            alert("Message sent successfully. 💌");
            form.reset();
        })
        .catch((error) => {
            alert("An error occurred 😢");
            console.error(error);
        });
});
