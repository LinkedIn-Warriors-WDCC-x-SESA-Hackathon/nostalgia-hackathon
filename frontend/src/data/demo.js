import { appStore, populateSampleData } from './store.js';
import { PREDEFINED_ITEMS } from './constants.js';
import { validateLunchbox, validateTradeRequest } from './models.js';

/**
 * Demo functions to showcase the data structure functionality
 * This file demonstrates how to use the core state logic
 */

// Example: Create a new lunchbox
export const demoCreateLunchbox = () => {
  console.log('=== Creating a New Lunchbox ===');
  
  const displayName = "Demo User";
  const selectedItems = ["apple", "sandwich", "chips"];
  
  // Validate the data first
  const validation = validateLunchbox(displayName, selectedItems);
  
  if (!validation.isValid) {
    console.error('Validation failed:', validation.errors);
    return null;
  }
  
  try {
    const lunchbox = appStore.createLunchbox(displayName, selectedItems);
    console.log('Created lunchbox:', lunchbox);
    return lunchbox;
  } catch (error) {
    console.error('Failed to create lunchbox:', error.message);
    return null;
  }
};

// Example: Browse other lunchboxes
export const demoBrowseLunchboxes = () => {
  console.log('=== Browsing Other Lunchboxes ===');
  
  const otherLunchboxes = appStore.getOtherLunchboxes();
  
  console.log(`Found ${otherLunchboxes.length} other lunchboxes:`);
  otherLunchboxes.forEach(lunchbox => {
    console.log(`- ${lunchbox.displayName}: [${lunchbox.items.join(', ')}]`);
  });
  
  return otherLunchboxes;
};

// Example: Create a trade request
export const demoCreateTradeRequest = () => {
  console.log('=== Creating a Trade Request ===');
  
  const currentUser = appStore.getCurrentUserLunchbox();
  const otherLunchboxes = appStore.getOtherLunchboxes();
  
  if (!currentUser || otherLunchboxes.length === 0) {
    console.log('Need at least 2 lunchboxes to demo trading');
    return null;
  }
  
  const targetLunchbox = otherLunchboxes[0];
  const offeredItem = currentUser.items[0];
  const requestedItem = targetLunchbox.items[0];
  
  // Validate the trade request
  const validation = validateTradeRequest(
    currentUser.displayName,
    targetLunchbox.displayName,
    offeredItem,
    requestedItem
  );
  
  if (!validation.isValid) {
    console.error('Trade validation failed:', validation.errors);
    return null;
  }
  
  const tradeRequest = appStore.createTradeRequest(
    currentUser.displayName,
    targetLunchbox.displayName,
    offeredItem,
    requestedItem
  );
  
  console.log('Created trade request:', tradeRequest);
  return tradeRequest;
};

// Example: View trade inbox
export const demoViewTradeInbox = () => {
  console.log('=== Viewing Trade Inbox ===');
  
  const incomingTrades = appStore.getCurrentUserIncomingTrades();
  const outgoingTrades = appStore.getCurrentUserOutgoingTrades();
  
  console.log(`📥 Incoming trades (${incomingTrades.length}):`);
  incomingTrades.forEach(trade => {
    console.log(`- ${trade.fromLunchboxId} offers "${trade.offeredItem}" for your "${trade.requestedItem}" [${trade.status}]`);
  });
  
  console.log(`🔁 Outgoing trades (${outgoingTrades.length}):`);
  outgoingTrades.forEach(trade => {
    console.log(`- You offered "${trade.offeredItem}" to ${trade.toLunchboxId} for their "${trade.requestedItem}" [${trade.status}]`);
  });
  
  return { incomingTrades, outgoingTrades };
};

// Example: Accept/reject a trade
export const demoRespondToTrade = (tradeId, accept = true) => {
  console.log(`=== ${accept ? 'Accepting' : 'Rejecting'} Trade ===`);
  
  const newStatus = accept ? 'accepted' : 'rejected';
  const updatedTrade = appStore.updateTradeRequestStatus(tradeId, newStatus);
  
  if (updatedTrade) {
    console.log('Updated trade:', updatedTrade);
  } else {
    console.log('Trade not found');
  }
  
  return updatedTrade;
};

// Demo function to run all examples
export const runFullDemo = () => {
  console.log('🍱 LUNCHBOX TRADING MVP DEMO 🍱\n');
  
  // Reset store and populate with sample data
  appStore.reset();
  populateSampleData();
  
  console.log('Available items:', PREDEFINED_ITEMS);
  console.log('Max items per lunchbox:', 5);
  console.log('');
  
  // Demo all functionality
  demoCreateLunchbox();
  console.log('');
  
  demoBrowseLunchboxes();
  console.log('');
  
  const tradeRequest = demoCreateTradeRequest();
  console.log('');
  
  demoViewTradeInbox();
  console.log('');
  
  if (tradeRequest) {
    demoRespondToTrade(tradeRequest.id, true);
  }
  
  console.log('\n=== Final State ===');
  console.log('All lunchboxes:', appStore.getAllLunchboxes().map(lb => ({
    name: lb.displayName,
    items: lb.items
  })));
  console.log('All trades:', appStore.getAllTradeRequests().map(tr => ({
    from: tr.fromLunchboxId,
    to: tr.toLunchboxId,
    offer: `${tr.offeredItem} for ${tr.requestedItem}`,
    status: tr.status
  })));
};

// Export for use in React components
export default {
  demoCreateLunchbox,
  demoBrowseLunchboxes,
  demoCreateTradeRequest,
  demoViewTradeInbox,
  demoRespondToTrade,
  runFullDemo
};
