export type TicketAuthor = {
    razonSocial: string;
    CUIT: string;
}

export type Ticket = {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: number;
    authorId: number;
    asigneeId: number | null;
    author?: TicketAuthor;
    internal: boolean;
    createdAt: Date;
    updatedAt: Date;
    productId: number | null;
}



export type Resource = {
    id: number;
    razonSocial: string;
    CUIT: string;
}

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type TicketProduct = {
    id: number;
    name: string;
}

export type TicketProductVersion = {
    id: number;
    name: string;
    productId: number;
}

export type TicketLicense = { id: number, productId: number, versionId: number, clientId: number }

export type TicketDetails = Ticket & {
    razonSocial: string;
    productName: string;
}