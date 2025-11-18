import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {env} from '../../environment/environment.prod';
import {Livro} from '../models/livro';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  constructor(private httpClient: HttpClient){
  }

  getAllTitulo(): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(env.apiUrl + '/livros/listar/titulo');
  }
}
