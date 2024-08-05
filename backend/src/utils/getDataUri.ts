import DataURIParser from "datauri/parser.js";
import path from "path";

// changing file buffer into base64
const getDataUri = (file: Express.Multer.File) => {
  const dataUriParser = new DataURIParser();
  // since formatting requires extension of file for mime
  const extension = path.extname(file.originalname).toString();
  return dataUriParser.format(extension, file.buffer);
};
export default getDataUri;
