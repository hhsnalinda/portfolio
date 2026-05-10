const logo = document.getElementById('dynamic-logo');
const mobileMenu = document.getElementById('mobile-menu');
const menuLinks = document.querySelectorAll('.menu-link');
let isMenuOpen = false;

// 1. Listen for scrolling
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        if (window.scrollY > 50) {
            if (!isMenuOpen) logo.innerHTML = '<i class="fa fa-chevron-circle-down"></i> Menu';
        } else {
            if (!isMenuOpen) logo.innerHTML = 'hhsNalinda';
        }
    }
});

// 2. Listen for clicks on the Logo/Menu button
if (logo) {
    logo.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); 
            
            // 🔴 THE MAGIC FIX: This stops the click from triggering the "Close" bug!
            e.stopPropagation(); 
            
            isMenuOpen = !isMenuOpen;
            

            
            if (isMenuOpen) {
                logo.innerHTML = '<i class="fa fa-chevron-circle-up"></i> Close';  
                mobileMenu.classList.add('active');
            } else {
                // Check where we are on the page to determine what text to show
                logo.innerHTML = window.scrollY > 50 ? '<i class="fa fa-chevron-circle-down"></i> Menu' : 'hhsNalinda';
                mobileMenu.classList.remove('active');
            }
        }
    });
}

// 3. Close (fold) the menu automatically when a link is clicked
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            
            setTimeout(() => {
                logo.innerHTML = window.scrollY > 50 ? '<i class="fa fa-chevron-circle-down"></i> Menu' : 'hhsNalinda';
            }, 100); 
        }
    });
});

