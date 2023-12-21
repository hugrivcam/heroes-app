import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';//a pesar de tener la misma ruta aparente que en heroes no es la misma pagina
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LayoutPageComponent,NewPageComponent,ListPageComponent,HeroPageComponent,SearchPageComponent, CardComponent, HeroImagePipe],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  //  AuthRoutingModule
  ]
})
export class HeroesModule { }
