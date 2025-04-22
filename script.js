let components = [];
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("components.json")
    .then(res => res.json())
    .then(data => {
      components = data;
      renderComponents();
    });

  document.getElementById("categoryFilter").addEventListener("change", renderComponents);
  document.getElementById("exportBtn").addEventListener("click", exportCartToText);
  document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
});

function renderComponents() {
  const filter = document.getElementById("categoryFilter").value;
  const container = document.getElementById("componentsList");
  container.innerHTML = "";

  let filtered = filter === "All" ? components : components.filter(c => c.category === filter);
  filtered.forEach(comp => {
    const div = document.createElement("div");
    div.className = "component-card";
    div.innerHTML = `
      <h3>${comp.name}</h3>
      <p>Price: ₹${comp.price}</p>
      <input type="number" min="1" value="1" id="qty-${comp.name}" />
      <button onclick="addToCart('${comp.name}', ${comp.price})">Add</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(name, price) {
  const qty = parseInt(document.getElementById(`qty-${name}`).value);
  const existing = cart.find(item => item.name === name);

  if (existing) existing.qty += qty;
  else cart.push({ name, price, qty });

  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No components added yet.</p>";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    cartDiv.innerHTML += `<p>${item.name} x ${item.qty} = ₹${subtotal}</p>`;
  });

  cartDiv.innerHTML += `<hr><p><strong>Total: ₹${total}</strong></p>`;
}

function exportCartToText() {
  if (cart.length === 0) return alert("Cart is empty!");
  let text = "Component Price List:\n";
  let total = 0;

  cart.forEach(item => {
    const sub = item.price * item.qty;
    text += `${item.name} x ${item.qty} = ₹${sub}\n`;
    total += sub;
  });

  text += `\nTotal = ₹${total}`;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "price_list.txt";
  a.click();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
