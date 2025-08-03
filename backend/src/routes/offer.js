import express from 'express'

import { offers } from '../store.js'
import { lunchboxes } from '../store.js'

const router = express.Router();

// GET /offers/:id
// Get an offer by id
router.get('/:id', (req, res) => {
  const offer = offers.get(req.params.id)
  if (!offer) {
    res.status(404).end()
  } else {
    res.status(200).send(offer)
  }
});

// GET /offers
// Get all offers filtered by various optional query params:
// ?sender
// ?receiver
router.get('/', (req, res) => {
    const { sender, receiver } = req.query

    const offerList = []
    for (const [key, value] of offers) {
        // filter by sender/receiver if provided
        if (sender && value.sender != sender) continue
        if (receiver && value.receiver != receiver) continue

        offerList.push({
            id: key,
            offer: value
        })
    }
    res.status(200).send(offerList)
});

// POST /offers/:id/accept
// Accept an offer
router.post('/:id/accept', (req, res) => {
    const offer = offers.get(req.params.id)
    if (!offer) {
        res.status(404).end()
    } else {
        const senderLunchbox = lunchboxes.get(offer.sender)
        const receiverLunchbox = lunchboxes.get(offer.receiver)
        if (!senderLunchbox || !receiverLunchbox) { return res.status(500).end() }
        senderLunchbox.push(...offer.wanting)
        receiverLunchbox.push(...offer.offering)
        offer.offering.forEach(foodItem => {
            const index = senderLunchbox.indexOf(foodItem);
            if (index !== -1) {
                senderLunchbox.splice(index, 1);
            }
        })
        offer.wanting.forEach(foodItem => {
            const index = receiverLunchbox.indexOf(foodItem);
            if (index !== -1) {
                receiverLunchbox.splice(index, 1);
            }
        })
        offers.delete(req.params.id)
        res.status(200).end()
    }
})

// POST /offers/:id/decline
// Decline an offer
router.post('/:id/decline', (req, res) => {
    const offer = offers.get(req.params.id)
    if (!offer) {
        res.status(404).end()
    } else {
        offers.delete(req.params.id)
        res.status(200).end()
    }
})

// POST /offers
// Create a new offer
router.post('/', (req, res) => {
  const offer = req.body
  const randomString = Math.random().toString(36).slice(2)

  offers.set(randomString, offer)

  res.status(200).end()
})

export default router