const currentURI = process.env.REACT_APP_SUPPORT_API || 'http://localhost:4000'

export const addClientToSystem = async (razonSocial: string, nro_CUIT: string) => {
    const response = await fetch(`${currentURI}/ticketAuthors`, {
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
    const response = await fetch(`${currentURI}/ticketAuthors/CUIT/${nro_CUIT}`)
    const responseBody = await response.json()
    return responseBody?.ticketAuthor?.id || false
}


export const createTicket = async (body: any) => {
    return await fetch(`${currentURI}/tickets`, {
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