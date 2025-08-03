import { api } from './axios.js'

// Submit a name (string) and lunchbox (array of strings)
export const submitLunchbox = async (name, lunchbox) => {
    await api.post("/lunchboxes", {name, lunchbox})
}

// Get a specific lunchbox (array of strings) by name
export const getLunchboxByName = async (name) => {
    api.post(`/lunchboxes/${name}`).then((res)=> {
        return res.data
    }).catch(() => null)
}

/* Get all lunchboxes in the format:
    [
        {
            name: string,
            lunchbox: string[]:
        },
        {
            name: string,
            lunchbox: string[]:
        },
    ]
*/
export const getAllLunchBoxes = async () => {
    return api.get("/lunchboxes").then((res)=> {
        return res.data
    }).catch(() => null)
}
