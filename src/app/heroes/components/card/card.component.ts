import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {
  @Input()
  public hero!:Hero;

  ngOnInit(): void {
     if (!this.hero) throw Error('Card Error, Hero property is required');
     //this.hacerLog(this.hero.characters.split(',').slice(0,3));
  }

  public hacerLog(a:any):void{
    console.log(a);
  }  
}
