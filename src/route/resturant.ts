import express from 'express';
const router = express.Router();
import Resturant from '../controller/resturantController';

router.post('/restaurant/create', Resturant.createRestaurant);
router.get('/restaurant/list', Resturant.getAllRestaurants);
router.put('/restaurant/update/:id', Resturant.updateRestaurant);
router.delete('/restaurant/delete/:id', Resturant.deleteRestaurant);
router.put('/restaurant/:id/assign-manager', Resturant.assignManager);

export default router;
