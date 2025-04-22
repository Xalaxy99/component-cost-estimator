const components = [
  { name: "Arduino Uno", price: 500, category: "Microcontrollers" },
  { name: "ESP32", price: 350, category: "Microcontrollers" },
  { name: "Ultrasonic Sensor", price: 120, category: "Sensors" },
  { name: "IR Sensor", price: 80, category: "Sensors" },
  { name: "Capacitor 100uF", price: 5, category: "Passive Components" },
  { name: "Resistor 10kΩ", price: 2, category: "Passive Components" },
  { name: "DC Motor", price: 200, category: "Motors" },
  { name: "Servo Motor", price: 300, category: "Motors" },
  { name: "Jumper Wires", price: 50, category: "Miscellaneous" },
  { name: "Breadboard", price: 60, category: "Miscellaneous" }
];

let cart = [];

function renderComponents(category = "All") {
  const container = document.getElementById("componentsList");
  container.innerHTML = "";

  const filtered = category === "All" ? components : components.filter(c => c.category === category);

  if (filtered.length === 0) {
    container.innerHTML = "<p>No components found in this category.</p>";
    return;
  }

  filtered.forEach((comp, index) => {
    const card = document.createElement("div");
    card.className = "component-card";
    card.innerHTML = `
      <h3>${comp.name}</h3>
      <p>Price: ₹${comp.price}</p>
      <input type="number" id="qty-${index}" min="1" value="1" style="width: 50px;" />
      <button onclick="addToCart(${index}, '${comp.name}', ${comp.price})">Add</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(index, name, price) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cartSummary");
  if (cart.length === 0) {
    cartDiv.innerHTML = "No components added yet.";
    return;
  }

  let html = "<ul>";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    html += `<li>${item.name} x ${item.qty} = ₹${item.price * item.qty}</li>`;
  });

  html += `</ul><p><strong>Total: ₹${total}</strong></p>`;
  cartDiv.innerHTML = html;
}

function exportPriceList() {
  let text = "Component,Quantity,Price,Total\n";
  cart.forEach(item => {
    text += `${item.name},${item.qty},${item.price},${item.price * item.qty}\n`;
  });

  const blob = new Blob([text], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "price_list.csv";
  link.click();
}

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  renderComponents(e.target.value);
});

document.getElementById("darkModeToggle").addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
});

window.onload = () => {
  renderComponents();
};
