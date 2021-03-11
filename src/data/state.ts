import { createContext } from "react"
import { observable } from "mobx"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Shop } from "./shop"

export class GlobalState {
    @observable authorized: FirebaseAuthTypes.User | null = null
    @observable loading: boolean = true
    @observable page:
        | "login"
        | "register"
        | "activate"
        | "splash"
        | "error"
        | "main" = "splash"
    @observable shop: Shop | null = null
}

export const GlobalContext = createContext(new GlobalState())
