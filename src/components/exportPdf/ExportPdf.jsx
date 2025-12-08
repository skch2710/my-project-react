import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (columns, rows, fileName = "data") => {
  const doc = new jsPDF();

  const tableColumn = columns.map((col) => col.headerName || col.field);
  const tableRows = rows.map((row) => columns.map((col) => row[col.field]));

  doc.text(fileName, 14, 10);
  
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save(`${fileName}.pdf`);
};
