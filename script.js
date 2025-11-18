const routes = {
  '#intro': 'intro',
  '#ppt': 'IDppt',
  '#planning': 'IDplanning',
  '#contact': 'IDpv'
};

const sections = document.querySelectorAll('.content');
const navLinks = document.querySelectorAll('nav a');

function activateSection(targetId) {
  sections.forEach(section => {
    section.classList.remove('active');
    if (section.id === targetId) section.classList.add('active');
  });
}

function navigate(path) {
  if (!path || path === '/' || path === '') path = '/intro';
  const routeId = routes[path] || routes['/intro'];
  document.querySelectorAll('.content').forEach(section => {
    section.classList.remove('active');
  });
  const targetSection = document.getElementById(routeId);
  if (targetSection) targetSection.classList.add('active');
  if (window.location.pathname !== path) {
    history.pushState({}, '', path);
  }
}

// 네비게이션 클릭 이벤트
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const path = link.getAttribute('href');
    navigate(path);
  });
});

// 브라우저 뒤로가기/앞으로가기 이벤트 처리
window.addEventListener('popstate', () => {
  navigate(window.location.pathname);
});

// 페이지 로드 시 초기 라우팅
window.addEventListener('load', () => {
  if (sessionStorage.redirect) {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    history.replaceState(null, null, redirect);
  }
  navigate(window.location.pathname);
});





// --- 슬라이더 관련 변수 및 함수 ---
const sliderContainer = document.querySelector('.slider-container');
const sliderWrapper = document.querySelector('.slider-wrapper');
const images = document.querySelectorAll('.slider-wrapper img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;
const imageCount = images.length;
const slideWidthPercentage = 100 / imageCount;
const slideIntervalTime = 3000;
let autoSlideInterval;

function goToSlide(index) {
  if (index < 0) currentIndex = imageCount - 1;
  else if (index >= imageCount) currentIndex = 0;
  else currentIndex = index;
  sliderWrapper.style.transform = `translateX(-${currentIndex * slideWidthPercentage}%)`;
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// 슬라이더 이벤트 등록
nextButton.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
});
prevButton.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
});
sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

// 슬라이더 자동 시작
startAutoSlide();
