import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Emprestimo} from '../../../core/models/emprestimo';
import {EmprestimoService} from '../../../core/services/emprestimo-service';

@Component({
  selector: 'app-emprestimos-component',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatIcon,
  ],
  templateUrl: './emprestimos-component.html',
  styleUrl: './emprestimos-component.css',
})
export class EmprestimosComponent {

  dados: Emprestimo[] = [];

  constructor(private emprestimoService : EmprestimoService){
  }


  ngOnInit() {
    this.emprestimoService.getAll().subscribe(
      {
        next: (emprestimos) => {
          this.dados = emprestimos;
        },
        error: (err) => {
          console.error('Erro ao buscar usuarios: ', err);
        }
      }
    )
  }

}
