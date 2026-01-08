// Admin JavaScript for Content Management

const admin = {
    // Admin credentials
    credentials: {
        email: "aravind250904@gmail.com",
        password: "Aravind1234"
    },
    
    // Check if admin is logged in
    isLoggedIn: () => {
        return localStorage.getItem('adminLoggedIn') === 'true';
    },
    
    // Logout function
    logout: () => {
        localStorage.removeItem('adminLoggedIn');
        document.getElementById('adminDashboard').style.display = 'none';
        showNotification('Logged out successfully.', 'success');
    },
    
    // Edit website content
    editContent: () => {
        if (!admin.isLoggedIn()) {
            showNotification('Please login as admin first.', 'error');
            return;
        }
        
        // Load current data into editor
        admin.loadEditorData();
        
        // Show editor modal
        document.getElementById('editorModal').style.display = 'flex';
        
        // Initialize tab functionality
        admin.initEditorTabs();
    },
    
    // Load data into editor
    loadEditorData: () => {
        const data = window.portfolioData;
        
        // Profile tab
        document.getElementById('editHeroTitle').value = data.profile.name;
        document.getElementById('editHeroSubtitle').value = data.profile.title;
        document.getElementById('editHeroDescription').value = data.profile.description;
        document.getElementById('editAboutDescription').value = data.profile.aboutDescription1 + '\n\n' + data.profile.aboutDescription2;
        
        // Experience tab
        admin.loadExperienceEditor();
        
        // Certificates tab
        admin.loadCertificatesEditor();
        
        // Skills tab
        admin.loadSkillsEditor();
        
        // Social tab
        document.getElementById('editGithubUrl').value = data.social.github;
        document.getElementById('editLinkedinUrl').value = data.social.linkedin;
        document.getElementById('editEmail').value = data.social.email;
    },
    
    // Load experience editor
    loadExperienceEditor: () => {
        const experiences = window.portfolioData.experiences;
        const container = document.getElementById('experienceEditorList');
        container.innerHTML = '';
        
        experiences.forEach((exp, index) => {
            const expItem = document.createElement('div');
            expItem.className = 'editor-item';
            expItem.innerHTML = `
                <div class="editor-item-header">
                    <h4>${exp.title}</h4>
                    <div class="editor-item-actions">
                        <button class="btn-icon" onclick="admin.editExperience(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="admin.deleteExperience(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="editor-item-preview">${exp.company} • ${exp.date}</p>
            `;
            container.appendChild(expItem);
        });
    },
    
    // Load certificates editor
    loadCertificatesEditor: () => {
        const certificates = window.portfolioData.certificates;
        const container = document.getElementById('certificatesEditorList');
        container.innerHTML = '';
        
        certificates.forEach((cert, index) => {
            const certItem = document.createElement('div');
            certItem.className = 'editor-item';
            certItem.innerHTML = `
                <div class="editor-item-header">
                    <h4>${cert.title}</h4>
                    <div class="editor-item-actions">
                        <button class="btn-icon" onclick="admin.editCertificate(${index})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="admin.deleteCertificate(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="editor-item-preview">${cert.organization} • ${cert.date}</p>
            `;
            container.appendChild(certItem);
        });
    },
    
    // Load skills editor
    loadSkillsEditor: () => {
        const skills = window.portfolioData.skills;
        const container = document.getElementById('skillsEditorList');
        container.innerHTML = '';
        
        skills.forEach((category, catIndex) => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'editor-item';
            categoryItem.innerHTML = `
                <div class="editor-item-header">
                    <h4>${category.category}</h4>
                    <div class="editor-item-actions">
                        <button class="btn-icon" onclick="admin.editSkillCategory(${catIndex})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" onclick="admin.deleteSkillCategory(${catIndex})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="editor-item-preview">
                    ${category.items.map((skill, skillIndex) => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>${skill.name} (${skill.percent}%)</span>
                            <div>
                                <button class="btn-icon-small" onclick="admin.editSkill(${catIndex}, ${skillIndex})">
                                    <i class="fas fa-edit fa-xs"></i>
                                </button>
                                <button class="btn-icon-small" onclick="admin.deleteSkill(${catIndex}, ${skillIndex})">
                                    <i class="fas fa-trash fa-xs"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(categoryItem);
        });
    },
    
    // Initialize editor tabs
    initEditorTabs: () => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId + 'Tab') {
                        content.classList.add('active');
                    }
                });
            });
        });
    },
    
    // Save profile changes
    saveProfile: () => {
        const data = window.portfolioData;
        
        // Update profile data
        data.profile.name = document.getElementById('editHeroTitle').value;
        data.profile.title = document.getElementById('editHeroSubtitle').value;
        data.profile.description = document.getElementById('editHeroDescription').value;
        
        const aboutDesc = document.getElementById('editAboutDescription').value.split('\n\n');
        data.profile.aboutDescription1 = aboutDesc[0] || '';
        data.profile.aboutDescription2 = aboutDesc[1] || '';
        
        // Save to localStorage
        admin.saveData(data);
        
        // Reload content
        loadContent(data);
        
        showNotification('Profile updated successfully!', 'success');
    },
    
    // Save social links
    saveSocialLinks: () => {
        const data = window.portfolioData;
        
        data.social.github = document.getElementById('editGithubUrl').value;
        data.social.linkedin = document.getElementById('editLinkedinUrl').value;
        data.social.email = document.getElementById('editEmail').value;
        
        admin.saveData(data);
        loadContent(data);
        
        showNotification('Social links updated successfully!', 'success');
    },
    
    // Add new experience
    addExperience: () => {
        const title = prompt('Enter experience title:');
        if (!title) return;
        
        const company = prompt('Enter company name:');
        if (!company) return;
        
        const date = prompt('Enter date/period:');
        if (!date) return;
        
        const description = prompt('Enter description:');
        if (!description) return;
        
        const tagsInput = prompt('Enter tags (comma-separated):');
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
        
        const newExp = {
            id: Date.now(),
            title,
            company,
            date,
            description,
            tags,
            icon: 'briefcase'
        };
        
        window.portfolioData.experiences.push(newExp);
        admin.saveData(window.portfolioData);
        admin.loadExperienceEditor();
        loadContent(window.portfolioData);
        
        showNotification('Experience added successfully!', 'success');
    },
    
    // Edit experience
    editExperience: (index) => {
        const exp = window.portfolioData.experiences[index];
        
        exp.title = prompt('Edit title:', exp.title) || exp.title;
        exp.company = prompt('Edit company:', exp.company) || exp.company;
        exp.date = prompt('Edit date:', exp.date) || exp.date;
        exp.description = prompt('Edit description:', exp.description) || exp.description;
        
        const tagsInput = prompt('Edit tags (comma-separated):', exp.tags.join(', '));
        exp.tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : exp.tags;
        
        admin.saveData(window.portfolioData);
        admin.loadExperienceEditor();
        loadContent(window.portfolioData);
        
        showNotification('Experience updated successfully!', 'success');
    },
    
    // Delete experience
    deleteExperience: (index) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            window.portfolioData.experiences.splice(index, 1);
            admin.saveData(window.portfolioData);
            admin.loadExperienceEditor();
            loadContent(window.portfolioData);
            
            showNotification('Experience deleted successfully!', 'success');
        }
    },
    
    // Add new certificate
    addCertificate: () => {
        const title = prompt('Enter certificate title:');
        if (!title) return;
        
        const organization = prompt('Enter organization:');
        if (!organization) return;
        
        const date = prompt('Enter date:');
        if (!date) return;
        
        const description = prompt('Enter description:');
        if (!description) return;
        
        const newCert = {
            id: Date.now(),
            title,
            organization,
            date,
            description,
            verifyUrl: '#'
        };
        
        window.portfolioData.certificates.push(newCert);
        admin.saveData(window.portfolioData);
        admin.loadCertificatesEditor();
        loadContent(window.portfolioData);
        
        showNotification('Certificate added successfully!', 'success');
    },
    
    // Edit certificate
    editCertificate: (index) => {
        const cert = window.portfolioData.certificates[index];
        
        cert.title = prompt('Edit title:', cert.title) || cert.title;
        cert.organization = prompt('Edit organization:', cert.organization) || cert.organization;
        cert.date = prompt('Edit date:', cert.date) || cert.date;
        cert.description = prompt('Edit description:', cert.description) || cert.description;
        
        admin.saveData(window.portfolioData);
        admin.loadCertificatesEditor();
        loadContent(window.portfolioData);
        
        showNotification('Certificate updated successfully!', 'success');
    },
    
    // Delete certificate
    deleteCertificate: (index) => {
        if (confirm('Are you sure you want to delete this certificate?')) {
            window.portfolioData.certificates.splice(index, 1);
            admin.saveData(window.portfolioData);
            admin.loadCertificatesEditor();
            loadContent(window.portfolioData);
            
            showNotification('Certificate deleted successfully!', 'success');
        }
    },
    
    // Add new skill category
    addSkillCategory: () => {
        const category = prompt('Enter skill category name:');
        if (!category) return;
        
        window.portfolioData.skills.push({
            category,
            items: []
        });
        
        admin.saveData(window.portfolioData);
        admin.loadSkillsEditor();
        loadContent(window.portfolioData);
        
        showNotification('Skill category added successfully!', 'success');
    },
    
    // Edit skill category
    editSkillCategory: (index) => {
        const category = window.portfolioData.skills[index];
        const newCategory = prompt('Edit category name:', category.category);
        
        if (newCategory) {
            category.category = newCategory;
            admin.saveData(window.portfolioData);
            admin.loadSkillsEditor();
            loadContent(window.portfolioData);
            
            showNotification('Skill category updated successfully!', 'success');
        }
    },
    
    // Delete skill category
    deleteSkillCategory: (index) => {
        if (confirm('Are you sure you want to delete this skill category?')) {
            window.portfolioData.skills.splice(index, 1);
            admin.saveData(window.portfolioData);
            admin.loadSkillsEditor();
            loadContent(window.portfolioData);
            
            showNotification('Skill category deleted successfully!', 'success');
        }
    },
    
    // Add new skill
    addSkill: () => {
        if (window.portfolioData.skills.length === 0) {
            alert('Please add a skill category first!');
            return;
        }
        
        const categoryIndex = prompt('Enter category index (0, 1, 2...):');
        if (categoryIndex === null) return;
        
        const category = window.portfolioData.skills[categoryIndex];
        if (!category) {
            alert('Invalid category index!');
            return;
        }
        
        const name = prompt('Enter skill name:');
        if (!name) return;
        
        const percent = prompt('Enter skill percentage (0-100):');
        if (!percent) return;
        
        category.items.push({
            name,
            percent: parseInt(percent),
            icon: 'circle'
        });
        
        admin.saveData(window.portfolioData);
        admin.loadSkillsEditor();
        loadContent(window.portfolioData);
        
        showNotification('Skill added successfully!', 'success');
    },
    
    // Edit skill
    editSkill: (catIndex, skillIndex) => {
        const skill = window.portfolioData.skills[catIndex].items[skillIndex];
        
        skill.name = prompt('Edit skill name:', skill.name) || skill.name;
        const newPercent = prompt('Edit skill percentage:', skill.percent);
        skill.percent = newPercent ? parseInt(newPercent) : skill.percent;
        
        admin.saveData(window.portfolioData);
        admin.loadSkillsEditor();
        loadContent(window.portfolioData);
        
        showNotification('Skill updated successfully!', 'success');
    },
    
    // Delete skill
    deleteSkill: (catIndex, skillIndex) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            window.portfolioData.skills[catIndex].items.splice(skillIndex, 1);
            admin.saveData(window.portfolioData);
            admin.loadSkillsEditor();
            loadContent(window.portfolioData);
            
            showNotification('Skill deleted successfully!', 'success');
        }
    },
    
    // View messages
    viewMessages: () => {
        if (!admin.isLoggedIn()) {
            showNotification('Please login as admin first.', 'error');
            return;
        }
        
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        
        if (messages.length === 0) {
            alert('No messages received yet.');
            return;
        }
        
        // Create a better message display
        let messageHTML = `
            <div style="padding: 20px; max-width: 600px; max-height: 400px; overflow-y: auto;">
                <h3 style="margin-bottom: 20px; color: #2563eb;">Messages (${messages.length})</h3>
        `;
        
        messages.forEach((msg, index) => {
            const date = new Date(msg.timestamp).toLocaleString();
            messageHTML += `
                <div style="background: ${msg.read ? '#f1f5f9' : '#e0f2fe'}; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid ${msg.read ? '#94a3b8' : '#2563eb'};">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <strong style="color: #1e293b;">${msg.name}</strong>
                        <small style="color: #64748b;">${date}</small>
                    </div>
                    <div style="color: #475569; margin-bottom: 8px;">
                        <strong>Email:</strong> ${msg.email}
                    </div>
                    <div style="color: #334155; margin-bottom: 8px; background: white; padding: 10px; border-radius: 5px;">
                        ${msg.message}
                    </div>
                    <div style="color: #64748b; font-size: 0.9em;">
                        <strong>Resume:</strong> ${msg.resume}
                    </div>
                    ${!msg.read ? `
                        <button onclick="admin.markAsRead(${msg.id})" style="background: #2563eb; color: white; border: none; padding: 5px 10px; border-radius: 4px; margin-top: 10px; cursor: pointer; font-size: 0.9em;">
                            Mark as Read
                        </button>
                    ` : ''}
                </div>
            `;
        });
        
        messageHTML += `</div>`;
        
        // Show in a modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); display: flex; justify-content: center; 
            align-items: center; z-index: 3000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 0; max-width: 700px; width: 90%; max-height: 80vh; overflow: hidden;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #e2e8f0;">
                    <h3 style="margin: 0; color: #1e293b;">Messages (${messages.length})</h3>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: none; border: none; font-size: 24px; color: #64748b; cursor: pointer;">&times;</button>
                </div>
                <div style="padding: 20px; overflow-y: auto; max-height: 60vh;">
                    ${messages.length === 0 ? '<p style="text-align: center; color: #64748b; padding: 40px;">No messages received yet.</p>' : messageHTML}
                </div>
                <div style="padding: 15px 20px; border-top: 1px solid #e2e8f0; text-align: right;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    },
    
    // Mark message as read
    markAsRead: (messageId) => {
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        const messageIndex = messages.findIndex(m => m.id === messageId);
        
        if (messageIndex !== -1) {
            messages[messageIndex].read = true;
            localStorage.setItem('portfolioMessages', JSON.stringify(messages));
            admin.viewMessages(); // Refresh the view
            admin.updateBadges();
        }
    },
    
    // Update badges
    updateBadges: () => {
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        const resumes = messages.filter(m => m.resume !== 'None');
        
        // Update badges in admin dashboard
        const badges = document.querySelectorAll('.admin-btn .badge');
        if (badges.length >= 2) {
            badges[0].textContent = messages.length;
            badges[0].style.display = messages.length > 0 ? 'inline-block' : 'none';
            badges[1].textContent = resumes.length;
            badges[1].style.display = resumes.length > 0 ? 'inline-block' : 'none';
        }
        
        // Update contact stats
        if (typeof updateContactStats === 'function') {
            updateContactStats();
        }
    },
    
    // View resumes
    viewResumes: () => {
        if (!admin.isLoggedIn()) {
            showNotification('Please login as admin first.', 'error');
            return;
        }
        
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        const resumes = messages.filter(m => m.resume !== 'None');
        
        if (resumes.length === 0) {
            alert('No resumes received yet.');
            return;
        }
        
        // Create resume display
        let resumeHTML = `
            <div style="padding: 20px; max-width: 600px;">
                <h3 style="margin-bottom: 20px; color: #2563eb;">Resumes Received (${resumes.length})</h3>
        `;
        
        resumes.forEach((resume, index) => {
            const date = new Date(resume.timestamp).toLocaleString();
            resumeHTML += `
                <div style="background: #f8fafc; padding: 15px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <strong style="color: #1e293b;">${resume.name}</strong>
                        <small style="color: #64748b;">${date}</small>
                    </div>
                    <div style="color: #475569; margin-bottom: 8px;">
                        <strong>Email:</strong> ${resume.email}
                    </div>
                    <div style="color: #334155; margin-bottom: 8px;">
                        <strong>Resume File:</strong> ${resume.resume}
                    </div>
                    <div style="color: #334155; background: white; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <strong>Message:</strong><br>${resume.message}
                    </div>
                    <button onclick="admin.downloadResume('${resume.resume}')" 
                            style="background: #10b981; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 0.9em;">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            `;
        });
        
        resumeHTML += `</div>`;
        
        // Show in modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); display: flex; justify-content: center; 
            align-items: center; z-index: 3000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 0; max-width: 700px; width: 90%; max-height: 80vh; overflow: hidden;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #e2e8f0;">
                    <h3 style="margin: 0; color: #1e293b;">Resumes (${resumes.length})</h3>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: none; border: none; font-size: 24px; color: #64748b; cursor: pointer;">&times;</button>
                </div>
                <div style="padding: 20px; overflow-y: auto; max-height: 60vh;">
                    ${resumes.length === 0 ? '<p style="text-align: center; color: #64748b; padding: 40px;">No resumes received yet.</p>' : resumeHTML}
                </div>
                <div style="padding: 15px 20px; border-top: 1px solid #e2e8f0; text-align: right;">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    },
    
    // Download resume
    downloadResume: (filename) => {
        showNotification(`Downloading ${filename}...`, 'info');
        // In a real app, this would trigger a download
    },
    
    // Manage certificates
    manageCertificates: () => {
        if (!admin.isLoggedIn()) {
            showNotification('Please login as admin first.', 'error');
            return;
        }
        
        admin.editContent();
        
        // Switch to certificates tab
        setTimeout(() => {
            document.querySelector('[data-tab="certificates"]').click();
        }, 100);
    },
    
    // Edit profile
    editProfile: () => {
        if (!admin.isLoggedIn()) {
            showNotification('Please login as admin first.', 'error');
            return;
        }
        
        admin.editContent();
        
        // Switch to profile tab
        setTimeout(() => {
            document.querySelector('[data-tab="profile"]').click();
        }, 100);
    },
    
    // Edit social links
    editSocialLinks: () => {
        if (!admin.isLoggedIn()) {
            showNotification('Please login as admin first.', 'error');
            return;
        }
        
        admin.editContent();
        
        // Switch to social tab
        setTimeout(() => {
            document.querySelector('[data-tab="social"]').click();
        }, 100);
    },
    
    // Save data to localStorage
    saveData: (data) => {
        localStorage.setItem('portfolioData', JSON.stringify(data));
        window.portfolioData = data;
    },
    
    // Load data from localStorage
    loadSavedData: () => {
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
            window.portfolioData = JSON.parse(savedData);
            if (typeof loadContent === 'function') {
                loadContent(window.portfolioData);
            }
        }
    }
};

// Initialize admin functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check if admin is logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('adminDashboard').style.display = 'block';
    }
    
    // Close editor modal
    const closeEditorBtn = document.getElementById('closeEditorBtn');
    if (closeEditorBtn) {
        closeEditorBtn.addEventListener('click', () => {
            document.getElementById('editorModal').style.display = 'none';
        });
    }
    
    // Close editor modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('editorModal')) {
            document.getElementById('editorModal').style.display = 'none';
        }
    });
    
    // Load saved data if exists
    admin.loadSavedData();
    
    // Update badges on load
    setTimeout(() => {
        admin.updateBadges();
    }, 100);
});

// Add CSS for editor
const editorStyles = document.createElement('style');
editorStyles.textContent = `
    .editor-item {
        background: var(--light);
        border-radius: 10px;
        padding: 1rem;
        margin-bottom: 1rem;
        border: 1px solid var(--gray-light);
    }
    
    .editor-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .editor-item-header h4 {
        margin: 0;
        color: var(--dark);
    }
    
    .editor-item-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-icon {
        background: none;
        border: none;
        color: var(--gray);
        cursor: pointer;
        font-size: 1rem;
        padding: 0.3rem;
        border-radius: 4px;
        transition: all 0.3s;
    }
    
    .btn-icon:hover {
        background: var(--gray-light);
        color: var(--dark);
    }
    
    .btn-icon-small {
        background: none;
        border: none;
        color: var(--gray);
        cursor: pointer;
        font-size: 0.8rem;
        padding: 0.2rem;
        margin-left: 0.3rem;
        border-radius: 3px;
    }
    
    .btn-icon-small:hover {
        background: var(--gray-light);
        color: var(--dark);
    }
    
    .editor-item-preview {
        color: var(--gray);
        font-size: 0.9rem;
        margin: 0;
    }
`;
document.head.appendChild(editorStyles);