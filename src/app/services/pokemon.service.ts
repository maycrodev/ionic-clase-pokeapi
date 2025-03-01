import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PokemonListResponse, Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 100): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}?limit=${limit}`).pipe(
      switchMap(response => {
        const pokemonRequests = response.results.map((pokemon: Pokemon) => 
          this.getPokemonDetails(pokemon.url)
        );
        return forkJoin(pokemonRequests).pipe(
          map((enrichedPokemon: Pokemon[]) => ({
            ...response,
            results: enrichedPokemon
          }))
        );
      })
    );
  }

  private getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map(details => ({
        name: details.name,
        url: url,
        image: details.sprites.other['official-artwork'].front_default,
        abilities: details.abilities.map((a: any) => a.ability.name),
        types: details.types.map((t: any) => t.type.name),
        weight: details.weight,
        height: details.height
      }))
    );
  }
}