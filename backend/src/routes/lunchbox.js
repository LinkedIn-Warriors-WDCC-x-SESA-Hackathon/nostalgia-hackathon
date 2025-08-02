import express from 'express'

import { lunchboxes } from '../store.js'

const router = express.Router();

// GET /lunchboxes/:name
// Get a lunchbox by name
router.get('/:name', (req, res) => {
  const lunchbox = lunchboxes.get(req.params.name)
  if (!lunchbox) {
    res.status(404).end()
  } else {
    res.status(200).send(lunchbox)
  }
});

// GET /lunchboxes
// Get all lunchboxes listed in the marketplace
router.get('', (req, res) => {
  const lunchboxesFormatted = []
  for (const [key, value] of lunchboxes) {
    lunchboxesFormatted.push({
      name: key,
      lunchbox: value
    })
  }
  res.status(200).send(lunchboxesFormatted)
});

// POST /lunchboxes
// Create a new lunchbox
router.post('/', (req, res) => {
  const name = req.body.name
  const lunchbox = req.body.lunchbox

  lunchboxes.set(name, lunchbox)

  res.status(200).end()
})

export default router
