import apiClient from './index';

export default {
  // GET /shop/items
  getItems() {
    return apiClient.get('/shop/items');
  },

  // POST /shop/buy/{item_id}
  buyItem(itemId) {
    return apiClient.post(`/shop/buy/${itemId}`);
  },

  // POST /shop/items (Для админа)
  createItem(itemData) {
    return apiClient.post('/shop/items', itemData);
  }
};