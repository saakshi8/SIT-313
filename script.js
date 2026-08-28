const button = document.getElementById("subscribe");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

button.addEventListener("click", async () => {

    const email = emailInput.value;

    const response = await fetch("/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    });

    console.log("HTTP Status Code:", response.status);
    const data = await response.json();
    console.log("Server Response:", data);
    
    message.textContent = data.message;
     if (response.ok) {
        emailInput.value = "";
     }
});
