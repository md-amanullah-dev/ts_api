
import express from "express";
const router = express.Router();
import User from "../controller/userController"


router.get('/user/list', User.getAllUsers);
router.get('/user/:id', User.getUserById);
router.post('/user/create', User.createUser);
router.put('/user/update/:id', User.updateUser);
router.delete('/user/delete/:id', User.deleteUser);

export default router;
