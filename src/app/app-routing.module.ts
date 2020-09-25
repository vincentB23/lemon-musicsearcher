import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: ':trackId', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
