import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculosService } from '../veiculos.service';

@Component({
  selector: 'app-update-veiculos',
  templateUrl: './update-veiculos.component.html',
  styleUrls: ['./update-veiculos.component.css']
})
export class UpdateVeiculosComponent implements OnInit {
  

 
  constructor(private router: ActivatedRoute,
    private route: Router, private serviceVeiculos: VeiculosService) { }

    veiculos: any
    veiculo : any
    /**
     * essas  variáveis do tipo any, foram incluídas para que possa receber os valores dos
     * campos pré preenchidos e também atualizar para novos e assim serem renderizados no corpo
     */

  ngOnInit(): void {
    /**
     * esta função é a função de início , como no react usamos JSX usamos o componentDidMount(){}
     * para que assim que o componente for inicializado seja chamada , no Angular com o TypeScript
     * usamos o ngOnInit... essa função no momento está buscando os dados no getById passado através da url 
     * para que assim nos campos da atualização , quando acessarmos o componente de atualização,
     * ele irá vir com os campos pré-preenchidos.
     */
    const urlId = this.router.snapshot.paramMap.get('id')
    const id = String (urlId)
    this.serviceVeiculos.getById(id).subscribe(data => {
      this.veiculos = data
      this.veiculo = this.veiculos[0]
    })
  }
  update(): void {
    /**
     * esta primeira parte da função verifíca se os valores estão nulos, caso esteja
     * é retornado um erro a função não prossegue enquanto a regularização não for feita
     */
    if(this.veiculo.placa.length === 0
      && typeof this.veiculo.placa === 'string'
      && !this.veiculo.placa.trim()) return this.serviceVeiculos.showMessage('Placa não informada!')
    if(this.veiculo.chassi.length === 0
      && typeof this.veiculo.chassi === 'string'
      && !this.veiculo.chassi.trim()) return this.serviceVeiculos.showMessage('Chassi não informado!')
    if(this.veiculo.renavam.length === 0
      && typeof this.veiculo.renavam === 'string'
      && !this.veiculo.renavam.trim()) return this.serviceVeiculos.showMessage('Renavam não informado!')
    if(this.veiculo.modelo.length === 0
      && typeof this.veiculo.modelo === 'string'
      && !this.veiculo.modelo.trim()) return this.serviceVeiculos.showMessage('Modelo não informado!')
    if(this.veiculo.marca.length === 0
      && typeof this.veiculo.marca === 'string'
      && !this.veiculo.marca.trim()) return this.serviceVeiculos.showMessage('Marca não informada!')
    if(this.veiculo.ano.length === 0
      && typeof this.veiculo.ano === 'string'
      && !this.veiculo.ano.trim()) return this.serviceVeiculos.showMessage('Ano não informado!')
      /**
       * Aqui é o algoritmo de atualização em si, depois que ele verifica se os valores não estão nulos,
       * ele prossegue com a função e eu estou usando esta função "confirm()" para que o usuário tenha
       * certeza de deseja alterar os dados e caso ela for verdadeira ele faz a alteração
       */

   if(confirm('Realmente deseja alterar este veículo?')){
    this.serviceVeiculos.update(this.veiculo, this.veiculo.id).toPromise().then(() =>{
     this.serviceVeiculos
     .showMessage(`Veículo ${this.veiculo.marca} ${this.veiculo.modelo} atualizado com sucesso`)
      this.route.navigate(['/veiculos'])
    }).catch(() =>  this.serviceVeiculos
    .showMessage('Estes dados já se encontram em nosso banco de dados! Revise-os e tente novamente'))
   }
  }
  /**
   * na função cancelar, quando o usuário clicar em cancelar ele vai simplesmente navegar 
   * ate a tela de veiculos.
   */
  cancelar(): void {
    this.route.navigate(['/veiculos'])
  }

}
