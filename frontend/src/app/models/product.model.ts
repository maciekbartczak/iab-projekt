export interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string
}

export interface ProductsPagesRequest {
    pageNumber: number,
    productsPerPage: number
}

export interface ProductsPagesResponse {
    items: Product[],
    totalPages: number
}
