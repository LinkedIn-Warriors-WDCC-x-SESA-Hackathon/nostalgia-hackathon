import { api } from './axios.js'

/* Get all offers in the format:
    [
        {
            id: string,
            offer: {
                sender: string
                receiver: string
                offering: string[]
                wanting: string[]
            }
        }
        ... etc.
    ]

    given optional filter parameters such as sender and receiver
*/
export const findOffers = async (sender, receiver) => {
    return await api.get("/offers", {params: {sender, receiver}}).then((res)=> {
        return res.data
    }).catch(() => null)
}

export const findOfferWithId = async (id) => {
    const res = await api.get(`/offers/${id}`)
    return res.data
}

export const acceptOffer = async (id) => {
    await api.post(`/offers/${id}/accept`)
}

export const declineOffer = async (id) => {
    await api.post(`/offers/${id}/decline`)
}