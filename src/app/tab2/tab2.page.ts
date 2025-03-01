import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonChip,
  IonLabel
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonChip,
    IonLabel,
    ExploreContainerComponent
  ],
})
export class Tab2Page implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(){
    this.loadPokemonList();
  }

  loadPokemonList(){
    this.pokemonService.getPokemonList().subscribe(response => {
      this.pokemonList = response.results;
    });
  }
}