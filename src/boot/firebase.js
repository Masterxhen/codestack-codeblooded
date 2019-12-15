// import something here
import Firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'
const firebaseConfig = {
  apiKey: "AIzaSyDpZYKqLHSdC8rftoz-kXco7NuvGXtnazc",
  authDomain: "codestack-codeblooded.firebaseapp.com",
  databaseURL: "https://codestack-codeblooded.firebaseio.com",
  projectId: "codestack-codeblooded",
  storageBucket: "codestack-codeblooded.appspot.com",
  messagingSenderId: "172903677372",
  appId: "1:172903677372:web:c7a3983982a89439c0ffb9"
}
Firebase.initializeApp(firebaseConfig)
const db = Firebase.firestore()
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.use(firestorePlugin)
  Vue.prototype.$db = db
}
