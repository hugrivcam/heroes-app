import { Hero } from './../../interfaces/hero.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{
    //private router:Router = new Router();
    private tempID: string | null =null;
    private myID: string = 'dc-flash';
    public hero?:Hero;
    //private activatedRoute: ActivatedRoute = new ActivatedRoute();
    //es necesario injectar los servicios, hs router y activadedRoute
    constructor (
      private hs: HeroesService,
      private router:Router,
      private activatedRoute: ActivatedRoute){}

    goBack():void{
      this.router.navigate(['/heroes/list']);
    }
    ngOnInit():void{

      //para obtener los parametros de la ruta debo usar el rjxs activatedRoute que se injecta en el contructor, con el metodo pipe revisamos su contenido primero y luego lo cambiamos, ya que no podemos hace un subscribe hell 
      //el tap no era necesario ya que params llega tambien a switchMap, sólo lo hice para probar si funcionaba
      this.activatedRoute.paramMap.pipe(  
        tap(params => {
          //console.log("params obtenidos:");
          //console.log(params);
          this.tempID = params.get('id');
          if (this.tempID != null) this.myID=this.tempID;
        }),
        switchMap(()=>{
          return this.hs.getHeroById(this.myID);//cambio el obserbable del pipe, sólo puedo tener un subscribe, si hicera más de uno, uno para obtener el parametro y otro para obtener el hero nunca sabría cual de los 2 se ejecuta antes
        })
      ).subscribe(h=>{
          if(h) this.hero=h;
          else this.router.navigate(['/heroes/list']);//si el heroe no existe vuelvo atras
          //console.log ({h})
      });//guardo el heroe que me llega del servicio backend que se ejecuta en el subscribe de hs
      
      //this.hs.getHeroById(this.myID).subscribe((h) => {
      //  this.hero = h;
      //  console.log(this.hero);
      //});
      
    }

/*      this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.hs.getHeroById(id)) //cambio el param que devolvia el observable por mi <hero> observable de tipo Hero, que es lo que voy a manejar en el subscribe, de esta forma no tengo que hacer 2 subscribes 1 dentro de otro
      )
      .subscribe(hero=>{
        if(!hero) return this.router.navigate(['/heroes/list']);
        this.hero=hero;
        return;
        console.log(hero);
      })

      //this.hs.getHeroById()
    }*/

}
