import { createLunchbox, createTradeRequest, updateTradeStatus } from './models.js';
import { TRADE_STATUS } from './constants.js';

/**
 * In-memory store for the application state
 * In a real app, this would be replaced with a proper state management solution
 * like Redux, Zustand, or server-side database
 */
class AppStore {
  constructor() {
    this.lunchboxes = new Map(); // displayName -> lunchbox object
    this.tradeRequests = new Map(); // tradeRequestId -> trade request object
    this.currentUserName = null; // Will be set when user creates their lunchbox
  }

  // Lunchbox operations
  createLunchbox(displayName, items) {
    const trimmedName = displayName.trim();
    
    // Check if display name already exists
    if (this.lunchboxes.has(trimmedName)) {
      throw new Error('Display name already exists. Please choose a different name.');
    }
    
    const lunchbox = createLunchbox(displayName, items);
    this.lunchboxes.set(trimmedName, lunchbox);
    
    // Set current user if this is their first lunchbox
    if (!this.currentUserName) {
      this.currentUserName = trimmedName;
    }
    
    return lunchbox;
  }

  getLunchbox(displayName) {
    return this.lunchboxes.get(displayName);
  }

  getAllLunchboxes() {
    return Array.from(this.lunchboxes.values());
  }

  getOtherLunchboxes() {
    return Array.from(this.lunchboxes.values())
      .filter(lunchbox => lunchbox.displayName !== this.currentUserName);
  }

  getCurrentUserLunchbox() {
    return this.currentUserName ? this.lunchboxes.get(this.currentUserName) : null;
  }

  // Trade request operations
  createTradeRequest(fromLunchboxName, toLunchboxName, offeredItem, requestedItem) {
    const tradeRequest = createTradeRequest(fromLunchboxName, toLunchboxName, offeredItem, requestedItem);
    this.tradeRequests.set(tradeRequest.id, tradeRequest);
    return tradeRequest;
  }

  getTradeRequest(id) {
    return this.tradeRequests.get(id);
  }

  getAllTradeRequests() {
    return Array.from(this.tradeRequests.values());
  }

  getIncomingTradeRequests(lunchboxName) {
    return Array.from(this.tradeRequests.values())
      .filter(trade => trade.toLunchboxId === lunchboxName);
  }

  getOutgoingTradeRequests(lunchboxName) {
    return Array.from(this.tradeRequests.values())
      .filter(trade => trade.fromLunchboxId === lunchboxName);
  }

  updateTradeRequestStatus(tradeId, newStatus) {
    const tradeRequest = this.tradeRequests.get(tradeId);
    if (tradeRequest) {
      const updatedTrade = updateTradeStatus(tradeRequest, newStatus);
      this.tradeRequests.set(tradeId, updatedTrade);
      return updatedTrade;
    }
    return null;
  }

  // Utility methods
  reset() {
    this.lunchboxes.clear();
    this.tradeRequests.clear();
    this.currentUserName = null;
  }

  // Get trade requests for current user
  getCurrentUserIncomingTrades() {
    return this.currentUserName ? this.getIncomingTradeRequests(this.currentUserName) : [];
  }

  getCurrentUserOutgoingTrades() {
    return this.currentUserName ? this.getOutgoingTradeRequests(this.currentUserName) : [];
  }

  // Check if current user can trade with a specific lunchbox
  canTradeWith(lunchboxName) {
    return this.currentUserName && this.currentUserName !== lunchboxName;
  }

  // Get all trade requests involving a specific lunchbox
  getTradeRequestsForLunchbox(lunchboxName) {
    return Array.from(this.tradeRequests.values())
      .filter(trade => trade.fromLunchboxId === lunchboxName || trade.toLunchboxId === lunchboxName);
  }

  // Check if display name is available
  isDisplayNameAvailable(displayName) {
    return !this.lunchboxes.has(displayName.trim());
  }
}

// Create a singleton instance
export const appStore = new AppStore();

// Helper function to populate with sample data for development
export const populateSampleData = () => {
  // Create some sample lunchboxes
  appStore.createLunchbox("Alice's Lunch", ["apple", "sandwich", "chips"]);
  appStore.createLunchbox("Bob's Box", ["banana", "cookies", "juice box"]);
  appStore.createLunchbox("Charlie's Choice", ["carrot", "yogurt", "crackers", "grapes"]);
  
  // Create some sample trade requests
  const lunchboxes = appStore.getAllLunchboxes();
  if (lunchboxes.length >= 2) {
    appStore.createTradeRequest(
      lunchboxes[0].displayName, 
      lunchboxes[1].displayName, 
      "apple", 
      "banana"
    );
    
    if (lunchboxes.length >= 3) {
      appStore.createTradeRequest(
        lunchboxes[1].displayName, 
        lunchboxes[2].displayName, 
        "cookies", 
        "yogurt"
      );
    }
  }
};

export default appStore;
