import * as React from 'react'
import { observable, action, computed } from 'mobx'
import * as firebase from 'firebase'
import config from '../config'

enum Status {
  NOTDONE = 0,
  DONE
}

interface TodoItem {
  id: string
  text: string
  status: Status
}

export class AppStore {
  @observable list: TodoItem[] = []
  @observable edittingItem: string = ''
  @observable token: string = ''
  @observable checkingLoginStatus: boolean = true
  @observable userId: string = ''

  constructor() {
    this.init()
    this.checkLogin()
  }

  @computed
  get dbRef() {
    return firebase.database().ref('todo/' + this.userId)
  }

  @computed
  get loggedIn() {
    return !!this.userId
  }

  // listen and sync data form db
  private syncData = () => {
    const dbRef = this.dbRef.orderByKey()

    dbRef.on('value', snap => {
      if (snap.exists()) {
        const json = snap.toJSON()
        const list: Array<TodoItem> = Object.getOwnPropertyNames(json)
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

  @computed
  get upcomingsList() {
    return this.list.filter(item => item.status === 0)
  }

  @computed
  get finishedList() {
    return this.list.filter(item => item.status === 1)
  }

  // initialize
  private init() {
    firebase.initializeApp(config)
  }

  // check login status
  @action
  private checkLogin = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User logged in. ', user.uid)
        this.userId = user.uid
        this.syncData()
      }
      this.checkingLoginStatus = false
    })
  }

  @action
  public updateEdittingItem = (e: React.FormEvent<any>) => {
    this.edittingItem = (e.target as HTMLInputElement).value
  }

  @action
  public addItem = () => {
    const text = this.edittingItem

    if (!text) return

    // clear input even before item added to db
    this.edittingItem = ''

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
  public removeItem = (id: string) => {
    this.dbRef
      .child(id)
      .remove(() => {
        console.log('Item removed.')
      })
      .catch(error => {
        console.log('Something wrong. ', error)
      })
  }

  @action
  public toggleItem = (id: string, previousStatus: 1 | 0) => {
    this.dbRef
      .child(id)
      .update({
        status: previousStatus ? 0 : 1
      })
      .then(() => {
        console.log('Item updated.')
      })
      .catch(error => {
        console.log('Something wrong. ', error)
      })
  }

  @action
  public login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithRedirect(provider)
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
  public logout = () => {
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
