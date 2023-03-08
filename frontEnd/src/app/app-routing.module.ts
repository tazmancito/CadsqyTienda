import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ProductListComponent } from '@components/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'Inicio', pathMatch: 'full' },

  { path: 'categoria/:categoria', component: HomeComponent },

  { path: 'Inicio', component: HomeComponent },

  { path: '**', redirectTo: '/Inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
