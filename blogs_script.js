// blogs_script.js
const allBlogs = [
  { title:'The Silence of Artificial Intelligence', category:'technology', img:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80', desc:'Exploring how AI is changing the fabric of human thought.', meta:'Technology / Jan 2025' },
  { title:'Minimalist Travel', category:'lifestyle', img:'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80', desc:'Finding freedom in the essentials while exploring the globe.', meta:'Lifestyle / 5 min read' },
  { title:'The Deep Work Habit', category:'productivity', img:'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80', desc:'Achieving maximum output in a digitally distracted world.', meta:'Productivity / 8 min read' },
  { title:'Designing for Emotion', category:'design', img:'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80', desc:'How thoughtful design can evoke deep emotional responses.', meta:'Design / 6 min read' },
  { title:'The Future of Remote Work', category:'technology', img:'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80', desc:'How technology is reshaping the modern workplace forever.', meta:'Technology / 4 min read' },
  { title:'Slow Living Movement', category:'lifestyle', img:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', desc:'Embracing a more intentional, slower pace of life.', meta:'Lifestyle / 7 min read' },
  { title:'The Art of Typography', category:'design', img:'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80', desc:'Why typography remains the backbone of great design.', meta:'Design / 5 min read' },
  { title:'Cultural Crossroads', category:'culture', img:'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', desc:'Navigating identity in an increasingly globalized world.', meta:'Culture / 9 min read' },
  { title:'Morning Routines of Creatives', category:'productivity', img:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', desc:'How successful artists and thinkers start their day.', meta:'Productivity / 6 min read' },
  { title:'The Rise of Neo-Culture', category:'culture', img:'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80', desc:'A new wave of cultural expression in the digital age.', meta:'Culture / 5 min read' },
  { title:'AI Ethics in Practice', category:'technology', img:'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80', desc:'Practical approaches to ethical AI development.', meta:'Technology / 7 min read' },
  { title:'Urban Gardening Secrets', category:'lifestyle', img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80', desc:'Growing your own food in the heart of the city.', meta:'Lifestyle / 4 min read' }
];
let currentCategory = 'all';
const urlParams = new URLSearchParams(window.location.search);
const initialCat = urlParams.get('category') || 'all';
if (initialCat !== 'all') currentCategory = initialCat;

function renderBlogs(filter='all', searchTerm='') {
  const grid = document.getElementById('blogsGrid');
  let filtered = allBlogs;
  if (filter !== 'all') filtered = filtered.filter(b => b.category === filter);
  if (searchTerm.trim()) { const s = searchTerm.trim().toLowerCase(); filtered = filtered.filter(b => b.title.toLowerCase().includes(s) || b.desc.toLowerCase().includes(s) || b.category.toLowerCase().includes(s)); }
  if (filtered.length === 0) { grid.innerHTML = '<div class="no-results">No journals found. Try a different search or category.</div>'; return; }
  grid.innerHTML = filtered.map((b,i) => `
    <article class="blog-card" style="animation:fadeUp 0.5s ${i*0.06}s cubic-bezier(0.19,1,0.22,1) both;">
      <div class="card-img-wrap"><img src="${b.img}" alt="${b.title}" loading="lazy"></div>
      <div class="card-content">
        <span class="card-meta">${b.meta}</span>
        <h2 class="card-title">${b.title}</h2>
        <p class="card-desc">${b.desc}</p>
        <a href="#" style="color:var(--text-color);font-weight:700;text-decoration:none;font-size:0.8rem;text-transform:uppercase;">Read Journal &rarr;</a>
      </div>
    </article>
  `).join('');
}
function filterBlogs() { renderBlogs(currentCategory, document.getElementById('blogSearch').value); }
function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('#catFilters .cat-pill').forEach(p => p.classList.remove('active'));
  document.querySelector(`#catFilters [data-cat="${cat}"]`).classList.add('active');
  document.getElementById('blogSearch').value = '';
  renderBlogs(cat);
  const url = new URL(window.location); url.searchParams.set('category', cat); window.history.replaceState({}, '', url);
}
document.addEventListener('DOMContentLoaded', () => {
  if (currentCategory !== 'all') { const pill = document.querySelector(`#catFilters [data-cat="${currentCategory}"]`); if (pill) pill.classList.add('active'); renderBlogs(currentCategory); }
  else renderBlogs('all');
});

// Dropdowns & menu
document.querySelectorAll('.dropdown-parent').forEach(dropdown => {
  let timeout;
  dropdown.addEventListener('mouseenter', () => { clearTimeout(timeout); dropdown.classList.add('show'); });
  dropdown.addEventListener('mouseleave', () => { timeout = setTimeout(() => dropdown.classList.remove('show'), 200); });
  dropdown.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (e.target.closest('.dropdown-menu')) { return; }
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('open');
    }
  });
});
function toggleMenu() { const n=document.getElementById('navLinks'); const c=document.getElementById('closeBtn'); n.classList.toggle('active'); const isOpen=n.classList.contains('active'); document.body.style.overflow=isOpen?'hidden':''; c.style.display=isOpen?'block':'none'; }
window.addEventListener('resize', () => { if (window.innerWidth > 768) { document.getElementById('navLinks').classList.remove('active'); document.body.style.overflow=''; document.querySelectorAll('.dropdown-parent').forEach(dp=>dp.classList.remove('open')); document.getElementById('closeBtn').style.display='none'; } });
document.addEventListener('keydown', (e) => { if (e.key==='Escape') { document.getElementById('navLinks').classList.remove('active'); document.body.style.overflow=''; document.getElementById('closeBtn').style.display='none'; } });

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click',()=>{ document.body.classList.toggle('dark-theme'); localStorage.setItem('mbh-theme',document.body.classList.contains('dark-theme')?'dark':'light'); });
if(localStorage.getItem('mbh-theme')==='dark') document.body.classList.add('dark-theme');

const header = document.getElementById('mainHeader');
const navWrap = document.getElementById('navWrap');
let lastScroll = 0, ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(() => {
    const curr = window.scrollY;
    if (curr > 60) navWrap.classList.add('scrolled'); else navWrap.classList.remove('scrolled');
    if (curr > 100) { if (curr > lastScroll) header.classList.add('hidden'); else header.classList.remove('hidden'); }
    else header.classList.remove('hidden');
    lastScroll = curr; ticking = false;
  }); ticking = true; }
}, { passive: true });
