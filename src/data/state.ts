import { createContext } from "react"
import { observable } from "mobx"
import firebase from "firebase"

export class GlobalState {
    @observable authorized: firebase.User | null = null
    @observable loading: boolean = true
    @observable page: "login" | "register" | "activate" | "splash" = "splash"
}

export const GlobalContext = createContext(new GlobalState())
