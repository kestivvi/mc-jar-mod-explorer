migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yrpmhrpm",
    "name": "virus_total_link",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  // remove
  collection.schema.removeField("yrpmhrpm")

  return dao.saveCollection(collection)
})
