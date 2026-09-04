const headerHTML = `

    <header class="headers">
        <div class="logo">
            <a href="#">M&C House</a>
        </div>
            <ul>
                <li><a href="../index.html">Home</a></li>
                 <li><a href="../pages/about.html">About</a></li>
                  <li><a href="../pages/properties.html">Properties</a></li>
                  <li><a href="../pages/contact.html">Contact Us</a></li>
                  <li><a href="../pages/save.html">Saved Properties</a></li>
            </ul>
            <div class="auth-buttons">
            <a href="../pages/login.html" class="btn-login">Login</a>
            <a href="../pages/register.html" class="btn-register">Register</a>
            </div>
    </header>`;

const footerHTML = `
<footer class="footer">

    <div class=footers>
    <div class=sub-footer>
    <h4>M&C House</h4>
    <p>Your trused partner in M&C House. WE help you find the perfect property</p>
    </div>

    <div class=sub-footer>
    <h4>Contact</h4>
   <p> email:M&C@gmail.com"</p>
    <p>+237xxxxxxxxx</p>
     </div>

     <div sub-footer>
    <h4>links</h4>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="properties.html">Properties</a></li>
    <li><a href="contact.html">Contact Us</a></li>
    </div>
     
    </div>

    <div class=main-footer>
     <p> &Copy; 2026 M&C House.All rights Reserved</p>
    </div>
</footer>`;

window.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header");
  const footerContainer = document.getElementById("footer");

  if (headerContainer) headerContainer.innerHTML = headerHTML;
  if (footerContainer) footerContainer.innerHTML = footerHTML;
});

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.getElementsByClassName("cards");
    const filterButtons = document.getElementsByClassName("cat-btn");
    const priceFilter = document.getElementById("priceSelect");

    let selectedCategory = "all";
    let selectedPrice = "all";

    function filterProperties() {
        let visibleCount = 0;

        for (let i = 0; i < cards.length; i++) {
            let rawCategory = cards[i].getAttribute("data-category") || "";
            let price = Number(cards[i].getAttribute("data-price")) || 0;

            let category = rawCategory.toLowerCase().replace("-", " ").trim();
            let targetCategory = selectedCategory.toLowerCase().replace("-", " ").trim();

            let categoryMatch = (targetCategory === "all" || category === targetCategory);
            let priceMatch = true;

            if (selectedPrice !== "all") {
                if (selectedPrice === "above-10000000") {
                    priceMatch = price > 10000000;
                } else {
                    priceMatch = price <= Number(selectedPrice);
                }
            }

            if (categoryMatch && priceMatch) {
                cards[i].style.display = "block";
                visibleCount++;
            } else {
                cards[i].style.display = "none";
            }
        }

        const noResults = document.getElementById("no-results");
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function() {
            const catAttr = this.getAttribute("data-category");
            selectedCategory = catAttr ? catAttr : "all";

            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove("active");
            }

            this.classList.add("active");
            filterProperties();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener("change", function() {
            selectedPrice = this.value;
            filterProperties();
        });
    }
});


const whatsappPhoneNumber = "237674765751";

document.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn');
    if (btn && btn.textContent.trim().toLowerCase().includes('whatsapp')) {
        const card = btn.closest('.cards');
        if (!card) return;
        const titleEl = card.querySelector('h3') || card.querySelector('h2');
        const title = titleEl ? titleEl.innerText.trim() : 'Property';
        const paragraphs = Array.from(card.querySelectorAll('p'));
        const priceText = paragraphs.find(p => p.innerText.toLowerCase().includes('price'))?.innerText || '';
        const locationText = paragraphs.find(p => p.innerText.toLowerCase().includes('location'))?.innerText || '';
        const message = `Hello M&C House, I am interested in the ${title} (${priceText}, ${locationText}).`;
        const waUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    }
});


document.addEventListener('DOMContentLoaded', () => {

    syncSaveButtonStates();
    document.addEventListener('click', (event) => {
        const saveBtn = event.target.closest('.save-btn');
        if (!saveBtn) return;
        const card = saveBtn.closest('.cards');
        if (!card) return;
        const title = card.querySelector('h3, h2')?.innerText.trim() || 'Property';
        const paragraphs = Array.from(card.querySelectorAll('p'));
        const price = paragraphs.find(p => p.innerText.toLowerCase().includes('price'))?.innerText.trim() || paragraphs[0]?.innerText.trim() || '';
        const location = paragraphs.find(p => p.innerText.toLowerCase().includes('location'))?.innerText.trim() || paragraphs[1]?.innerText.trim() || '';
        const imgSrc = card.querySelector('.card-image, img')?.getAttribute('src') || '';
        const propertyId = `${title}-${price}-${location}`.replace(/\s+/g, '-').toLowerCase();
        const propertyData = { id: propertyId, title, price, location, imgSrc };
        let savedProperties = JSON.parse(localStorage.getItem('savedProperties')) || [];
        const existingIndex = savedProperties.findIndex(item => item.id === propertyId);

        if (existingIndex === -1) {
            savedProperties.push(propertyData);
            setSavedButtonState(saveBtn, true);
            showToast(`"${title}" saved successfully!`);
        } else {
            setSavedButtonState(saveBtn, false);
            showToast(`Removed "${title}" from saved list.`, true);
        }
        localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
    });
});
function setSavedButtonState(button, isSaved) {
    if (isSaved) {
        button.textContent = 'Saved ✓';
        button.style.backgroundColor = '#28a745';
        button.style.color = '#ffffff';
    } else {
        button.textContent = 'Save Properties';
        button.style.backgroundColor = '';
        button.style.color = '';
    }
}
function syncSaveButtonStates() {
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties')) || [];
    
    document.querySelectorAll('.cards').forEach(card => {
        const title = card.querySelector('h3, h2')?.innerText.trim() || 'Property';
        const paragraphs = Array.from(card.querySelectorAll('p'));
        const price = paragraphs.find(p => p.innerText.toLowerCase().includes('price'))?.innerText.trim() || paragraphs[0]?.innerText.trim() || '';
        const location = paragraphs.find(p => p.innerText.toLowerCase().includes('location'))?.innerText.trim() || paragraphs[1]?.innerText.trim() || '';

        const propertyId = `${title}-${price}-${location}`.replace(/\s+/g, '-').toLowerCase();
        const saveBtn = card.querySelector('.save-btn');

        if (saveBtn && savedProperties.some(item => item.id === propertyId)) {
            setSavedButtonState(saveBtn, true);
        }
    });
}
function showToast(message, isRemoval = false) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;

    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: isRemoval ? '#dc3545' : '#28a745',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: '9999',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        transform: 'translateY(20px)',
        opacity: '0'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}