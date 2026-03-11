// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  themeToggle.style.transform = 'scale(1.1)';
  setTimeout(() => {
    themeToggle.style.transform = 'scale(1)';
  }, 200);
});
// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.width = '25px';
  cursor.style.height = '25px';
});

document.addEventListener('mouseup', () => {
  cursor.style.width = '20px';
  cursor.style.height = '20px';
});

// ========== CURSOR TRAIL EFFECT ==========
const trail = document.createElement('div');
trail.className = 'cursor-trail';
document.body.appendChild(trail);

document.addEventListener('mousemove', (e) => {
  trail.style.left = e.pageX - 4 + 'px';
  trail.style.top = e.pageY - 4 + 'px';
});

document.addEventListener('mouseleave', () => {
  trail.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  trail.style.opacity = '0.6';
});

// ========== SCROLL EFFECT FOR PROFILE PHOTO ==========
const movingProfile = document.getElementById('movingProfile');
const hero = document.getElementById('hero');
const about = document.getElementById('about');
const aboutPhotoWrapper = document.querySelector('.about-photo-wrapper');
let heroHeight, aboutTop;

function updateProfilePosition() {
  heroHeight = hero.offsetHeight;
  aboutTop = about.offsetTop;

  const scrollY = window.scrollY;
  const startScroll = 50;
  const endScroll = aboutTop - 300;

  if (scrollY <= startScroll) {
    movingProfile.style.transform = `translate(0, 0) rotate(0deg) scale(1)`;
    movingProfile.style.opacity = '1';
    aboutPhotoWrapper.style.opacity = '0';
    aboutPhotoWrapper.style.transform = 'translateX(-30px)';
  } else if (scrollY >= endScroll) {
    movingProfile.style.opacity = '0';
    aboutPhotoWrapper.style.opacity = '1';
    aboutPhotoWrapper.style.transform = 'translateX(0)';
  } else {
    const progress = (scrollY - startScroll) / (endScroll - startScroll);
    const translateY = progress * (aboutTop - 200);
    const rotate = progress * 720;
    const scale = 1 - progress * 0.5;
    const opacity = 1 - progress;

    movingProfile.style.transform = `translate(20px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`;
    movingProfile.style.opacity = opacity;

    aboutPhotoWrapper.style.opacity = progress;
    aboutPhotoWrapper.style.transform = `translateX(${30 * (1 - progress)}px)`;
  }
}

window.addEventListener('scroll', updateProfilePosition);
window.addEventListener('resize', updateProfilePosition);

// ========== INTERSECTION OBSERVER FOR SECTION FADE (LOWER THRESHOLD FOR MOBILE) ==========
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -10px 0px' }); // <-- changed to 0.1
sections.forEach(section => observer.observe(section));

// ========== STAGGER SKILL CARDS ==========
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.03}s`;
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

