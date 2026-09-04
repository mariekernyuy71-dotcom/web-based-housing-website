const whatsappPhoneNumber = "237674765751";

document.addEventListener('DOMContentLoaded', () => {
    displaySavedProperties();
});

function displaySavedProperties() {
    const container = document.getElementById('saved-cards-grid');
    if (!container) return;
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties')) || [];
    if (savedProperties.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; font-family: sans-serif;">
                <h2 style="color: #333; margin-bottom: 10px;">Your Saved Properties List is Empty</h2>
                <p style="color: #666; margin-bottom: 20px;">You haven't saved any properties yet.</p>
                <a href="../index.html" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Browse Properties</a>
            </div>
        `;
        return;
    }

    container.innerHTML = savedProperties.map((item, index) => {
        const message = `Hello M&C House, I am interested in ${item.title} (${item.price}, ${item.location}).`;
        const waUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(message)}`;
        let imageSource = item.imgSrc || '';
        if (imageSource && !imageSource.startsWith('http') && !imageSource.startsWith('../')) {
            imageSource = '../' + imageSource;
        }

        return `
            <div class="cards">
                <div class="cards-image">
                    <img class="card-image" src="${imageSource}" alt="${item.title}">
                </div>
                <div class="cards-description">
                    <h3>${item.title}</h3>
                    <p>${item.price}</p>
                    <p>${item.location}</p>
                    <a href="${waUrl}" target="_blank" class="btn">WhatsApp</a>
                    <button class="remove-btn" onclick="removeProperty(${index})" style="background-color: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-top: 8px;">Remove</button>
                </div>
            </div>
        `;
    }).join('');
}

function removeProperty(index) {
    let savedProperties = JSON.parse(localStorage.getItem('savedProperties')) || [];
    savedProperties.splice(index, 1);
    localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
    displaySavedProperties();
}