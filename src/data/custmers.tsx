import { LiveData } from "./livedata"
import { observable } from "mobx"

export class Customer extends LiveData {
    @observable Name: string = ""
    @observable Email: string = ""
    @observable Phone: string = ""
    @observable ShopId: string = ""
    @observable Amount: number = 0
    @observable Registered: Date = new Date()
    fields() {
        return ["Name", "Email", "Phone", "ShopId", "Amount", "Registered"]
    }
}
