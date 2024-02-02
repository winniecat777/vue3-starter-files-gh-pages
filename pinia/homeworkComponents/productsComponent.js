import productsStore from "../store/productsStore.js";
import cartStore from "../store/cartStore.js";
const { mapState, mapActions } = Pinia;  // mapState 取得多個 getters 裡面的資料狀態
// 從 store 取得 getters，讓元件能夠使用

export default {
  template: `<div class="row row-cols-3 my-4 g-4">
  <div class="col" v-for="product in sortProducts" :key="product.id">
    <div class="card">
      <img :src="product.imageUrl" 
      class="card-img-top" alt="">
      <div class="card-body">
        <h6 class="card-title">{{product.title}}
          <span class="float-end">$ {{product.price}}</span>
        </h6>
        <a href="#" class="btn btn-outline-primary w-100" @click.prevent="addToCart(product.id)">加入購物車</a>
      </div>
    </div>
  </div>
</div>`,
  computed: {
    ...mapState(productsStore,['sortProducts']) // [放會用到的 getters 名稱]
  },
  methods: {
    ...mapActions(cartStore, ['addToCart'])
  }
}