import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deletCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";

const router = express.Router();

//routes
//Create Category
router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);

//Update Category

router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

//getAll Category

router.get('/get-category', categoryController)
//single category

router.get('/single-category/:slug', singleCategoryController)

//delete catgory
router.delete('/delete-category/:id', requireSignin, isAdmin, deletCategoryController)

export default router;
