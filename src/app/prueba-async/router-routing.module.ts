import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Principal_async_Component } from './pages/principal/principal.page.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: '',component:Principal_async_Component},
      {path: '**',component:Principal_async_Component}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
