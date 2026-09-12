import {Router} from "express"
import authenticate from "../middleware/auth.middleware";
import {createProduct} from ""
import multer from "multer"

const upload = multer({
    Storage: multer.memoryStrorage()
})


const router = Router()

router.post("/", authenticate, upload.array("images", 5), createProduct)

export default router

