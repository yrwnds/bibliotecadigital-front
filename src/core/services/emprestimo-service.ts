import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Emprestimo} from '../models/emprestimo';
import {env} from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {

  constructor(private httpClient : HttpClient){
  }

  emprestar(livroid: string, usuid: string, emprestimo : Emprestimo): Observable<Emprestimo>{
    return this.httpClient.post<Emprestimo>(env.apiUrl + '/emprestimos/emprestar/' + livroid + '/' + usuid, emprestimo);
  }

  getAll(): Observable<Emprestimo[]>{
    return this.httpClient.get<Emprestimo[]>(env.apiUrl + '/emprestimos/listar');
  }

  buscarId(searchterm : string): Observable<Emprestimo[]>{
    return this.httpClient.get<Emprestimo[]>(env.apiUrl + '/emprestimos/' + searchterm);
  }

}
