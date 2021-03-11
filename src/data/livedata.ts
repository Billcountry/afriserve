import { observable } from "mobx"
import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"

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
    abstract processSnapshot(
        snapshot: FirebaseFirestoreTypes.DocumentSnapshot
    ): void

    abstract get data(): any

    update() {
        return this.doc.set(this.data)
    }
}
