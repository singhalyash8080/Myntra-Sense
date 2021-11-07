const express = require('express')

const {findSimilarItems, findMatchedItems, createItem, createMatchingItems, getMatchingItems} = require('../controllers/item')

const router = new express.Router()

router.post('/findSimilarItems',findSimilarItems)

router.post('/findMatchedItems',findMatchedItems)

router.post('/createItem', createItem)

router.post('/createMatchingItems', createMatchingItems)

router.get('/getAllMatchingItems', getMatchingItems)


module.exports =  router