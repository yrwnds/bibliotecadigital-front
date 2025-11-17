import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {env} from '../../environment/environment.prod';
import {Usuario} from '../models/usuario'
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient){
  }

  getAll(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(env.apiUrl + '/usuarios/listar');
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(env.apiUrl + '/usuarios', usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(env.apiUrl + '/usuarios', usuario);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(env.apiUrl + '/usuarios/' + id);
  }
}
