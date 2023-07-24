migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "roizred0",
    "name": "size_bytes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  // remove
  collection.schema.removeField("roizred0")

  return dao.saveCollection(collection)
})
