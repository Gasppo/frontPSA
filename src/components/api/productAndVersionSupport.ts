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

export const updateVersion = async (body: any) => {
    console.log(JSON.stringify(body))
    return await fetch(`${productAndVersionsURI}/updateVersion`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const createProduct = async (body: any) => {
    return await fetch(`${productAndVersionsURI}/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const updateProduct = async (body: any) => {
    console.log(JSON.stringify(body))
    return await fetch(`${productAndVersionsURI}/updateProduct`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const createLicence = async (body: any) => {
    return await fetch(`${productAndVersionsURI}/licence`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}
