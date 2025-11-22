import {Component} from '@angular/core';
import {Categoria} from '../../../core/models/categoria';
import {CategoriaService} from '../../../core/services/categoria-service';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {LivroService} from '../../../core/services/livro-service';
import {Livro} from '../../../core/models/livro';
import {UsuarioService} from '../../../core/services/usuario-service';
import {AuthService} from '../../../core/services/auth-service';
import {EmprestimoService} from '../../../core/services/emprestimo-service';
import {Usuario} from '../../../core/models/usuario';
import {Emprestimo} from '../../../core/models/emprestimo';

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

  errorMessage: string = '';
  cat: Categoria[] = [];
  liv: Livro[] = [];

  constructor(private categoriaService: CategoriaService, private livroService: LivroService, private usuarioService: UsuarioService, private authService: AuthService, private emprestimoService: EmprestimoService) {
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

  buscar(searchterm: string) {
    console.log('searchterm: ', searchterm);
    if (searchterm === "") {
      this.ngOnInit()
    } else {
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

  filtrarcategoria(categoria: string) {
    console.log('cat: ', categoria);
    if (categoria === "Todas") {
      this.ngOnInit()
    } else {
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

  getalltitulo() {
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

  getallautor() {
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

  getallanoasc() {
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

  getallanodesc() {
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

  emprestimo(isbn: number) {
    const livroid: string = isbn.toString()

    let usurecebido: Usuario = {}

    const usuarioobserv = this.usuarioService.buscarPorMatricula(this.getMat())


    let usuid : string;

    usuarioobserv.subscribe(
      {
        next: (usu: Usuario) => {
          usurecebido = usu;
          if(usurecebido.id){
            usuid = usurecebido.id.toString();

            console.log('usuid: ', usuid)
            console.log('isbn: ', livroid)

            this.emprestimoService.emprestar(livroid, usuid, {} as Emprestimo).subscribe(
              {
                next: () => {
                  console.log('Emprestou com sucesso.');
                  this.errorMessage = "Succeso."
                },
                error: (err) => {

                  this.errorMessage = "ERRO OCORREU: " + JSON.stringify(err).split(',')[12].split(':')[1]
                  console.error('Erro ao emprestar: ', err);
                }
              }
            );
          }
        }
      }
    )
  }

  protected getMat() {
    return this.authService.getUserMat();
  }

}
