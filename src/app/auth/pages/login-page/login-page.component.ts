import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor(private aserv:AuthService,private router:Router){}
  
  onLogin(){
    const a:string = "";const b:string ="";
      this.aserv.login(a,b).subscribe(user=>
        {
          if (user.id){
            this.router.navigate(['/heroes']);
          } 
        } 
        
      ) ;
    }
}
