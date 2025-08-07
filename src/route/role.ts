
import express from "express";
const router = express.Router();
import Role from "../controller/roleController"


router.get('/role/list', Role.getAllRoles);
router.get('/role/:id', Role.getRoleById);
router.post('/role/create', Role.createRole);
router.put('/role/update/:id', Role.updateRole);
router.delete('/role/delete/:id', Role.deleteRole);

export default router;

