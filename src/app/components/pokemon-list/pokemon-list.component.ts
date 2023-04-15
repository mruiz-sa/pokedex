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
		this.pokemonService.getPokemonList(151, 0).subscribe((response: any) => {
		  response.results.forEach((result: any, index: number) => {
			const id = result.url.split('/')[6]; // Extraer el ID de la URL
			this.getPokemonDetails(Number(id), index);
		  });
		});
	  }

	getPokemonDetails(id: number, index: number) {
		this.pokemonService.getPokemon(id).subscribe((response: any) => {
		  const pokemon = new PokemonDetails();
		  pokemon.id = response.id;
		  console.log("el iddd es: "+pokemon.id);
		  pokemon.name = response.name;
		  pokemon.weight = response.weight;
		  pokemon.height = response.height;
	
		  response.types.forEach((type: any, typeIndex: number) => {
			const typeName = type.type.name;
			const newPokemonType: PokemonType = {
			  type1: {
				name: '',
				strengths: [],
				weaknesses: []
			  },
			  type2: {
				name: '',
				strengths: [],
				weaknesses: []
			  }
			};
			
	
			this.pokemonService.getTypeStrengths(typeName).subscribe((strengths: any) => {
			  newPokemonType[`type${typeIndex + 1}`].strengths = strengths.doubleDamageTo;
			});
	
			this.pokemonService.getTypeWeaknesses(typeName).subscribe((weaknesses: any) => {
			  newPokemonType[`type${typeIndex + 1}`].weaknesses = weaknesses.halfDamageTo;
			});
	
			newPokemonType[`type${typeIndex + 1}`].name = typeName;
			pokemon.types = newPokemonType;
		  });
	
		  this.pokemonList[index] = pokemon;
		});
	  }
	}

