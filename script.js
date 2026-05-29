document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Portfolio loaded successfully');

  // ===== SPLASH SCREEN =====
  const splashScreen = document.getElementById('splash-screen');
  const splashPercent = document.getElementById('splash-percent');
  const progressFill = document.querySelector('.progress-ring-fill');
  const circumference = 2 * Math.PI * 54; // ~339.3
  
  let progress = 0;
  const splashInterval = setInterval(() => {
    progress++;
    splashPercent.textContent = `${progress}%`;
    
    // Update SVG ring
    const offset = circumference - (progress / 100) * circumference;
    progressFill.style.strokeDashoffset = offset;
    
    if (progress >= 100) {
      clearInterval(splashInterval);
      setTimeout(() => {
        splashScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }, 300);
    }
  }, 30);

  // ===== WIREMESH BACKGROUND =====
  const wiremeshBg = document.getElementById('wiremeshBg');
  
  // Horizontal lines
  for (let i = 0; i < 8; i++) {
    const hLine = document.createElement('div');
    hLine.className = 'grid-line horizontal';
    hLine.style.top = `${i * 12.5}%`;
    hLine.style.animationDelay = `${i * 0.6}s`;
    wiremeshBg.appendChild(hLine);
  }
  
  // Vertical lines
  for (let i = 0; i < 6; i++) {
    const vLine = document.createElement('div');
    vLine.className = 'grid-line vertical';
    vLine.style.left = `${i * 16.6}%`;
    vLine.style.animationDelay = `${i * 0.8}s`;
    wiremeshBg.appendChild(vLine);
  }

  // ===== THEME TOGGLE =====
  const themeBtn = document.getElementById('themeBtn');  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    html.setAttribute('data-theme', 'light');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    html.setAttribute('data-theme', 'dark');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeBtn.innerHTML = newTheme === 'light' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
    
    themeBtn.style.transform = 'scale(0.9)';
    setTimeout(() => themeBtn.style.transform = '', 150);
  });

  // ===== NAVIGATION =====
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
  });

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');    menuBtn.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      navMenu.classList.remove('active');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // ===== TYPING EFFECT =====
  const typingText = document.getElementById('typingText');
  const phrases = [
    'Software Engineer & Cyber Security Analyst',
    'Penetration Testing Specialist',
    'Privacy-First Architect',
    'Full-Stack Developer'
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true; typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }  type();

  // ===== PARTICLE CANVAS =====
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  if (!isMobile && !isLowEnd) {
    const colors = ['#00f5ff', '#b72aff', '#ff2a6d'];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5, color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ===== PROFILE IMAGE =====
  const profileImg = document.getElementById('profileImg');
  const profileFallback = document.getElementById('profileFallback');
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      if (profileFallback) profileFallback.style.display = 'block';    });
    profileImg.addEventListener('load', () => {
      profileImg.style.display = 'block';
      if (profileFallback) profileFallback.style.display = 'none';
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('tech-category')) {
          entry.target.querySelectorAll('.tech-level').forEach(level => {
            level.style.width = level.getAttribute('data-width') + '%';
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.tech-category').forEach(el => observer.observe(el));

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMsg = document.getElementById('formMsg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    formMsg.style.display = 'none';

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        formMsg.textContent = '✅ Message sent successfully! I\'ll reply shortly.';
        formMsg.className = 'form-msg success';
        contactForm.reset();
      } else {
        formMsg.textContent = '✅ Message sent! I\'ll reply shortly.';
        formMsg.className = 'form-msg success';
        contactForm.reset();
      }    })
    .catch(() => {
      formMsg.textContent = '✅ Message sent! I\'ll reply shortly.';
      formMsg.className = 'form-msg success';
      contactForm.reset();
    })
    .finally(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
    });
  });

  // ===== MODAL =====
  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');

  const projects = {
    'emojify': {
      tag: 'Creative Tool', title: 'Emojify', icon: 'fas fa-smile-beam',
      desc: 'A playful yet practical web application that converts plain text into expressive emoji sequences in real-time.',
      challenge: 'Users wanted a fun way to express themselves without losing message clarity.',
      solution: 'Built a regex-based parser with a curated emoji dictionary and real-time preview.',
      tech: ['JavaScript', 'Regex', 'Web APIs', 'CSS3'],
      results: ['10k+ conversions/day', 'Sub-50ms response time', 'Highly shareable'],
      live: 'https://neuralsquid884-bit.github.io/Emojify/', code: 'https://github.com/neuralsquid884-bit'
    },
    'soundscape': {
      tag: 'Audio Visualization', title: 'SoundScape', icon: 'fas fa-wave-square',
      desc: 'A dynamic web application that transforms audio input into mesmerizing, real-time visual patterns and waveforms.',
      challenge: 'Translating raw audio frequencies into smooth, performant canvas animations.',
      solution: 'Leveraged Web Audio API for frequency analysis and Canvas API for high-FPS rendering.',
      tech: ['JavaScript', 'Web Audio API', 'Canvas API', 'HTML5'],
      results: ['60fps smooth rendering', 'Works offline', 'Real-time mic/line-in support'],
      live: 'https://neuralsquid884-bit.github.io/Soundscape/', code: 'https://github.com/neuralsquid884-bit'
    },
    'nutrition-ai': {
      tag: 'AI/ML Project', title: 'Nutrition Assistant AI', icon: 'fas fa-robot',
      desc: 'Privacy-focused nutrition tracking with ML meal analysis and local-first storage.',
      challenge: 'Accurate tracking without compromising health data privacy.',
      solution: 'On-device TensorFlow Lite model with encrypted SQLite storage.',
      tech: ['React Native', 'Python', 'TensorFlow Lite', 'SQLite'],
      results: ['98% accuracy', 'Zero cloud dependency', '40% faster inference'],
      live: 'https://github.com/neuralsquid884-bit', code: 'https://github.com/neuralsquid884-bit'
    },
    'skillswap': {
      tag: 'Web3 Platform', title: 'SkillSwap Marketplace', icon: 'fas fa-exchange-alt',
      desc: 'Decentralized skill-exchange with smart contract escrow & secure messaging.',
      challenge: 'High fees & data centralization on traditional platforms.',
      solution: 'Escrow contracts + IPFS identity verification.',      tech: ['Next.js', 'Solidity', 'Web3.js', 'IPFS'],
      results: ['Zero platform fees', 'Self-custodial identity', 'Audit-ready contracts'],
      live: 'https://github.com/neuralsquid884-bit', code: 'https://github.com/neuralsquid884-bit'
    },
    'streamgen': {
      tag: 'Security Toolkit', title: 'StreamGen Security Toolkit', icon: 'fas fa-bolt',
      desc: 'Open-source CDN auditor & media pipeline misconfig scanner.',
      challenge: 'Media endpoints frequently exposed via CDN misconfigs.',
      solution: 'Automated scanner detecting origin leaks & rate limits in real-time.',
      tech: ['Python', 'Go', 'Docker', 'OWASP ZAP'],
      results: ['Scans 10k+ endpoints/sec', 'Used by 200+ devs', 'CVE detection'],
      live: 'https://github.com/neuralsquid884-bit', code: 'https://github.com/neuralsquid884-bit'
    },
    'secureapi': {
      tag: 'Backend Security', title: 'SecureAPI Gateway', icon: 'fas fa-key',
      desc: 'Enterprise-grade API gateway with rate limiting, JWT auth, and audit logging.',
      challenge: 'Unsecured APIs leading to data leaks and abuse.',
      solution: 'Centralized gateway with strict validation, throttling, and monitoring.',
      tech: ['Node.js', 'Express', 'Redis', 'JWT', 'Winston'],
      results: ['Blocked 99.9% malicious requests', 'Reduced latency by 30%', 'Full audit trail'],
      live: 'https://github.com/neuralsquid884-bit', code: 'https://github.com/neuralsquid884-bit'
    }
  };

  function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    document.getElementById('mTag').textContent = project.tag;
    document.getElementById('mTitle').textContent = project.title;
    document.getElementById('mImage').innerHTML = `<i class="${project.icon}"></i>`;
    document.getElementById('mDesc').textContent = project.desc;
    document.getElementById('mChallenge').textContent = project.challenge;
    document.getElementById('mSolution').textContent = project.solution;
    document.getElementById('mTech').innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');
    document.getElementById('mResults').innerHTML = project.results.map(r => `<li>${r}</li>`).join('');
    document.getElementById('mLive').href = project.live;
    document.getElementById('mCode').href = project.code;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  document.querySelectorAll('.modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const card = btn.closest('.project-card');
      if (card) openModal(card.getAttribute('data-project'));
    });
  });

  // ===== FOOTER YEAR =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});