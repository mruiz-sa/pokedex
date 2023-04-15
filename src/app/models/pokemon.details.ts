export class PokemonDetails {
    id!: number;
    name!: string;
    weight!: number;
    height!: number;
    types: PokemonType;
  
    constructor() {
      this.types = {
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
    }
  }

  export interface PokemonType {
    [key: string]: {
      name: string;
      strengths: string[];
      weaknesses: string[];
    };
  }

