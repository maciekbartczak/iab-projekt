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
    categories: number[]
}

export interface ProductsPagesResponse {
    items: Product[],
    totalPages: number
}

export interface Category {
    id: number,
    name: string,
    description: string
}
