import { db } from './firebase-config.js';
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Function to fetch and display all projects in the Admin Dashboard
async function fetchProjects() {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const grid = document.getElementById('allProjectsGrid');
    grid.innerHTML = ''; // Clear existing projects

    querySnapshot.forEach((docSnapshot) => {
        const project = docSnapshot.data();
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <p><strong>Employee:</strong> ${project.employee}</p>
            <p>Company: ${project.companyName}</p>
            <p>Service: ${project.serviceRequired}</p>
            <p>Status: ${project.status}</p>
            <button class="delete-btn" data-id="${docSnapshot.id}">Delete</button>
        `;
        grid.appendChild(projectCard);
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
        const docRef = doc(db, "projects", id); // Reference to the project document
        await deleteDoc(docRef); // Delete the document from Firestore
        fetchProjects(); // Refresh the project list after deletion
    } catch (error) {
        console.error("Error deleting project: ", error);
    }
}

// Load projects when the page is loaded
fetchProjects();
