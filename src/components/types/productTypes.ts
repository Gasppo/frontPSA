export type Product = {
    id: number
    name: string;
}

export type Version = {
    id: number
    name: string
    state: string
}

export type Licence = {
    id: number
    productName: string
    versionName: string
    clientName: string
    expirationDate: Date
    state: string
}

