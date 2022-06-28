import { moduloRecursosURI, ticketSupportURI } from "../dev/URIs"
import { Resource } from "../types/resourceType"
import { Ticket, TicketProduct, TicketProductVersion } from "../types/ticketTypes"


const productAndVersionsURI = 'https://modulo-soporte-productos-psa.herokuapp.com'

export const addClientToSystem = async (razonSocial: string, nro_CUIT: string) => {
    const response = await fetch(`${ticketSupportURI}/ticketAuthors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            razonSocial: razonSocial,
            CUIT: nro_CUIT
        })
    })
    return response
}

export const getClientInSystem = async (nro_CUIT: string | undefined) => {
    if (!nro_CUIT) return false
    const response = await fetch(`${ticketSupportURI}/ticketAuthors/CUIT/${nro_CUIT}`)
    const responseBody = await response.json()
    return responseBody?.ticketAuthor?.id || false
}


export const createTicket = async (body: any) => {
    return await fetch(`${ticketSupportURI}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const updateTicket = async (body: any, ticketURL: any) => {
    return await fetch(ticketURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}


export const getExternalResources = async () => {
    return await fetch(`${productAndVersionsURI}/client`).then(response => response.json())
}


export const getClientLicenses = async (clientId: number) => {
    return await fetch(`${productAndVersionsURI}/licence/${clientId}`)
        .then(response => response.json())
        .then(json => { return json.licences.map((licence: any) => { return { id: licence.id, productId: licence.productId, versionId: licence.versionId, clientId: licence.clientId, state: licence.state } }) })
}

export const getProducts = async () => {
    return await fetch(`${productAndVersionsURI}/product`).then(response => response.json()).then(json => { return json.products.map((product: TicketProduct) => { return { id: product.id, name: product.name } }) })
}

export const getProductVersions = async (productId: number) => {
    return await fetch(`${productAndVersionsURI}/versions/${productId}`)
        .then(response => response.json())
        .then(json => { return json.versions.map((version: TicketProductVersion) => { return { id: version.id, name: version.name, productId: version.productId } }) })
}

export const getProductName = async (productId: number) => {
    return await fetch(`${productAndVersionsURI}/product/${productId}`)
        .then(response => response.json())
        .then(json => { return json.product[0].name })
}

export const getTicketById = async (ticketId: number) => {
    return await fetch(`${ticketSupportURI}/tickets/${ticketId}`)
        .then(response => response.json())
        .then(json => { return json.ticket })
}

export const getProductById = async (productId: number) => {
    return await fetch(`${productAndVersionsURI}/product/${productId}`)
        .then(response => response.json())
        .then(json => { return json.product[0] })
}

export const getEmployeeById = async (employeeId: number) => {
    return await fetch(`${moduloRecursosURI}/employees`)
        .then(response => response.json())
        .then(res => {
            const employee = res.employees.find((employee: Resource) => employee.legajo === employeeId)
            console.log();
            return employee
        })
}

export const getClientById = async (clientId: number) => {
    return await fetch(`${productAndVersionsURI}/client`)
        .then(response => response.json())
        .then(json => json.clients.find((client: Ticket) => client.id === clientId))
}