// 4. Click Outside to Close Mobile Menu
document.addEventListener('click', (event) => {
    if (window.innerWidth <= 768 && isMenuOpen) {
        const clickedInsideMenu = mobileMenu.contains(event.target);
        
        // Because of stopPropagation above, we only need to check if they clicked the dropdown
        if (!clickedInsideMenu) {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            logo.innerHTML = window.scrollY > 50 ? '<i class="fa fa-chevron-circle-down"></i> Menu' : 'hhsNalinda';
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




// ==========================================
// --- SPLASH SCREEN & GOOGLE SHEETS LOGIC ---
// ==========================================
const splashScreen = document.getElementById('splash-screen');
const mainPortfolio = document.getElementById('main-portfolio');
const splashForm = document.getElementById('contact-form'); 
const splashSubmitBtn = document.getElementById('submit-btn'); 

// 🔴 THE MASTER GOOGLE SCRIPT URL 🔴
const googleScriptURL = 'https://script.google.com/macros/s/AKfycbwNzvPhOCSjK3qeZpwngxilKl3SRoGQGkr0OWjKNkKRAKRggB6d-l4t1Tw79oCWCUcR/exec';

// 1. Handle Splash Screen Submission
if (splashForm) {
    splashForm.addEventListener('submit', e => {
        e.preventDefault();
        
        splashSubmitBtn.innerHTML = 'Connecting...';
        splashSubmitBtn.style.opacity = '0.7';
        splashSubmitBtn.disabled = true;

        // Using URLSearchParams to ensure Google routes to the 'loginrec' tab
        fetch(googleScriptURL, { method: 'POST', body: new URLSearchParams(new FormData(splashForm)) })
            .then(response => {
                splashScreen.classList.add('hidden');
                mainPortfolio.style.display = 'block';
                sessionStorage.setItem('portfolioUnlocked', 'true');
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Connection error. Please try again.");
                splashSubmitBtn.innerHTML = 'Enter Portfolio';
                splashSubmitBtn.style.opacity = '1';
                splashSubmitBtn.disabled = false;
            });
    });
}

// 2. Check if unlocked on refresh
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem('portfolioUnlocked') === 'true') {
        if(splashScreen) splashScreen.style.display = 'none';
        if(mainPortfolio) mainPortfolio.style.display = 'block';
    }
});


// ==========================================
// --- BOTTOM CONTACT AREA LOGIC ---
// ==========================================
const messageForm = document.getElementById('google-contact-form'); 

if(messageForm) {
    const messageSubmitBtn = messageForm.querySelector('.submit-btn'); 
    messageForm.addEventListener('submit', e => {
        e.preventDefault(); 
        messageSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Using URLSearchParams to ensure Google routes to the 'msgrec' tab
        fetch(googleScriptURL, { method: 'POST', body: new URLSearchParams(new FormData(messageForm))})
            .then(response => {
                messageSubmitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                messageSubmitBtn.style.backgroundColor = '#25d366'; 
                messageForm.reset(); 
                setTimeout(() => {
                    messageSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    messageSubmitBtn.style.backgroundColor = ''; 
                }, 3000);
            })
            .catch(error => {
                messageSubmitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try Again.';
                console.error('Error!', error.message);
            });
    });
}


// ==========================================
// --- CONTINUOUS INFINITE LOOP CAROUSEL ---
// ==========================================
const certContainer = document.getElementById('cert-container');
const certTrack = document.getElementById('cert-track');
const slideLeftBtn = document.getElementById('slide-left');
const slideRightBtn = document.getElementById('slide-right');

if (certContainer && certTrack) {
    let isInteracting = false;
    let animationFrameId;

    // 1. Clone cards to create the infinite loop illusion
    const originalCards = Array.from(certTrack.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        certTrack.appendChild(clone);
    });

    // 2. The 60fps Continuous Glide Logic
    const startContinuousScroll = () => {
        // TURN OFF CSS smooth scrolling and snapping so the JS glide doesn't stutter
        certContainer.style.scrollBehavior = 'auto';
        certContainer.style.scrollSnapType = 'none';

        const scroll = () => {
            if (!isInteracting) {
                certContainer.scrollLeft += 1; // SPEED: Change to 2 for faster, 0.5 for slower

                // Calculate the exact width of the original set of cards
                const jumpDistance = certTrack.children[originalCards.length].offsetLeft - certTrack.children[0].offsetLeft;

                // If we've scrolled past the original set, instantly and invisibly jump back
                if (certContainer.scrollLeft >= jumpDistance) {
                    certContainer.scrollLeft -= jumpDistance;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(scroll);
    };

    const stopContinuousScroll = () => {
        // TURN ON CSS smooth scrolling and snapping for manual swiping and arrows
        certContainer.style.scrollBehavior = 'smooth';
        certContainer.style.scrollSnapType = 'x mandatory';
        cancelAnimationFrame(animationFrameId);
    };

    // Start the glide immediately (500ms timeout ensures images load so calculations are perfect)
    setTimeout(startContinuousScroll, 500);

    // 3. Manual Arrows Logic
    const getCardWidth = () => certTrack.children[0].offsetWidth + 32; // 32px is the CSS gap

    if (slideLeftBtn) {
        slideLeftBtn.addEventListener('click', () => {
            isInteracting = true;
            stopContinuousScroll();
            certContainer.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
            // Resume glide after the smooth scroll finishes (approx 800ms)
            setTimeout(() => { isInteracting = false; startContinuousScroll(); }, 800);
        });
    }

    if (slideRightBtn) {
        slideRightBtn.addEventListener('click', () => {
            isInteracting = true;
            stopContinuousScroll();
            certContainer.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
            setTimeout(() => { isInteracting = false; startContinuousScroll(); }, 800);
        });
    }

    // 4. Pause Listeners (Hover & Touch)
    certContainer.addEventListener('mouseenter', () => {
        isInteracting = true;
        stopContinuousScroll();
    });
    
    certContainer.addEventListener('mouseleave', () => {
        isInteracting = false;
        startContinuousScroll();
    });

    certContainer.addEventListener('touchstart', () => {
        isInteracting = true;
        stopContinuousScroll();
    });
    
    certContainer.addEventListener('touchend', () => {
        // Delay the restart so the user's manual swipe momentum can finish smoothly
        setTimeout(() => {
            isInteracting = false;
            startContinuousScroll();
        }, 1500); 
    });
}

// ==========================================
// --- PREMIUM SUPER OFFERS CAROUSEL LOGIC ---
// ==========================================
const offerContainer = document.getElementById('offer-container');
const offerTrack = document.getElementById('offer-track');
const offerLeftBtn = document.getElementById('offer-left');
const offerRightBtn = document.getElementById('offer-right');
const offerDotsContainer = document.getElementById('offer-dots');

if (offerContainer && offerTrack && offerDotsContainer) {
    const offerCards = Array.from(offerTrack.children);
    
    // 1. Generate the Pagination Dots dynamically
    offerCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // First dot is active by default
        
        // Allow users to click a dot to instantly slide to that specific card
        dot.addEventListener('click', () => {
            const cardWidth = offerCards[0].offsetWidth + 24; // Width + gap
            offerContainer.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
        });
        
        offerDotsContainer.appendChild(dot);
    });

    const dots = Array.from(offerDotsContainer.children);

    // 2. Update the active dot automatically when swiping/scrolling
    offerContainer.addEventListener('scroll', () => {
        const scrollPos = offerContainer.scrollLeft;
        const cardWidth = offerCards[0].offsetWidth + 24;
        
        // Calculate which card is currently closest to the left edge
        const activeIndex = Math.round(scrollPos / cardWidth);
        
        // Light up the correct dot
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });

    // 3. Arrow Navigation Logic
    const getOfferScrollAmount = () => offerCards[0].offsetWidth + 24;

    if (offerLeftBtn) {
        offerLeftBtn.addEventListener('click', () => {
            offerContainer.scrollBy({ left: -getOfferScrollAmount(), behavior: 'smooth' });
        });
    }

    if (offerRightBtn) {
        offerRightBtn.addEventListener('click', () => {
            offerContainer.scrollBy({ left: getOfferScrollAmount(), behavior: 'smooth' });
        });
    }
}
