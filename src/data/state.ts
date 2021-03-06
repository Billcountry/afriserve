import { createContext } from "react"
import { observable } from "mobx"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Shop } from "./shop"
import { Customer } from "./customers"

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
    @observable main_screen: "home" | "sales" | "customers" = "home"
    @observable shop: Shop | null = null
    @observable editCustomer: Customer | null = null
    @observable addSale: boolean = false
}

export const GlobalContext = createContext(new GlobalState())
