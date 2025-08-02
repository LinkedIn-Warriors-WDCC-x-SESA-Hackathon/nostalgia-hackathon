const availableItems = [
  "apple",
  "banana",
  "sandwich",
  "juice",
  "cookie",
  "carrot",
  "milk",
  "chips",
  "pizza",
  "water",
  "orange",
  "grapes",
  "muffin",
  "cucumber",
  "cheese stick",
];

let lunchboxes = [
  {
    id: "l1",
    owner: "Alice",
    items: ["sandwich", "juice"], // both in availableItems
  },
  {
    id: "l2",
    owner: "Bob",
    items: ["cookie", "carrot"], // both in availableItems
  },
  {
    id: "l3",
    owner: "Charlie",
    items: ["grapes", "muffin"], // both in availableItems
  },
];

let trades = [];

function saveLunchbox(lunchbox) {
  lunchboxes.push(lunchbox);
}

// get every lunchbox excluding the id(owner) that's given
function getLunchboxes(excludeId) {
  return lunchboxes.filter((lb) => lb.id !== excludeId);
}

// from and to is the ID of the people, offer and request is the array of items to trade, request by default is 'pending' until changed.
function submitTrade({ from, to, offer, request }) {
  trades.push({ from, to, offer, request, status: "pending" });
}

function updateTradeStatus(tradeIndex, newStatus) {
  if (tradeIndex < 0 || tradeIndex >= trades.length) {
    throw new Error("Invalid trade index");
  }
  trades[tradeIndex].status = newStatus;
}

// whatever lunchboxId we input, find every trade that is associated with it.
function getTradesByLunchbox(lunchboxId) {
  return trades.filter((t) => t.from === lunchboxId || t.to === lunchboxId);
}

module.exports = {
  saveLunchbox,
  getLunchboxes,
  submitTrade,
  getTradesByLunchbox,
};
