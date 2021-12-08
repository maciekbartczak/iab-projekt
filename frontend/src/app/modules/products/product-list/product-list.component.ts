import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../models/product.model";
import { CartService } from "../../../services/cart.service";
import { AuthService } from "../../../services/auth.service";
import { User } from "../../../models/user.model";
import { NbToastrService } from "@nebular/theme";

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
    private user?: User;
    loading = false;

    constructor(private productService: ProductService,
                private cartService: CartService,
                private authService: AuthService,
                private toastService: NbToastrService) {
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

    addToCart(id: number): void {
        this.authService.currentUser.subscribe(
            user => this.user = user
        );
        if (!this.user) {
            return ;
        }
        this.cartService.addCartItem(this.user.id, { itemId: id, quantity: 1}).subscribe(
            () => {
                this.toastService.success('', 'Product has been added to cart!')
            },
            () => {
                this.toastService.danger('Pleas try again.', 'Something went wrong!')
            }
        );
    }
}
