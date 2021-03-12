import { observable } from "mobx"
import firestore, {
    FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore"

export abstract class LiveData {
    @observable loading: boolean = false
    @observable exists: boolean = false
    doc: FirebaseFirestoreTypes.DocumentReference

    constructor(
        id: string,
        snapshot?: FirebaseFirestoreTypes.DocumentSnapshot
    ) {
        this.loading = !snapshot
        this.doc = firestore().collection(`${this.constructor.name}s`).doc(id)

        if (!snapshot) {
            this.doc.get().then((snapshot) => {
                this.loading = false
                this.exists = snapshot.exists
                if (snapshot.exists) this.processSnapshot(snapshot)
            })
        } else {
            this.processSnapshot(snapshot)
        }
        this.doc.onSnapshot((snapshot) => {
            this.loading = false
            this.exists = snapshot.exists
            if (snapshot.exists) this.processSnapshot(snapshot)
        })
    }

    abstract fields(): string[]
    private processSnapshot(snapshot: FirebaseFirestoreTypes.DocumentSnapshot) {
        const data = snapshot.data()
        if (data === undefined) return
        this.fields().forEach((field) => {
            let content = data[field]
            if (content === undefined) return
            // Check if the content is a date
            if (getValue(this, field) instanceof Date) {
                content = new Date(content)
            }
            setValue(this, field, content)
        })
    }

    data(): any {
        const data: any = {}
        this.fields().forEach((field) => {
            let content = getValue(this, field)
            if (content instanceof Date) {
                content = content.getTime()
            }
            data[field] = content
        })
        return data
    }

    update() {
        return this.doc.set(this.data())
    }
}

function setValue(object: any, key: string, value: any) {
    object[key] = value
}

function getValue(object: any, key: string): any {
    return object[key]
}
