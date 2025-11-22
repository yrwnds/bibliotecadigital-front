import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Livro} from '../../../core/models/livro';
import {LivroService} from '../../../core/services/livro-service';
import {Categoria} from '../../../core/models/categoria';
import {CategoriaService} from '../../../core/services/categoria-service';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-livros-component',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatIcon,
    MatOption,
    MatSelect
  ],
  templateUrl: './livros-component.html',
  styleUrl: './livros-component.css',
})
export class LivrosComponent {

  errorMessage = '';

  successMessage = '';

  isEditando = false;

  form: FormGroup;

  dados: Livro[] = [];

  categorias: Categoria[] = [];

  constructor(private fb: FormBuilder, private livroService : LivroService, private categoriaService : CategoriaService){
    this.form = this.fb.group(
      {
        isbn: [null],
        titulo: [null, [Validators.required]],
        autor: [null, [Validators.required]],
        anopublicado: [null, [Validators.required]],
        categoria: [null, [Validators.required]],
        linguagem: [null, [Validators.required]],
        n_exemplares: [null, [Validators.required]],
        n_disponivel: 5
      }
    )
  }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      {
        next: (categorias) => {
          this.categorias = categorias;
        },
        error: (err) => {
          console.error('Erro ao buscar categorias: ', err);
        }
      }
    )
    this.livroService.getAllTitulo().subscribe(
      {
        next: (livros) => {
          this.dados = livros;
        },
        error: (err) => {
          console.error('Erro ao buscar livros: ', err);
        }
      }
    )
  }


  protected excluirLivro(livro: Livro){
    this.livroService.delete(livro.isbn as number).subscribe(
      {
        next: () => {
          this.dados = this.dados.filter(dado => dado.isbn !== livro.isbn)
        },
        error: (err) =>{
          this.errorMessage = "ERRO OCORREU: " + JSON.stringify(err)
          console.error('Erro ao excluir: ', err);
        }
      }
    )
  }

  protected editarLivro(livro: Livro){
    this.isEditando = true;

    this.form.setValue({
      isbn: livro.isbn,
      titulo: livro.titulo,
      autor: livro.autor,
      anopublicado: livro.anopublicado,
      categoria: livro.categoria,
      linguagem: livro.linguagem,
      n_exemplares: livro.n_exemplares,
      n_disponivel: livro.n_exemplares
      })
  }


  protected atualizarLivro(){
    if (this.form.valid){
      const {isbn, titulo, autor, anopublicado, categoria, linguagem, n_exemplares, n_disponivel} = this.form.value;
      this.livroService.update({isbn, titulo, autor, anopublicado, categoria, linguagem, n_exemplares, n_disponivel}).subscribe({
        next: (livroAtualizado) => {
          this.dados = this.dados.map(livro => livro.isbn === isbn ? livroAtualizado : livro);
          this.resetForm();
        },
        error: (err) => {
          this.errorMessage = "ERRO OCORREU: " + JSON.stringify(err)
          console.error('Erro ao atualizar livro: ', err);
        }
      })
    }
  }



  adicionarLivro(){
    console.log('Validando form adicionarlivro...');
    console.log('dados: ' + JSON.stringify(this.form.value))
    if (this.form.valid){
      const{isbn, titulo, autor, anopublicado, categoria, linguagem, n_exemplares, n_disponivel}= this.form.value;
      this.livroService.create({isbn, titulo, autor, anopublicado, categoria, linguagem, n_exemplares, n_disponivel} as Livro).subscribe(
        {
          next: () => {
            console.log('Criou com sucesso.');
            this.successMessage = "Sucesso."
            this.ngOnInit()
          },
          error: (err) => {
            this.errorMessage = "ERRO OCORREU: " + JSON.stringify(err)
            console.error('Erro ao adicionar livro: ', err);
          }
        }
      )
    } else{
      console.log('Form não valida');
    }
  }

  resetForm() {
    this.form.reset();
    this.isEditando = false;
  }
}
