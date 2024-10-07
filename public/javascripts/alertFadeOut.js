// Automatically fade out and dismiss flash messages after 3 seconds
setTimeout(() => {
    const alertElement = document.querySelector(".alert-dismissible");
    if (alertElement) {
        alertElement.classList.remove("show");
        alertElement.classList.add("fade-out");

        // Remove the element after the transition completes (1s)
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertElement);
            bsAlert.close();
        }, 1000); // Matches the duration of the fade-out transition
    }
}, 3000); // Initial delay before starting the fade-out
