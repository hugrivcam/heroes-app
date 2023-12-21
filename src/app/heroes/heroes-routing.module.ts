import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';//a pesar de tener la misma ruta aparente que en heroes no es la misma pagina
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';


//rutas de heroes
const routes: Routes = [
  { 
    path: '', 
    component: LayoutPageComponent,
    children:[
      { path: 'new-hero', component: NewPageComponent},
      { path: 'edit/:id', component: NewPageComponent},
      { path: 'list', component:ListPageComponent},
      { path: 'search', component: SearchPageComponent},
      { path: ':id', component: HeroPageComponent}, //el id debe estar abajo de todo a excepcion de **
      { path: '**', redirectTo: 'list'}
    ]       
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
