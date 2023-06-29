migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_f8AEgyK` ON `mods` (`hash`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  collection.indexes = []

  return dao.saveCollection(collection)
})
