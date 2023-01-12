import admin from "firebase-admin"
import serviceAccount from "../serviceAccount.secret.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://contar-total-default-rtdb.asia-southeast1.firebasedatabase.app",
})

const db = admin.database()

export const countRef = db.ref("/count")
