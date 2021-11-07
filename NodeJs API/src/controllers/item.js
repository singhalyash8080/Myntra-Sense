const admin = require("firebase-admin")
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')
const fs = require('fs')
const { base64encode, base64decode } = require('nodejs-base64')
const namer = require('color-namer')
const axios = require('axios')
const Item = require('../models/item')
const Matching = require('../models/matching')

const serviceAccount = JSON.parse(base64decode(process.env.FIREBASE_SERVICE_KEY))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "myntra-sense.appspot.com"
});

const storageRef = admin.storage().bucket();

const createItem = async (req, res) => {

    try {

        // console.log(req.body)

        // require('path').resolve(__dirname, '..')

        // creating public directory in the root folder if doesn't exists
        if (!fs.existsSync(`${__dirname}/../../public/`)) {
            fs.mkdirSync(`${__dirname}/../../public/`)
            console.log('directory created')
        }

        const filename = req.files.file.name
        const path = `${__dirname}/../../public/${filename}`
        const inputBuffer = req.files.file.data

        // console.log(filename)
        // console.log(path)
        // console.log(req.files.file.data)

        const sh = sharp(inputBuffer)
            .resize({
                width: 1000,
                height: 1000,
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            })

        await sh.toFile(path);

        const storage = await storageRef.upload(path, {
            public: true,
            destination: `/images/${filename}`,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
            }
        });

        fs.unlinkSync(path)

        const item = new Item({
            ...req.body,
            imageUrl: storage[0].metadata.mediaLink,
        });
        await item.save()
        return res.status(201).send(item)
    }
    catch (e) {
        console.log(e)
        return res.send(e)
    }
}

const findSimilarItems = async (req, res) => {

    try {

        let identifiedColorName1 = ''
        let identifiedColorName2 = ''
        let identifiedColorName3 = ''
        let identifiedType = ''

        // API call to identify colors
        await axios.post('http://6b0e-104-199-188-87.ngrok.io/', {
            "image": req.body.image
        })
            .then(async (response) => {
                // console.log(response.data)

                const rgbValues = response.data.rgb

                identifiedColorName1 = `rgb(${rgbValues[0][0]},${rgbValues[0][1]},${rgbValues[0][2]})`
                identifiedColorName2 = `rgb(${rgbValues[1][0]},${rgbValues[1][1]},${rgbValues[1][2]})`
                identifiedColorName3 = `rgb(${rgbValues[2][0]},${rgbValues[2][1]},${rgbValues[2][2]})`

            })
            .catch((e) => console.log(e))

        // API call to identify cloth category
        await axios.post('http://6300-34-90-29-63.ngrok.io/', {
            "image": req.body.image
        })
            .then(async (response) => {
                // console.log(response.data)
                identifiedType = response.data

            })
            .catch((e) => console.log(e))

        let colorArr = []

        // console.log(identifiedColorName1)
        // console.log(identifiedColorName2)
        // console.log(identifiedColorName3)


        const results1 = namer(identifiedColorName1, { pick: ['html'] }).html.filter((col) => col.distance <= 55.0)
        const results2 = namer(identifiedColorName2, { pick: ['html'] }).html.filter((col) => col.distance <= 55.0)
        const results3 = namer(identifiedColorName3, { pick: ['html'] }).html.filter((col) => col.distance <= 55.0)

        // console.log(results1)
        // console.log(results2)
        // console.log(results3)

        results1.forEach((col) => colorArr.push(col))
        results2.forEach((col) => colorArr.push(col))
        results3.forEach((col) => colorArr.push(col))

        colorArr = colorArr.filter((value, index, self) => {
            return self.indexOf(value) === index;
        })

        // console.log(colorArr)

        let SimilarParamsArr = []

        colorArr.forEach((color) => {
            SimilarParamsArr.push({ color: color.name })
        })

        SimilarParamsArr.push({ category: identifiedType })

        const items = await Item.find({ $and: [{ $or: SimilarParamsArr }, { category: identifiedType }] })
        let itemsArray = []

        items.forEach(item => itemsArray.push(item))

        return res.send({ itemsArray: itemsArray })

    } catch (e) {
        console.log(e)
        return res.send(e)
    }

}

