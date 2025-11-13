/* ================================
   MC Smart Bytes - JavaScript
   Interactive Functionality
   ================================ */

// Global variables
let currentTestimonial = 0;
let currentFormStep = 1;
let csrfToken = null;

// Get CSRF token
async function getCSRFToken() {
    try {
        const response = await fetch('/get_csrf_token');
        const data = await response.json();
        csrfToken = data.csrf_token;
        return csrfToken;
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
        return null;
    }
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    initializeNavigation();
    initializeTestimonialCarousel();
    initializeExpenseTracker();
    initializeContactForm();
    initializeAnimations();
    initializeScrollEffects();
    initializeSecurity();
}

/* ================================
   NAVIGATION FUNCTIONALITY
   ================================ */

function initializeNavigation() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================
   TESTIMONIAL CAROUSEL
   ================================ */

function initializeTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const navButtons = document.querySelectorAll('.testimonial-nav-btn');
    
    if (testimonials.length === 0) return;

    // Show first testimonial
    showTestimonial(0);

    // Add click handlers for navigation buttons
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto-rotate testimonials every 8 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 8000);
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const navButtons = document.querySelectorAll('.testimonial-nav-btn');
    
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active state from all buttons
    navButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        testimonials[index].classList.add('fade-in');
    }
    
    // Activate corresponding button
    if (navButtons[index]) {
        navButtons[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

/* ================================
   EXPENSE TRACKER FUNCTIONALITY
   ================================ */

function initializeExpenseTracker() {
    const form = document.getElementById('expense-tracker-form');
    
    if (!form) return;
    
    form.addEventListener('submit', handleExpenseTrackerSubmit);
    
    // Initialize form validation
    initializeFormValidation();
}

function handleExpenseTrackerSubmit(e) {
    e.preventDefault();
    
    const formData = getExpenseTrackerData();
    
    if (!validateExpenseTrackerData(formData)) {
        showErrorMessage('Please fill in all required fields.');
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Calculate savings
    const results = calculateSavings(formData);
    
    // Submit to backend
    submitExpenseTracker(formData, results);
}

function getExpenseTrackerData() {
    return {
        businessName: document.getElementById('business-name')?.value || '',
        email: document.getElementById('email')?.value || '',
        businessType: document.getElementById('business-type')?.value || '',
        monthlyExpenses: parseFloat(document.getElementById('monthly-expenses')?.value) || 0,
        employeeCount: document.getElementById('employee-count')?.value || '',
        adminTime: parseFloat(document.getElementById('admin-time')?.value) || 0
    };
}

function validateExpenseTrackerData(data) {
    console.log('Validating expense tracker data:', data); // Debug log
    
    if (!data.businessName) {
        console.log('Missing business name');
        return false;
    }
    if (!data.email) {
        console.log('Missing email');
        return false;
    }
    if (!data.businessType) {
        console.log('Missing business type');
        return false;
    }
    if (!data.monthlyExpenses || data.monthlyExpenses <= 0) {
        console.log('Missing or invalid monthly expenses:', data.monthlyExpenses);
        return false;
    }
    if (!data.employeeCount) {
        console.log('Missing employee count');
        return false;
    }
    if (!data.adminTime || data.adminTime <= 0) {
        console.log('Missing or invalid admin time:', data.adminTime);
        return false;
    }
    
    return true;
}

function calculateSavings(data) {
    const basePercentage = 0.15; // 15% base savings
    let adjustedPercentage = basePercentage;
    
    // Adjust based on business type
    const businessTypeMultipliers = {
        'retail': 0.12,
        'services': 0.18,
        'manufacturing': 0.20,
        'healthcare': 0.16,
        'logistics': 0.19,
        'hospitality': 0.14,
        'other': 0.15
    };
    
    adjustedPercentage = businessTypeMultipliers[data.businessType] || basePercentage;
    
    // Additional savings based on current admin time
    const timeSavingsMultiplier = Math.min(data.adminTime / 40, 0.5); // Up to 50% additional
    adjustedPercentage += timeSavingsMultiplier * 0.1;
    
    const monthlySavings = Math.round(data.monthlyExpenses * adjustedPercentage);
    const annualSavings = monthlySavings * 12;
    const timeSavings = Math.round(data.adminTime * 0.6); // 60% time reduction
    
    const recommendations = generateRecommendations(data, monthlySavings);
    
    return {
        monthlySavings,
        annualSavings,
        timeSavings,
        recommendations
    };
}

function generateRecommendations(data, monthlySavings) {
    const recommendations = [];
    
    if (data.monthlyExpenses > 10000) {
        recommendations.push({
            title: 'Advanced Automation Suite',
            description: 'Implement comprehensive Excel dashboards with automated reporting and KPI tracking.',
            savings: 'Additional $2,000-5,000/month in efficiency gains'
        });
    }
    
    if (data.monthlyExpenses > 5000) {
        recommendations.push({
            title: 'Workflow Automation',
            description: 'Streamline repetitive tasks with custom macros and database integration.',
            savings: 'Save 10-15 hours/week on administrative tasks'
        });
    }
    
    recommendations.push({
        title: 'Professional Bookkeeping Setup',
        description: 'Organized financial tracking with tax-optimized categorization and monthly reporting.',
        savings: 'Ensure maximum tax deductions and compliance'
    });
    
    if (data.adminTime > 20) {
        recommendations.push({
            title: 'Process Optimization Consultation',
            description: 'Identify and eliminate inefficiencies in your current workflows.',
            savings: `Potential to reduce admin time by ${Math.round(data.adminTime * 0.4)} hours/week`
        });
    }
    
    return recommendations;
}

function showLoadingState() {
    const form = document.getElementById('expense-tracker-form');
    const calculateBtn = form.querySelector('.calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
    }
    
    form.classList.add('loading');
}

function hideLoadingState() {
    const form = document.getElementById('expense-tracker-form');
    const calculateBtn = form.querySelector('.calculate-btn');
    
    if (calculateBtn) {
        calculateBtn.disabled = false;
        calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate My Savings';
    }
    
    form.classList.remove('loading');
}

function displayResults(results) {
    const formContainer = document.querySelector('.tracker-form-container');
    const resultsContainer = document.getElementById('results-container');
    
    if (!resultsContainer) return;
    
    // Update savings amounts
    document.getElementById('monthly-savings').textContent = `$${results.monthlySavings.toLocaleString()}`;
    document.getElementById('annual-savings').textContent = `$${results.annualSavings.toLocaleString()}`;
    document.getElementById('time-savings').textContent = results.timeSavings;
    
    // Display recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    if (recommendationsList) {
        recommendationsList.innerHTML = '';
        results.recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = 'recommendation-item';
            recElement.innerHTML = `
                <h5>${rec.title}</h5>
                <p>${rec.description}</p>
                <small><strong>${rec.savings}</strong></small>
            `;
            recommendationsList.appendChild(recElement);
        });
    }
    
    // Hide form and show results with animation
    formContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultsContainer.classList.add('fade-in');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function submitExpenseTracker(formData, results) {
    // Get fresh CSRF token
    const token = await getCSRFToken();
    if (!token) {
        showErrorMessage('Security validation failed. Please refresh and try again.');
        hideLoadingState();
        return;
    }
    
    fetch('/expense_tracker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            business_name: formData.businessName,
            email: formData.email,
            business_type: formData.businessType,
            monthly_expenses: formData.monthlyExpenses,
            employee_count: formData.employeeCount,
            admin_time: formData.adminTime,
            calculated_savings: results.monthlySavings,
            csrf_token: token
        })
    })
    .then(response => response.json())
    .then(data => {
        hideLoadingState();
        if (data.success) {
            displayResults(results);
        } else {
            showErrorMessage('There was an error processing your request. Please try again.');
        }
    })
    .catch(error => {
        hideLoadingState();
        console.error('Error:', error);
        showErrorMessage('There was a connection error. Please check your internet connection and try again.');
    });
}

