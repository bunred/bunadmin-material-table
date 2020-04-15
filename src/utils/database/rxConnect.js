import RxDB from "rxdb"
import { rxMtCollections } from "./rxCollections"

RxDB.plugin(require("pouchdb-adapter-memory"))
RxDB.plugin(require("pouchdb-adapter-http")) //enable syncing over http

let dbPromise

const _create = async () => {
  const db = await RxDB.create({
    name: "bunadmin_mt", // <- name
    adapter: "memory", // <- storage-adapter
    password: "qR4ufQgOTzOs8HG5mGiKAC9", // <- password (optional)
    multiInstance: true, // <- multiInstance (optional, default: true)
    queryChangeDetection: false, // <- queryChangeDetection (optional, default: false)
    ignoreDuplicate: true
  })
  console.log("DatabaseService: created mt database")

  // show flash icon in title
  db.waitForLeadership().then(() => {
    console.log("isLeader now")
    document.title = "⚡" + document.title
  })

  // create collections
  await Promise.all(rxMtCollections.map(collObj => db.collection(collObj)))
  console.log("DatabaseService: create mt collections")

  return db
}

export default function rxDb() {
  if (!dbPromise) dbPromise = _create()
  return dbPromise
}
