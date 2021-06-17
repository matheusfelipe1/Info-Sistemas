import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../veiculo.model';
import { VeiculosService } from '../veiculos.service';

@Component({
  selector: 'app-veiculos-read',
  templateUrl: './veiculos-read.component.html',
  styleUrls: ['./veiculos-read.component.css']
})
export class VeiculosReadComponent implements OnInit {

    veiculos: Veiculo[] = [];
    displayedColumns = ['id', 'modelo', 'marca', 'ano', 'ver'];
    constructor(private veiculosService: VeiculosService) { }

    ngOnInit(): void {
      /**
       * como já dito sobre a propriedade deste ngOnInit, aqui eu apenas
       * declarei um Array de veiculos e busquei os dados da requisição get()
       * e os listei dentro de um array e usando o displayColumns eu consigo renderizar isso em 
       * uma tabela no material
       */
      this.veiculosService.get().subscribe(veiculos => {
          this.veiculos = veiculos
          
          
      })
    }
    

}
