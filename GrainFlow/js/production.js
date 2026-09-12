// =========================
// PRODUCTION MODAL
// =========================
let editingRow = null;
function openProductionModal() {
  document.getElementById("productionModal").style.display = "flex";
}

function closeProductionModal() {
  document.getElementById("productionModal").style.display = "none";
  document.getElementById("productionForm").reset();
}

// =========================
// PRODUCTION FORM
// =========================

document
  .getElementById("productionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const batchId = document.getElementById("batchId").value.trim();

    const paddyQuantity = Number(
      document.getElementById("paddyQuantity").value,
    );

    const productionDate = document.getElementById("productionDate").value;

    const status = document.getElementById("productionStatus").value;
    const paddy = Number(document.getElementById("paddyQuantity").value);

    const riceProduced = paddy * 0.75;
    const byProduct = paddy * 0.175;

    document.getElementById("riceProduced").value = Math.round(riceProduced);

    document.getElementById("byProduct").value = Math.round(byProduct);

    // =========================
    // CALCULATE PRODUCTION
    // =========================

    const riceProducedInput = document.getElementById("riceProduced");

    const byProductInput = document.getElementById("byProduct");

    // Paddy quantity change ayinappudu calculate cheyyi
    document
      .getElementById("paddyQuantity")
      .addEventListener("input", function () {
        const paddy = Number(this.value);

        if (paddy > 0) {
          // 75% rice recovery
          const rice = paddy * 0.75;

          // 17.5% by product
          const byProduct = paddy * 0.175;

          riceProducedInput.value = Math.round(rice);

          byProductInput.value = Math.round(byProduct);
        } else {
          riceProducedInput.value = "";
          byProductInput.value = "";
        }
      });

    if (!batchId || !paddyQuantity || !productionDate || !status) {
      alert("Please fill all fields.");
      return;
    }

    // =========================
    // ADD PRODUCTION TO TABLE
    // =========================

    const tableBody = document.querySelector("#productionTable tbody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>${productionDate}</td>

    <td>
        <strong>${batchId}</strong>
    </td>

    <td>${paddyQuantity.toLocaleString()} Kg</td>

    <td>${riceProduced.toLocaleString()} Kg</td>
    <td>${byProduct.toLocaleString()} Kg</td>

    <td>
        <span class="status ${status === "Completed" ? "completed" : "pending"}">
            ${status}
        </span>
    </td>
    <td>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
</td>
`;
    if (editingRow) {
      editingRow.cells[0].innerText = productionDate;
      editingRow.cells[1].innerHTML = `<strong>${batchId}</strong>`;
      editingRow.cells[2].innerText = paddyQuantity.toLocaleString() + " Kg";
      editingRow.cells[3].innerText = riceProduced.toLocaleString() + " Kg";
      editingRow.cells[4].innerText = byProduct.toLocaleString() + " Kg";

      editingRow.cells[5].innerHTML = `
        <span class="status ${status === "Completed" ? "completed" : "pending"}">
            ${status}
        </span>
    `;

      editingRow = null;

      updateProductionSummary();
      closeProductionModal();

      alert("Production record updated successfully!");

      return;
    }
    tableBody.appendChild(newRow);

    newRow.querySelector(".edit-btn").addEventListener("click", function () {
      const row = this.closest("tr");
      editingRow = row; // Store the row being edited

      const date = row.cells[0].innerText.trim();
      const batchId = row.cells[1].innerText.trim();
      const paddy = row.cells[2].innerText.replace(" Kg", "").replace(/,/g, "");
      const status = row.cells[5].innerText.trim();

      document.getElementById("batchId").value = batchId;
      document.getElementById("paddyQuantity").value = paddy;
      document.getElementById("productionDate").value = date;
      document.getElementById("productionStatus").value = status;

      document.getElementById("productionModal").style.display = "flex";
    });
    newRow.querySelector(".delete-btn").addEventListener("click", function () {
      const row = this.closest("tr");
      const batchId = row.cells[1].innerText.trim();

      const confirmDelete = confirm(
        "Are you sure you want to delete batch " + batchId + "?",
      );

      if (confirmDelete) {
        row.remove();

        updateProductionSummary();

        alert("Production record deleted successfully!");
      }
    });

    updateProductionSummary();

    // Success message
    alert(
      "Production started successfully!\n\n" +
        "Batch ID: " +
        batchId +
        "\n" +
        "Paddy: " +
        paddyQuantity +
        " Kg\n" +
        "Status: " +
        status,
    );

    closeProductionModal();

    updateProductionSummary();
  });
function updateProductionSummary() {
  const rows = document.querySelectorAll("#productionTable tbody tr");

  let totalPaddy = 0;
  let totalRice = 0;

  rows.forEach(function (row) {
    const paddy = Number(
      row.cells[2].innerText.replace(/,/g, "").replace(" Kg", ""),
    );

    const rice = Number(
      row.cells[3].innerText.replace(/,/g, "").replace(" Kg", ""),
    );

    totalPaddy += paddy;
    totalRice += rice;
  });

  document.getElementById("todayPaddy").innerText =
    totalPaddy.toLocaleString() + " Kg";

  document.getElementById("riceProducedTotal").innerText =
    totalRice.toLocaleString() + " Kg";

  let inProductionTotal = 0;

  rows.forEach(function (row) {
    const status = row.cells[5].innerText.trim();

    if (status === "Processing") {
      const paddy = Number(
        row.cells[2].innerText.replace(/,/g, "").replace(" Kg", ""),
      );

      inProductionTotal += paddy;
    }
  });

  document.getElementById("inProduction").innerText =
    inProductionTotal.toLocaleString() + " Kg";
  // Calculate efficiency
  if (totalPaddy > 0) {
    const efficiency = (totalRice / totalPaddy) * 100;

    document.getElementById("efficiency").innerText =
      Math.round(efficiency) + "%";
  } else {
    document.getElementById("efficiency").innerText = "0%";
  }
}
document
  .getElementById("productionModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeProductionModal();
    }
  });
localStorage.setItem("grainflowProduction", "8250");
