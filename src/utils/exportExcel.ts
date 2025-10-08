import * as XLSX from "xlsx";

type SheetData = {
  name: string;
  data: Record<string, any>[];
};

export const exportToExcel = (
  sheets: Record<string, any>[] | SheetData[],
  fileName: string
) => {
  const workbook = XLSX.utils.book_new();

  if (Array.isArray(sheets) && sheets.length > 0 && !("name" in sheets[0])) {
    const worksheet = XLSX.utils.json_to_sheet(sheets as Record<string, any>[]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  } else {
    (sheets as SheetData[]).forEach((sheet) => {
      const worksheet = XLSX.utils.json_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    });
  }

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
