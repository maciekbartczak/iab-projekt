import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {AuthGuardService} from "../../../../services/auth-guard.service";

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styles: []
})
export class ProductTableComponent implements OnChanges {

    productQuantity: number[] = [];

    @Input()
    public products?: Product[];

    @Output()
    public addToCartEvent: EventEmitter<{ id: number, quantity: number }> = new EventEmitter<{ id: number, quantity: number }>();

    constructor(public authGuard: AuthGuardService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.products) {
            this.productQuantity = new Array(this.products.length).fill(1);
        }
    }

    addToCart(id: number, quantity: number) {
        if (quantity > 99) {
            quantity = 99;
        }
        this.addToCartEvent.emit({id, quantity});
    }
}
