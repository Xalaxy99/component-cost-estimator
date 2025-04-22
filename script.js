const components = [
  { name: "Arduino Uno", price: 500, category: "Microcontrollers" },
  { name: "ESP32", price: 450, category: "Microcontrollers" },
  { name: "MQ2 Gas Sensor", price: 150, category: "Sensors" },
  { name: "MQ135 Air Quality Sensor", price: 180, category: "Sensors" },
  { name: "10kΩ Resistor", price: 2, category: "Passive Components" },
  { name: "100Ω Resistor", price: 1, category: "Passive Components" },
  { name: "Capacitor 100uF", price: 3, category: "Passive Components" },
  { name: "DC Motor", price: 100, category: "Motors" },
  { name: "Servo Motor", price: 200, category: "Motors" },
  { name: "Jumper Wires (10 pcs)", price: 25, category: "Miscellaneous" },
  { name: "Breadboard", price: 60, category: "Miscellaneous" }
];

let cart = [];

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  renderComponents(e.target.value);
});

document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode", this.checked);
});

function renderComponents(category = "All") {
  const container = document.getElementById("componentsList");
  container.innerHTML = "";
  const filtered = category === "All" ? components : components.filter(c => c.category === category);
  filtered.forEach(component => {
    const card = document.createElement("div");
    card.className = "component-card";
    card.innerHTML = `
      <h3>${component.name}</h3>
      <p>Price: ₹${component.price}</p>
      <input type="number" min="1" value="1" id="qty-${component.name}" />
      <button onclick="add
::contentReference[oaicite:12]{index=12}
 
