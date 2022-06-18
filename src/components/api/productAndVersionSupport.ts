import { productAndVersionsURI } from "../dev/URIs"


export const createVersion = async (body: any) => {
    return await fetch(`${productAndVersionsURI}/version`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const updateVersion = async (body: any, ticketURL: any) => {
    return await fetch(ticketURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}