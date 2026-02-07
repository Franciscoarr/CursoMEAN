import { Routes, RouterModule } from '@angular/router';
import { ListarProductos } from './components/listar-productos/listar-productos';
import { CrearProducto } from './components/crear-producto/crear-producto';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';

export const routes: Routes = [
    { path: '', component: ListarProductos },
    { path: 'crear-producto', component: CrearProducto },
    { path: 'editar-producto/:id', component: CrearProducto },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        ToastrModule.forRoot()
    ],
    exports: [RouterModule],
    providers: [provideHttpClient()]
})
export class AppRoutes { }
