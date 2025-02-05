import { Routes } from '@angular/router';
import { CategoriaListComponent } from './features/categoria/pages/categoria-list/categoria-list.component';
import { ArticuloListComponent } from './features/articulo/pages/articulo-list/articulo-list.component';
import { CategoriaFormComponent } from './features/categoria/pages/categoria-form/categoria-form.component';
import { ArticuloFormComponent } from './features/articulo/pages/articulo-form/articulo-form.component';

export const routes: Routes = [
  { path: 'categorias', component: CategoriaListComponent },
  { path: 'articulos', component: ArticuloListComponent },
  { path: 'articulos/nueva', component: ArticuloFormComponent },

  { path: 'categorias/nueva', component: CategoriaFormComponent },
  {
    path: 'categorias/editar/:id',
    component: CategoriaFormComponent,
  },
  {
    path: 'articulos/editar/:id',
    component: ArticuloFormComponent,
  },
  { path: '**', redirectTo: 'categorias' },
];
