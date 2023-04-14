export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: type[];
    sprite: string;

}

class type {
    name: string;
    strengths: string[];
    weaknesses: string[];
    constructor () {
        this.name = '';
        this.strengths = [];
        this.weaknesses = [];
    }
}
