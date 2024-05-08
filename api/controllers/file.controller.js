import {parse} from '../utils/parse.js';
import {handleTag, handleWPSTag} from '../utils/handleJSON.js';
import XLSX from 'xlsx';

export const uploadFile = async (req, res, next) => {
  try {
    const fileData = parse(`./api/files/${req.file.filename}`); // Data of the parsed spreadsheet in JSON format. It's an array of objects.
    const workBook = XLSX.utils.book_new();

    for (let i = 0; i < fileData.length; i++) {
      const handledNonWPSJSONData = handleTag(fileData[i].data);
      const handledWPSJSONData = handleWPSTag(fileData[i].data);
      const handledJSONData = [...handledNonWPSJSONData, ...handledWPSJSONData];

      const workSheet = XLSX.utils.json_to_sheet(handledJSONData);
      XLSX.utils.book_append_sheet(workBook, workSheet, fileData[i].name);
      XLSX.write(workBook, {bookType: "csv", type: "buffer"});
      XLSX.write(workBook, {bookType: "csv", type: "binary"});
    }
    XLSX.writeFile(workBook, `./api/outputs/Output_${req.file.filename}`);
    res.status(201).json(`Output_${req.file.filename}`);

  } catch(error) {
    next(error);
  }
};

export const downloadFile = async (req, res, next) => {
  try {
    const filePath = "./api/outputs/" + req.params.filename;
    res.download(filePath);
  } catch (error) {
    next(error);
  }
};
