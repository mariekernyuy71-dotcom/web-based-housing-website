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
                  <li><a href="../pages/services.html">Services</a></li>
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
