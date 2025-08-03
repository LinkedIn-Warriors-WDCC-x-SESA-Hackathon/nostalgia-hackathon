import {useContext} from "react"
import { UserContext } from "./UserContext.jsx"

export const useUser = () => {
    return useContext(UserContext)
}