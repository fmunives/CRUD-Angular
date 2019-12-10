import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HeroModel } from "../models/hero.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  url: string = "https://login-angular-9714d.firebaseio.com";

  constructor(private http: HttpClient) {}

  createHero(hero: HeroModel) {
    return this.http.post(`${this.url}/heros.json`, hero).pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero;
      })
    );
  }

  updateHero(hero: HeroModel) {
    const heroTemp = {
      ...hero
    };

    delete heroTemp.id;

    return this.http.put(`${this.url}/heros/${hero.id}.json`, heroTemp);
  }

  getHero(id: string) {
    return this.http.get(`${this.url}/heros/${id}.json`);
  }

  getAllHeros() {
    return this.http
      .get(`${this.url}/heros.json`)
      .pipe(map(this.getArrayHeros));
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.url}/heros/${id}.json`);
  }

  private getArrayHeros(heroObjetc: object) {
    const heros: HeroModel[] = [];
    Object.keys(heroObjetc).forEach(key => {
      const hero: HeroModel = heroObjetc[key];
      hero.id = key;
      heros.push(hero);
    });
    return heros;
  }
}
