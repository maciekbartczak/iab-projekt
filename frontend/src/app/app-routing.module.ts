import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products/list',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'products',
        loadChildren: () =>
            import('./modules/products/products.module').then(m => m.ProductsModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
