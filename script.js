document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("costForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload

    const name = document.getElementById("componentName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const unitCost = parseFloat(document.getElementById("unitCost").value);

    if (isNaN(quantity) || isNaN(unitCost)) {
      resultDiv.textContent = "Please enter valid numbers.";
      return;
    }

    const totalCost = quantity * unitCost;

    resultDiv.innerHTML = `
      <p><strong>Component:</strong> ${name}</p>
      <p><strong>Total Cost:</strong> ₹${totalCost.toFixed(2)}</p>
    `;
  });
});
