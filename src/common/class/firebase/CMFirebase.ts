import * as firebase from "firebase-admin"

export class CMFirebase {
  static initializeApp(serviceAccountPath: string, databaseURL?: string) {
    let options: any = { credential: firebase.credential.cert(serviceAccountPath) }
    if (!!databaseURL) options = { ...options, databaseURL }
    firebase.initializeApp(options);
  }
}