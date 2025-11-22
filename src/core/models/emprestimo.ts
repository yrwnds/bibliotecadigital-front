import {Livro} from './livro';
import {Usuario} from './usuario';

export interface Emprestimo{
  id: number;
  livro: Livro;
  usuario: Usuario;
  datapego: Date;
  dataprazo: Date;
  status: string;
  qt_renovacoes: number;
}
