export interface User {
    id: number,
    role: string,
    username: string
}

export interface UserProfileResponse {
    username: string,
    firstName: string,
    lastName: string,
    email: string
}
