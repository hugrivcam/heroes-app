import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { InteractivityChecker } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{
    //a: HeroesService
    public listaHeroes: Hero[] = [];
    constructor(private hs: HeroesService){}//injeccion del servicio en el constructor

    ngOnInit(): void {
      this.hs.getHeroes().subscribe(listaHeroes=> this.listaHeroes = listaHeroes);
    }

}