// Multi-step form navigation
function nextStep(step) {
    if (validateCurrentStep()) {
        showStep(step);
    }
}

function prevStep(step) {
    showStep(step);
}

function showStep(step) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) {
        targetStep.classList.add('active');
        targetStep.classList.add('fade-in');
    }
    
    currentFormStep = step;
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step-${currentFormStep}`);
    if (!currentStepElement) return false;
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showErrorMessage('Please fill in all required fields before continuing.');
    }
    
    return isValid;
}

// Download report functionality
function downloadReport() {
    const businessName = document.getElementById('business-name')?.value || 'Business';
    const monthlySavings = document.getElementById('monthly-savings')?.textContent || '$0';
    const annualSavings = document.getElementById('annual-savings')?.textContent || '$0';
    const timeSavings = document.getElementById('time-savings')?.textContent || '0';
    
    const reportContent = `
MC Smart Bytes - Business Savings Analysis Report
================================================

Business: ${businessName}
Date: ${new Date().toLocaleDateString()}

SAVINGS POTENTIAL:
" Monthly Savings: ${monthlySavings}
" Annual Savings: ${annualSavings}
" Time Recovered: ${timeSavings} hours per week

NEXT STEPS:
1. Schedule a free 30-minute consultation
2. Discuss implementation timeline
3. Begin transformation process

Contact Information:
Email: info@mcsmartbytes.com
Website: https://mcsmartbytes.com

