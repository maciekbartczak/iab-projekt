export interface User {
    id: number,
    role: string,
    username: string
}

export interface UserProfileResponse {
    userInfo: UserInfo,
    userAddresses: UserAddressResponse[]
}

export interface UserInfo {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}

export interface CreateUserAddressRequest {
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string,
    phoneNumber: string
}

export interface UserAddressResponse {
    id: number,
    UserId: number,
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string,
    phoneNumber: string
}
