import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
	providedIn: 'root'
})
export class PokemonService {

	private readonly API_URL = 'https://pokeapi.co/api/v2';
	constructor(private http: HttpClient) { }

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

	getPokeId(id: number): string{
		
		let pokeId = id.toString();

		if (pokeId.length === 1)
		pokeId = '#00'+pokeId;
		else if (pokeId.length === 2)
		  pokeId = '#0'+pokeId;
		else
		  pokeId = '#'+pokeId;
		return pokeId;
	}
}
