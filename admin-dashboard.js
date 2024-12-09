document.addEventListener('DOMContentLoaded', () => {
    const userType = localStorage.getItem('userType');
    if (userType !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    const allProjectsGrid = document.getElementById('allProjectsGrid');

    function renderAllProjects() {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');

        allProjectsGrid.innerHTML = projects.map((project, index) => `
            <div class="project-card">
                <p><strong>Employee:</strong> ${project.employeeUsername}</p>
                <p>Company: ${project.companyName}</p>
                <p>Service: ${project.serviceRequired}</p>
                <p>Start Date: ${project.startDate}</p>
                <p>Completion Date: ${project.completionDate}</p>
                <p>Status: ${project.projectStatus}</p>
                <button onclick="deleteProject(${index})">Delete</button>
            </div>
        `).join('');
    }

    function deleteProject(index) {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderAllProjects();
    }

    renderAllProjects();
});