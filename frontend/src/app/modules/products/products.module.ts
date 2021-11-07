import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductTableComponent } from './product-list/product-table/product-table.component';
import { NbButtonModule, NbCardModule, NbLayoutModule } from "@nebular/theme";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductTableComponent
  ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        NbLayoutModule,
        NbCardModule,
        NbButtonModule
    ]
})
export class ProductsModule { }
