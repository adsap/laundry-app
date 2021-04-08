const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Agile Fox Laundry", 50, 57)
    .fontSize(10)
    .text("Agile Fox Laundry", 200, 50, { align: "right" })
    .text("Jl. Angkasa Raya No. 182", 200, 65, { align: "right" })
    .text("DKI Jakarta", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(invoice.shipping.phone, 300, customerInformationTop + 28)
    .text(invoice.shipping.email, 300, customerInformationTop + 38)

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Entry Date",
    "Laundry Type",
    "Weight",
    "Cost/Kg",
    "Total Cost"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.entry_date,
      item.laundry_type,
      item.weight + " Kg",
      formatCurrency(item.costkg),
      formatCurrency(item.total)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Thank you for laundry with us",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  entry_date,
  laundry_type,
  weight,
  costkg,
  total
) {
  doc
    .fontSize(10)
    .text(entry_date, 50, y)
    .text(laundry_type, 180, y)
    .text(weight, 280, y, { width: 90, align: "right" })
    .text(costkg, 370, y, { width: 90, align: "right" })
    .text(total, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(value) {
  return "Rp. " + value.toLocaleString();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
}

module.exports = {
  createInvoice
};