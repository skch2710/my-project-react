import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportToExcel = async (fields, rows, fileName) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  // Set columns with width and format
  worksheet.columns = fields.map((column) => ({
    header: column.headerName,
    key: column.field,
    width: column.widthExport ? column.widthExport : 20,
    style: column.format ? { numFmt: column.format } : {},
  }));

  // Add data rows
  rows.forEach((row) => worksheet.addRow(row));

  // Apply header style
  const headerRow = worksheet.getRow(1);
  headerRow.font = { name: "Calibri", size: 12, bold: true };
  headerRow.alignment = { vertical: "middle", horizontal: "center" };
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD9E1F2" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Apply Calibri font to all cells
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    row.eachCell((cell) => {
      cell.font = { name: "Calibri", size: 12 };
    });
  });

  // Generate Excel file buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Save file
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
};
