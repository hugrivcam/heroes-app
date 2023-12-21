import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {
  //public hero?:Hero;
  constructor(private hs:HeroesService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private _snackBar: MatSnackBar,
              private dialog:MatDialog){}//snack bar es un mensaje flotante de angular material
  public publishers = [
    {id: 'DC Comics',desc: 'DC - Comics'},
    {id: 'Marvel Comics',desc: 'Marvel - Comics'}
  ]

  ngOnInit(): void {
    if(this.router.url.includes('heroes/edit')){
      this.obtenerHeroeEditar();
    }
  }
  //creamos el nuevo formulario reactivo
  public heroForm = new FormGroup({
    id:               new FormControl<string>(''), //lo que va entre '' es el valor por defecto del campo, que podría ser 0 o un texto cualquiera
    superhero:        new FormControl<string>('',{nonNullable:true}), //no nulo hay que acordarse de todoooooooo, locura
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl('')
  });

  obtenerHeroeProfe():void //la versión del profe
  {
    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.hs.getHeroById(id))
    ).subscribe(miheroe=>{
      if (!miheroe) return this.router.navigateByUrl('./');
      this.heroForm.reset(miheroe);
      return;
    })
  }
  obtenerHeroeEditar():void  //carga el heroe que nos da la url a traves del parametro id
  {
    let tempID: string | null = null;
    let myID: string = '';
    this.activatedRoute.paramMap.pipe( 
      tap((param)=>{
        if (param.get('id')){
          tempID = param.get('id');
          if (tempID != null) myID=tempID;
        }
        console.log('editar id:' + myID);
      }),
      switchMap(()=>{
          return this.hs.getHeroById(myID);//ya he cambiado mi observable params por el del heroe
      })
    ).subscribe(h=>{
      //this.hero=h;
      if (!h) return this.router.navigateByUrl('./');
      this.heroForm.reset(h);
      return;
      //this.heroForm.setValue(this.hero);
      //return h;
    });
  }

  get currentHero(): Hero{
    const h = this.heroForm.value as Hero;
    //console.log(h);
    return h;
  }

  onSubmitHugo():void{
    let actualizar: boolean = false;
    if (this.heroForm.invalid===false)
    { 
      //console.log({...this.currentHero});
      //console.log("len = " + this.currentHero.id.length);
      if (this.currentHero.id.length===0){      
        console.log("intento añadir "+ this.currentHero.superhero);
        this.hs.addHero(this.currentHero).subscribe(h=>{
          //to do: mostrar mensaje (snack bar heroe añadido, y navegar a /heroes/edit/hero.id)
          this.router.navigate(['/heroes/edit',h.id])
          this.showSnackBar("Nuevo heroe " + h.superhero + " añadido.")
          return h;
        });
      }
      else{
        //console.log("intento actualizar "+ this.currentHero.superhero);
        this.hs.updateHero(this.currentHero).subscribe(h=>
        {
          //to do: mostrar mentraje (snack bar heroe actualizado)
          this.showSnackBar("heroe " + this.currentHero.superhero + " actualizado")
          return h;
        });
        actualizar = true;
      }
    }
    else
    {
      this.showSnackBar("Debes cumplimentar correctamente todos los campos","Fallo")
    }
    /*console.log({
      FormularioValido: this.heroForm.valid,
      valor: this.heroForm.value,
      actualizar
    })*/

  }
  onHugo():void{
    alert('hola'); 
  }
  onDeleteHero():void{
    const superHeroe:string= this.currentHero.superhero;
    const res:boolean = this.dialogoAceptarCancelar("¿Estas seguro de eliminar el heroe " + superHeroe+ "?");
    if (res===true){ 
      this.hs.deleteHero(this.currentHero.id).subscribe(wasDeleted=>{
        if (wasDeleted === true){
          this.showSnackBar("Heroe " + superHeroe + " eliminado");  
          this.router.navigateByUrl('heroes/list');    
        }
        else{
          this.showSnackBar("EL heroe " + superHeroe + " no ha podido ser eliminado debido a algun problema");  
        } 
      });
    }
    else
      this.showSnackBar("Operacion cancelada.");    
    
  }
  MatDialogAceptarCancelar(mensaje:string){

  }
  dialogoAceptarCancelar(mensaje:string):boolean{
    return confirm(mensaje);
  }
  showSnackBar(mensaje:string,mensaje2:string = 'Listo'):void{
    this._snackBar.open(mensaje,mensaje2,{duration: 3000,verticalPosition:'top',horizontalPosition:'center'});
  }
}
