// ===== WANDOC Main JS =====

// Products data
const products = [
  {
    id: 1, name: 'Rose Hip Serum', brand: 'Wandoc', price: 2490, oldPrice: 3200,
    rating: 4.9, reviews: 312, badge: 'Хит', badgeClass: 'powder',
    bg: 'linear-gradient(135deg,#f4e8e8,#d8b7b3)',
    emoji: '🌹',
  },
  {
    id: 2, name: 'Aloe Vera Shampoo', brand: 'Wandoc', price: 3190, oldPrice: null,
    rating: 4.8, reviews: 207, badge: 'New', badgeClass: 'green',
    bg: 'linear-gradient(135deg,#e4f0e2,#b7c9b2)',
    emoji: '🌿',
  },
  {
    id: 3, name: 'Milk Body Lotion', brand: 'Wandoc', price: 1890, oldPrice: 2400,
    rating: 4.7, reviews: 188, badge: '-20%', badgeClass: '',
    bg: 'linear-gradient(135deg,#f6f4f1,#e8ddd4)',
    emoji: '🥛',
  },
  {
    id: 4, name: 'Vitamin C Cream', brand: 'Wandoc', price: 4290, oldPrice: null,
    rating: 5.0, reviews: 94, badge: 'Premium', badgeClass: 'green',
    bg: 'linear-gradient(135deg,#fff4e2,#f5d8a0)',
    emoji: '🍊',
  },
  {
    id: 5, name: 'Hydra Clay Mask', brand: 'Wandoc', price: 2190, oldPrice: 2700,
    rating: 4.6, reviews: 145, badge: '-18%', badgeClass: '',
    bg: 'linear-gradient(135deg,#e8edf4,#b8c4d8)',
    emoji: '💎',
  },
  {
    id: 6, name: 'Lavender Body Oil', brand: 'Wandoc', price: 3490, oldPrice: null,
    rating: 4.9, reviews: 231, badge: 'Хит', badgeClass: 'powder',
    bg: 'linear-gradient(135deg,#f0e8f4,#c8b0d8)',
    emoji: '💜',
  },
  {
    id: 7, name: 'Green Tea Toner', brand: 'Wandoc', price: 1690, oldPrice: null,
    rating: 4.7, reviews: 178, badge: 'New', badgeClass: 'green',
    bg: 'linear-gradient(135deg,#e8f4ea,#9ec4a4)',
    emoji: '🍵',
  },
  {
    id: 8, name: 'Keratin Conditioner', brand: 'Wandoc', price: 2890, oldPrice: 3500,
    rating: 4.8, reviews: 256, badge: '-17%', badgeClass: '',
    bg: 'linear-gradient(135deg,#f4f0e8,#d4c4a8)',
    emoji: '✨',
  },
];

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="pc-img">
        <div class="pc-img-inner" style="background:${p.bg}; font-size:64px; line-height:1;">
          ${p.emoji}
        </div>
        ${p.badge ? `<span class="pc-badge ${p.badgeClass}">${p.badge}</span>` : ''}
        <button class="pc-fav" onclick="toggleFav(${p.id}, this)" title="В избранное">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="pc-info">
        <p class="pc-brand">${p.brand}</p>
        <h3 class="pc-name">${p.name}</h3>
        <div class="pc-rating">
          <span class="pc-stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '☆' : ''}</span>
          <span class="pc-count">(${p.reviews})</span>
        </div>
        <div class="pc-bottom">
          <div>
            <span class="pc-price">${p.price.toLocaleString('ru')} ₸</span>
            ${p.oldPrice ? `<span class="pc-old">${p.oldPrice.toLocaleString('ru')} ₸</span>` : ''}
          </div>
          <button class="pc-cart-btn" onclick="addToCart(${p.id})" title="В корзину">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Init scroll reveal for newly added cards
  initReveal();
}

// ===== CART =====
let cartCount = 3;

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

// cart-btn on index.html now has onclick=toggleCart() inline

function addToCart(id) {
  cartCount++;
  const countEl = document.querySelector('.cart-count');
  const csCount = document.querySelector('.cs-count');
  if (countEl) {
    countEl.textContent = cartCount;
    countEl.style.transform = 'scale(1.4)';
    setTimeout(() => countEl.style.transform = '', 200);
  }
  if (csCount) csCount.textContent = cartCount;

  // Toast
  showToast('Товар добавлен в корзину 🛍️');
}

function toggleFav(id, btn) {
  btn.classList.toggle('active');
  const isFav = btn.classList.contains('active');
  btn.style.color = isFav ? '#e05a5a' : '';
  btn.querySelector('path').setAttribute('fill', isFav ? '#e05a5a' : 'none');
  showToast(isFav ? 'Добавлено в избранное ❤️' : 'Удалено из избранного');
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:28px; left:50%; transform:translateX(-50%) translateY(20px);
      background:#1f1f1f; color:#fff; padding:12px 24px; border-radius:100px;
      font-family:'Poppins',sans-serif; font-size:13px; font-weight:500;
      z-index:1000; opacity:0; transition:.3s ease; white-space:nowrap;
      box-shadow:0 8px 32px rgba(0,0,0,.25);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2500);
}

// ===== PROMO COPY =====
function copyPromo() {
  navigator.clipboard.writeText('HAIR25').catch(() => {});
  showToast('Промокод HAIR25 скопирован! ✓');
  const btn = document.querySelector('.copy-btn');
  if (btn) { btn.textContent = 'Скопировано ✓'; setTimeout(() => btn.textContent = 'Скопировать', 2000); }
}

// ===== TIMER =====
function startTimer() {
  let total = 8 * 3600 + 42 * 60 + 17;
  const update = () => {
    if (total <= 0) return;
    total--;
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    const th = document.getElementById('t-h');
    const tm = document.getElementById('t-m');
    const ts = document.getElementById('t-s');
    if (th) th.textContent = h;
    if (tm) tm.textContent = m;
    if (ts) ts.textContent = s;
  };
  setInterval(update, 1000);
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 24px rgba(31,31,31,.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
});

// Add reveal class to sections
function addRevealClasses() {
  const selectors = ['.cat-card', '.review-card', '.brand-item', '.section-header'];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  startTimer();
  addRevealClasses();
  initReveal();
});
