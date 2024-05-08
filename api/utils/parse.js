import XLSX from "xlsx";

export const parse = (filename) => {
    const excelData = XLSX.readFile(filename);

    /*
      excelData.Sheets is an object shown as below:
        {
            SheetNames: ["Sheet1", "Sheet2", ...],
            Sheets: {
                Sheet1: {Sheet1's data},
                Sheet2: {Sheet2's data},
                ...
            }
        }

    */
    return Object.keys(excelData.Sheets).map(name => ({
        name,
        data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    }));
};