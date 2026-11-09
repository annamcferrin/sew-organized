
const addForm = document.querySelector("#add-form");

addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    try {


        const newProject = {
            title: document.querySelector("#project-name").value.trim(),
            type: document.querySelector("#project-type").value,
            status: document.querySelector("#project-status").value,
            finishDate: document.querySelector("#finish-date").value,
            notes: document.querySelector("#project-notes").value.trim()
        };

        console.log("[CREATE] New project data:", newProject);

        // Get existing saved projects from sessionStorage
        const savedProjects =
            JSON.parse(sessionStorage.getItem("projects")) || [];


        newProject.id = Date.now();

        // Record which user created the project
        const session = JSON.parse(sessionStorage.getItem("session"));
        newProject.owner = session?.username || "guest";

        // Add the new project to the saved projects array
        savedProjects.push(newProject);

        // Save projects to sessionStorage
        sessionStorage.setItem("projects", JSON.stringify(savedProjects));

        console.log("[SESSION] Project saved:", newProject);

    } catch (error) {
        console.error("[CREATE] Error saving project:", error);

        const message = document.createElement("p");
        message.className = "text-danger";
        message.textContent = "Unable to save project. Please try again.";

        addForm.appendChild(message);
    }
});


