const logo = document.getElementById('dynamic-logo');
const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelectorAll('.menu-link');
let isMenuOpen = false;

// Listen for scrolling
window.addEventListener('scroll', () => {
    // Only apply this logic on mobile screens
    if (window.innerWidth <= 768) {
        if (window.scrollY > 50) {
            // Scrolled down: Change text to Menu icon
            if (!isMenuOpen) {
                logo.innerHTML = '<i class="fas fa-bars"></i> Menu';
            }
        } else {
            // At top: Change back to Name and close menu
            logo.innerHTML = 'hhsNalinda';
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
        }
    }
});

// Listen for clicks on the Logo/Menu button
logo.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && window.scrollY > 50) {
        e.preventDefault(); // Stop it from jumping to the top immediately
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            logo.innerHTML = '<i class="fas fa-times"></i> Close';
            mobileMenu.classList.add('active');
        } else {
            logo.innerHTML = '<i class="fas fa-bars"></i> Menu';
            mobileMenu.classList.remove('active');
        }
    }
});

// Close (fold) the menu automatically when a link is clicked
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            // Fold the menu
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            
            // Reset the header button back to "Menu"
            setTimeout(() => {
                if (window.scrollY > 50) {
                    logo.innerHTML = '<i class="fas fa-bars"></i> Menu';
                }
            }, 100); // Slight delay to ensure scroll starts first
        }
    });
});

// --- Click Outside to Close Mobile Menu ---
document.addEventListener('click', (event) => {
    // Only run this if we are on mobile and the menu is actually open
    if (window.innerWidth <= 768 && isMenuOpen) {
        
        // Check if the user's tap was OUTSIDE the menu and OUTSIDE the logo button
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedOnLogo = logo.contains(event.target);

        if (!clickedInsideMenu && !clickedOnLogo) {
            // Fold the menu
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            
            // Reset the logo text depending on where we are scrolled
            if (window.scrollY > 50) {
                logo.innerHTML = '<i class="fas fa-bars"></i> Menu';
            } else {
                logo.innerHTML = 'hhsNalinda';
            }
        }
    }
});


const textArray = [
    "Insurance Professional.", 
    "Risk Management Specialist.", 
    "Digital Insurance Strategist.",
    "Wealth Security Consultant.",
    "Client Success Partner.",
    "Client Relationship Manager.", 
    "Digital Marketing Enthusiast.", 
    "Corporate Risk Advisor.",
    "Insurance Portfolio Manager.",
    "Policy Structuring Expert.",
    "Claims & Underwriting Specialist.",
    "Insurance Solutions Consultant.",
    "Financial Risk Consultant.",
    "Financial Advisor.",
];
const typingDelay = 30;    // Speed of typing each letter
const erasingDelay = 25;    // Speed of backspacing each letter
const newTextDelay = 1500;  // How long to pause before backspacing

let textArrayIndex = 0;
let charIndex = 0;
const typedTextSpan = document.getElementById("typewriter-text");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        // Word is fully typed, wait and then erase
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        // Word is erased, move to the next word
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

// Start the effect when the page loads
document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay);
});

// --- Go to Top Button Logic ---
const goTopBtn = document.getElementById('go-top-btn');

// Listen for scroll to show/hide the button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        goTopBtn.classList.add('show');
    } else {
        goTopBtn.classList.remove('show');
    }
});

// Scroll back to top smoothly when clicked
goTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- Read More / Show Less Logic ---
const readMoreBtns = document.querySelectorAll('.read-more-btn');

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Find the paragraph exactly above the clicked button
        const description = btn.previousElementSibling;
        
        // Toggle the 'expanded' class on or off
        description.classList.toggle('expanded');
        
        // Change the button text based on the state
        if (description.classList.contains('expanded')) {
            btn.textContent = 'Less';
        } else {
            btn.textContent = 'More';
        }
    });
});



