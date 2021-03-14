import { LiveData } from "./livedata"
import { observable } from "mobx"
import firestore from "@react-native-firebase/firestore"
import { Customer } from "./customers"
import { getValidPhone } from "../utils"

export class Shop extends LiveData {
    @observable Name: string = ""
    @observable Location: string = ""
    @observable Address: string = ""
    @observable Registered: Date = new Date()
    @observable Verified: boolean = false
    fields() {
        return ["Name", "Location", "Address", "Registered", "Verified"]
    }

    async hasPhone(phone: string): Promise<Customer | null> {
        const query = firestore()
            .collection(`${Customer.name}s`)
            .where(`ShopId`, "==", this.doc.id)
            .where(`Phone`, "==", phone)
        const result = await query.get()
        if (!result.empty) {
            const doc = result.docs[0]
            return new Customer(doc.id, doc)
        }
        return null
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
