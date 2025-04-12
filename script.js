document.addEventListener('DOMContentLoaded', function () {
  // COMPONENT LIST
  const components = [
  {
    name: "Arduino Uno",
    price: 500,
    image: "https://m.media-amazon.com/images/I/61TXh8tgn8L.jpg",
    category: "Microcontrollers"
  },
  {
    name: "ESP32",
    price: 700,
    image: "https://m.media-amazon.com/images/I/61TXh8tgn8L.jpg",
    category: "Microcontrollers"
  },
  {
    name: "MQ2 Gas Sensor",
    price: 150,
    image: "https://m.media-amazon.com/images/I/61uN2W1ZQRL._SX522_.jpg",
    category: "Sensors"
  },
  {
    name: "MQ8 Hydrogen Sensor",
    price: 180,
    image: "https://m.media-amazon.com/images/I/61uN2W1ZQRL._SX522_.jpg",
    category: "Sensors"
  },
  {
    name: "IR Sensor",
    price: 70,
    image: "https://m.media-amazon.com/images/I/61pJPzgrpxL._SX522_.jpg",
    category: "Sensors"
  },
  {
    name: "DC Motor (300 RPM)",
    price: 180,
    image: "https://m.media-amazon.com/images/I/41yU0DCU3sL._SX300_SY300_QL70_FMwebp_.jpg",
    category: "Motors"
  },
  {
    name: "Jumper Wires (Male to Male)",
    price: 40,
    image: "https://m.media-amazon.com/images/I/61Z9Fy3qUIL._SX522_.jpg",
    category: "Passive Components"
  },
  {
    name: "Breadboard",
    price: 100,
    image: "https://m.media-amazon.com/images/I/61n+Rpq8xgL._SX522_.jpg",
    category: "Passive Components"
  }
];


  const container = document.getElementById("component-list");
  const cartContainer = document.getElementById("cart");
  const totalElement = document.getElementById("total");
  const cart = [];

  components.forEach(component => {
    const card = document.createElement("div");
    card.className = "component-card";
    card.innerHTML = `
      <h3>${component.name}</h3>
      <p>Price: ₹${component.price}</p>
      <input type="number" value="1" min="1" class="quantity-input">
      <button class="add-to-cart">Add to Cart</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      const qty = parseInt(card.querySelector("input").value);
      addToCart(component, qty);
    });
    container.appendChild(card);
  });

  function addToCart(component, quantity) {
    const existing = cart.find(item => item.name === component.name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...component, quantity });
    }
    renderCart();
  }

  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      const div = document.createElement("div");
      div.textContent = `${item.name} x${item.quantity} - ₹${itemTotal}`;
      cartContainer.appendChild(div);
    });
    totalElement.textContent = total;
  }

  // EXPORT BUTTON
  document.getElementById("export-btn").addEventListener("click", function () {
    let csvContent = "data:text/csv;charset=utf-8,Component,Quantity,Unit Price,Total\n";
    cart.forEach(item => {
      csvContent += `${item.name},${item.quantity},${item.price},${item.quantity * item.price}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "component_price_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // DARK MODE TOGGLE
  document.getElementById("dark-mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
});
