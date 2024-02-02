const { defineStore } = Pinia;
import productsStore from './productsStore.js';

export default defineStore('cart', {
  // methods -> Vue
  // actions -> Pinia Store
  state: () => ({
    cart: []  // 購物車列表
  }),
  actions: {
    addToCart(productId, qty = 1) {  // 加入購物車
      // 取得已經有加入購物車的項目
      // 進行判斷，如果購物車有該項目則 +1，沒有則新增一個購物車項目
      const currentCart = this.cart.find((item) => item.productId === productId)
      // console.log(currentCart);
      // console.log(productId, qty);
      if (currentCart) {
        currentCart.qty += qty;
      } else {
        this.cart.push({
          id: new Date().getTime(),  // 記得加上購物車 id，用時間搓記
          productId,
          qty
        });
      }
      console.log(this.cart);
    },
    setCartQty(id, event) {
      // console.log(id, event);
      // console.log(event.target.value, typeof event.target.value);
      const currentCart = this.cart.find((item) => item.id === id);
      // console.log(currentCart);
      currentCart.qty = event.target.value * 1; // * 1 轉型成 number
    },
    removeCartItem(id) {
      const index = this.cart.findIndex((item) => item.id === id);
      this.cart.splice(index, 1);
    }
  },
  getters: {
    cartList: ({cart}) => {
      // 1.購物車的品項資訊，需要整合產品資訊
      // 2.必須計算小計的金額
      // 3.必須提供總金額
      const { products } = productsStore();
      // console.log(products);
      // console.log(cart);
      const carts = cart.map((item) => {
        // console.log(item);
        // 單一產品取出
        const product = products.find((product) => product.id === item.productId);
        // find 是用來找尋陣列中的某個元素
        // console.log(product);
        return {
          ...item,  // 購物車資訊
          product,  // 單一產品資訊，product 變數是上方透過 find 方法篩選出符合 id 的產品，符合的只會有一個，因此是單數
          subtotal: product.price * item.qty  // 小計金額
        }
      });
      // console.log(carts);
      const total = carts.reduce((a, b) =>a + b.subtotal ,0);
      // 第一個參數(a) 是累加器，每次迭代中累積的數值
      // 第二個參數(b) 是當次迭代中的元素
      // console.log(total);

      return {
        carts,  // 包含產品資訊的購物車列表
        total,
      }
    }
  }
});