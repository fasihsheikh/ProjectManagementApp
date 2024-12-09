import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Handle form submission for adding projects
document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the form from reloading the page

    const project = {
        employee: localStorage.getItem('username'),  // Get username from localStorage
        companyName: document.getElementById('company-name').value,
        serviceRequired: document.getElementById('service-required').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value,
        status: document.getElementById('status').value,
    };

    // Add project to Firestore
    try {
        await addDoc(collection(db, "projects"), project);
        alert('Project added!');
        fetchProjects();  // Fetch and display updated projects
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Fetch and display projects for the employee
async function fetchProjects() {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const grid = document.getElementById('project-grid');
    grid.innerHTML = '';  // Clear existing projects

    querySnapshot.forEach((docSnapshot) => {
        const project = docSnapshot.data();
        if (project.employee === localStorage.getItem('username')) { // Only show projects for the logged-in employee
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            
            // Apply the status class based on the project status
            let statusClass = '';
            if (project.status === 'started') {
                statusClass = 'status-started';
            } else if (project.status === 'in-progress') {
                statusClass = 'status-in-progress';
            } else if (project.status === 'completed') {
                statusClass = 'status-completed';
            }

            projectCard.innerHTML = `
                <p>Company: ${project.companyName}</p>
                <p>Service: ${project.serviceRequired}</p>
                <p class="${statusClass}">Status: ${project.status}</p>
                <button class="delete-btn" data-id="${docSnapshot.id}">Delete</button>
            `;
            grid.appendChild(projectCard);
        }
    });

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const projectId = this.getAttribute('data-id');
            deleteProject(projectId);  // Call deleteProject with the ID of the project
        });
    });
}

// Function to delete a project from Firestore
async function deleteProject(id) {
    try {
        const docRef = doc(db, "projects", id); // Reference to the specific document
        await deleteDoc(docRef);  // Delete the document from Firestore
        fetchProjects();  // Refresh the project list
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

// Load projects when the page is loaded
fetchProjects();
