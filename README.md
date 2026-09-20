# Sew-organized
>Keep your sewing projects all together.
A web app for organizing sewing projects and alterations.
**author:** Anna McFerrin | **project:** dev|bravo | **version:** 0.2 | **date:** 2026-09-17

### User Story

- **As a** person who sews and alters clothing
- **I want** to keep track of my current projects and save ideas for projects I would like to start
- **So that** I can stay organized and keep track of what I want to work on

### Narrative

Keeping track of sewing projects and alterations can become difficult when ideas, supplies, progress and dates are not organized in one place. Sew Organized is designed for people who sew and alter clothing to keep track of current projects and projects they would like to start. The current version provides an interface for viewing, searching, filtering, adding projects, and sign-in and sign-out controls, but most features are not fully functional. Future versions could allow users to create an account, save their projects, update their progress, and use the search and filter controls to find specific projects.

### Simple Test

- [ ] 🧪 **TEST:** Can a user search for a specific sewing project or alteration?
- [ ] ✅ **PASS:** The user can search for a project and locate the correct project using the search control.
- [ ] ❌ **FAIL:** The search control does not locate the project.

### Technology Stack

HTML5 | CSS3 | JavaScript | jQuery | Bootstrap 5 | Bootstrap Icons | Normalize.css | Google Fonts | Git | GitHub | GitHub Pages

### Project Structure

```text
sew-organized/
├── index.html
├── pages/
│   ├── signin.html
│   └── admin.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
```

### Validation + Accessibility

I checked all HTML pages using the W3C HTML Validator. All three pages passed with no errors or warnings.

I used Chrome DevTools to check the console and found one issue with the search input missing an `id` or `name` attribute. I added an `id` to fix the issue.

I also used Lighthouse to review accessibility, performance, best practices, and SEO. My accessibility score was originally 95 because some of my text and background colors did not have enough contrast. I looked into better color choices and updated some of my CSS colors to improve the contrast while keeping the same overall color scheme. After making the changes, my accessibility score improved to 100.

My final Lighthouse scores were:
- Performance: 91
- Accessibility: 100
- Best Practices: 100
- SEO: 90

### Attribution

- **Bootstrap documentation:** Used Bootstrap documentation and examples for the navbar, forms, buttons, cards, and toast components.
- **Course examples:** Used examples provided in class as references for HTML structure, Bootstrap components, JavaScript, and organizing CSS and JavaScript into separate files.
- **AI assistance:** Asked ChatGPT to explain Bootstrap classes and accessibility attributes, help understand and improve CSS color choices for accessibility, explain HTML validation and Lighthouse results, and check project requirements as I worked through the assignment.