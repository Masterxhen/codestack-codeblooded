// import something here
import Firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
const firebaseConfig = {
  apiKey: "YOUR-API",
  authDomain: "YOUR-DOMAIN",
  databaseURL: "YOUR-DB-URL",
  projectId: "YOUR-PROJECT-NAME",
  storageBucket: "YOUR-STORAGE-BUCKET",
  messagingSenderId: "YOUR-MESSGAGING-ID",
  appId: "YOUR-APPID"
}
Firebase.initializeApp(firebaseConfig)
const db = Firebase.firestore()
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.use(firestorePlugin)
  Vue.prototype.$db = db
}
