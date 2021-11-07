import { Injectable } from '@angular/core';
import { Product } from "../models/product.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Product[]> {
        return this.http.get<Product[]>('api/products');
    }

}
