import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { TriangleComponent } from './triangle/triangle.component';

const routes: Routes = [
	{path: '' , pathMatch: 'full',  redirectTo: 'list'},
	{path: 'list' , component: CardListComponent},
	{path: 'triangle' , component: TriangleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }