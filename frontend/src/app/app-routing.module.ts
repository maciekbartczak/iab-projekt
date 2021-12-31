import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import { NotFoundComponent } from "./common/not-found/not-found.component";
import { RoleGuard } from "./services/role-guard.service";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products/list',
        pathMatch: 'full'
    },
    {
        // TODO: notLoggedInGuard
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
    {
        path: 'cart',
        loadChildren: () =>
            import('./modules/cart/cart.module').then(m => m.CartModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'order',
        loadChildren: () =>
            import('./modules/order/order.module').then(m => m.OrderModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        canLoad: [AuthGuard, RoleGuard]
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
