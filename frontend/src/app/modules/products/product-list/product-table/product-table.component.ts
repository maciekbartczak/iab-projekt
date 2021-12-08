import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from "../../../../models/product.model";

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styles: []
})
export class ProductTableComponent  {


    @Input()
    public products?: Product[];

    @Output()
    public addToCartEvent: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }


    addToCart(id: number) {
        this.addToCartEvent.emit(id);
    }
}
