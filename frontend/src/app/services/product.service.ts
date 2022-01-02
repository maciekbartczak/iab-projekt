import { Injectable } from '@angular/core';
import {Category, Product, ProductsPagesRequest, ProductsPagesResponse} from "../models/product.model";
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

    public getProductsPage(productPagesRequest: ProductsPagesRequest): Observable<ProductsPagesResponse> {
        return this.http.post<ProductsPagesResponse>('api/products/pages', productPagesRequest);
    }

    public getProductCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('api/products/categories');
    }
}
