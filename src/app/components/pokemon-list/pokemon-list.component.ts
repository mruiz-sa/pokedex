import { Component, OnInit} from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetails } from 'src/app/models/pokemon.details';


@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.css']
})


export class PokemonListComponent implements OnInit{
	
	pokemonList: PokemonDetails[] = [];

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
		this.pokemonService.getPokemonList(151, 0).subscribe(
		  (response: any) => {
			response.results.forEach((result: any) => {
			  this.pokemonService.getPokemon(result.name).subscribe(
				(pokemon: any) => {
				  const newPokemon = new PokemonDetails();
				  newPokemon.id = pokemon.id;
				  newPokemon.name = pokemon.name;
				  newPokemon.weight = pokemon.weight;
				  newPokemon.height = pokemon.height;
				  this.pokemonList.push(newPokemon);
				}
			  );
			});
		  }
		);
	  }
	
}

