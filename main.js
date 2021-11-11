const API_URL = 'http://127.0.0.1:3000/'

Vue.component('good-cart', {
  template: `<div class="good-card" @click="onClick">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>`,
  props: {
    title: String,
    price: Number
  },
  methods: {
    onClick() {
      fetch(API_URL+"addToCart", {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({product_name: this.title, price: this.price})
      })
    }
  }
})


Vue.component('goods-list', {
  template: `<div class="goods-list">
    <good-cart 
      v-for="good of list" 
      v-bind:key="good.id_product"
      v-bind:title="good.product_name"
      v-bind:price="good.price"
    ></good-cart>
  </div>`,
  props: {
    list: Array
  }
})

Vue.component('search', {
  template: `<div class="search">
    <input type="text" v-model="searchString" class="goods-search" />
    <button class="search-button" type="button" v-on:click="onClick">Искать</button>
  </div>`,
  data() {
    return {
      searchString: ''
    }
  },  
  methods: {
    onClick(){
      console.log('work')
      this.$emit('search', this.searchString)
    }
  }
})

new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: ''
  },
  methods: {
    loadGoods(){
      fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    onSearch(searchString){
      console.log(searchString)
      const regex = new RegExp(searchString, 'i');
      this.filteredGoods = this.goods.filter((good) => regex.test(good.product_name))
    }
  },
  mounted() {
    this.loadGoods();
  }
})