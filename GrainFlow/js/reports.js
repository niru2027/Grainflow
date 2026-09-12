// =========================
// GENERATE REPORT
// =========================

function generateReport() {
  const reportType = document.getElementById("reportType").value;

  let message = "";

  if (reportType === "overview") {
    message =
      "Business Overview\n\n" +
      "Revenue: ₹8,45,000\n" +
      "Purchases: ₹6,75,000\n" +
      "Rice Produced: 3,970 Kg\n" +
      "Estimated Profit: ₹1,70,000";
  } else if (reportType === "sales") {
    message =
      "Sales Report\n\n" +
      "Total Sales: ₹8,45,000\n" +
      "Bags Sold: 1,245\n" +
      "Pending Payments: ₹42,500";
  } else if (reportType === "production") {
    message =
      "Production Report\n\n" +
      "Paddy Processed: 5,300 Kg\n" +
      "Rice Produced: 3,970 Kg\n" +
      "Efficiency: 75%";
  } else if (reportType === "purchase") {
    message =
      "Purchase Report\n\n" +
      "Total Purchases: ₹6,75,000\n" +
      "Paddy Purchased: 8,500 Kg\n" +
      "Pending Payments: ₹85,000";
  }

  alert(message);
}

// =========================
// REPORT TYPE STYLE
// =========================

const reportType = document.getElementById("reportType");

if (reportType) {
  reportType.addEventListener("change", function () {
    console.log("Selected Report: " + this.value);
  });
}
