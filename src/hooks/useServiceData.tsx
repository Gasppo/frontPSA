import { useEffect, useState } from "react"
import { getExternalResources, getInternalResources, getProducts, getTickets } from "../components/api/ticketSupport"
import { Client } from "../components/types/clientTypes"
import { Resource } from "../components/types/resourcesTypes"
import { Ticket, TicketProduct } from "../components/types/ticketTypes"

export const useServiceData = () => {
    const [clients, setClients] = useState<Client[]>([])
    const [resources, setResources] = useState<Resource[]>([])
    const [products, setProducts] = useState<TicketProduct[]>([])
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(false)

    const gatherClients = async () => {
        const extResources = await getExternalResources()
        setClients(extResources?.clients || [])
    }

    const gatherResoruces = async () => {
        const internalResources = await getInternalResources()
        setResources(internalResources || [])
        setLoading(false)
    }

    const gatherProducts = async () => {
        const prods = await getProducts()
        setProducts(prods || [])
    }

    const gatherTickets = async () => {
        const ticks = await getTickets()
        setTickets(ticks || [])
    }

    useEffect(() => {
        setLoading(true)
        gatherClients()
        gatherProducts()
        gatherTickets()
        gatherResoruces()
    }, []);

    const refreshData = () => {
        setLoading(true)
        gatherClients()
        gatherProducts()
        gatherTickets()
        gatherResoruces()
    }

    return { clients, resources, products, tickets, loading, refreshData }
}