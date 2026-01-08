// Main JavaScript for Portfolio Website

// Global data object
let portfolioData = {};

// DOM Elements
let adminModal, adminDashboard, adminLoginBtn, loginForm, closeAdminBtn, closeModalBtn;
let mobileMenuBtn, navLinks, socialIcons;

// Initialize the page
function init() {
    // Get DOM elements
    adminModal = document.getElementById('adminModal');
    adminDashboard = document.getElementById('adminDashboard');
    adminLoginBtn = document.getElementById('adminLoginBtn');
    loginForm = document.getElementById('loginForm');
    closeAdminBtn = document.getElementById('closeAdminBtn');
    closeModalBtn = document.getElementById('closeModalBtn');
    mobileMenuBtn = document.getElementById('mobileMenuBtn');
    navLinks = document.querySelector('.nav-links');
    socialIcons = document.querySelector('.social-icons');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Load content from JSON
    loadData();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize animations
    initAnimations();
}

// Load data from JSON
function loadData() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            portfolioData = data;
            loadContent(data);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            // Fallback to default data
            portfolioData = getDefaultData();
            loadContent(portfolioData);
        });
}

// Default data in case JSON fails to load
function getDefaultData() {
    return {
        profile: {
            name: "Aravindhan M",
            title: "Aspiring Software Developer & Data Analytics Enthusiast",
            description: "Passionate about building technical skills in software development and data analytics with hands-on experience in machine learning through internships and job simulations.",
            tagline: "Building Logic. Creating Impact.",
            about: "Aspiring Software Developer with a strong interest in software development and data analytics. Passionate about building technical skills, learning new technologies, and contributing to innovative projects.",
            aboutTitle: "Bridging Theory & Practice",
            aboutDescription1: "I'm an aspiring software developer with a strong passion for technology and innovation. My journey began with exploring programming fundamentals in Python and Java, and has evolved into hands-on experience with machine learning through my internship at Global Techno Solutions.",
            aboutDescription2: "Currently building my foundation through practical experience and continuous learning, I focus on bridging the gap between theoretical data science and real-world application.",
            education: {
                title: "Computer Science and Engineering",
                institution: "Sri Muthukumaran Institute of Technology, Chennai",
                duration: "2022 – 2026"
            },
            stats: {
                projects: "3+",
                certificates: "5+",
                simulations: "2"
            },
            interests: ["Data Analytics", "Technology Research", "Software Development", "Machine Learning", "Cloud Computing"]
        },
        experiences: [
            {
                id: 1,
                title: "Machine Learning Internship",
                company: "Global Techno Solutions",
                date: "Completed 2024",
                description: "Applied algorithms and data analysis skills in real-time tasks, developing analytical thinking crucial for software development. Worked directly with production data to optimize model performance and gained hands-on experience in the full ML lifecycle.",
                tags: ["Machine Learning", "Data Analysis", "Algorithms", "Python"],
                icon: "robot"
            },
            {
                id: 2,
                title: "Data Analytics Job Simulation",
                company: "Deloitte Australia",
                date: "Completed 2024",
                description: "Completed real-world scenarios simulating professional data analytics work. Analyzed client datasets to uncover trends and presented actionable insights using visualization tools.",
                tags: ["Data Analytics", "Data Visualization", "Consulting", "Problem Solving"],
                icon: "chart-line"
            },
            {
                id: 3,
                title: "Technology Consulting Job Simulation",
                company: "Accenture",
                date: "Completed 2024",
                description: "Completed practical tasks in project kickoff, requirements gathering, application design, and creating agile stories. Tackled complex business and data analytics problems.",
                tags: ["Technology Consulting", "Requirements Gathering", "Agile", "Problem Solving"],
                icon: "briefcase"
            },
            {
                id: 4,
                title: "Web Development Internship",
                company: "Empower Guiding Centre",
                date: "Feb 15 - Mar 8, 2024",
                description: "Successfully completed 15-day web development internship including project work. Performance during the internship was commended by the mentor.",
                tags: ["Web Development", "Frontend", "Project Work", "Internship"],
                icon: "code"
            }
        ],
        certificates: [
            {
                id: 1,
                title: "AWS Cloud Practitioner Essentials",
                organization: "Amazon Web Services",
                date: "Completed: Dec 03, 2025",
                description: "Completed comprehensive training on AWS Cloud fundamentals, services, security, architecture, pricing, and support.",
                verifyUrl: "AWS CERTICICATE.pdf"
            },
            {
                id: 2,
                title: "Data Fundamentals",
                organization: "IBM SkillsBuild",
                date: "Issued: Jul 24, 2025",
                description: "Successfully completed requirements for Data Fundamentals, covering essential data concepts, analysis techniques, and practical applications.",
                verifyUrl: "https://www.credly.com/badges/4e87fe1a-cc4a-4ba7-bb65-88f4b00668f0"
            },
            {
                id: 3,
                title: "TCS iON Career Edge - Young Professional",
                organization: "Tata Consultancy Services",
                date: "Jul 26 - Aug 09, 2025",
                description: "Comprehensive course covering communication skills, presentation skills, soft skills, career guidance, resume writing, interview skills, business etiquette, and foundational IT skills.",
                verifyUrl: "TCSION.pdf"
            },
            {
                id: 4,
                title: "Data Analytics Job Simulation",
                organization: "Deloitte Australia",
                date: "Issued: July 17th, 2025",
                description: "Completed practical tasks in data analysis and forensic technology. Certificate of Completion from Deloitte.",
                verifyUrl: "DELOTTLE_completion_certificate.pdf"
            },
            {
                id: 5,
                title: "Technology Consulting Job Simulation",
                organization: "Accenture",
                date: "Issued: July 23rd, 2025",
                description: "Completed practical tasks in project kickoff, requirements gathering, voting application design, and creating agile stories.",
                verifyUrl: "accenture certificate.pdf"
            },
            {
                id: 6,
                title: "Web Development Internship Certificate",
                organization: "Empower Guiding Centre",
                date: "March 2024",
                description: "Successfully completed web development internship including project from 15th Feb 2024 to 8th March 2024 (15 days). Performance during the internship was commended.",
                verifyUrl: "ARAVINDHAN. M completon certificate.pdf"
            }
        ],
        skills: [
            {
                category: "Programming & Development",
                items: [
                    { name: "Python", percent: 80, icon: "python" },
                    { name: "Java", percent: 40, icon: "java" },
                    { name: "SQL", percent: 55, icon: "database" },
                    { name: "HTML/CSS/JS", percent: 70, icon: "code" }
                ]
            },
            {
                category: "Data & Analytics",
                items: [
                    { name: "Excel", percent: 80, icon: "file-excel" },
                    { name: "Machine Learning", percent: 65, icon: "brain" },
                    { name: "Data Analytics", percent: 75, icon: "chart-line" },
                    { name: "Problem Solving", percent: 85, icon: "lightbulb" }
                ]
            },
            {
                category: "Tools & Platforms",
                items: [
                    { name: "Git/GitHub", percent: 75, icon: "git-alt" },
                    { name: "AWS Cloud", percent: 60, icon: "aws" },
                    { name: "Requirements Gathering", percent: 70, icon: "tasks" },
                    { name: "Time Management", percent: 80, icon: "clock" }
                ]
            }
        ],
        social: {
            github: "https://github.com/arvilaps2211-star",
            linkedin: "https://www.linkedin.com/in/aravindhan-m-62a403342",
            email: "aravind250904@gmail.com",
            location: "Chennai, India"
        },
        content: {
            experienceSubtitle: "These experiences helped me bridge the gap between theoretical knowledge and practical application, preparing me for real-world software development challenges.",
            certificatesSubtitle: "Establishing credibility through continuous learning and formal mastery.",
            skillsSubtitle: "A comprehensive overview of my technical capabilities and proficiency levels.",
            contactSubtitle: "I bring fresh perspective, strong analytical skills, and a genuine passion for learning and growth in software development.",
            experienceQuote: "I believe in learning by doing, which is why I've completed multiple job simulations with industry leaders like Deloitte Australia and Accenture."
        }
    };
}

