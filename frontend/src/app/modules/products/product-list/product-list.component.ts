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
    pageNumber = 1;
    productsPerPage = 3;
    totalPages?: number;
    loading = false;

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
       this.fetchPage();
    }

    pageChange(offset: number): void {
        this.pageNumber += offset;
        this.fetchPage();
    }

    fetchPage(): void {
        this.loading = true;
        this.productService.getProductsPage({pageNumber: this.pageNumber, productsPerPage: this.productsPerPage}).subscribe(
            (res) => {
                this.products = res.items;
                this.totalPages = res.totalPages;
                this.loading = false;
            }
        );
    }
}
