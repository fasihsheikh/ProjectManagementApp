document.addEventListener('DOMContentLoaded', () => {
    const employeeUsername = localStorage.getItem('employeeUsername');
    if (!employeeUsername) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('welcomeMessage').textContent = `Welcome, ${employeeUsername}!`;

    const projectForm = document.getElementById('projectForm');
    const projectGrid = document.getElementById('projectGrid');

    function renderProjects() {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
            .filter(p => p.employeeUsername === employeeUsername);

        projectGrid.innerHTML = projects.map((project, index) => `
            <div class="project-card" style="background-color:${getStatusColor(project.projectStatus)}">
                <p>Company: ${project.companyName}</p>
                <p>Service: ${project.serviceRequired}</p>
                <p>Start Date: ${project.startDate}</p>
                <p>Completion Date: ${project.completionDate}</p>
                <p>Status: ${project.projectStatus}</p>
                <button onclick="editProject(${index})">Edit</button>
                <button onclick="deleteProject(${index})">Delete</button>
            </div>
        `).join('');
    }

    function getStatusColor(status) {
        switch(status) {
            case 'started': return 'rgba(255, 0, 0, 0.2)';
            case 'in-progress': return 'rgba(255, 255, 0, 0.2)';
            case 'completed': return 'rgba(0, 255, 0, 0.2)';
            default: return 'white';
        }
    }

    function deleteProject(index) {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
            .filter(p => p.employeeUsername === employeeUsername);
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }

    function editProject(index) {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]')
            .filter(p => p.employeeUsername === employeeUsername);
        const project = projects[index];
        
        document.getElementById('companyName').value = project.companyName;
        document.getElementById('serviceRequired').value = project.serviceRequired;
        document.getElementById('startDate').value = project.startDate;
        document.getElementById('completionDate').value = project.completionDate;
        document.getElementById('projectStatus').value = project.projectStatus;
    }

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const project = {
            employeeUsername,
            companyName: document.getElementById('companyName').value,
            serviceRequired: document.getElementById('serviceRequired').value,
            startDate: document.getElementById('startDate').value,
            completionDate: document.getElementById('completionDate').value,
            projectStatus: document.getElementById('projectStatus').value
        };

        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));

        renderProjects();
        projectForm.reset();
    });

    renderProjects();
});