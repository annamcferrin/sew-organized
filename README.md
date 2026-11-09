# Sew-organized
>Keep your sewing projects all together.
A web app for organizing sewing projects and alterations.
**author:** Anna McFerrin | **project:** dev|delta | **version:** 1.0 | **date:** 2026-11-09

### User Story

- **As a** person who sews and alters clothing
- **I want** to keep track of my current projects and save ideas for projects I would like to start
- **So that** I can stay organized and keep track of what I want to work on

### Narrative

Keeping track of sewing projects and alterations can become difficult when ideas, supplies, progress, and dates are not organized in one place. Sew Organized is designed for people who sew and alter clothing to keep track of current projects and projects they would like to start. The Delta version builds on the original Bravo interface by adding functional sign-in and sign-out, user and admin roles, project creation, viewing, editing, and deletion. Project data is loaded from JSON and changes are saved using sessionStorage. An admin dashboard allows administrators to view project information, session details, and the current application state. Future versions could include a database and individual user accounts for storing projects long-term.

### Simple Test

- [x] 🧪 **TEST:** Can a user sign in and access features based on their role?
- [x] ✅ **PASS:** A regular user can sign in and use the app without seeing admin-only controls. An admin can sign in and access the Admin Dashboard and Delete controls.
- [ ] ❌ **FAIL:** A user cannot sign in, or a regular user can access admin-only controls.

### Current Functionality

- **Authentication (AuthN):** Users can sign in and sign out using test accounts stored in users.json.
- **Authorization (AuthZ):** Admin and regular user roles have different permissions. Only admins can access the Admin Dashboard and delete projects.
- **JSON Data:** Starting project data is loaded from projects.json using fetch() and displayed on the homepage.
- **CRUD Operations:** Users can create, read, and update sewing projects. Admins can also delete projects.
- **sessionStorage:** Project information and user sessions are saved during the browser session and survive page refreshes.
- **APP State:** The appState object stores application information, the current user, project data, and session information.
- **Admin Dashboard:** Admins can view current projects, sessionStorage keys, formatted application state JSON, and browser information.

### Technology Stack

HTML5 | CSS3 | JavaScript | JSON | Fetch API | DOM | sessionStorage | jQuery | Bootstrap 5 | Bootstrap Icons | Normalize.css | Google Fonts | Git | GitHub | GitHub Pages

### Project Structure

```text
sew-organized/
├── index.html
├── css/
│   └── styles.css
├── data/
│   ├── projects.json
│   └── users.json
├── js/
│   ├── add-project.js
│   ├── admin.js
│   ├── app.js
│   └── signin.js
├── pages/
│   ├── add-project.html
│   ├── admin.html
│   └── signin.html
└── README.md
```

### Data Flow

```text
AUTH ──────────────────┐
                       │
STATIC JSON ──fetch()──┼──→ APP STATE
                       │       ↓
USER INPUT ────────────┘   sessionStorage
                               ↓
                              DOM
```



### Testing

- **Authentication:** Tested signing in and signing out with both user and admin accounts.
- **Authorization:** Verified that regular users cannot access admin-only features and that admins can access the Admin Dashboard.
- **CRUD:** Tested adding, viewing, editing, and deleting sewing projects.
- **sessionStorage:** Verified that project changes remain after refreshing the page.
- **Admin Dashboard:** Verified that project data, user information, sessionStorage keys, and appState JSON are displayed.
- **GitHub Pages:** Tested the deployed application with both user and admin accounts.


### Validation + Accessibility

During Bravo, I checked all three HTML pages using the W3C HTML Validator. All three passed with no errors or warnings.

I used Chrome DevTools to check the console and fixed an issue with the search input missing an `id` or `name` attribute.

I also used Lighthouse to review accessibility, performance, best practices, and SEO. My accessibility score improved from 95 to 100 after I adjusted some CSS colors to improve contrast while keeping my original color scheme.

My final Lighthouse scores from Bravo were:
- Performance: 97
- Accessibility: 100
- Best Practices: 100
- SEO: 90

### Known Issues

- Search and filter controls are not yet fully functional.
- Project data is stored in sessionStorage rather than a database, so changes are not permanently saved after the browser session ends.


### Attribution

- **Bootstrap documentation:** Used Bootstrap documentation and examples for the navbar, forms, buttons, and cards.
- **Course examples:** Used examples provided in class and CodeAcademy as references for HTML structure, JavaScript, JSON data, authentication, authorization, and organizing project files.
- **AI assistance:** Used ChatGPT to help understand assignment requirements, explain JavaScript concepts, troubleshoot code, implement authentication and authorization, work with JSON and sessionStorage, and test CRUD functionality. I reviewed and tested the code throughout development.
