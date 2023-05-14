import {Router} from "express";
import goodController from "../controllers/goodController.js";

const router = new Router();

router.post('/',goodController.create);
router.get('/',goodController.getAll);
router.get('/:id',goodController.getOne);

export default router;