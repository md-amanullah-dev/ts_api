import express from 'express';
import Menu from '../controller/menuController';

const router = express.Router();

router.post('/menu/:restaurantId/create', Menu.addMenuItem);
router.get('/menu/:restaurantId/list', Menu.getMenuByRestaurant);
router.put('/menu/:menuId/update', Menu.updateMenuItem);
router.delete('/menu/:menuId/delete', Menu.deleteMenuItem);

export default router;
