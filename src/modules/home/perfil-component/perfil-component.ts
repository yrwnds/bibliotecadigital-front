import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Livro} from '../../../core/models/livro';
import {LivroService} from '../../../core/services/livro-service';
import {EmprestimoService} from '../../../core/services/emprestimo-service';
import {Emprestimo} from '../../../core/models/emprestimo';
import {AuthService} from '../../../core/services/auth-service';

@Component({
  selector: 'app-perfil-component',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatIcon
  ],
  templateUrl: './perfil-component.html',
  styleUrl: './perfil-component.css',
})
export class PerfilComponent {

  liv: Livro[] = [];
  emprestimo: Emprestimo[] = []
  errorMessage = ''

  constructor(private livroService : LivroService, private emprestimoService : EmprestimoService, private authService : AuthService){
  }

  ngOnInit() {
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

    this.emprestimoService.getAll().subscribe(
      {
        next: (emprestimos) => {
          this.emprestimo = emprestimos;
        },
        error: (err) => {
          console.error('Erro ao buscar livros: ', err);
        }
      }
    )
  }

  devolver(livroid: number, usuid: number){

    const livrostring = livroid.toString()
    const usustring = usuid.toString()

    this.emprestimoService.devolver(livrostring, usustring, {} as Emprestimo).subscribe({
        next: () => {
          console.log('Devolveu com sucesso.')
          this.ngOnInit()
        },
        error: (err) => {
          console.error('Erro devolvendo: ' + err);
          this.errorMessage = JSON.stringify(err).split(',')[12];
        }
      }
    )
  }

  renovar(livroid: number, usuid: number){
    const livrostring = livroid.toString()
    const usustring = usuid.toString()

    this.emprestimoService.renovar(livrostring, usustring, {} as Emprestimo).subscribe({
        next: () => {
          console.log('Renovou com sucesso.')
          this.ngOnInit()
        },
        error: (err) => {
          console.error('Erro renovando: ', err);
          this.errorMessage = "ERRO: "+ JSON.stringify(err).split(',')[12];
        }
      }
    )
  }

  protected getMat() {
    return this.authService.getUserMat();
  }

}
