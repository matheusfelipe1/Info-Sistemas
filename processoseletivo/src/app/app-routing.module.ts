import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component'
import {VeiculosComponent} from './views/veiculos/veiculos.component'
import {VeiculosCreateComponent} from './components/veiculos/veiculos-create/veiculos-create.component'
import {VeiculosReadByIdComponent} from './components/veiculos/veiculos-read-by-id/veiculos-read-by-id.component'
import { UpdateVeiculosComponent } from './components/veiculos/update-veiculos/update-veiculos.component';
/**
 * Aqui contém todas as nossas rotas no frontend, cada component aqui renderiza algo em tela 
 * dentro do content, assim não precisamos ficar criando headers e headers , navs e navs para mostrar 
 * uma tela, será exibido apenas dentro do content cada component que for solicitado através do path.
 */
const routes: Routes = [{
  path: "",
  component: HomeComponent
},{
  path: "veiculos",
  component: VeiculosComponent
}, {
  path:'veiculos/create',
  component: VeiculosCreateComponent
}, {
  path: 'veiculos/showbyid/:id',
  component: VeiculosReadByIdComponent
}, {
  path: 'veiculos/update/:id',
  component: UpdateVeiculosComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
