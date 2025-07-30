// Projects Data
const projects = [
    {
        name: "Exploring Celestial Bodies Website",
        category: "JavaScript",
        description: "A website using Javascript giving information about celestial bodies, using Excel as database.",
        date: "2024-12-15",
        image: "celestial.png"
    },
    {
        name: "Interactive Website",
        category: "JavaScript",
        description: "An interactive website for beginners to interact with HTML, CSS and javascript.",
        date: "2025-05-20",
        image: "interactive.png"
    },
    {
        name: "Personality Test Website",
        category: "React",
        description: "A website made using React and Tailwind css for users to take a personality test that gives their MBTI personality type.",
        date: "2025-07-10",
        image: "personality.png"
    },
    {
        name: "CodeScroll Website",
        category: "React",
        description: "A website to generate code documentation for given code.",
        date: "2025-04-25",
        image: "codescroll.png"
    },
    {
        name: "Whatsapp Text Saver",
        category: "Android Studio",
        description: "A mobile app for saving WhatsApp messages, both personal and group types.",
        date: "2025-03-10",
        image: "textsaver.png"
    },
    {
        name: "Notes App",
        category: "Android Studio",
        description: "An app to create and save notes and reminders",
        date: "2024-12-20",
        image: "notes.png"
    }
];

// Project Filtering and Sorting
let selectedFilters = [];
let sortDirection = 'desc';

function displayProjects(filteredProjects) {
    const projectList = document.getElementById('projectList');
    if (!projectList) return;

    projectList.innerHTML = '';
    filteredProjects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <div class="project-image" style="background-image: url('${project.image}');"></div>
            <div class="project-text">
                <h3>${project.name}</h3>
                <p><strong>Main Language:</strong> ${project.category}</p>
                <p>${project.description}</p>
                <p><strong>Date:</strong> ${project.date}</p>
            </div>
        `;
        projectList.appendChild(projectItem);
    });
}

function filterProjects() {
    const checkboxes = document.querySelectorAll('.filter-options input:checked');
    selectedFilters = Array.from(checkboxes).map(cb => cb.value);
    
    const selectedFiltersDiv = document.getElementById('selectedFilters');
    selectedFiltersDiv.innerHTML = '';
    selectedFilters.forEach(filter => {
        const tag = document.createElement('span');
        tag.classList.add('filter-tag');
        tag.innerHTML = `${filter} <span class="remove-tag" onclick="removeFilter('${filter}')">✕</span>`;
        selectedFiltersDiv.appendChild(tag);
    });

    const filteredProjects = selectedFilters.length === 0
        ? projects
        : projects.filter(project => selectedFilters.includes(project.category));
    
    displayProjects(filteredProjects);
}

function removeFilter(filter) {
    const checkbox = document.querySelector(`.filter-options input[value="${filter}"]`);
    if (checkbox) checkbox.checked = false;
    filterProjects();
}

function sortProjects() {
    const filteredProjects = selectedFilters.length === 0
        ? projects
        : projects.filter(project => selectedFilters.includes(project.category));
    
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    displayProjects(sortedProjects);

    const sortArrow = document.getElementById('sortArrow');
    sortArrow.textContent = sortDirection === 'asc' ? '↓' : '↑';
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
}

// Task List with localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskList = document.getElementById('taskList');
    if (!taskList) return;

    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    if (!taskInput || !taskInput.value.trim()) return;

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(taskInput.value.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Contact Form Validation and Submission
function submitContact() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    if (!contactForm || !thankYouMessage || !nameInput || !emailInput || !messageInput || !nameError || !emailError || !messageError) return;

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Validate name (letters, spaces, hyphens only, non-empty)
    const nameRegex = /^[A-Za-z\s-]+$/;
    let isValid = true;

    if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name';
        isValid = false;
    } else if (!nameRegex.test(nameInput.value.trim()) || nameInput.value.trim().length < 3) {
        nameError.textContent = 'Please enter a valid name (letters, spaces, or hyphens only) of at least 3 characters';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Validate message (non-empty after trim)
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter a message';
        isValid = false;
    }

    // Submit if valid
    if (isValid) {
        contactForm.style.display = 'none';
        thankYouMessage.style.display = 'flex';
    }
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded:', window.location.pathname);
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.toggle('active', link.href === window.location.href);
    });

    if (window.location.pathname.includes('projects.html')) {
        console.log('Initializing projects page');
        displayProjects(projects);
    } else if (window.location.pathname.includes('tasks.html')) {
        console.log('Initializing tasks page');
        loadTasks();
    }
});
