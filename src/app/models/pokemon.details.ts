export class PokemonDetails {
    id!: number;
    name!: string;
    weight!: number;
    height!: number;
    type: PokemonType;
  
    constructor() {
      this.type = {
        type1: {
          name: '',
          strengths: [],
          weaknesses: []
        }
      };
    }
  }

export interface PokemonType {
    type1: {
        name: string;
        strengths: string[];
        weaknesses: string[];
      };
      type2?: {
        name: string;
        strengths: string[];
        weaknesses: string[];
      };
}
