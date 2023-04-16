import { Component, OnInit} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails, PokemonType } from 'src/app/models/pokemon.details';


@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit{
	
	pokemonList: PokemonDetails[] = [];
	displayedColumns: string[] = ['id', 'name', 'types', 'weight', 'height'];
	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		for (let i = 1; i <= 251; i++) {
			this.getPokemonDetails(i);
		}
	}

	getPokemonDetails(id: number) {

		this.pokemonService.getPokemon(id).subscribe((response: any) => {
		  const pokemon = new PokemonDetails();
		  pokemon.id = response.id;
		  pokemon.pokeId = this.pokemonService.getPokeId(pokemon.id);
		  pokemon.name = response.name.charAt(0).toUpperCase() + response.name.slice(1);
		  pokemon.weight = response.weight;
		  pokemon.height = response.height;
	
		  const newPokemonType: PokemonType = {
			type1: {
			  name: '',
			  strengths: [],
			  weaknesses: []
			}
		  };
		  response.types.forEach((type: any, typeIndex: number) => {
			const typeName = type.type.name;
			
			if (typeIndex === 0) { // si es el primer tipo, actualizar type1
				newPokemonType['type1'].name = typeName;}
			else if (typeIndex === 1) {
				newPokemonType['type2'] = {
					name: typeName,
          			strengths: [],
          			weaknesses: []
				};
			}

			this.pokemonService.getTypeStrengths(typeName).subscribe((strengths: any) => {
			  newPokemonType[`type${typeIndex + 1}`].strengths = strengths.doubleDamageTo;
			});
	
			this.pokemonService.getTypeWeaknesses(typeName).subscribe((weaknesses: any) => {
			  newPokemonType[`type${typeIndex + 1}`].weaknesses = weaknesses.halfDamageTo;
			});
	
			newPokemonType[`type${typeIndex + 1}`].name = typeName;
			pokemon.types = newPokemonType;
		  });
		  pokemon.types = newPokemonType;
		  console.log(pokemon);
		  this.pokemonList.push(pokemon);
		  this.pokemonList.sort((a: PokemonDetails, b: PokemonDetails) => {
			return a.id - b.id;})
		});
	}
}
