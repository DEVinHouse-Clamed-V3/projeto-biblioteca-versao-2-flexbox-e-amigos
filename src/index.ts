import express, { Application } from "express";
import cors from "cors";
import livroRoutes from "./routes/livro.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/livros", livroRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
