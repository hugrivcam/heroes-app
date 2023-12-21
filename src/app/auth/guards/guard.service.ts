//import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanMatchFn,CanActivateFn, Route, UrlSegment, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
//import { ElementSchemaRegistry } from '@angular/compiler';

//boolean |
function authCheckStatus(segments:UrlSegment[]=[]): Observable<boolean>{
  const as:AuthService = inject(AuthService);//como no tengo constructor se injecta a mano
  const router:Router = inject(Router);//lo mismo
  return as.checkAuthentication()
  .pipe(  
    tap(isAuthenticated => { //si el usuario esta autenticado y va a la ruta login, lo redirigiremos a heroes/list
      if (segments.length > 0 && segments[0].path === 'auth' && isAuthenticated)//guard publico,
        router.navigateByUrl('heroes/list');
      else //cuando entro en heroes voy por aqui, si no esta autenticado voy a auth, y funciona el otro guard again ...por aqui, o no hay segmentos o el path no es auth, => no hay segmentos cuando biene del activatedGuard, que no me sirve para nada en este caso
        if (!isAuthenticated) router.navigateByUrl('auth/login');          
    })
    ,map(estaAutenticado => {
      //ocurre que el guard de auth, tiene que permitir la entrada a auth, si la autenticación falla
      //con lo que comprobamos si la ruta es la suya y si no está autenticado, en ese caso cambiamos el valor de falso a true para que el guard permita pasar
      if (segments.length > 0 && segments[0].path === 'auth' && !estaAutenticado) return !estaAutenticado;
      return estaAutenticado;
    })
  )
  //.subscribe? no. No se llama al observable porque al observable lo llama el guard directamente
}

export const canMatchGuard: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  //console.log('CanMatch');
  //console.log({ route, segments });
  //return true;
  return authCheckStatus(segments);//no se llama al subscribe del observable porque al observable lo llama el guard directamente
};

export const canActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  //console.log('CanActivate');
  //console.log({ route, state });

  return authCheckStatus();
};

export const publicMatchGuard: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  //console.log('publicCanMatch');
  //console.log({ route, segments });
  //return true;
  return authCheckStatus(segments);//no se llama al subscribe del observable porque al observable lo llama el guard directamente
};

/*
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanMatch,CanActivate{

  
  constructor() { }
  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
}*/
