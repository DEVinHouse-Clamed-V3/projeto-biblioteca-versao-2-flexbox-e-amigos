import { Router } from "express";
import asyncHandler from "express-async-handler";
import { livroController } from "../controllers/LivroController";

const livroRoutes = Router();

livroRoutes.post("/", asyncHandler(livroController.createBook));
livroRoutes.get("/", asyncHandler(livroController.getAllBooks));
livroRoutes.get("/:id", asyncHandler(livroController.getBookById));
livroRoutes.put("/:id", asyncHandler(livroController.updateBook));
livroRoutes.delete("/:id", asyncHandler(livroController.deleteBook));
livroRoutes.get("/ranking", asyncHandler(livroController.getRanking));

export default livroRoutes;
