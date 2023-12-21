import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
//import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  
  public sidebarItems = [
    {label: 'listado', icon:'label', url:'./list'},
    {label: 'Añadir', icon:'add', url:'./new-hero'},
    {label: 'Buscar', icon:'search', url:'./search'}
  ];

  constructor(private as:AuthService,private router:Router){}

  get user():User | undefined {
    return this.as.currentUser;
  }
  //................................................................
  onLogout()
  {
    this.as.logout();
    this.router.navigateByUrl('/auth');
  }
  //@ViewChild() 
  // sidenav2:MatSidenav;


}
