import { Routes } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ProductTableComponent } from './components/product-table/product-table.component';

/*import { ProductComponent } from './pages/product/product.component';*/
import { EditarComponent } from './components/editar/editar.component';



export const routes: Routes = [
    {
        path: '', component: ProductTableComponent
    },
    {
        path: 'agregar' , component: AgregarComponent
    },
    {
        path: 'editar/:id', component: EditarComponent
    }
];
