
const signinBtn = document.querySelector("#signin-btn");
const pwdBox = document.querySelector("#pwd-box");
const userBox = document.querySelector("#user-box");
const message = document.querySelector("#message");

// Find the user in our JSON file
async function findUser(userName, password) {
    const response = await fetch("../data/users.json");

    if (!response.ok) {
        throw new Error("Could not load users.json");
    }

    const users = await response.json();

    return users.find(
        (user) =>
            user.name.toLowerCase() === userName.toLowerCase() &&
            user.password === password
    );
}

// Sign in when the button is clicked
signinBtn.addEventListener("click", async function () {
    try {
        const user = await findUser(userBox.value.trim(), pwdBox.value);

        if (!user) {
            message.textContent = "Incorrect username or password.";
            pwdBox.value = "";
            return;
        }

        const session = {
            username: user.name,
            authenticated: true,
            role: user.role
        };

        sessionStorage.setItem("session", JSON.stringify(session));

        console.log("[AUTH] User authenticated:", user.name);
        console.log("[AUTHZ] Role:", user.role);

        window.location.href = "../index.html";

    } catch (error) {
        console.error(error);
        message.textContent = "Something went wrong. Please try again.";
    }
});
