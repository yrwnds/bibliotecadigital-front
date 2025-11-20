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

  getAllAutor(): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(env.apiUrl + '/livros/listar/autor');
  }

  getAllAnoAsc(): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(env.apiUrl + '/livros/listar/anopublicado/asc');
  }

  getAllAnoDesc(): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(env.apiUrl + '/livros/listar/anopublicado/desc');
  }

  create(livro: Livro): Observable<Livro> {
    return this.httpClient.post<Livro>(env.apiUrl + '/livros', livro);
  }

  update(livro: Livro): Observable<Livro> {
    return this.httpClient.put<Livro>(env.apiUrl + '/livros', livro);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(env.apiUrl + '/livros/' + id);
  }

  buscar(searchterm : string): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(env.apiUrl + '/livros/buscar/' + searchterm);
  }

  filtrarCategoria(categoria : string): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(env.apiUrl + '/livros/buscar/categoria/' + categoria)
  }

  filtrarLinguagem(linguagem : string): Observable<Livro[]>{
    return this.httpClient.get<Livro[]>(env.apiUrl + '/livros/buscar/linguagem/' + linguagem);
  }



}

