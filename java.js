// Loader
window.addEventListener('load', function() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

// Typewriter Effect
const words = ["TRANSFORM", "BUILD", "BECOME STRONGER"];
let i = 0, j = 0, isDeleting = false;
function type() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  let current = words[i];
  el.textContent = current.substring(0, j);
  if (!isDeleting) {
    j++;
    if (j > current.length) { isDeleting = true; setTimeout(type, 2000); return; }
  } else {
    j--;
    if (j < 0) { isDeleting = false; i = (i + 1) % words.length; }
  }
  setTimeout(type, isDeleting? 50 : 100);
}
type();

// Theme Toggle
document.getElementById('themeToggle')?.addEventListener('click', function() {
  const html = document.documentElement;
  const current = html.getAttribute('data-bs-theme');
  html.setAttribute('data-bs-theme', current === 'dark'? 'light' : 'dark');
  this.classList.toggle('bi-moon-fill');
  this.classList.toggle('bi-sun-fill');
});

// Color Changer
document.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', function() {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    this.classList.add('active');
    document.documentElement.style.setProperty('--neon', this.dataset.color);
  });
});

// BMI Calculator
function calcBMI() {
  const h = document.getElementById('height').value / 100;
  const w = document.getElementById('weight').value;
  const result = document.getElementById('bmiResult');
  if (h && w) {
    const bmi = (w / (h * h)).toFixed(1);
    let status = bmi < 18.5? 'Underweight' : bmi < 25? 'Normal' : bmi < 30? 'Overweight' : 'Obese';
    result.innerHTML = `<h4>Your BMI: ${bmi}</h4><p class="text-muted">${status}</p>`;
  }
}

// Back to Top
const backTop = document.getElementById('backTop');
window.onscroll = function() {
  backTop.style.display = window.scrollY > 300? 'block' : 'none';
};
backTop.onclick = function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
};

// Login System
let loggedIn = localStorage.getItem('loggedIn') === 'true';
function updateAuth() {
  document.getElementById('loginBtn')?.classList.toggle('d-none', loggedIn);
  document.getElementById('logoutBtn')?.classList.toggle('d-none',!loggedIn);
}
updateAuth();

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  localStorage.setItem('loggedIn', 'true');
  loggedIn = true;
  updateAuth();
  bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
  alert('Logged in successfully!');
});

document.getElementById('logoutBtn')?.addEventListener('click', function() {
  localStorage.removeItem('loggedIn');
  loggedIn = false;
  updateAuth();
  alert('Logged out');
});

// Join Form
document.getElementById('joinForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  this.classList.add('d-none');
  document.getElementById('successMsg').classList.remove('d-none');
  setTimeout(() => {
    this.reset();
    this.classList.remove('d-none');
    document.getElementById('successMsg').classList.add('d-none');
    bootstrap.Modal.getInstance(document.getElementById('joinModal')).hide();
  }, 2000);
});

// Trainer Booking
document.querySelectorAll('.book-trainer').forEach(btn => {
  btn.addEventListener('click', function() {
    document.getElementById('trainerModalTitle').textContent = `Book ${this.dataset.trainer}`;
    document.getElementById('trainerSpecialty').value = this.dataset.specialty;
    new bootstrap.Modal(document.getElementById('trainerModal')).show();
  });
});

document.getElementById('trainerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  this.classList.add('d-none');
  document.getElementById('trainerSuccess').classList.remove('d-none');
  setTimeout(() => {
    this.reset();
    this.classList.remove('d-none');
    document.getElementById('trainerSuccess').classList.add('d-none');
    bootstrap.Modal.getInstance(document.getElementById('trainerModal')).hide();
  }, 2000);
});

// Class Details Modal
const classData = {
  'Power Lifting': {
    gallery: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600'],
    testimonials: ['"Went from 60kg to 140kg squat!" - Thabo', '"Form correction changed everything" - Linda', '"Hit 100kg bench press" - Sipho']
  },
  'Vinyasa Flow': {
    gallery: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600', 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600'],
    testimonials: ['"Flexibility improved 80%" - Nomsa', '"Best yoga instructor" - James', '"Morning flow is therapy" - Aisha']
  },
  'HIIT Blast': {
    gallery: ['https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600', 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600'],
    testimonials: ['"-15kg in 3 months!" - Latoya', '"30min = 2hr results" - Jimmy', '"Coach pushes your limits" - Zanele']
  }
};

document.querySelectorAll('.class-card-click').forEach(card => {
  card.addEventListener('click', function() {
    const className = this.dataset.class;
    const data = classData[className];
    document.getElementById('classModalTitle').textContent = className;
    document.getElementById('modalBookBtn').dataset.class = className;

    const gallery = document.getElementById('classGallery');
    gallery.innerHTML = data.gallery.map(img =>
      `<div class="col-4"><img src="${img}" class="w-100 rounded" style="height:120px; object-fit:cover"></div>`
    ).join('');

    const testimonials = document.getElementById('classTestimonials');
    testimonials.innerHTML = data.testimonials.map(t =>
      `<div class="glass-card p-3 mb-2"><small>${t}</small></div>`
    ).join('');

    new bootstrap.Modal(document.getElementById('classDetailModal')).show();
  });
});

document.querySelectorAll('.book-class').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const className = this.dataset.class;
    document.getElementById('joinPlan').value = 'Pro';
    new bootstrap.Modal(document.getElementById('joinModal')).show();
  });
});