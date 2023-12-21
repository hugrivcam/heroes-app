import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
//import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  //no necesito view child ni nah de eso con forms reactivos por lo que veo
  public searchInput = new FormControl('');//creo un puntero a un control, esta referenciado en el html mediante la propiedad [formControl] que se importa en nuestro modulo con reactiveFormsModule
  public heroes: Hero[] = [];
  public selectedHero?:Hero;

  constructor(private hs: HeroesService,private r:Router){}

  searchHero(){
      const value: string = this.searchInput.value || ''; //si value es null entonces se devuelve ''
      //console.log({value});
      this.hs.getBuscarHeroes(value).subscribe(listaHeroes => this.heroes = listaHeroes) ; //obtengo mi lista de heroes
      //console.log(this.heroes);
  }
  onSelectedHeroe(event:MatAutocompleteSelectedEvent):void{
    //console.log(event.option.value);
    const h:Hero = event.option.value;//event.option.value es de tipo any y se ve en la documentación en algun lugar muy muy lejano de angular material
    if (event.option.value){
      this.selectedHero = event.option.value;
      this.searchInput.setValue(h.superhero);
      this.r.navigateByUrl('/heroes/'+h.id);
    }
    else
      this.selectedHero = undefined;
    
  }
}
