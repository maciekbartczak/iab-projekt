import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {AuthGuardService} from "../../../../services/auth-guard.service";

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styles: []
})
export class ProductTableComponent {

    @Input()
    public products?: Product[];

    @Output()
    public addToCartEvent: EventEmitter<{ id: number, quantity: number }> = new EventEmitter<{ id: number, quantity: number }>();

    constructor(public authGuard: AuthGuardService) {
    }

    addToCart(id: number, quantity: string) {
        let quantityValue = parseInt(quantity)
        if (quantityValue > 99) {
            quantityValue = 99;
        }
        this.addToCartEvent.emit({id, quantity: quantityValue});
    }
}
