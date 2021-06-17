import { Component, OnInit } from '@angular/core';
import { VeiculosService } from '../veiculos.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-veiculos-create',
  templateUrl: './veiculos-create.component.html',
  styleUrls: ['./veiculos-create.component.css']
})
export class VeiculosCreateComponent implements OnInit {

  veiculos = {
      
      placa: "",
      chassi: "",
      renavam: "",
      modelo: "",
      marca: "",
      ano: ""
  }
    /**
     * Eu criei este objeto para que o ngModel e o name no HTML recebam um valor
     * e que posteriormente ele ganhe forma através dos input e depois armazenados e postos em prol
     * do create para fazer a imerssão dos dados no backend.
     */

  constructor(private veiculoService: VeiculosService, private router: Router) { }

  ngOnInit(): void {}

  createVeiculos(): void {
          
          /**
           * esta primeira parte da função verifíca se os valores estão nulos, caso esteja
           * é retornado um erro a função não prossegue enquanto a regularização não for feita
           */

      if(this.veiculos.placa.length === 0
        && typeof this.veiculos.placa === 'string'
        && !this.veiculos.placa.trim()) return this.veiculoService.showMessage('Placa não informada!')
      if(this.veiculos.chassi.length === 0
        && typeof this.veiculos.chassi === 'string'
        && !this.veiculos.chassi.trim()) return this.veiculoService.showMessage('Chassi não informado!')
      if(this.veiculos.renavam.length === 0
        && typeof this.veiculos.renavam === 'string'
        && !this.veiculos.renavam.trim()) return this.veiculoService.showMessage('Renavam não informado!')
      if(this.veiculos.modelo.length === 0
        && typeof this.veiculos.modelo === 'string'
        && !this.veiculos.modelo.trim()) return this.veiculoService.showMessage('Modelo não informado!')
      if(this.veiculos.marca.length === 0
        && typeof this.veiculos.marca === 'string'
        && !this.veiculos.marca.trim()) return this.veiculoService.showMessage('Marca não informada!')
      if(this.veiculos.ano.length === 0
        && typeof this.veiculos.ano === 'string'
        && !this.veiculos.ano.trim()) return this.veiculoService.showMessage('Ano não informado!')

        /**
         * Essa função faz a imerssão dos dados no backend e caso ocorra algum erro,
         * ele será retornado! até então ele manda uma requisição para o backend e depois que a 
         * imerssão dos dados é feita , ele navega para tela de veiculos.
         */
      this.veiculoService.create(this.veiculos).toPromise().then(() => {
          this.veiculoService.showMessage(`Veículo ${this.veiculos.marca}
          ${this.veiculos.modelo} cadastrado com sucesso!`)
          this.router.navigate(['/veiculos'])
        }).catch(() =>
        this.veiculoService.showMessage('Veículo já cadastrado!'))

  }



  cancelarVeiculo(): void {
       this.router.navigate(['/veiculos'])
  }

}
