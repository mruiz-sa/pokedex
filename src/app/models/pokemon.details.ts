export class PokemonDetails {
    id!: number;
    pokeId!: string;
    name!: string;
    weight!: number;
    height!: number;
    types: PokemonType;
    evolutionUrl!: any;
  
    constructor() {
      this.types = {
        type1: {
          name: '',
          strengths: [],
          weaknesses: []
        }
      };
    }
  }

  export interface PokemonType {
    [key: string]: {
      name: string;
      strengths: string[];
      weaknesses: string[];
    };
  }

