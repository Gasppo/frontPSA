import { useCallback, useEffect, useState } from "react";
import { getClientById, getProductById, getTicketById } from "../components/api/ticketSupport";
import { Client } from "../components/types/clientTypes";
import { Product } from "../components/types/productTypes";
import { Ticket } from "../components/types/ticketTypes";

export const useTicketInfo = (ticketId: number) => {
    const [currentTicket, setCurrentTicket] = useState<Ticket | undefined>(undefined);
    const [product, setProducto] = useState<Product | undefined>(undefined);
    const [client, setClient] = useState<Client | undefined>(undefined);

    const gatherTicket = useCallback(async (ticketId: number) => {
        const ticket = await getTicketById(ticketId);
        setCurrentTicket(ticket);
    }, []);

    const gatherProduct = useCallback(async (prooductId: number) => {
        const producto = await getProductById(prooductId);
        setProducto(producto);
    }, []);

    const gatherClient = useCallback(async (clientId: number) => {
        const cliente = await getClientById(clientId);
        setClient(cliente);
    }, []);

    useEffect(() => {
        if (ticketId) gatherTicket(ticketId);
    }, [gatherTicket, ticketId]);

    useEffect(() => {
        if (currentTicket) {
            gatherProduct(currentTicket?.productId || 0)
            gatherClient(currentTicket?.authorId || 0)
        }
    }, [currentTicket, gatherProduct, gatherClient]);

    return { currentTicket, product, client };
}