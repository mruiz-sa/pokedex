export class PokemonDetails {
    id!: number;
    pokeId!: string;
    name!: string;
    weight!: number;
    height!: number;
    types: PokemonType;
    evolutionUrl!: any;
    evolutions: Evolutions;
  
    constructor() {
      this.types = {
        type1: {
          name: '',
          strengths: [],
          weaknesses: []
        }
      };
      this.evolutions = {
        base: '',
        next: []
      }
    }
  }

  export interface PokemonType {
    [key: string]: {
      name: string;
      strengths: string[];
      weaknesses: string[];
    };
  }

  export interface Evolutions {
    base: string;
    next: string[];
  }