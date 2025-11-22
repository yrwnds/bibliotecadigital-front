import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {UsuarioService} from '../../../core/services/usuario-service';
import {Usuario} from '../../../core/models/usuario';
import {Router, RouterLink} from '@angular/router';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardActions} from '@angular/material/card';

@Component({
  selector: 'app-registrar-component',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatCardActions,
    RouterLink,
    MatLabel,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './registrar-component.html',
  styleUrl: './registrar-component.css',
})

export class RegistrarComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService : UsuarioService, private router: Router){
    this.form = this.fb.group(
      {
        nome: [null, [Validators.required]],
        matricula: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        identificador: ['User', [Validators.required]],
        senha: [null, [Validators.required]]
      }
    )
  }


  adicionarUsuario(){
    console.log('Validando form...');
    if (this.form.valid){
      const {nome, email, matricula, identificador, senha} = this.form.value;
      this.usuarioService.create({nome, email, matricula, identificador, senha} as Usuario).subscribe(
        {
          next: () => {
            console.log('Criou com sucesso.');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Erro ao adicionar usuario: ', err);
          }
        }
      )
    } else{
      console.log('Form não valida');
    }
  }


}
