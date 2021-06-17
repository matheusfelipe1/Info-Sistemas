import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})
export class VeiculosComponent implements OnInit {

  constructor(private route: Router, 
     ) { }

  ngOnInit(): void {

  }

  navigateToCreate(): void {
    this.route.navigate(['/veiculos/create'])
  }

  

}
