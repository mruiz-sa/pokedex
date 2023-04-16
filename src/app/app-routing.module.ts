import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { WindowDetailComponent } from './components/window-detail/window-detail.component';

const routes: Routes = [
  {path: 'home', component: PokemonListComponent},
  {path: 'WindowDetailComponent/:id', component: WindowDetailComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
