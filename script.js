document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       REVEAL ON SCROLL
    ========================== */
    window.addEventListener('scroll', reveal);

    function reveal() {
        const reveals = document.querySelectorAll('.reveal');

        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    /* =========================
       IMAGE TOGGLE
    ========================== */
    document.querySelectorAll(".product-card").forEach(card => {

  const img = card.querySelector(".product-img");
  const leftArrow = card.querySelector(".arrow.left");
  const rightArrow = card.querySelector(".arrow.right");

  if (!img) return;

  let images = [];

  // data image 3
  if (img.dataset.images) {
    images = img.dataset.images.split(",");
  } 
  // front/back
  else if (img.dataset.front && img.dataset.back) {
    images = [img.dataset.front, img.dataset.back];
  } 
  // لو صورة واحدة
  else {
    return;
  }

  let currentIndex = 0;

  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      img.src = images[currentIndex];
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      img.src = images[currentIndex];
    });
  }

});

    /* =========================
       CART SYSTEM
    ========================== */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartIcon = document.querySelector(".cart");
    const miniCart = document.getElementById("miniCart");

    function updateCartUI() {

        if (cartCount) {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        if (!cartItems || !cartTotal) return;

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} x${item.quantity} - ${item.price * item.quantity} EGP
                <span class="remove-item" data-index="${index}">✖</span>
            `;

            cartItems.appendChild(li);
        });

        cartTotal.textContent = "Total: " + total + " EGP";

        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartUI();
            });
        });
    }

    updateCartUI();

    // فتح وقفل كارت
    if (cartIcon && miniCart) {

        cartIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            miniCart.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (!miniCart.contains(e.target)) {
                miniCart.classList.remove("open");
            }
        });
    }

    // إضافة منتج للسله
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {

            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartUI();
        });
    });

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================== */
    const nav = document.querySelector("nav");

    if (nav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        });
    }

    /* =========================
       THEME TOGGLE
    ========================== */
    const themeToggle = document.getElementById("themeToggle");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light");

            if (document.body.classList.contains("light")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }

});

