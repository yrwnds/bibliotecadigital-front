import { Component } from '@angular/core';
import {Categoria} from '../../../core/models/categoria';
import {CategoriaService} from '../../../core/services/categoria-service';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {LivroService} from '../../../core/services/livro-service';
import {Livro} from '../../../core/models/livro';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  cat: Categoria[] = [];
  liv: Livro[] = [];
  constructor(private categoriaService : CategoriaService, private livroService : LivroService){
  }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      {
        next: (categorias) => {
          this.cat = categorias;
        },
        error: (err) => {
          console.error('Erro ao buscar categorias: ', err);
        }
      }
    )
    this.livroService.getAllTitulo().subscribe(
      {
        next: (livros) => {
          this.liv = livros;
        },
        error: (err) => {
          console.error('Erro ao buscar livros: ', err);
        }
      }
    )
  }

  buscar(searchterm: string){
    console.log('searchterm: ', searchterm);
    if(searchterm === ""){
      this.ngOnInit()
    } else{
      this.livroService.buscar(searchterm).subscribe(
        {
          next: (livros) => {
            this.liv = livros;
          },
          error: (err) => {
            console.error('Erro ao encontrar livros: ', err);
          }
        }
      )
    }
  }

  filtrarcategoria(categoria: string){
    console.log('cat: ', categoria);
    if(categoria === "Todas"){
      this.ngOnInit()
    } else{
      this.livroService.filtrarCategoria(categoria).subscribe(
        {
          next: (livros) => {
            this.liv = livros;
          },
          error: (err) => {
            console.error('Erro ao encontrar livros: ', err);
          }
        }
      )
    }
  }

  getalltitulo(){
    this.livroService.getAllTitulo().subscribe(
      {
        next: (livros) => {
          this.liv = livros;
        },
        error: (err) => {
          console.error('Erro ao buscar livros: ', err);
        }
      }
    )
  }

  getallautor(){
    this.livroService.getAllAutor().subscribe(
      {
        next: (livros) => {
          this.liv = livros;
        },
        error: (err) => {
          console.error('Erro ao buscar livros: ', err);
        }
      }
    )
  }

  getallanoasc(){
    this.livroService.getAllAnoAsc().subscribe(
      {
        next: (livros) => {
          this.liv = livros;
        },
        error: (err) => {
          console.error('Erro ao buscar livros: ', err);
        }
      }
    )
  }

  getallanodesc(){
    this.livroService.getAllAnoDesc().subscribe(
      {
        next: (livros) => {
          this.liv = livros;
        },
        error: (err) => {
          console.error('Erro ao buscar livros: ', err);
        }
      }
    )
  }

}
