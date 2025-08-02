import { TRADE_STATUS } from './constants.js';

/**
 * Factory function to create a new lunchbox
 * @param {string} displayName - The display name for the lunchbox (used as unique ID)
 * @param {string[]} items - Array of selected items (max 5)
 * @returns {Object} Lunchbox object
 */
export const createLunchbox = (displayName, items = []) => {
  const trimmedName = displayName.trim();
  return {
    id: trimmedName, // Use display name as unique ID
    displayName: trimmedName,
    items: [...items], // Create a copy to avoid mutations
    createdAt: new Date().toISOString()
  };
};

/**
 * Factory function to create a new trade request
 * @param {string} fromLunchboxId - Display name of the lunchbox making the offer
 * @param {string} toLunchboxId - Display name of the target lunchbox
 * @param {string} offeredItem - Item being offered
 * @param {string} requestedItem - Item being requested
 * @returns {Object} Trade request object
 */
export const createTradeRequest = (fromLunchboxId, toLunchboxId, offeredItem, requestedItem) => {
  // Create a simple ID by combining the trade details
  const id = `${fromLunchboxId}-${toLunchboxId}-${offeredItem}-${requestedItem}`.replace(/\s+/g, '_');
  
  return {
    id,
    fromLunchboxId,
    toLunchboxId,
    offeredItem,
    requestedItem,
    status: TRADE_STATUS.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Update the status of a trade request
 * @param {Object} tradeRequest - The trade request to update
 * @param {string} newStatus - The new status
 * @returns {Object} Updated trade request
 */
export const updateTradeStatus = (tradeRequest, newStatus) => {
  return {
    ...tradeRequest,
    status: newStatus,
    updatedAt: new Date().toISOString()
  };
};

/**
 * Validate lunchbox data
 * @param {string} displayName - Display name to validate
 * @param {string[]} items - Items array to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateLunchbox = (displayName, items) => {
  const errors = [];
  
  if (!displayName || displayName.trim().length === 0) {
    errors.push('Display name is required');
  }
  
  if (displayName && displayName.trim().length > 50) {
    errors.push('Display name must be 50 characters or less');
  }
  
  if (displayName && displayName.trim().length < 2) {
    errors.push('Display name must be at least 2 characters');
  }
  
  if (!items || items.length === 0) {
    errors.push('At least one item must be selected');
  }
  
  if (items && items.length > 5) {
    errors.push('Maximum of 5 items allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate trade request data
 * @param {string} fromLunchboxId - Source lunchbox ID
 * @param {string} toLunchboxId - Target lunchbox ID
 * @param {string} offeredItem - Offered item
 * @param {string} requestedItem - Requested item
 * @returns {Object} Validation result
 */
export const validateTradeRequest = (fromLunchboxId, toLunchboxId, offeredItem, requestedItem) => {
  const errors = [];
  
  if (!fromLunchboxId) {
    errors.push('Source lunchbox ID is required');
  }
  
  if (!toLunchboxId) {
    errors.push('Target lunchbox ID is required');
  }
  
  if (fromLunchboxId === toLunchboxId) {
    errors.push('Cannot trade with yourself');
  }
  
  if (!offeredItem) {
    errors.push('Offered item is required');
  }
  
  if (!requestedItem) {
    errors.push('Requested item is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
