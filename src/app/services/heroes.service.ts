import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private URL = 'https://login-app-594ea-default-rtdb.firebaseio.com'

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ) {
    return this.http.post(`${this.URL}/heroes.json`, heroe)
      .pipe(
        map( (resp:any) => {
          heroe.id = resp.name;
          return heroe;
        })
      )
  }

  actualizarHeroe( heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp['id'];
    return this.http.put(`${ this.URL }/heroes/${ heroe.id }.json`, heroeTemp)
  }

  getHeroes() {
    return this.http.get(`${this.URL}/heroes.json`)
              .pipe(
                map(this.crearArreglo)
              );
  }

  private crearArreglo( heroesObj: any ) {
    const heroes: HeroeModel[] = [];

    if( heroesObj === null ) { return []; }
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });
    return heroes;
  }

  borrarHeroe(id:string) {
    return this.http.delete(`${ this.URL }/heroes/${ id }.json`)
  }

  getHeroe(id:string) {
    return this.http.get(`${ this.URL }/heroes/${ id }.json`)
  }
}
