import { TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { addClientToSystem, createTicket, getClientInSystem } from '../../api/ticketSupport'
import { externalResource, prioridades, product, productLicense, productVersion } from '../../dev/dummyData'
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'

interface AddTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

function uniqBy(a: any[], key: any) {
    var seen: any = {};
    return a.filter(function (item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

const AddTicketModal = (props: AddTicketModalProps) => {
    const { onSubmit, onClose, show } = props
    const emptyAuthor = useMemo(() => ({ id: 0, CUIT: "", "razon social": "" }), [])

    const productos = product

    const userProducts = productLicense.map(lic => ({
        ...lic,
        productName: product.find(prod => prod.id === lic.productId)?.name || 'N/A',
        productId: product.find(prod => prod.id === lic.productId)?.id || 0,
        productVersion: productVersion.find(ver => ver.id === lic.versionId)?.name || 'N/A'
    }))

    console.log(userProducts)
    const [author, setAuthor] = useState(emptyAuthor)
    const [currProduct, setCurrProduct] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState({
        title: "",
        description: "",
        status: "OPEN",
        priority: 1,
        internal: true,
        productLicenseId: 0
    })


    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };


    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
    };

    const handleChangeProd = (e: any) => {
        setCurrProduct(e.target.value)
    }


    const handleAuthorChange = (e: any) => {
        const cliente = externalResource.find(el => el.id === e.target.value)
        setAuthor({
            id: cliente?.id || 0,
            CUIT: cliente?.CUIT || "",
            "razon social": cliente?.['razon social'] || ""
        })
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await generateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    useEffect(() => {
        if (show) return

        setInput({
            title: "",
            description: "",
            status: "OPEN",
            priority: 1,
            internal: true,
            productLicenseId: 0
        })
        setAuthor(emptyAuthor)
    }, [emptyAuthor, show]);


    const generateTicketUsingAPI = async () => {
        const inSystem = await getClientInSystem(author?.CUIT)
        if (!inSystem) {
            const createResponse = await addClientToSystem(author?.['razon social'], author?.CUIT)
            const createJSON = await createResponse.json()
            if (createResponse.status > 300) return createJSON
            return createTicket({ ...input, authorId: createJSON.ticketAuthor.id })
        }
        return createTicket({ ...input, authorId: inSystem })
    }

    const disabled = !input.title || !input.description || !author.id || !input.description

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Ticket" addbuttonLabel="Crear" disableSubmit={disabled}>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="authorId" className='mr-8 w-[42rem]' label="Nombre de Cliente" onChange={handleAuthorChange} valueKey="id" value={author.id} options={externalResource} text="razon social" />
            </div>
            <div className='flex mb-6 flex-row'>
                <TextField name="title" className='mr-8 w-80' disabled={author.id === 0} label="Titulo" InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                <SelectBox name="priority" className='mr-8 w-80' disabled={author.id === 0} label="Prioridad" onChange={handleChangeInt} valueKey="id" value={input?.priority} options={prioridades} text="valor" />
            </div>
            <div className='flex mb-6 flex-row' >
                <SelectBox name="productId" className='mr-8 w-80' disabled={author.id === 0} label="Product" onChange={handleChangeProd} valueKey="id" value={currProduct} options={productos} text="name" />
                <SelectBox name="productLicenseId" className='mr-8 w-80' disabled={author.id === 0 || currProduct <= 0} label="Version" onChange={handleChangeInt} valueKey="id" value={input?.productLicenseId} options={userProducts.filter(el => el.productId === currProduct) || []} text="productVersion" />
            </div>
            <TextField className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={2} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default AddTicketModal
