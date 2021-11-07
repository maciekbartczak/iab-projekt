import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product.model";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styles: []
})
export class ProductListComponent implements OnInit {

    products?: Product[];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getAll().subscribe(
            (products) => this.products = products
        );
    }

}
