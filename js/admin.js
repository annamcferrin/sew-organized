
const session = JSON.parse(sessionStorage.getItem("session"));

const adminContent = document.querySelector("#admin-content");
const adminMessage = document.querySelector("#admin-message");
const userInfo = document.querySelector("#user-info");

// Check authentication and authorization
if (!session || !session.authenticated) {
    console.log("[AUTH] No authenticated user");
    adminMessage.textContent = "Please sign in to access the Admin Dashboard.";
} else if (session.role !== "admin") {
    console.log("[AUTHZ] Access denied:", session.username);
    adminMessage.textContent = "Access denied. Admins only.";
} else {
    console.log("[AUTHZ] Admin access granted:", session.username);

    adminContent.hidden = false;
    document.querySelector("#admin-nav").hidden = false;

    userInfo.innerHTML = `
        <p><strong>Username:</strong> ${session.username}</p>
        <p><strong>Role:</strong> ${session.role}</p>
        <p><strong>Authenticated:</strong> ${session.authenticated}</p>
    `;

    const projects = JSON.parse(sessionStorage.getItem("projects")) || [];

    const adminProjects = document.querySelector("#admin-projects");

    adminProjects.textContent = `Total Projects: ${projects.length}`;

    projects.forEach(function (project) {
        const projectItem = document.createElement("p");
        projectItem.textContent = project.title;
        adminProjects.appendChild(projectItem);
    });

    console.log("[ADMIN] Displayed", projects.length, "projects");
    // Display sessionStorage information
    const adminStorage = document.querySelector("#admin-storage");

    const storageKeys = Object.keys(sessionStorage);

    storageKeys.forEach(function (key) {
        const item = document.createElement("p");
        item.textContent = key;
        adminStorage.appendChild(item);
    });

    console.log("[ADMIN] Session Storage keys:", storageKeys);
    const appState = JSON.parse(sessionStorage.getItem("appState"));

    const adminAppState = document.querySelector("#admin-app-state");

    adminAppState.textContent = JSON.stringify(appState, null, 2);

    console.log("[ADMIN] Complete appState:", appState);

    const adminBrowser = document.querySelector("#admin-browser");

    adminBrowser.textContent = "Browser Language: " + navigator.language;
}
