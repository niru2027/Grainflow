// =========================
// PURCHASE MODAL
// =========================

function openPurchaseModal() {
  document.getElementById("purchaseModal").style.display = "flex";
}

function closePurchaseModal() {
  document.getElementById("purchaseModal").style.display = "none";
  document.getElementById("purchaseForm").reset();
}

// =========================
// AUTO CALCULATE AMOUNT
// =========================

document
  .getElementById("purchaseQuantity")
  .addEventListener("input", calculatePurchaseAmount);

document
  .getElementById("purchasePrice")
  .addEventListener("input", calculatePurchaseAmount);

function calculatePurchaseAmount() {
  const quantity = Number(document.getElementById("purchaseQuantity").value);

  const price = Number(document.getElementById("purchasePrice").value);

  const amount = quantity * price;

  document.getElementById("purchaseAmount").value = amount > 0 ? amount : "";
}

// =========================
// ADD PURCHASE
// =========================

document
  .getElementById("purchaseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const purchaseId = document.getElementById("purchaseId").value.trim();

    const purchaseDate = document.getElementById("purchaseDate").value;

    const supplier = document.getElementById("purchaseSupplier").value.trim();

    const material = document.getElementById("purchaseMaterial").value;

    const quantity = Number(document.getElementById("purchaseQuantity").value);

    const amount = Number(document.getElementById("purchaseAmount").value);

    const payment = document.getElementById("purchasePayment").value;

    if (
      !purchaseId ||
      !purchaseDate ||
      !supplier ||
      !material ||
      !quantity ||
      !amount ||
      !payment
    ) {
      alert("Please fill all fields.");
      return;
    }

    const tableBody = document.querySelector("#purchaseTable tbody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
            <td><strong>${purchaseId}</strong></td>

            <td>${purchaseDate}</td>

            <td>${supplier}</td>

            <td>${material}</td>

            <td>${quantity.toLocaleString()} Kg</td>

            <td>₹${amount.toLocaleString()}</td>

            <td>
                <span class="status ${
                  payment === "Paid" ? "completed" : "pending"
                }">
                    ${payment}
                </span>
            </td>

            <td>
                <button class="edit-btn">Edit</button>
            </td>
        `;

    tableBody.appendChild(newRow);

    updatePurchaseSummary();

    alert(
      "Purchase added successfully!\n\n" +
        "Purchase ID: " +
        purchaseId +
        "\n" +
        "Supplier: " +
        supplier +
        "\n" +
        "Amount: ₹" +
        amount.toLocaleString(),
    );

    closePurchaseModal();
  });

// =========================
// PURCHASE SUMMARY
// =========================

function updatePurchaseSummary() {
  const rows = document.querySelectorAll("#purchaseTable tbody tr");

  let totalPurchases = 0;
  let paddyTotal = 0;
  let pendingPayments = 0;

  rows.forEach(function (row) {
    const material = row.cells[3].innerText.trim();

    const quantity = Number(
      row.cells[4].innerText.replace(/,/g, "").replace(" Kg", ""),
    );

    const amount = Number(
      row.cells[5].innerText.replace(/₹/g, "").replace(/,/g, ""),
    );

    const payment = row.cells[6].innerText.trim();

    totalPurchases += amount;

    if (material === "Paddy") {
      paddyTotal += quantity;
    }

    if (payment === "Pending") {
      pendingPayments += amount;
    }
  });

  document.getElementById("totalPurchases").innerText =
    "₹" + totalPurchases.toLocaleString();

  document.getElementById("paddyPurchased").innerText =
    paddyTotal.toLocaleString() + " Kg";

  document.getElementById("pendingPurchase").innerText =
    "₹" + pendingPayments.toLocaleString();
}

// =========================
// SEARCH
// =========================

document
  .getElementById("purchaseSearch")
  .addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();

    const rows = document.querySelectorAll("#purchaseTable tbody tr");

    rows.forEach(function (row) {
      const supplier = row.cells[2].innerText.toLowerCase();

      const purchaseId = row.cells[0].innerText.toLowerCase();

      if (supplier.includes(searchText) || purchaseId.includes(searchText)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

// =========================
// CLOSE MODAL ON OUTSIDE CLICK
// =========================

document
  .getElementById("purchaseModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closePurchaseModal();
    }
  });
