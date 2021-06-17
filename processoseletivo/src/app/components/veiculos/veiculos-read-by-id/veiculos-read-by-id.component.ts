import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Veiculo } from '../veiculo.model';
import { VeiculosService } from '../veiculos.service';

@Component({
  selector: 'app-veiculos-read-by-id',
  templateUrl: './veiculos-read-by-id.component.html',
  styleUrls: ['./veiculos-read-by-id.component.css']
})
export class VeiculosReadByIdComponent implements OnInit {


  veiculos: any
  veiculo: any


  constructor(private veiculoService: VeiculosService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    /**
     * aqui eu apenas declarei uma variavel do tipo Any e busquei os dados da requisição getById()
       * e os concatenei dentro de um objeto, mas antes disso , para chegar neste componente aqui,
       * deve ser passado um ID, pois este component aqui so consegue ser renderizado se houver um 
       * id setado na URL, sendo assim usei este algoritmo abaixo para buscar o ID setado e assim 
       * usar ele para ser o parametro do getById() e buscar apenas um objeto.
     */
   const urlId = this.route.snapshot.paramMap.get('id')
   const idStr = String (urlId)
    this.veiculoService.getById(idStr).subscribe(data => {
      this.veiculos = data
      this.veiculo = this.veiculos[0]
    })
   
  }
  /**
   * na função abaixo é feito a navegação para o update e podemos que um 
   * id o {{ row.id }} foi passado para a url.
   */
  update(id: number){
    this.router.navigate([`/veiculos/update/${id}`])
  }

  /**
   * Na função abaixo é passado um ID também e é usado um confirm()
   * que caso o confirm() seja TRUE ele irá excluir os dados contidos 
   * naquele registro do ID.
   */
  remove(id: string){
    if (window.confirm("Você realmente deseja excluir este veículo?")) {
        this.veiculoService.delete(id).subscribe(() => {
        this.router.navigate(['/veiculos'])
        this.veiculoService.showMessage('Veículo removido com sucesso!')
      })
    }
  }
}
