'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

/**
 * {Map} dataMap
 * {String} dbName
 */
class ModelHelper {
  constructor (dataMap, dbName) {
    if (!(dataMap instanceof Map)) {
      throw new Error('dataMap isnt instanceof Map')
    }
    this.dataMap = dataMap
    if (!dbName) {
      throw new Error('dbName is undefined')
    }
    this.dbName = dbName
  }

  build ({name = '', db, attributes = {}, statics = {}, methods = {}, setSchema = (s) => {}}) {
    const schema = new mongoose.Schema(attributes)
    schema.set('timestamps', true) // createAt, updatedAt -> UTC
    schema.set('minimize', false) // Mongoose will, by default, "minimize" schemas by removing
    // empty objects
    schema.set('collection', name)
    schema.set('strict', false)
    schema.set('id', true)
    schema.set('toObject', {getters: true, virtuals: true, minimize: false, id: true})
    schema.set('toJSON', {getters: true, virtuals: true, minimize: false, id: true})

    Object.assign(schema.statics, statics)
    Object.assign(schema.methods, methods)

    schema.plugin(mongoosePaginate)
    setSchema(schema)
    const dbConnection = this.dataMap.get(db || this.dbName)
    const model = dbConnection.model(name, schema)
    model.ObjectId = mongoose.Types.ObjectId
    return model
  }
}

module.exports = ModelHelper
