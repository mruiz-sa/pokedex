import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string = enviroment.baseUrl;
  constructor(private http: HttpClient) { }

  getPokemons(index: any) {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }
}
