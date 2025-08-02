import api from './axios.js'

/* Get all offers in the format:
    [
        {
            id: string,
            offer: string[]:
        }
        ... etc.
    ]

    given optional filter parameters such as sender and receiver
*/
export const findOffers = async (sender, receiver) => {
    api.get("/offers", {params: {sender, receiver}}).then((res)=> {
        return res.data
    }).catch(() => null)
}

export const findOfferWithId = async (id) => {
    api.get(`/offers/${id}`).then((res) => {
        return res.data
    }).catch(() => null)
}