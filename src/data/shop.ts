import { LiveData } from "./livedata"
import { observable } from "mobx"
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

interface FirestoreShop {
    Name: string
    Location: string
    Address: string
    Registered: number
    Verified: boolean
}

export class Shop extends LiveData {
    @observable name: string = ""
    @observable location: string = ""
    @observable address: string = ""
    @observable registered: Date = new Date()
    @observable verified: boolean = false
    processSnapshot(snapshot: FirebaseFirestoreTypes.DocumentSnapshot) {
        const data = snapshot.data() as FirestoreShop
        this.name = data.Name
        this.location = data.Location
        this.address = data.Address
        this.registered = new Date(data.Registered)
        this.verified = data.Verified
    }

    get data(): FirestoreShop {
        return {
            Name: this.name,
            Location: this.location,
            Address: this.address,
            Registered: this.registered.getTime(),
            Verified: this.verified,
        }
    }
}

interface FirestoreShopUser {
    UserId: string
    ShopId: string
    Permissions: string[]
    Joined: number
}

export class ShopUser extends LiveData {
    @observable userId: string = ""
    @observable shopId: string = ""
    @observable permissions: string[] = ["owner"]
    @observable joined: Date = new Date()
    processSnapshot(snapshot: FirebaseFirestoreTypes.DocumentSnapshot) {
        const data = snapshot.data() as FirestoreShopUser
        this.userId = data.UserId
        this.shopId = data.ShopId
        this.permissions = data.Permissions
        this.joined = new Date(data.Joined)
    }

    get data(): FirestoreShopUser {
        return {
            UserId: this.userId,
            ShopId: this.shopId,
            Permissions: this.permissions,
            Joined: this.joined.getTime(),
        }
    }
}
