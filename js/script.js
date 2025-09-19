/* script.js
   - multiple DOM interactions
   - functions
   - loops
   - simple form validation
*/

// ------------------------------
// Sample data (would normally come from an API)
const projects = [
  { id: 1, title: "App A", price: 0, description: "Free app example" },
  { id: 2, title: "Theme B", price: 9.99, description: "Paid theme" },
  { id: 3, title: "Tool C", price: 19.5, description: "Developer tool" },
  { id: 4, title: "Service D", price: 49.99, description: "Consulting service" }
];

// ------------------------------
// DOM Interaction 1: mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show'); // toggles mobile nav
    menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('show'));
  });
}

// ------------------------------
// DOM Interaction 2: set current year in footer
function setFooterYears(){
  const y = new Date().getFullYear();
  ['year','year-about','year-projects','year-contact'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });
}
setFooterYears();

// ------------------------------
// Function: format currency
function formatCurrency(n){
  const num = Number(n) || 0;
  return '$' + num.toFixed(2);
}

// Function: renderProjects (reusable)
function renderProjects(list, containerSelector = '#projectsList'){
  const container = document.querySelector(containerSelector);
  if(!container) return; // nothing to render into
  container.innerHTML = ''; // clear
  // Loop example: forEach to create cards
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p><strong>Price:</strong> ${formatCurrency(p.price)}</p>
      <button class="btn viewBtn" data-id="${p.id}">View</button>
    `;
    container.appendChild(card);
  });

  // DOM Interaction 3: attach click listeners to generated "View" buttons
  container.querySelectorAll('.viewBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const proj = projects.find(x => String(x.id) === String(id));
      if(proj) {
        alert(`Project: ${proj.title}\nPrice: ${formatCurrency(proj.price)}\n\n${proj.description}`);
      }
    });
  });
}

// initial render on pages that include #projectsList
renderProjects(projects);

// ------------------------------
// Filter example: using range input and button
const maxPriceInput = document.getElementById('maxPrice');
const priceValueLabel = document.getElementById('priceValue');
const filterBtn = document.getElementById('filterBtn');

if(maxPriceInput && priceValueLabel){
  // Loop example: update label as slider moves
  maxPriceInput.addEventListener('input', () => {
    priceValueLabel.textContent = maxPriceInput.value;
  });
}

if(filterBtn){
  filterBtn.addEventListener('click', () => {
    const max = Number(maxPriceInput.value);
    // Use a loop/filter to create new array
    const filtered = projects.filter(p => p.price <= max);
    renderProjects(filtered);
  });
}

// ------------------------------
// Contact form validation (DOM Interaction 4)
// Prevent submit and show message if invalid
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    const name = contactForm.querySelector('[name=name]').value.trim();
    const email = contactForm.querySelector('[name=email]').value.trim();
    const message = contactForm.querySelector('[name=message]').value.trim();
    const status = document.getElementById('formMessage');

    // Simple validation
    if(!name || !email || !message){
      e.preventDefault(); // prevents submission
      if(status) status.textContent = 'Please fill in all required fields.';
      return;
    }

    // Simulate successful submit (for demo) — normally you'd send to server
    e.preventDefault();
    if(status) status.textContent = 'Thanks! Your message was received (demo).';
    contactForm.reset();
  });
}

// ------------------------------
// Extra: small utility — toggle dark mode (example of another DOM interaction)
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// expose to console for testing
window.toggleDarkMode = toggleDarkMode;
