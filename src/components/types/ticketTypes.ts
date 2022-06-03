export type TicketAuthor = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
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

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
