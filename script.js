/**
 * Hitesh Mahajan Portfolio - JavaScript
 * Features:
 * 1. Resume Configuration & "Coming Soon" Modal
 * 2. "Ask Hitesh" Floating Interactive Chatbot
 * 3. Dynamic typing effect (Role rotator)
 * 4. Mobile navigation toggle & accessible state
 * 5. Sticky navbar shadow on scroll
 * 6. Active section link highlighting (IntersectionObserver)
 * 7. Scroll-to-top button visibility and action
 * 8. Dynamic copyright year in footer
 */

// ==========================================================================
// RESUME CONFIGURATION
// Once you upload your resume PDF to assets/hitesh-mahajan-resume.pdf:
// Simply change `isAvailable: false` to `isAvailable: true` below!
// ==========================================================================
const RESUME_CONFIG = {
  isAvailable: false, // Set to true once your resume PDF is uploaded!
  pdfPath: 'assets/hitesh-mahajan-resume.pdf',
  downloadFileName: 'Hitesh-Mahajan-Resume.pdf'
};

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Dynamic Copyright Year
  // ------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // ------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. Sticky Navbar Shadow & Scroll-To-Top Button Visibility
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar shadow
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll to top button
    if (scrollToTopBtn) {
      if (scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Typing Animation Effect for Roles
  // ------------------------------------------------------------------------
  const typewriterElement = document.getElementById('role-typewriter');
  const roles = [
    'Aspiring Software Developer',
    'Java Learner',
    'Web Development Enthusiast'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typewriterElement && !prefersReducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;
    let typingSpeed = 100;

    const type = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2200;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 2000);
  }

  // ------------------------------------------------------------------------
  // 5. Active Link Highlight on Scroll using IntersectionObserver
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ------------------------------------------------------------------------
  // 6. Resume Button & "Coming Soon" Modal
  // ------------------------------------------------------------------------
  const resumeBtn = document.getElementById('resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const resumeModalDismiss = document.getElementById('resume-modal-dismiss');

  const openResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (resumeModalClose) resumeModalClose.focus();
    }
  };

  const closeResumeModal = () => {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (resumeBtn) resumeBtn.focus();
    }
  };

  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Check if resume file is ready
      if (RESUME_CONFIG.isAvailable) {
        // Trigger download of real PDF
        const link = document.createElement('a');
        link.href = RESUME_CONFIG.pdfPath;
        link.download = RESUME_CONFIG.downloadFileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Display Coming Soon Modal
        openResumeModal();
      }
    });
  }

  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);
  if (resumeModalDismiss) resumeModalDismiss.addEventListener('click', closeResumeModal);

  // Close modal when clicking on backdrop overlay
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResumeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 7. "Ask Hitesh" Floating Chatbot
  // ------------------------------------------------------------------------
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotPanel = document.getElementById('chatbot-panel');
  const chatbotPanelClose = document.getElementById('chatbot-panel-close');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const suggestionPills = document.querySelectorAll('.suggestion-pill');

  let hasSentWelcome = false;

  // Toggle Chatbot Panel
  const toggleChatbot = () => {
    if (!chatbotPanel || !chatbotToggleBtn) return;
    const isOpen = chatbotPanel.classList.contains('open');

    if (isOpen) {
      chatbotPanel.classList.remove('open');
      chatbotToggleBtn.classList.remove('open');
      chatbotPanel.setAttribute('aria-hidden', 'true');
      chatbotToggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      chatbotPanel.classList.add('open');
      chatbotToggleBtn.classList.add('open');
      chatbotPanel.setAttribute('aria-hidden', 'false');
      chatbotToggleBtn.setAttribute('aria-expanded', 'true');

      if (!hasSentWelcome) {
        renderWelcomeMessage();
        hasSentWelcome = true;
      }

      setTimeout(() => {
        if (chatbotInput) chatbotInput.focus();
      }, 200);
    }
  };

  if (chatbotToggleBtn) chatbotToggleBtn.addEventListener('click', toggleChatbot);
  if (chatbotPanelClose) chatbotPanelClose.addEventListener('click', toggleChatbot);

  // Helper: Append a message bubble to the chat
  const appendMessage = (text, sender = 'bot', isHtml = false) => {
    if (!chatbotMessages) return;

    const row = document.createElement('div');
    row.className = `chat-bubble-row ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';

    if (isHtml) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }

    const time = document.createElement('span');
    time.className = 'chat-time';
    const now = new Date();
    time.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    row.appendChild(bubble);
    row.appendChild(time);
    chatbotMessages.appendChild(row);

    // Scroll chat to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  // Helper: Show typing indicator
  const showTypingIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatbotMessages.appendChild(indicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return indicator;
  };

  const removeTypingIndicator = () => {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  };

  // Welcome Message
  const renderWelcomeMessage = () => {
    appendMessage("Hi there! 👋 I'm Hitesh's virtual portfolio assistant. Feel free to ask me anything about his education, skills, projects, programming journey, or how to get in touch!");
  };

  // Knowledge Base & Intent Matching
  const getBotResponse = (question) => {
    const q = question.toLowerCase().trim();

    // 1. Who is Hitesh? / Bio
    if (
      q.includes('who is hitesh') || 
      q.includes('who are you') || 
      q.includes('about hitesh') || 
      q.includes('introduce') || 
      q.includes('background') ||
      q.includes('bio')
    ) {
      return "Hitesh Mahajan is a second-year Information Technology student at R.C. Patel Institute of Technology, Shirpur. He is an aspiring software developer passionate about programming, web development, and solving practical real-world problems.";
    }

    // 2. Education / Studying
    if (
      q.includes('studying') || 
      q.includes('college') || 
      q.includes('education') || 
      q.includes('degree') || 
      q.includes('institute') || 
      q.includes('r.c. patel') || 
      q.includes('branch') || 
      q.includes('year')
    ) {
      return "Hitesh is currently enrolled in his <strong>Second Year</strong> of Information Technology at <strong>R.C. Patel Institute of Technology, Shirpur</strong> (Maharashtra, India).";
    }

    // 3. Skills
    if (
      q.includes('skill') || 
      q.includes('what can he do') || 
      q.includes('technolog') || 
      q.includes('stack') ||
      q.includes('know')
    ) {
      return "Hitesh's current skillset includes:<br>• <strong>Frontend:</strong> HTML5 &amp; CSS3<br>• <strong>Programming Languages:</strong> Java (Currently Learning), C (Practicing)<br>• <strong>Tools:</strong> GitHub, CodeChef, LaTeX for documentation<br>• <strong>Focus Areas:</strong> Web Development, Data Structures &amp; Algorithms, and Problem-Solving.";
    }

    // 4. Projects
    if (
      q.includes('project') || 
      q.includes('work') || 
      q.includes('certify') || 
      q.includes('event') || 
      q.includes('built')
    ) {
      return "Hitesh has 3 featured academic & practice projects:<br>1. <strong>Smart Event Certificate Generator &amp; Verification Portal</strong> (Automated certificate creation &amp; QR verification)<br>2. <strong>Certify-Me</strong> (Certificate generation workflows on GitHub)<br>3. <strong>Events and Web Program</strong> (Web programming exercises &amp; foundational code)<br>Explore them in the Projects section above!";
    }

    // 5. Programming Languages Learning
    if (
      q.includes('language') || 
      q.includes('java') || 
      q.includes('learning') || 
      q.includes('c language') ||
      q.includes('programming')
    ) {
      return "Hitesh is actively learning <strong>Java</strong> and practicing <strong>C</strong> programming for problem solving and data structures. He also builds web pages using <strong>HTML</strong> and <strong>CSS</strong>.";
    }

    // 6. Contact & Email
    if (
      q.includes('contact') || 
      q.includes('email') || 
      q.includes('reach') || 
      q.includes('hire') || 
      q.includes('message') || 
      q.includes('connect')
    ) {
      return "You can reach Hitesh directly via email at <a href='mailto:mahajanhitesh225@gmail.com'>mahajanhitesh225@gmail.com</a>, or send him a message through his LinkedIn profile!";
    }

    // 7. GitHub & CodeChef Profiles
    if (
      q.includes('github') || 
      q.includes('codechef') || 
      q.includes('linkedin') || 
      q.includes('profile') || 
      q.includes('social') || 
      q.includes('handle') || 
      q.includes('links')
    ) {
      return "Here are Hitesh's official profiles:<br>• <a href='https://github.com/hiteshmahajan2008-hdm' target='_blank' rel='noopener noreferrer'>GitHub Profile</a><br>• <a href='https://www.linkedin.com/in/hitesh-mahajan-477370443/' target='_blank' rel='noopener noreferrer'>LinkedIn Profile</a><br>• <a href='https://www.codechef.com/users/rcpit251109084' target='_blank' rel='noopener noreferrer'>CodeChef Profile</a>";
    }

    // 8. Location
    if (q.includes('location') || q.includes('where') || q.includes('shirpur')) {
      return "Hitesh is based in <strong>Shirpur, Maharashtra, India</strong>.";
    }

    // 9. Friendly Fallback
    return "I don't have an exact answer for that yet, but you can connect with Hitesh directly at <a href='mailto:mahajanhitesh225@gmail.com'>mahajanhitesh225@gmail.com</a> or via LinkedIn. Feel free to try one of the suggested questions above!";
  };

  // Handle Question Submission
  const handleUserQuestion = (questionText) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    // 1. Append User Message
    appendMessage(trimmed, 'user');
    if (chatbotInput) chatbotInput.value = '';

    // 2. Show Typing Indicator
    showTypingIndicator();

    // 3. Simulate natural brief typing delay
    setTimeout(() => {
      removeTypingIndicator();
      const botReply = getBotResponse(trimmed);
      appendMessage(botReply, 'bot', true);
    }, 450);
  };

  // Form Submission
  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (chatbotInput) {
        handleUserQuestion(chatbotInput.value);
      }
    });
  }

  // Suggestion Pills Click
  suggestionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const question = pill.getAttribute('data-question');
      if (question) {
        handleUserQuestion(question);
      }
    });
  });

});
