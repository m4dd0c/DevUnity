import multer from "multer";

const imageInterceptor = multer({
  storage: multer.memoryStorage(),
}).single("avatar");
export default imageInterceptor;
