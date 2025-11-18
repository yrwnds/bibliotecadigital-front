import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario';
import {env} from '../../environment/environment.prod';
import {Categoria} from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private httpClient: HttpClient){
  }

  getAll(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(env.apiUrl + '/categorias/listar');
  }
}
