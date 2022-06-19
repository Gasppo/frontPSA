import { productAndVersionsURI, ticketSupportURI } from "../dev/URIs"


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