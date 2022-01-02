import {Component, DoCheck, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Category, Product} from "../../../models/product.model";
import {CartService} from "../../../services/cart.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/user.model";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

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
    categories: Category[] = [];
    selectedCategories: Category[] = [];
    filterChange: Subject<Category[]> = new Subject<Category[]>();

    constructor(private productService: ProductService,
                private cartService: CartService,
                private authService: AuthService,
                private toastService: NbToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
       this.fetchPage();
       this.productService.getProductCategories().subscribe(
           (response) => this.categories = response
       );
       this.filterChange.subscribe(
           (selected) => {
               this.selectedCategories = selected;
               this.pageNumber = 1;
               this.fetchPage();
           }
       );
    }

    pageChange(offset: number): void {
        this.pageNumber += offset;
        this.fetchPage();
    }

    fetchPage(): void {
        console.log(this.selectedCategories.map(category => category.id))
        this.loading = true;
        this.productService
            .getProductsPage({pageNumber: this.pageNumber, productsPerPage: this.productsPerPage,
                categories: this.selectedCategories.map(category => category.id)}).subscribe(
            (res) => {
                this.products = res.items;
                this.totalPages = res.totalPages;
                this.loading = false;
            }
        );
    }

    addToCart(product: {id: number, quantity: number}): void {
        this.authService.currentUser.subscribe(
            user => this.user = user
        );
        if (!this.user) {
            this.router.navigate(['/auth/login']);
            this.toastService.warning('You need to be logged in to add products to cart.', 'Please log in!')
            return ;
        }
        this.cartService.addCartItem(this.user.id, { itemId: product.id, quantity: product.quantity}).subscribe(
            () => {
                this.toastService.success('', 'Product has been added to cart!')
            },
            () => {
                this.toastService.danger('Pleas try again.', 'Something went wrong!')
            }
        );
    }
}
