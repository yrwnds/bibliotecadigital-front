import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Usuario} from '../../../core/models/usuario';
import {UsuarioService} from '../../../core/services/usuario-service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-aluno-component',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatIcon
  ],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})
export class UsuarioComponent implements OnInit {

  isEditando = false;

  form: FormGroup;

  dados: Usuario[] = [];

  constructor(private fb: FormBuilder, private usuarioService : UsuarioService){
    this.form = this.fb.group(
      {
        id: [null],
        nome: [null, [Validators.required]],
        matricula: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        identificador: [null, [Validators.required]]
      }
    )
  }

  ngOnInit() {
    this.usuarioService.getAll().subscribe(
      {
        next: (usuarios) => {
          this.dados = usuarios;
        },
        error: (err) => {
          console.error('Erro ao buscar usuarios: ', err);
        }
      }
    )
  }

  adicionarUsuario(){
    if (this.form.valid){
      const {nome, email} = this.form.value;
      this.usuarioService.create({nome, email} as Usuario).subscribe(
        {
          next: (usuarios) => {
            this.dados = [...this.dados, usuarios];
            this.form.reset();
          },
          error: (err) => {
            console.error('Erro ao adicionar usuario: ', err);
      }
        }
      )
    }
  }

  protected excluirUsuario(usuario: Usuario){
    this.usuarioService.delete(usuario.id as number).subscribe(
      {
        next: () => {
          this.dados = this.dados.filter(dado => dado.id !== usuario.id)
        },
        error: (err) =>{
          console.error('Erro ao excluir: ', err);
        }
      }
    )
  }

  protected editarUsuario(usuario: Usuario){
    this.isEditando = true;

    this.form.setValue({
      id: usuario.id,
      nome: usuario.nome,
      matricula: usuario.matricula,
      email: usuario.email
    });
  }

  protected atualizarUsuario(){
    if (this.form.valid && this.isEditando){
      const usuario : Usuario = this.form.value;
      this.usuarioService.update(usuario).subscribe({
        next: (usuarioAtualizado) => {
          this.dados = this.dados.map(dado => dado.id === usuario.id ? usuarioAtualizado : dado);
          this.isEditando = false;
          this.form.reset();
        },
        error: (err) => {
          console.error('Erro ao atualizar usuario: ', err);
        }
      })
    }
  }

}
