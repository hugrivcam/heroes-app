
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/enviroments/enviroments';

//HttpClientModule, importado en app.module.ts

@Injectable({providedIn: 'root'})
export class HeroesService {
    private url: string = enviroments.baseUrl + "/heroes";
    
    constructor(private httpClient: HttpClient) { }

    getHeroes(): Observable<Hero[]>{
        return this.httpClient.get<Hero[]>(this.url);
    }
    //esta funcion devuelve el observable para obtener el heroe segun su id, pero revisamos la info en pipe por si viene un error 'pueden introducir la url mal o lo que sea', en ese caso devolvemos undefined pero en formato observable
    getHeroById(id: string): Observable<Hero | undefined>
    {
        return this.httpClient.get<Hero>(this.url+"/"+id)
        .pipe(
            catchError(error => of(undefined))
        )
    }

    getBuscarHeroes(query:string): Observable<Hero[]>{
        const miURL:string = this.url+"?q="+query+"&_limit=6";
        //console.log(miURL);
        return this.httpClient.get<Hero[]>(miURL); 
    }
    //CRUD
    addHero(hero:Hero): Observable<Hero>{
        return this.httpClient.post<Hero>(this.url, hero).pipe(
        catchError(error => {
            throw Error("error creando nuevo heroe");
            //return of(error);
        })            
        );  
    }
    updateHero(hero:Hero): Observable<Hero>{
        if (!hero.id) throw Error('Heroe no valido para update');
        const miURL:string = this.url+"/"+hero.id;
        return this.httpClient.patch<Hero>(miURL, hero);  
    }    
    deleteHero(id:string): Observable<boolean>{
        if (id.length===0) throw Error('Heroe no valido para delete');
        const miURL:string = this.url+"/"+id;
        return this.httpClient.delete<boolean>(miURL).pipe(
            catchError(err=>of(false)),
            map(resp=>true), //map no funciona igual que catchError, la respuesta no sabemos de que tipo es, pero la devolvemos como true, si no entra en el error, si entra en el error transformamos el objeto error en os(false)
        );
    }    
}