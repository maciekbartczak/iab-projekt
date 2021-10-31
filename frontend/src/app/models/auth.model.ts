export interface LoginDetails {
    username: string,
    password: string
}

export interface LoginResponse {
    token: string
    user: {
        id: number,
        role: string,
        username: string
    }
}
