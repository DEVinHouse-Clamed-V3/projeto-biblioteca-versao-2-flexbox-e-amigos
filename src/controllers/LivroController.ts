import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Livro } from "../entities/Livro";
import { Repository } from "typeorm";

class LivroController {
  private livroRepository: Repository<Livro>;

  constructor() {
    this.livroRepository = AppDataSource.getRepository(Livro);
  }

  async createBook(req: Request, res: Response) {
    const { title, description, publication_date, isbn, page_count, language } = req.body;
    const livro = this.livroRepository.create({
      title,
      description,
      publication_date,
      isbn,
      page_count,
      language,
    });
    await this.livroRepository.save(livro);
    res.status(201).json(livro);
  }

  async getAllBooks(req: Request, res: Response) {
    const { title, language } = req.query;
    const query = this.livroRepository.createQueryBuilder("livro");
    if (title) query.andWhere("livro.title ILIKE :title", { title: `%${title}%` });
    if (language) query.andWhere("livro.language = :language", { language });
    const livros = await query.getMany();
    res.json(livros);
  }

  async getBookById(req: Request, res: Response) {
    const { id } = req.params;
    const livro = await this.livroRepository.findOne({ where: { id: Number(id) } });
    if (!livro) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }
    res.json(livro);
  }

  async updateBook(req: Request, res: Response) {
    const { id } = req.params;
    const livro = await this.livroRepository.findOne({ where: { id: Number(id) } });
    if (!livro) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }
    const updatedLivro = this.livroRepository.merge(livro, req.body);
    await this.livroRepository.save(updatedLivro);
    res.json(updatedLivro);
  }

  async deleteBook(req: Request, res: Response) {
    const { id } = req.params;
    const livro = await this.livroRepository.findOne({ where: { id: Number(id) } });
    if (!livro) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }
    await this.livroRepository.remove(livro);
    res.json({ message: "Livro removido com sucesso" });
  }

  async getRanking(req: Request, res: Response) {
    const ranking = await this.livroRepository
      .createQueryBuilder("livro")
      .select(["livro.language", "livro.title", "livro.page_count"])
      .orderBy("livro.page_count", "DESC")
      .limit(3)
      .getMany();
    res.json(ranking);
  }
}

export const livroController = new LivroController();