const findMatchedItems = async (req, res) => {

    try {
        let identifiedColorName1 = ''
        let identifiedColorName2 = ''
        let identifiedColorName3 = ''
        let identifiedType = ''

        // API call to identify colors
        await axios.post('http://6b0e-104-199-188-87.ngrok.io/', {
            "image": req.body.image
        })
            .then(async (response) => {
                // console.log(response.data)

                const rgbValues = response.data.rgb

                identifiedColorName1 = `rgb(${rgbValues[0][0]},${rgbValues[0][1]},${rgbValues[0][2]})`
                identifiedColorName2 = `rgb(${rgbValues[1][0]},${rgbValues[1][1]},${rgbValues[1][2]})`
                identifiedColorName3 = `rgb(${rgbValues[2][0]},${rgbValues[2][1]},${rgbValues[2][2]})`

            })
            .catch((e) => console.log(e))

        // API call to identify cloth category
        await axios.post('http://6300-34-90-29-63.ngrok.io/', {
            "image": req.body.image
        })
            .then(async (response) => {
                // console.log(response.data)
                identifiedType = response.data

            })
            .catch((e) => console.log(e))

        let colorArr = []

        // console.log(identifiedColorName1)
        // console.log(identifiedColorName2)
        // console.log(identifiedColorName3)


        const results1 = namer(identifiedColorName1, { pick: ['html'] }).html.filter((col) => col.distance <= 55.0)
        const results2 = namer(identifiedColorName2, { pick: ['html'] }).html.filter((col) => col.distance <= 55.0)
        const results3 = namer(identifiedColorName3, { pick: ['html'] }).html.filter((col) => col.distance <= 55.0)

        results1.forEach((col) => colorArr.push(col))
        results2.forEach((col) => colorArr.push(col))
        results3.forEach((col) => colorArr.push(col))

        colorArr = colorArr.filter((value, index, self) => {
            return self.indexOf(value) === index;
        })

        // console.log(colorArr)

        let SimilarParamsArr = []

        colorArr.forEach((color) => {
            SimilarParamsArr.push({ color: color.name })
        })

        // console.log(identifiedType)

        const items = await Item.find({ $and: [{ $or: SimilarParamsArr }, { category: identifiedType }] })

        // console.log(items)

        let itemsArray = []

        items.forEach(item => itemsArray.push(item))

        let itemsArray1 = []
        let itemsArray2 = []

        items.forEach(item => {
            itemsArray1.push({ item1_id: item._id })
            itemsArray2.push({ item2_id: item._id })
        })


        const matchedItemsArray1 = await Matching.find({ $or: itemsArray1 }, { _id: 0, item1_id: 0 })
        const matchedItemsArray2 = await Matching.find({ $or: itemsArray2 }, { _id: 0, item2_id: 0 })

        // console.log(matchedItemsArray1)
        // console.log(matchedItemsArray2)

        let idsArray = []

        matchedItemsArray1.forEach((item) => idsArray.push({ _id: item.item2_id }))
        matchedItemsArray2.forEach((item) => idsArray.push({ _id: item.item1_id }))

        const resultArray = await Item.find({ $or: idsArray })

        return res.send({ itemsArray: resultArray })
    }
    catch (e) {
        console.log(e)
        return res.send(e)
    }
}

const createMatchingItems = async (req, res) => {

    try {
        const matchedItem = new Matching({
            item1_id: req.body.item1_id,
            item2_id: req.body.item2_id,
        })
        await matchedItem.save()

        return res.status(201).send(matchedItem)

    } catch (e) {
        console.log(e)
        return res.send(e)
    }
}

const getMatchingItems = async (req, res) => {

    try {

        Matching.find({}).populate('item1_id').populate('item2_id').then((items) => res.send(items))

    } catch (e) {

        console.log(e)
        return res.send(e)
    }
}

module.exports = { findSimilarItems, findMatchedItems, createItem, createMatchingItems, getMatchingItems }