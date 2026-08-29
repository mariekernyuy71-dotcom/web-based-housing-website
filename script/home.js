
const viewBtn = document.getElementById("view-btn");
const whatsappBtn = document.getElementById("whatsapp-btn");
const callBtn = document.getElementById("call-btn");

viewBtn.onclick = function() {
  window.location.href = "../pages/properties.html";
};


whatsappBtn.onclick = function() {
  const phoneNumber = "+237674765751";
  const message = "Hello, I am interested in your properties!";
  
  window.open("https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message), "_blank");
  
};

callBtn.onclick = function() {
  const phoneNumber = "+237674765751";
  
  window.location.href = "tel:" + phoneNumber;
};


const filterButtons = document.querySelectorAll('.price-btn');
const propertyCards = document.querySelectorAll('.cards');
const noResultsMessage = document.getElementById('no-results');

filterButtons.forEach(button => {
button.addEventListener('click', () => {
filterButtons.forEach(btn => {
 btn.classList.remove('active');
});
button.classList.add('active');
const selectedPrice = button.getAttribute('data-price');
let matchCount = 0;
propertyCards.forEach(card => {
const cardPrice = card.getAttribute('data-price');
            
if (selectedPrice === 'all' || selectedPrice === cardPrice) {
   card.style.display = 'block';
matchCount++;
} else {
card.style.display = 'none';  }
});
if (matchCount === 0) {
  noResultsMessage.style.display = 'block';
 } else {
 noResultsMessage.style.display = 'none';
}  });
});


const callButton = document.getElementById("specialBtn");
callButton.onclick = function() {
  window.location.href = "tel:+237674765751";
};

const whatsappButton = document.querySelector(".special-button");
whatsappButton.onclick = function() {
  window.open("https://wa.me/237674765751", "_blank");
};





