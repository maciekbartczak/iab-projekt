import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from "./order-list/order-list.component";
import { NewOrderComponent } from "./new-order/new-order.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: OrderListComponent
    },
    {
        path: 'new',
        component: NewOrderComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {
}
