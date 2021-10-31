export interface LoginDetails {
    username: string,
    password: string
}

export interface LoginResponse {
    token: string
}

export interface RegisterRequest {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string
}
