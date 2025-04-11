const components = [
  { name: "Resistor", price: 2 },
  { name: "Capacitor", price: 5 },
  { name: "Arduino Uno", price: 550 },
  { name: "LED", price: 3 },
  { name: "Breadboard", price: 60 },
];

function renderComponents() {
  const container = document.getElementById("components-container");
  container.innerHTML = "";
  components.forEach((comp, index) => {
    const card = document.createElement("div");
    card.className = "component-card";
    card.innerHTML = `
      <h3>${comp.name}</h3>
      <p>₹${comp.price}</p>
      <input type="number" id="qty-${index}" min="0" value="0">
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

window.onload = renderComponents;

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  if (qty > 0) {
    alert(`${qty} x ${components[index].name} added to cart!`);
  }
}