// --- Splash Screen & Google Sheets Logic ---
const splashScreen = document.getElementById('splash-screen');
const mainPortfolio = document.getElementById('main-portfolio');
const splashForm = document.getElementById('contact-form'); // Renamed variable!
const splashSubmitBtn = document.getElementById('submit-btn'); // Renamed variable!

// YOUR SPLASH SCREEN GOOGLE APP SCRIPT URL
const splashScriptURL = 'https://script.google.com/macros/s/AKfycbyxQYmVhj6or_3Uk9XMd0Z5hrDfNBsLya4cfd64l2JFG-FQRaQpCn5mE5oFDllCAaRz/exec';

if (splashForm) {
    splashForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading state so they don't click twice
        splashSubmitBtn.innerHTML = 'Connecting...';
        splashSubmitBtn.style.opacity = '0.7';
        splashSubmitBtn.disabled = true;

        // Gather form data
        let requestBody = new FormData(splashForm);

        // Send to Google Sheets
        fetch(splashScriptURL, { method: 'POST', body: requestBody })
            .then(response => {
                // Success: Hide splash screen, show portfolio
                splashScreen.classList.add('hidden');
                mainPortfolio.style.display = 'block';
                sessionStorage.setItem('portfolioUnlocked', 'true');
                alert("Welcome to my page!");
            })
            .catch(error => {
                // Failsafe error handling
                console.error('Error!', error.message);
                alert("Connection error. Please try again.");
                splashSubmitBtn.innerHTML = 'Enter Portfolio';
                splashSubmitBtn.style.opacity = '1';
                splashSubmitBtn.disabled = false;
            });
    });
}

// Check if they already filled it out this session
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem('portfolioUnlocked') === 'true') {
        if(splashScreen) splashScreen.style.display = 'none';
        if(mainPortfolio) mainPortfolio.style.display = 'block';
    }
});


// --- Google Sheets Form Submit Logic (Bottom Contact Area) ---
const messageForm = document.getElementById('google-contact-form'); // Renamed variable!

if(messageForm) {
    const messageSubmitBtn = messageForm.querySelector('.submit-btn'); // Renamed variable!
    messageForm.addEventListener('submit', e => {
        e.preventDefault(); // Stop the page from reloading
        messageSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // YOUR CONTACT AREA GOOGLE APP SCRIPT URL
        const messageScriptURL = 'https://script.google.com/macros/s/AKfycbwNzvPhOCSjK3qeZpwngxilKl3SRoGQGkr0OWjKNkKRAKRggB6d-l4t1Tw79oCWCUcR/exec';
        
        fetch(messageScriptURL, { method: 'POST', body: new FormData(messageForm)})
            .then(response => {
                messageSubmitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                messageSubmitBtn.style.backgroundColor = '#25d366'; // Turn green
                messageForm.reset(); // Clear the form
                setTimeout(() => {
                    messageSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    messageSubmitBtn.style.backgroundColor = ''; // Reset color
                }, 3000);
            })
            .catch(error => {
                messageSubmitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try Again.';
                console.error('Error!', error.message);
            });
    });
}

// Check if they already filled it out this session
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem('portfolioUnlocked') === 'true') {
        splashScreen.style.display = 'none';
        mainPortfolio.style.display = 'block';
    }
});




// --- Google Sheets Form Submit Logic ---
const contactForm = document.getElementById('google-contact-form');

if(contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    contactForm.addEventListener('submit', e => {
        e.preventDefault(); // Stop the page from reloading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // PASTE YOUR GOOGLE WEB APP URL HERE
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwNzvPhOCSjK3qeZpwngxilKl3SRoGQGkr0OWjKNkKRAKRggB6d-l4t1Tw79oCWCUcR/exec';
        
        fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
            .then(response => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#25d366'; // Turn green
                contactForm.reset(); // Clear the form
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.style.backgroundColor = ''; // Reset color
                }, 3000);
            })
            .catch(error => {
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try Again.';
                console.error('Error!', error.message);
            });
    });
}