// Load content into the page
function loadContent(data) {
    // Profile Section
    document.getElementById('heroTitle').textContent = data.profile.name;
    document.getElementById('heroSubtitle').textContent = data.profile.title;
    document.getElementById('heroDescription').textContent = data.profile.description;
    document.getElementById('heroTagline').textContent = data.profile.tagline;
    document.getElementById('aboutSubtitle').textContent = data.profile.about;
    document.getElementById('aboutTitle').textContent = data.profile.aboutTitle;
    document.getElementById('aboutDescription1').textContent = data.profile.aboutDescription1;
    document.getElementById('aboutDescription2').textContent = data.profile.aboutDescription2;
    
    // Education
    document.getElementById('educationTitle').textContent = data.profile.education.title;
    document.getElementById('educationInstitution').textContent = data.profile.education.institution;
    document.getElementById('educationDuration').textContent = data.profile.education.duration;
    
    // Stats
    document.getElementById('projectsCount').textContent = data.profile.stats.projects;
    document.getElementById('certificatesCount').textContent = data.profile.stats.certificates;
    document.getElementById('simulationsCount').textContent = data.profile.stats.simulations;
    
    // Interests
    const interestsList = document.getElementById('interestsList');
    interestsList.innerHTML = '';
    data.profile.interests.forEach(interest => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = interest;
        interestsList.appendChild(tag);
    });
    
    // Experiences
    const experienceList = document.getElementById('experienceList');
    experienceList.innerHTML = '';
    data.experiences.forEach(exp => {
        const expCard = createExperienceCard(exp);
        experienceList.appendChild(expCard);
    });
    
    // Certificates
    const certificatesList = document.getElementById('certificatesList');
    certificatesList.innerHTML = '';
    data.certificates.forEach(cert => {
        const certCard = createCertificateCard(cert);
        certificatesList.appendChild(certCard);
    });
    
    // Skills
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    data.skills.forEach(skillCategory => {
        const categoryDiv = createSkillCategory(skillCategory);
        skillsList.appendChild(categoryDiv);
    });
    
    // Content
    document.getElementById('experienceSubtitle').textContent = data.content.experienceSubtitle;
    document.getElementById('certificatesSubtitle').textContent = data.content.certificatesSubtitle;
    document.getElementById('skillsSubtitle').textContent = data.content.skillsSubtitle;
    document.getElementById('contactSubtitle').textContent = data.content.contactSubtitle;
    document.getElementById('experienceQuote').innerHTML = `
        <i class="fas fa-quote-left"></i>
        ${data.content.experienceQuote}
        <i class="fas fa-quote-right"></i>
    `;
    
    // Social Links
    updateSocialLinks(data.social);
    
    // Footer
    document.getElementById('footerName').textContent = data.profile.name;
    document.getElementById('footerBio').textContent = "Aspiring Software Developer & Data Analytics Enthusiast. Bridging the gap between theoretical knowledge and practical application to build meaningful digital solutions.";
    document.getElementById('footerEmail').href = `mailto:${data.social.email}`;
    document.getElementById('footerEmail').innerHTML = `<i class="fas fa-envelope"></i> ${data.social.email}`;
    document.getElementById('footerLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.social.location}`;
    
    // Update contact stats
    updateContactStats();
    
    // Trigger event for certificate buttons initialization
    setTimeout(() => {
        document.dispatchEvent(new Event('portfolioContentLoaded'));
    }, 100);
}

