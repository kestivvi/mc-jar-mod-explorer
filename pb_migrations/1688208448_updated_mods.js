migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfrefrmu",
    "name": "times_checked",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hswrmlpf",
    "name": "last_checked",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2x5z2qysvzbv8e")

  // remove
  collection.schema.removeField("hfrefrmu")

  // remove
  collection.schema.removeField("hswrmlpf")

  return dao.saveCollection(collection)
})
