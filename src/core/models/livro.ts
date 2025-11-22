import {Categoria} from './categoria';

export interface Livro {
  isbn?: number;
  titulo?: string;
  autor?: string;
  categoria?: Categoria;
  anopublicado?: number;
  linguagem?: string;
  n_exemplares?: number;
  n_disponivel?: number;
}