// Create experience card
function createExperienceCard(exp) {
    const card = document.createElement('div');
    card.className = 'experience-card';
    card.innerHTML = `
        <div class="exp-icon">
            <i class="fas fa-${exp.icon}"></i>
        </div>
        <div class="exp-content">
            <h3>${exp.title}</h3>
            <div class="exp-company">${exp.company}</div>
            <div class="exp-date">${exp.date}</div>
            <p class="exp-description">${exp.description}</p>
            <div class="exp-tags">
                ${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    return card;
}

// Create certificate card
function createCertificateCard(cert) {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    
    // Map certificate IDs to actual PDF files
    const certificateMap = {
        1: "AWS CERTICICATE.pdf",
        2: "", // Has external verifyUrl (Credly)
        3: "TCSION.pdf",
        4: "DELOTTLE_completion_certificate.pdf",
        5: "accenture certificate.pdf",
        6: "ARAVINDHAN. M completion certificate.pdf"
    };
    
    // Get the PDF file for this certificate ID
    const pdfFile = certificateMap[cert.id];
    
    // Determine button text and action
    let buttonHTML;
    if (cert.verifyUrl && cert.verifyUrl !== '#') {
        // Has external verify URL (Certificate 2 - Credly)
        buttonHTML = `
            <a href="${cert.verifyUrl}" target="_blank" class="view-cert">
                Verify Credential <i class="fas fa-external-link-alt"></i>
            </a>
        `;
    } else if (pdfFile) {
        // Has PDF file (Certificates 1, 3, 4, 5, 6)
        buttonHTML = `
            <button class="view-cert view-pdf-btn" 
                    data-file="${pdfFile}" 
                    data-title="${cert.title}"
                    data-id="${cert.id}">
                View Certificate <i class="fas fa-external-link-alt"></i>
            </button>
        `;
    } else {
        // No PDF or external link
        buttonHTML = `
            <button class="view-cert view-details-btn" 
                    onclick="showNotification('Certificate details for ${cert.title}', 'info')">
                View Details <i class="fas fa-eye"></i>
            </button>
        `;
    }
    
    // Build the HTML
    card.innerHTML = `
        <div class="certificate-header">
            <h3>${cert.title}</h3>
            <div class="certificate-org">${cert.organization}</div>
        </div>
        <div class="certificate-body">
            <p>${cert.description}</p>
            <div class="certificate-footer">
                <div class="cert-date">${cert.date}</div>
                ${buttonHTML}
            </div>
        </div>
    `;
    
    return card;
}

// Create skill category
function createSkillCategory(category) {
    const div = document.createElement('div');
    div.className = 'skills-category';
    div.innerHTML = `
        <h3><i class="fas fa-${getCategoryIcon(category.category)}"></i> ${category.category}</h3>
        ${category.items.map(item => `
            <div class="skill-item">
                <div class="skill-name">
                    <i class="${getSkillIcon(item.icon)}"></i> ${item.name}
                </div>
                <div class="skill-level">
                    <div class="skill-level-bar" style="width: ${item.percent}%;"></div>
                </div>
                <div class="skill-percent">${item.percent}%</div>
            </div>
        `).join('')}
    `;
    return div;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'Programming & Development': 'code',
        'Data & Analytics': 'chart-bar',
        'Tools & Platforms': 'tools'
    };
    return icons[category] || 'code';
}

// Get skill icon
function getSkillIcon(icon) {
    const icons = {
        'python': 'fab fa-python',
        'java': 'fab fa-java',
        'database': 'fas fa-database',
        'code': 'fas fa-code',
        'file-excel': 'fas fa-file-excel',
        'brain': 'fas fa-brain',
        'chart-line': 'fas fa-chart-line',
        'lightbulb': 'fas fa-lightbulb',
        'git-alt': 'fab fa-git-alt',
        'aws': 'fab fa-aws',
        'tasks': 'fas fa-tasks',
        'clock': 'fas fa-clock'
    };
    return icons[icon] || 'fas fa-circle';
}

// Update social links
function updateSocialLinks(social) {
    document.getElementById('githubLink').href = social.github;
    document.getElementById('linkedinLink').href = social.linkedin;
    document.getElementById('footerGithubLink').href = social.github;
    document.getElementById('footerLinkedinLink').href = social.linkedin;
}

// Update contact stats
function updateContactStats() {
    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    const resumes = messages.filter(m => m.resume !== 'None');
    
    document.getElementById('totalMessages').textContent = messages.length;
    document.getElementById('totalResumes').textContent = resumes.length;
    
    // Update admin badges
    if (typeof admin !== 'undefined' && admin.updateBadges) {
        admin.updateBadges();
    }
}

// Initialize event listeners
function initEventListeners() {
    // Admin login button
    adminLoginBtn.addEventListener('click', () => {
        adminModal.style.display = 'flex';
    });
    
    // Close admin dashboard
    closeAdminBtn.addEventListener('click', () => {
        adminDashboard.style.display = 'none';
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        const isVisible = navLinks.style.display === 'flex';
        
        if (isVisible) {
            hideMobileMenu();
        } else {
            showMobileMenu();
        }
    });
    
    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactForm();
    });
    
    // Download resume buttons
    document.getElementById('downloadResumeBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Downloading resume... (PDF file)', 'success');
    });
    
    document.getElementById('downloadCompleteResumeBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Downloading complete resume...', 'success');
    });
    
    // File upload display
    document.getElementById('resumeFile').addEventListener('change', function() {
        handleFileUpload(this);
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            handleSmoothScroll(e, this);
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Certificate PDF button clicks (delegated event listener)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-pdf-btn')) {
            e.preventDefault();
            const button = e.target.closest('.view-pdf-btn');
            const fileName = button.getAttribute('data-file');
            const certTitle = button.getAttribute('data-title');
            const certId = button.getAttribute('data-id');
            
            if (fileName) {
                openCertificatePDF(fileName, certTitle);
            } else if (certId) {
                viewCertificate(parseInt(certId));
            }
        }
    });
}

// ======================== NEW CERTIFICATE PDF FUNCTIONS ========================

// Function to open certificate PDF
function openCertificatePDF(fileName, certTitle) {
    // Check if file exists
    fetch(fileName)
        .then(response => {
            if (response.ok) {
                // File exists, open in new tab
                window.open(fileName, '_blank');
                showNotification(`Opening ${certTitle}...`, 'success');
            } else {
                // File doesn't exist
                showNotification(`Certificate file not found: ${fileName}`, 'error');
                console.error('Certificate file not found:', fileName);
            }
        })
        .catch(error => {
            showNotification(`Error opening certificate: ${error.message}`, 'error');
            console.error('Error checking certificate file:', error);
        });
}

// View certificate function for PDF files
function viewCertificate(id) {
    // Map certificate IDs to actual PDF files
    const certificateMap = {
        1: "AWS CERTICICATE.pdf",
        2: "", // Has external verifyUrl (Credly)
        3: "TCSION.pdf",
        4: "DELOTTLE_completion_certificate.pdf",
        5: "accenture certificate.pdf",
        6: "ARAVINDHAN. M completion certificate.pdf"
    };
    
    const titleMap = {
        1: "AWS Cloud Practitioner Essentials",
        2: "Data Fundamentals",
        3: "TCS iON Career Edge",
        4: "Deloitte Data Analytics",
        5: "Accenture Technology Consulting",
        6: "Web Development Internship"
    };
    
    const pdfFile = certificateMap[id];
    const certTitle = titleMap[id] || `Certificate ${id}`;
    
    if (pdfFile) {
        openCertificatePDF(pdfFile, certTitle);
    } else {
        showNotification(`Opening certificate ${id}...`, 'info');
    }
}

// ======================== END OF NEW FUNCTIONS ========================

// Show mobile menu
function showMobileMenu() {
    navLinks.style.display = 'flex';
    socialIcons.style.display = 'flex';
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    // Make mobile menu responsive
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'white';
    navLinks.style.padding = '2rem';
    navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    navLinks.style.gap = '1.5rem';
    
    socialIcons.style.marginLeft = '0';
    socialIcons.style.marginTop = '1rem';
}

// Hide mobile menu
function hideMobileMenu() {
    navLinks.style.display = 'none';
    socialIcons.style.display = 'none';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

// Handle login
function handleLogin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    if (email === "aravind250904@gmail.com" && password === "Aravind1234") {
        localStorage.setItem('adminLoggedIn', 'true');
        adminModal.style.display = 'none';
        adminDashboard.style.display = 'block';
        loginForm.reset();
        showNotification('Admin login successful! You now have editing privileges.', 'success');
        
        // Update badges after login
        setTimeout(() => {
            if (typeof admin !== 'undefined' && admin.updateBadges) {
                admin.updateBadges();
            }
            updateContactStats();
        }, 100);
    } else {
        showNotification('Invalid email or password. Try: aravind250904@gmail.com / Aravind1234', 'error');
    }
}

// Handle contact form
function handleContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const resumeFile = document.getElementById('resumeFile').files[0];
    
    // Validate required fields
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Save message to localStorage
    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        message: message,
        resume: resumeFile ? resumeFile.name : 'None',
        timestamp: new Date().toISOString(),
        read: false
    };
    
    messages.push(newMessage);
    localStorage.setItem('portfolioMessages', JSON.stringify(messages));
    
    showNotification(`Message sent successfully! Aravindhan will contact you soon.`, 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Reset file upload display
    const filePreview = document.getElementById('filePreview');
    filePreview.innerHTML = '';
    
    // Update stats
    updateContactStats();
    
    // Update admin badges
    if (typeof admin !== 'undefined' && admin.updateBadges) {
        admin.updateBadges();
    }
}

// Handle file upload
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const filePreview = document.getElementById('filePreview');
        filePreview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-file-pdf" style="color: #e63946; font-size: 1.5rem;"></i>
                <div>
                    <p style="font-weight: 600; margin: 0; color: white;">${file.name}</p>
                    <p style="color: #94a3b8; font-size: 0.9rem; margin: 5px 0 0 0;">${(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <button onclick="document.getElementById('resumeFile').value=''; document.getElementById('filePreview').innerHTML='';" 
                        style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); padding: 5px 10px; border-radius: 5px; cursor: pointer; color: white; font-size: 0.9rem; margin-left: auto;">
                    Remove
                </button>
            </div>
        `;
    }
}

// Handle smooth scrolling
function handleSmoothScroll(e, element) {
    const targetId = element.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            hideMobileMenu();
        }
        
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        element.classList.add('active');
    }
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }
    }, 5000);
}

// Initialize animations
function initAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.experience-card, .certificate-card, .skills-category, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.experience-card, .certificate-card, .skills-category, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Update stats on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        updateContactStats();
        if (typeof admin !== 'undefined' && admin.updateBadges) {
            admin.updateBadges();
        }
    }, 500);
});

// Re-initialize certificate buttons after content loads
document.addEventListener('portfolioContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.view-pdf-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const fileName = this.getAttribute('data-file');
                const certTitle = this.getAttribute('data-title');
                if (fileName) {
                    openCertificatePDF(fileName, certTitle);
                }
            });
        });
    }, 500);
});
