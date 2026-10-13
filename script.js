/* ==========================================================================
   sun 개인 포트폴리오 - script.js (순수 바닐라 자바스크립트)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initActiveNavLinkOnScroll();
});

/* --------------------------------------------------
   1. 다크 모드 관리 (Theme Management)
   -------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // 브라우저 저장소(localStorage)에서 기존 테마 확인, 없으면 기본값 'light'
  const savedTheme = localStorage.getItem('sun_portfolio_theme') || 'light';
  
  // 테마 적용
  applyTheme(savedTheme, themeIcon);

  // 버튼 클릭 시 테마 전환
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      applyTheme(newTheme, themeIcon);
      localStorage.setItem('sun_portfolio_theme', newTheme);
    });
  }
}

function applyTheme(theme, iconEl) {
  document.documentElement.setAttribute('data-theme', theme);
  if (iconEl) {
    // 라이트 모드일 때는 다크 모드로 바꿀 수 있도록 달(🌙) 아이콘, 다크 모드일 때는 해(☀️) 아이콘
    iconEl.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* --------------------------------------------------
   2. 모바일 네비게이션 메뉴 (Mobile Menu)
   -------------------------------------------------- */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileMenuBtn || !nav) return;

  // 햄버거 버튼 클릭 토글
  mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // 메뉴 항목 클릭 시 메뉴 자동 닫기
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
}

/* --------------------------------------------------
   3. 스크롤 위치에 따른 메뉴 하이라이트 (Scroll Spy)
   -------------------------------------------------- */
function initActiveNavLinkOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------
   4. 이메일 클립보드 복사 함수 (비전공자도 쉽게 수정 가능)
   -------------------------------------------------- */
function copyEmail() {
  // 실제 사용하시는 본인 이메일로 아래 문자열을 변경하시면 됩니다.
  const email = "your-email@example.com";
  const btn = document.getElementById('copyEmailBtn');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showCopiedFeedback(btn);
    }).catch(err => {
      fallbackCopyText(email, btn);
    });
  } else {
    fallbackCopyText(email, btn);
  }
}

function fallbackCopyText(text, btn) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showCopiedFeedback(btn);
  } catch (err) {
    alert("이메일 주소: " + text);
  }
  document.body.removeChild(tempInput);
}

function showCopiedFeedback(btn) {
  if (!btn) return;
  const originalText = btn.textContent;
  btn.textContent = "복사되었습니다! ✓";
  btn.style.backgroundColor = "var(--color-primary-hover)";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.backgroundColor = "";
  }, 2000);
}
