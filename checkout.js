// ===== 1) عرض المنتجات =====
function displayOrder() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderContainer = document.getElementById("orderItems");
  const totalElement = document.getElementById("totalPrice");

  orderContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    orderContainer.innerHTML = "<p>Your cart is empty</p>";
    totalElement.innerText = "0 EGP";
    return;
  }

  cart.forEach(item => {
    orderContainer.innerHTML += `
      <div style="margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
        <h4 style="margin:0;">${item.name}</h4>
        <p style="margin:5px 0;">${item.price} EGP</p>
      </div>
    `;
    total += item.price * item.quantity
  });

  totalElement.innerText = total + " EGP";
}

displayOrder();

// ====ابعت تفاصيل الاوردر علي رقمي علي الواتس=====
const form = document.getElementById("checkoutForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty ❌");
    return;
  }

  // بيانات العميل
  const name = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  let total = 0;
  let message = `New Order%0A%0A`;
  message += `Customer Name: ${name}%0A`;
  message += `Address: ${address}%0A`;
  message += `Phone: ${phone}%0A%0A`;
  message += `Order Details:%0A`;

  cart.forEach(item => {
    message += `- ${item.name} | ${item.price} EGP%0A`;
    total += item.price;
  });

  message += `%0ATotal: ${total} EGP`;

  //الرقم يتاعي
  const phoneNumber = "201111455086";
const encodedMessage = encodeURIComponent(message);

  // رساله التأكيد
  alert("Your order has been prepared. You will be redirected to WhatsApp to confirm ✅");
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

  // نشيل كل اللي في السله
  localStorage.removeItem("cart");
});

