// =========================
// SALES MODAL
// =========================

function openSalesModal() {
  document.getElementById("salesModal").style.display = "flex";
}

function closeSalesModal() {
  document.getElementById("salesModal").style.display = "none";
  document.getElementById("salesForm").reset();
}

// =========================
// AUTO CALCULATE SALE AMOUNT
// =========================

document
  .getElementById("saleQuantity")
  .addEventListener("input", calculateSaleAmount);

document
  .getElementById("pricePerBag")
  .addEventListener("input", calculateSaleAmount);

function calculateSaleAmount() {
  const quantity = Number(document.getElementById("saleQuantity").value);

  const price = Number(document.getElementById("pricePerBag").value);

  const amount = quantity * price;

  document.getElementById("saleAmount").value = amount > 0 ? amount : "";
}

// =========================
// SALES FORM
// =========================

document
  .getElementById("salesForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const invoiceNumber = document.getElementById("invoiceNumber").value.trim();

    const saleDate = document.getElementById("saleDate").value;

    const customerName = document.getElementById("customerName").value.trim();

    const product = document.getElementById("saleProduct").value;

    const quantity = Number(document.getElementById("saleQuantity").value);

    const amount = Number(document.getElementById("saleAmount").value);

    const paymentStatus = document.getElementById("paymentStatus").value;

    if (
      !invoiceNumber ||
      !saleDate ||
      !customerName ||
      !product ||
      !quantity ||
      !amount ||
      !paymentStatus
    ) {
      alert("Please fill all fields.");
      return;
    }

    // =========================
    // ADD SALE TO TABLE
    // =========================

    const tableBody = document.querySelector("#salesTable tbody");

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>
            <strong>${invoiceNumber}</strong>
        </td>

        <td>${saleDate}</td>

        <td>${customerName}</td>

        <td>${product}</td>

        <td>${quantity.toLocaleString()} Bags</td>

        <td>₹${amount.toLocaleString()}</td>

        <td>
            <span class="status ${
              paymentStatus === "Paid" ? "completed" : "pending"
            }">
                ${paymentStatus}
            </span>
        </td>

        <td>
            <button class="edit-btn">Edit</button>
        </td>
    `;

    tableBody.appendChild(newRow);
    updateSalesSummary();

    // Update pending payments
    const pendingPayments = document.getElementById("pendingPayments");
    if (paymentStatus === "Pending") {
      const currentPending = Number(
        pendingPayments.textContent.replace("₹", "").replace(",", ""),
      );
      pendingPayments.textContent = `₹${(currentPending + amount).toLocaleString()}`;
    }

    alert(
      "Sale added successfully!\n\n" +
        "Invoice: " +
        invoiceNumber +
        "\n" +
        "Customer: " +
        customerName +
        "\n" +
        "Amount: ₹" +
        amount.toLocaleString(),
    );

    closeSalesModal();
  });

function updateSalesSummary() {
  const rows = document.querySelectorAll("#salesTable tbody tr");

  let totalSales = 0;
  let totalBags = 0;
  let pendingPayments = 0;

  rows.forEach(function (row) {
    const bags = Number(
      row.cells[4].innerText.replace(/,/g, "").replace(" Bags", ""),
    );

    const amount = Number(
      row.cells[5].innerText.replace(/₹/g, "").replace(/,/g, ""),
    );

    const payment = row.cells[6].innerText.trim();

    totalSales += amount;
    totalBags += bags;

    if (payment === "Pending") {
      pendingPayments += amount;
    }
  });

  document.getElementById("totalSales").innerText =
    "₹" + totalSales.toLocaleString();

  document.getElementById("totalBags").innerText = totalBags.toLocaleString();

  document.getElementById("pendingPayments").innerText =
    "₹" + pendingPayments.toLocaleString();
}

// =========================
// SALES SEARCH
// =========================
// =========================
// SALES SEARCH + FILTER
// =========================

function filterSales() {
  const searchText = document
    .getElementById("salesSearch")
    .value.toLowerCase()
    .trim();

  const paymentFilter = document.getElementById("paymentFilter").value;

  const rows = document.querySelectorAll("#salesTable tbody tr");

  rows.forEach(function (row) {
    const invoice = row.cells[0].innerText.toLowerCase();

    const customer = row.cells[2].innerText.toLowerCase();

    const payment = row.cells[6].innerText.trim();

    const matchesSearch =
      invoice.includes(searchText) || customer.includes(searchText);

    const matchesPayment = paymentFilter === "all" || payment === paymentFilter;

    if (matchesSearch && matchesPayment) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

document.getElementById("salesSearch").addEventListener("input", filterSales);

document
  .getElementById("paymentFilter")
  .addEventListener("change", filterSales);
localStorage.setItem("grainflowSales", "1245");
localStorage.setItem("grainflowRevenue", "845000");
