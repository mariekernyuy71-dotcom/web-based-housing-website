document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.sub-property-section');
  const priceSelect = document.getElementById('priceSelect');
  const catButtons = document.querySelectorAll('.cat-btn');

  if (!container) return;

  let activeCategory = 'all';
  let activePrice = 'all';

  function displayProperties() {
    if (typeof propertyData === 'undefined') {
      container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Error: propertyData is not defined.</p>';
      return;
    }

    const filtered = propertyData.filter(item => {

      const matchCat = (activeCategory === 'all') || 
        (item.type && item.type.toLowerCase().trim() === activeCategory.toLowerCase().trim());
      let matchPrice = true;
      if (activePrice !== 'all') {
        if (activePrice === 'above-10000000') {
          matchPrice = item.price > 10000000;
        } else {
          matchPrice = item.price <= Number(activePrice);
        }
      }

      return matchCat && matchPrice;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; margin-top: 2rem; font-weight: bold;">No properties found for this selection.</p>';
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cards';
      card.innerHTML = `
        <div class="cards-image">
          <span class="status-badge">${item.status}</span>
          <img class="card-image" src="${item.image}" alt="${item.title}">
        </div>
        <div class="cards-description">
          <p><strong>${item.title}</strong></p>
          <p>Price: ${item.priceLabel}</p>
          <p>${item.location}</p>
          <button class="btn">WhatsApp</button>
          <button class="save-btn" type="button">Save Properties</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      catButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      activeCategory = e.target.getAttribute('data-category');
      displayProperties();
    });
  });
  if (priceSelect) {
    priceSelect.addEventListener('change', (e) => {
      activePrice = e.target.value;
      displayProperties();
    });
  }
  displayProperties();
});