import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard, publicMatchGuard } from './auth/guards/guard.service';
//import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: 'error404',
    component: Error404PageComponent 
  },
  { 
    path: 'auth',  
    loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule),
    //component: AuthModule
    canMatch:[publicMatchGuard]
  },
  { 
    path: 'heroes', 
    loadChildren: ()=> import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard]
  },
  { 
    path: 'pruebasAsync', 
    loadChildren: ()=> import('./prueba-async/prueba-async.module').then(m => m.PruebaAsyncModule),
  },
  { 
    path: 'juego-vida', 
    loadChildren: ()=> import('./juego-vida/juego-vida.module').then(m => m.JuegoVidaModule),
  },

  {
    path: '404', 
    redirectTo: 'error404'
  },
  {
    path: '', 
    redirectTo: 'heroes',
    pathMatch: 'full' 
  },
  {
    path: '**', 
    redirectTo: 'error404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
