// Our "database" lol
// each lunchbox is an array of strings
export const lunchboxes = new Map()

lunchboxes.set("Timmy", ["apple", "milkbox", "biscuits", "candy"])
lunchboxes.set("Sophie", ["yogurt", "chocolate", "biscuits", "carrot", "celery", "cheese"])

/* each offer is of format:
{
    sender: string
    receiver: string
    offering: string[]
    wanting: string[]
}
*/
export const offers = new Map()