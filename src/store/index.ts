import * as React from 'react'
import { observable, action, computed } from 'mobx'
import * as firebase from 'firebase'
import config from '../config'

declare namespace Todo {
  enum Status {
    NOTDONE = 0,
    DONE
  }

  interface Item {
    id: string
    text: string
    status: Status
  }
}

export class AppStore {
  @observable list: Todo.Item[] = []
  @observable edittingItem: string = ''
  @observable token: string = ''
  @observable checkingLoginStatus: boolean = true
  userId: string = ''
  dbRef

  constructor() {
    this.init()
    this.registerLoginCallback()
    this.checkLogin().then(() => {
      this.dbRef = firebase.database().ref('todo/' + this.userId)
      this.syncData()
    })
  }

  get loggedIn() {
    return !!this.userId
  }

  // listen and sync data form db
  syncData = () => {
    const dbList = this.dbRef.orderByKey()

    dbList.on('value', snap => {
      if (snap.exists()) {
        const json = snap.toJSON()
        const list = Object.getOwnPropertyNames(json)
          .reverse()
          .map(key => ({
            id: key,
            text: json[key].text,
            status: json[key].status
          }))

        console.log('Got list: ', list)
        this.list = list
      } else {
        this.list = []
      }
    })
  }

  // initialize
  init() {
    firebase.initializeApp(config)
  }

  // check login status
  @action
  checkLogin = () => {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('User logged in. ', user.uid)
          this.userId = user.uid
        }
        this.checkingLoginStatus = false
        resolve()
      })
    })
  }

  // register a login callback
  @action
  registerLoginCallback = () => {
    firebase
      .auth()
      .getRedirectResult()
      .then(res => {
        if (res.user) {
          console.log('User logged in.', res.user)
          this.userId = res.user.uid
        }
        this.checkingLoginStatus = false
      })
      .catch(error => {
        console.log('Something wrong. ', error)
      })
  }

  @action
  updateEdittingItem = (e: React.FormEvent<any>) => {
    this.edittingItem = e.target.value
  }

  @action
  addItem = () => {
    const text = this.edittingItem
    this.dbRef
      .push({
        text,
        status: 0
      })
      .then(res => {
        console.log('Added an item to db.')
      })
  }

  @action
  removeItem = (id: string) => {
    this.dbRef
      .child(id)
      .remove(() => {
        console.log('Item removed.')
      })
      .catch(error => {
        console.log('Something wrong. ', error)
      })
  }

  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Logged out.')
        this.userId = ''
      })
      .catch(error => console.log('Something wrong. ', error))
  }
}

export default new AppStore()
