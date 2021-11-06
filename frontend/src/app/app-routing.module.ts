import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { NotFoundComponent } from "./common/not-found/not-found.component";

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
    },
    {
        path: 'user/:id',
        loadChildren: () =>
            import('./modules/user/user.module').then(m => m.UserModule),
        canLoad: [AuthGuard]
    },
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
