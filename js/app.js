
document.addEventListener("DOMContentLoaded", () => {
    console.log("[DEV] Sew Organized is ready");

    console.log(`
DEV TEST ACCOUNTS

ADMIN
username: admin
password: sewadmin123

USER
username: user
password: sewuser123
    `);
});

// Get the current user session
const session = JSON.parse(sessionStorage.getItem("session"));
// Application state
const appState = {
    app: {
        name: "Sew Organized",
        version: "1.0"
    },
    user: session,
    data: [],
    session: {
        started: new Date().toISOString()
    }
};

const userGreeting = document.querySelector("#user-greeting");
const signinLink = document.querySelector("#signin-link");
const signoutBtn = document.querySelector("#signout-btn");

// Check if someone is signed in
if (session && session.authenticated) {

    // Display the signed-in user's information
    userGreeting.textContent =
        "Hi, " + session.username + " (" + session.role + ") ";

    // Show Sign Out and hide Sign In
    signinLink.hidden = true;
    signoutBtn.hidden = false;

    console.log("[AUTH] Signed in as:", session.username);
    console.log("[AUTHZ] Role:", session.role);

    // Only admins can see the Admin Dashboard link
    if (session.role === "admin") {
        document.querySelector("#admin-nav").hidden = false;
    }

} else {

    // Nobody is signed in
    userGreeting.textContent = "";
    signinLink.hidden = false;
    signoutBtn.hidden = true;
}

// Sign out and clear the current user session
signoutBtn.addEventListener("click", function () {

    sessionStorage.removeItem("session");

    console.log("[AUTH] User signed out");

    window.location.reload();
});

// Fetch and display sewing projects from JSON
async function loadProjects() {
    try {
        const response = await fetch("./data/projects.json");

        if (!response.ok) {
            throw new Error("Could not load projects.json");
        }

        const startingProjects = await response.json();

        // Check sessionStorage for saved projects
        let projects = JSON.parse(
            sessionStorage.getItem("projects")
        );

        if (projects === null) {
            projects = startingProjects;

            sessionStorage.setItem(
                "projects",
                JSON.stringify(projects)
            );
        }

        appState.data = projects;
        sessionStorage.setItem("appState", JSON.stringify(appState));
        console.log("[SESSION] appState saved");
        console.log("[STATE] App state updated:", appState);

        console.log("[DATA] Loaded", projects.length, "projects");
        console.log("[DATA] Projects:", projects);
        const projectList = document.querySelector("#project-list");

        projectList.innerHTML = "";

        projects.forEach(function (project) {

            const card = document.createElement("div");
            card.className = "card mt-4";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const title = document.createElement("h3");
            title.className = "card-title";
            title.textContent = project.title;

            cardBody.appendChild(title);

            const details = [
                ["Type", project.type],
                ["Status", project.status],
                ["Notes", project.notes],
                ["Finish By", project.finishDate]
            ];

            details.forEach(function ([label, value]) {

                const paragraph = document.createElement("p");
                paragraph.className = "card-text";

                const strong = document.createElement("strong");
                strong.textContent = label + ": ";

                paragraph.appendChild(strong);

                paragraph.appendChild(
                    document.createTextNode(
                        value || "Not specified"
                    )
                );

                cardBody.appendChild(paragraph);
            });

            // Create an Edit button for this project
            const editBtn = document.createElement("button");
            editBtn.className =
                "btn btn-outline-primary btn-sm mt-2";
            editBtn.textContent = "Edit";

            editBtn.addEventListener("click", function () {

                const editForm = document.createElement("form");
                editForm.className = "mt-3";

                editForm.innerHTML = `
                    <label class="form-label">
                        Project Name
                    </label>

                    <input
                        type="text"
                        class="form-control mb-3"
                        name="title"
                        required
                    >

                    <label class="form-label">
                        Status
                    </label>

                    <select
                        class="form-select mb-3"
                        name="status"
                    >
                        <option>Want to Start</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>

                    <button
                        type="submit"
                        class="btn btn-primary btn-sm"
                    >
                        Save Changes
                    </button>
                `;

                // Fill the form with existing project data
                editForm.elements.title.value = project.title;
                editForm.elements.status.value = project.status;

                // Replace the Edit button with the form
                editBtn.replaceWith(editForm);

                // Save changes when the form is submitted
                editForm.addEventListener("submit", function (event) {

                    event.preventDefault();

                    // Update the project
                    project.title =
                        editForm.elements.title.value.trim();

                    project.status =
                        editForm.elements.status.value;

                    // Save updated projects to sessionStorage
                    try {
                        sessionStorage.setItem(
                            "projects",
                            JSON.stringify(projects)
                        );
                    } catch (error) {
                        console.error("[UPDATE] Unable to save changes:", error);

                        const errorMessage = document.createElement("p");
                        errorMessage.className = "text-danger";
                        errorMessage.textContent = "Unable to save changes.";

                        editForm.appendChild(errorMessage);
                        return;
                    }

                    console.log(
                        "[UPDATE] Project updated:",
                        project
                    );

                    loadProjects();
                });
            });

            cardBody.appendChild(editBtn);
            // Only admins can delete projects
            if (session && session.role === "admin") {
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "btn btn-outline-danger btn-sm mt-2 ms-2";
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", function () {

                    const projectIndex = projects.indexOf(project);

                    if (projectIndex !== -1) {
                        projects.splice(projectIndex, 1);

                        try {
                            sessionStorage.setItem(
                                "projects",
                                JSON.stringify(projects)
                            );
                        } catch (error) {
                            console.error("[DELETE] Unable to delete project:", error);

                            const errorMessage = document.createElement("p");
                            errorMessage.className = "text-danger";
                            errorMessage.textContent = "Unable to delete project.";

                            cardBody.appendChild(errorMessage);
                            return;
                        }

                        console.log("[DELETE] Project deleted:", project.title);

                        loadProjects();
                    }
                });

                cardBody.appendChild(deleteBtn);
            }

            card.appendChild(cardBody);
            projectList.appendChild(card);
        });

    } catch (error) {
        console.error(
            "[DATA] Error loading projects:",
            error
        );

        const projectList = document.querySelector("#project-list");

        projectList.textContent =
            "Could not load starting data. Please refresh and try again.";
    }
}

loadProjects();
