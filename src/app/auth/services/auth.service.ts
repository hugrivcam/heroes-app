import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginPageComponent } from './../pages/login-page/login-page.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/enviroments/enviroments';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private contuser:number = 0;
  private user ?: User;
  private baseUrl = enviroments.baseUrl;//url de datos
  constructor(private http:HttpClient) { }


  get currentUser(): User | undefined{
    if (!this.user){ //si no hay usuario intento cargarlo del local storage
      //cargar usuario del local storage
      this.loginFromLocalStorage()
        .subscribe(usuario => this.user = usuario);      
        return;
    }
    //console.log("Usuario ya en memoria.");
    return structuredClone(this.user); //structured clone devuelve una copia de la variable, algo parecido a pasar por valor en lugar de referencia 
  }
  //................................................................
  //solucion profe
  checkAuthentication():Observable<boolean>{
    if (!localStorage.getItem("token")) return of(false);
    const token = localStorage.getItem("token");
    return this.http.get<User>(this.baseUrl+"/users/"+token)
    .pipe(
      tap((user) => this.user = user),
      map(user => !!user),//transforma user en true or false, pero negado, if !user = true si no tiene usuario !! = false si user es undefined, entonces el map cambiar nuestro observable a true or false
      catchError((err) => of(false))
    )

  }
  //................................................................
  //mi solución
  //Cargar el usuario por ID, de forma que podemos mantener la sesión si el id está en el local storage
  loginFromLocalStorage():Observable<User | undefined>{
    const id:string | null = localStorage.getItem('token'); //primero intento ver si tengo id en el localstorage
    if (id) 
    {
      return this.http.get<User>(this.baseUrl+"/users/"+id);//.
      /*pipe(
        tap(user=>{
          if (user) console.log('Recargando usuario ' + user?.email);
          else console.log('Recargando usuario (N/A)');
        })
      )*/
    }
    else{
      //console.log('Usuario (N/A)');
      return of(this.user);//devuelvo lo que ya había que seguramente será undefined
    }
  }
  //................................................................
  login(email:string,contra:string):Observable<User>{
    //return this.http.post<User>('login',{email,contra});
    return this.http.get<User>(this.baseUrl+"/users/1").
    pipe(
      tap(user=>this.user = user),
      tap(user=>localStorage.setItem('token',user.id.toString())),
    )
  }
  //................................................................
  logout(){
    localStorage.removeItem('token');//clear()? para borrar todo
    this.user = undefined;
  }
}
