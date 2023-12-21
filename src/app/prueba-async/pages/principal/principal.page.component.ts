//import { ElementSchemaRegistry } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  templateUrl: './principal.page.component.html',
  styleUrls: ['./principal.page.component.css']
})

export class Principal_async_Component {
  MAX_VIVOS:number = 100;
  tiempoIntervalo = 250;
  vivos:number=3;
  totalVivos:number=0;
  total:number = 0 ;
  listaSeres:SerVivo[] = [];
  //listaSeresVivos:number[]=[];
  listaActivos:SerVivo[] = [];
  label1:string = 'Finalizar';
  //hacerNuevoHijo:boolean = false;

  /*getColorBorde(hijo:SerVivo):number{
    return hijo.getColorBorde();
  }*/
  Stop_start():void{
    if (this.totalVivos){
      this.finalizaUniverso();
      this.label1 = 'Comenzar';
    }
    else{
      this.label1 = 'Finalizar';
      this.creaNuevoUniverso(3);
      this.visualizaUniverso();
    }
    
    
  }
  comprueba_hijos():boolean{
    let hacerNuevoHijo:boolean = false;
    let diff = 0;
    this.listaActivos = this.listaSeres.filter(v=>v.life>0)  //obtengo el nº de seres vivos vida>0
    this.totalVivos = this.listaActivos.length; 
    diff = this.listaSeres.length-this.listaActivos.length;
    if (diff > 50){
      this.listaSeres =  this.listaActivos; //eliminamos los muertos
    }
    if(this.totalVivos>0){
      this.listaActivos.forEach((v,i,a)=>{
        //this.listaSeres[i].iluminar=false;
        if (!hacerNuevoHijo)
          if (i>0 && (Math.abs(v.life - a[i-1].life) > 20) && v.life>0 && a[i-1].life > 0){
            if (i < a.length){
              if(this.totalVivos<this.MAX_VIVOS)
                  hacerNuevoHijo=true;
              //this.listaSeres[i-1].life=this.listaSeres[i].life;
              //this.listaSeres[i-1].iluminar=true;
              //this.listaSeres[i].iluminar=true;
              this.listaActivos[i-1].life=this.listaActivos[i].life;
              this.listaActivos[i-1].iluminar=true;
              this.listaActivos[i].iluminar=true;               
            }
          }
          
          //return;
        
      })
    }
    return hacerNuevoHijo;
  }

  clearAll():void{
    this.vivos=0;
    this.totalVivos=0;
    this.total = 0 ;
    this.listaSeres = [];
    //this.listaSeresVivos = [];
    this.listaActivos = [];
  }
  addnewSer():number{
    const sv = new SerVivo(this.total+1);
    this.listaSeres.push(sv);
    this.total+=1;
    //this.vivos+=1;
    //this.totalVivos+=1;
    //this.hacerNuevoHijo=false;
    return this.total-1;
  }
  creaNuevoUniverso(numberOfSeres:number){
    this.totalVivos+=1;
    for(let i=0;i<numberOfSeres;i++){
      this.addnewSer();
    }
  }
  finalizaUniverso(){
    this.vivos = 0;
    this.clearAll();
  }
  visualizaUniverso(){
    const intervalId = setInterval(() => {
      //this.listaSeresVivos=this.listaSeres.map((sv) => sv.life);
      //console.clear();
      //console.log(this.listaSeresVivos);  
      if (this.comprueba_hijos()) this.addnewSer();               
      if (this.totalVivos <= 0){ 
        clearInterval(intervalId);

      }
    },this.tiempoIntervalo);
    // while(this.vivos>0){
    //   setTimeout(() => {
    //     this.listaSeresVivos=this.listaSeres.map((sv) => sv.life)
    //     console.log(this.listaSeresVivos);          
    //   }, 500);
    // }
    /*for(let i=0;i<this.listaSeres.length;i++){       
    }*/
  }
  constructor(){
    //console.log("hola")
    this.creaNuevoUniverso(3);
    //console.log("hola2")
    this.visualizaUniverso();
    //console.log("hola3")
  }
}
//----------------------------------------------------------------

class SerVivo{
  public id:number=0;
  tiempoIntervalo = 500;
  public iluminar:boolean=false;
  public colorBorde:string = "RGB(0,255,0)";
  public backColor:string = "RGB(100,100,255)"
  private br:number=100;bg:number=100;bb:number=255;
  private pos:number=0;
  //listaSeres:number[] =[];
  private vida: number = 100;
  get life():number{
    return this.vida;
  }  
  set life(n:number){
    if (n<100)
      this.vida = n;
  }
  constructor(n:number){
    this.pos=n;
    this.id=n;
    this.viviendo();
    this.setColorBorde(0,255,255);
    //this.listaSeres=l;
  }
  

  private checkBackColor():void{
    const restar= 100-this.life;
    //console.log(restar);
    if (restar> 0){
      this.br = 100 - restar;
      this.bg = 100 - restar;
      this.bb = 255 - restar*2;
      this.setBackColor();
    }
  }
  private setBackColor():void{
    this.backColor = "RGB("+this.br+","+this.bg+","+this.bb+")"   
    //console.log(this.br,this.bg,this.bb)
  }
  private cancelarIluminacion(milisec:number):void{
    setTimeout(() => {
      this.iluminar=false;//al cabo de un tiempo se cancela la iluminación automaticamente
    }, milisec);
  }
  private setColorBorde(r:number = -1,g:number=-1,b:number=-1):void{
    if (!(r>0 && g>0 && b>0))
      if (this.iluminar){ 
        this.colorBorde = 'RGB(255,100,0)';
        this.cancelarIluminacion(1500);
      }
      else
        this.colorBorde = "RGB(0,0,0)"
    else
      this.colorBorde = "RGB("+r+","+g+","+b+")"   
  }  

  viviendo(){
    //console.log("viviendo:" + this.vida," pos: ",this.pos);
    const intervalId = setInterval(() => {
      if (this.vida > 0){
        this.tap();
        this.setColorBorde();
        if(this.vida >= 100)
          this.setColorBorde(50,255,50);
      }
      else{
        this.vida = 0;
        clearInterval(intervalId);
        this.setColorBorde(50,50,50);
      }
      this.checkBackColor();
      //console.log("vida:" + this.vida);        
    }, this.tiempoIntervalo);//this.genRandIntNumber(1000, 3000))
  }
/*    while(this.vida>0){
      setTimeout(() => {
        if (this.vida > 0)
          this.tap();
        else (this.vida <= 0);
        this.vida = 0;
        console.log("vida:" + this.vida);
      }, this.genRandIntNumber(500, 3000));
    }*/
  

  tap(){
    const n:number = this.genRandIntNumber(0,1);
    //console.log("tap");
    if (n === 0 || this.life === 100){
      this.vida -= this.genRandIntNumber(1,5);
      if (this.vida<0) this.vida = 0; 
    }
    else{
      if (this.vida < 10)
        this.vida += this.genRandIntNumber(0,5);
      else
        this.vida += this.genRandIntNumber(1,2);      
    }
    if (this.vida>100) this.vida = 100;
  }

  genRandIntNumber(min:number,max:number):number{
    // Asegúrate de que los argumentos sean números enteros
    const myrand:number = Math.random();
    min = Math.floor(min);
    max = Math.floor(max);
    //console.log(myrand);
    // Genera un número aleatorio entre min (incluido) y max (incluido)
    return Math.floor(myrand * (max - min + 1)) + min;
  }
  

}
