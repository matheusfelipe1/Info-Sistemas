import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import {HttpClient} from '@angular/common/http'
import {Veiculo} from './veiculo.model'
import { Observable } from 'rxjs';
import { isEmptyExpression } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  baseUrl = "http://localhost:3000"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient, private route: Router) { }
    /*
    * este showMessage é uma função que eu implementei afim de mostrar algo que foi realizado nas
    * requisições ou nos mostrar os erros os quais foram obtidos nas requisição.
     */
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }
  /**
   * Todas estas funções abaixos fazem requisições com o backend através dos seus métodos
   * (GET, POST, UPDATE e DELETE) cada uma realiza sua requisição e é esperado o retorno
   * o qual elas pretende nos entregar.
   */

  create(veiculos: Veiculo)  { 
      return  this.http.post(`${this.baseUrl}/veiculos`, veiculos)
  }

  get():Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.baseUrl}/veiculos`)
  }

  getById(id: string): Observable<Veiculo> {
    const url = `${this.baseUrl}/veiculos/${id}`
    return this.http.get<Veiculo>(url)
  }

  update(veiculos: Veiculo, id: number){
    return this.http.put(`${this.baseUrl}/veiculos/${id}`, veiculos)
  }

  delete(id: string){
    return this.http.delete(`${this.baseUrl}/veiculos/${id}`);
  }

}
