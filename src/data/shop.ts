import { LiveData } from "./livedata"
import { observable } from "mobx"

export class Shop extends LiveData {
    @observable Name: string = ""
    @observable Location: string = ""
    @observable Address: string = ""
    @observable Registered: Date = new Date()
    @observable Verified: boolean = false
    fields() {
        return ["Name", "Location", "Address", "Registered", "Verified"]
    }
}

export class ShopUser extends LiveData {
    @observable UserId: string = ""
    @observable ShopId: string = ""
    @observable Permissions: string[] = ["owner"]
    @observable Joined: Date = new Date()
    fields() {
        return ["UserId", "ShopId", "Permissions", "Joined"]
    }
}
