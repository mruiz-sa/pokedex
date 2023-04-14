import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { PokemonDetails, PokemonType } from '../models/pokemon.details';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly API_URL = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) { }

  getPokemonList(limit: number, offset: number) {
    return this.http.get(`${this.API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemon(id: number) {
    return this.http.get(`${this.API_URL}/pokemon/${id}`);
  }

  getTypeStrengths(typeName: string) {
    return this.http.get(`${this.API_URL}/type/${typeName}`).pipe(
      map((response: any) => {
        const doubleDamageTo = response.damage_relations.double_damage_to.map((type: any) => type.name);
        return { doubleDamageTo };
      })
    );
  }

  getTypeWeaknesses(typeName: string) {
    return this.http.get(`${this.API_URL}/type/${typeName}`).pipe(
      map((response: any) => {
        const halfDamageTo = response.damage_relations.half_damage_to.map((type: any) => type.name);
        return { halfDamageTo };
      })
    );
  }
}
