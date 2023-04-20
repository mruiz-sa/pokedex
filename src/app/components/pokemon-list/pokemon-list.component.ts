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
	backupList : PokemonDetails[] = [];
	selectedPokemon: any;
	displayedColumns: string[] = ['id', 'name', 'types', 'weight', 'height'];
	showPopup = false;
	currentPage: number = 1;
	itemsPerPage: number = 18;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		for (let i = 1; i <= 151; i++) {
			this.getPokemonDetails(i);
		}
	}

	getPokemonDetails(id: number) {

		this.pokemonService.getPokemon(id).subscribe((response: any) => {
		  const pokemon = new PokemonDetails();
		  pokemon.id = response.id;
		  pokemon.pokeId = this.pokemonService.getPokeId(pokemon.id);
		  pokemon.name = response.name.charAt(0).toUpperCase() + response.name.slice(1);
		  pokemon.weight = Math.floor(response.weight / 10);
		  pokemon.height = Math.floor((response.height / 10) * 100);
	
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
		  //console.log(pokemon);
		  this.pokemonList.push(pokemon);
		  this.pokemonList.sort((a: PokemonDetails, b: PokemonDetails) => {
			return a.id - b.id;})
		  this.backupList = this.pokemonList;
		});
	}
	
	filterList(type: string) {
		this.pokemonList = this.backupList.filter(pokemon => 
		  pokemon.types['type1'].name === type || pokemon.types['type2']?.name === type);
		this.currentPage = 1;
	}

	showAll() {
		this.pokemonList = this.backupList;
		this.currentPage = 1;
	}

	searchPoke(event: any): void {

		this.pokemonList = this.backupList;
		let search: string = event.target.value;
		const searchValue = search.trim().toLowerCase();
		if (searchValue) {
		  this.pokemonList = this.backupList.filter((pokemon) =>
		  pokemon.name.toLowerCase().includes(searchValue));
		}
	}

	openPopup(pokemon: any)
	{
		this.selectedPokemon = pokemon;
		this.showPopup = true;
	}

	closePopup() {
		this.showPopup = false;
	}

	getColorByType(type: string): string {
		switch(type) {
		  case 'normal':
			return '#A8A878ec';
		  case 'fire':
			return '#f9231897';
		  case 'water':
			return '#6891f099';
		  case 'grass':
			return '#78c850ec';
		  case 'electric':
			return '#f1f10ed8';
		  case 'ice':
			return '#98D8D8ec';
		  case 'fighting':
			return '#f08030bb';
		  case 'poison':
			return '#a14fa193';
		  case 'ground':
			return '#967c33ec';
		  case 'flying':
			return '#A890F0ec';
		  case 'psychic':
			return '#f85888bb';
		  case 'bug':
			return '#bbce0dec';
		  case 'rock':
			return '#706f6eec';
		  case 'ghost':
			return '#715898aa';
		  case 'dark':
			return '#705848ec';
		  case 'dragon':
			return '#f1a61cb7';
		  case 'steel':
			return '#B8B8D0ec';
		  case 'fairy':
			return '#e5b7bbec';
		  default:
			return '#ffffff';
		}
	}
}