This analysis is based on industry standards and your specific business inputs.
Actual results may vary based on implementation and business-specific factors.
    `.trim();
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${businessName.replace(/\s+/g, '_')}_Savings_Analysis.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

/* ================================
   CONTACT FORM FUNCTIONALITY
   ================================ */

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', handleContactFormSubmit);
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (!validateContactForm(data)) {
        showErrorMessage('Please fill in all required fields.');
        return;
    }
    
    // Show loading state with encryption indicator
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-lock fa-spin"></i> Encrypting & Sending...';
    
    // Get CSRF token and submit to backend
    getCSRFToken().then(token => {
        if (!token) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            showErrorMessage('Security validation failed. Please refresh and try again.');
            return;
        }
        
        // Add CSRF token to data and show encryption status
        data.csrf_token = token;
        submitBtn.innerHTML = '<i class="fas fa-shield-alt fa-spin"></i> Securing Data...';
        
        // Fix field name mismatch - backend expects 'service_interest' not 'service'
        const submitData = { ...data };
        if (submitData.service) {
            submitData.service_interest = submitData.service;
            delete submitData.service;
        }
        
        return fetch('/submit_contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData)
        });
    })
    .then(response => response.json())
    .then(result => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        if (result.success) {
            showContactSuccess();
        } else {
            showErrorMessage('There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        console.error('Error:', error);
        showErrorMessage('There was a connection error. Please check your internet connection and try again.');
    });
}

function validateContactForm(data) {
    console.log('Validating contact form data:', data); // Debug log
    
    // Check required fields
    if (!data.name) {
        console.log('Missing name');
        showErrorMessage('Please enter your name.');
        return false;
    }
    if (!data.email) {
        console.log('Missing email');
        showErrorMessage('Please enter your email address.');
        return false;
    }
    if (!data.service) {
        console.log('Missing service selection');
        showErrorMessage('Please select a service you\'re interested in.');
        return false;
    }
    if (!data.message) {
        console.log('Missing message');
        showErrorMessage('Please enter a message.');
        return false;
    }
    if (!data.privacy) {
        console.log('Privacy checkbox not checked');
        showErrorMessage('Please agree to the privacy terms.');
        return false;
    }
    
    // Validate CAPTCHA
    const captchaInput = parseInt(data.captcha);
    const captchaAnswer = parseInt(data.captcha_answer);
    
    console.log('CAPTCHA validation:', { input: captchaInput, answer: captchaAnswer });
    
    if (isNaN(captchaInput) || captchaInput !== captchaAnswer) {
        showErrorMessage('Please solve the security question correctly.');
        generateCaptcha(); // Generate new question
        return false;
    }
    
    return true;
}

function showContactSuccess() {
    const form = document.getElementById('contact-form');
    const successDiv = document.getElementById('contact-success');
    
    if (form && successDiv) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        successDiv.classList.add('fade-in');
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/* ================================
   FORM VALIDATION
   ================================ */

function initializeFormValidation() {
    // Real-time validation for email fields
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('error');
                showFieldError(this, 'Please enter a valid email address.');
            } else {
                this.classList.remove('error');
                hideFieldError(this);
            }
        });
    });
    
    // Real-time validation for required fields
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        field.addEventListener('input', function() {
            this.classList.remove('error');
            hideFieldError(this);
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/* ================================
   ANIMATION AND SCROLL EFFECTS
   ================================ */

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('[data-aos]');
    animateElements.forEach(el => observer.observe(el));
    
    // Counter animation for statistics
    initializeCounterAnimations();
}

function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const numberMatch = text.match(/[\d,]+/);
    
    if (!numberMatch) return;
    
    const finalNumber = parseInt(numberMatch[0].replace(/,/g, ''));
    const prefix = text.substring(0, text.indexOf(numberMatch[0]));
    const suffix = text.substring(text.indexOf(numberMatch[0]) + numberMatch[0].length);
    
    let currentNumber = 0;
    const increment = finalNumber / 50; // 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        
        const displayNumber = Math.floor(currentNumber).toLocaleString();
        element.textContent = prefix + displayNumber + suffix;
    }, stepTime);
}

function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        });
    }
    
    // Progress indicator
    createScrollProgressIndicator();
}

function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
        }
        .scroll-progress-bar {
            height: 100%;
            background: var(--gradient-primary);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

/* ================================
   UTILITY FUNCTIONS
   ================================ */

function showErrorMessage(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
            z-index: 10000;
            font-weight: 500;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(errorDiv);
    }
    
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: auto;">�</button>
        </div>
    `;
    
    // Show the message
    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (errorDiv && errorDiv.parentNode) {
            errorDiv.style.opacity = '0';
            errorDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (errorDiv && errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

function showSuccessMessage(message) {
    // Similar to error message but with success styling
    let successDiv = document.querySelector('.success-message');
    
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
            z-index: 10000;
            font-weight: 500;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        document.body.appendChild(successDiv);
    }
    
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: auto;">�</button>
        </div>
    `;
    
    // Show the message
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (successDiv && successDiv.parentNode) {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (successDiv && successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

/* ================================
   PERFORMANCE OPTIMIZATIONS
   ================================ */

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ================================
   SECURITY FUNCTIONALITY
   ================================ */

let captchaAnswer = 0;

function initializeSecurity() {
    deobfuscateContact();
    setupInputProtection();
    generateCaptcha();
}

// Contact information deobfuscation
function deobfuscateContact() {
    // Decode email addresses
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(el => {
        const encoded = el.getAttribute('data-email');
        if (encoded) {
            try {
                const decoded = atob(encoded); // Base64 decode
                el.textContent = decoded;
                if (el.tagName.toLowerCase() === 'a') {
                    el.href = 'mailto:' + decoded;
                }
            } catch (error) {
                console.log('Error decoding email:', error);
            }
        }
    });
    
    // Decode phone numbers
    const phoneElements = document.querySelectorAll('[data-phone]');
    phoneElements.forEach(el => {
        const encoded = el.getAttribute('data-phone');
        if (encoded) {
            try {
                const decoded = encoded.split('').reverse().join('').replace(/[^0-9]/g, '');
                const formatted = decoded.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                el.textContent = formatted;
                if (el.tagName.toLowerCase() === 'a') {
                    el.href = 'tel:+1' + decoded;
                }
            } catch (error) {
                console.log('Error decoding phone:', error);
            }
        }
    });
}

// Input field protection - only for contact form, not expense tracker
function setupInputProtection() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const sensitiveInputs = contactForm.querySelectorAll('input[name="email"], input[name="phone"], textarea[name="message"]');
        sensitiveInputs.forEach(input => {
            protectInput(input);
        });
    }
}

function protectInput(inputElement) {
    if (!inputElement) return;
    
    let originalValue = '';
    let isProtected = false;
    
    inputElement.addEventListener('input', function(e) {
        originalValue = e.target.value;
        // Store encrypted version
        e.target.setAttribute('data-protected', btoa(originalValue));
    });
    
    // Clear visible value after a delay to protect from screen scraping
    inputElement.addEventListener('blur', function(e) {
        setTimeout(() => {
            if (originalValue && originalValue.length > 0 && document.activeElement !== e.target) {
                const placeholder = '•'.repeat(Math.min(originalValue.length, 25));
                e.target.value = placeholder;
                e.target.style.color = '#999';
                e.target.style.letterSpacing = '2px';
                isProtected = true;
            }
        }, 3000); // 3 second delay
    });
    
    inputElement.addEventListener('focus', function(e) {
        if (isProtected) {
            const protected = e.target.getAttribute('data-protected');
            if (protected) {
                try {
                    e.target.value = atob(protected);
                    e.target.style.color = '#333';
                    e.target.style.letterSpacing = 'normal';
                    isProtected = false;
                } catch (error) {
                    console.log('Error restoring input:', error);
                }
            }
        }
    });
    
    // Handle form submission - restore original values
    const form = inputElement.closest('form');
    if (form) {
        form.addEventListener('submit', function() {
            if (isProtected) {
                const protected = inputElement.getAttribute('data-protected');
                if (protected) {
                    try {
                        inputElement.value = atob(protected);
                    } catch (error) {
                        console.log('Error restoring input for submission:', error);
                    }
                }
            }
        });
    }
}

// CAPTCHA functionality
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question, answer;
    
    switch(operation) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            const larger = Math.max(num1, num2);
            const smaller = Math.min(num1, num2);
            question = `${larger} - ${smaller}`;
            answer = larger - smaller;
            break;
        case '×':
            const smallNum1 = Math.floor(Math.random() * 10) + 1;
            const smallNum2 = Math.floor(Math.random() * 10) + 1;
            question = `${smallNum1} × ${smallNum2}`;
            answer = smallNum1 * smallNum2;
            break;
    }
    
    const questionEl = document.getElementById('captcha-question');
    const answerEl = document.getElementById('captcha-answer');
    
    if (questionEl && answerEl) {
        questionEl.textContent = question;
        answerEl.value = answer;
        captchaAnswer = answer;
        
        const captchaInput = document.getElementById('captcha');
        if (captchaInput) {
            captchaInput.value = '';
        }
    }
}

/* ================================
   GLOBAL FUNCTIONS (for HTML onclick handlers)
   ================================ */

// Make functions globally available
window.nextStep = nextStep;
window.prevStep = prevStep;
window.downloadReport = downloadReport;
window.generateCaptcha = generateCaptcha;

/* ================================
   INITIALIZATION
   ================================ */

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}