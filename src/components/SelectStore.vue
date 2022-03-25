<template>
    <div id="select-store">
    <div id="store-left">
      <div id="select-header">
        <h1>디저트</h1>
        <button class="btn" id="select-btn" @click="addFoodStore">Add Store</button>
      </div>      
      <input class="snack-input" disabled placeholder="선택하면 자동 입력됩니다." v-model="selectFood.shopName" />
      <div id="select-food">
        <div v-for="(item, idx) in allFoodStroeList" :key="idx" class="menu" @click="onClickFoodStore(item)">
          {{ item.shopName }}<button id="delete-menu" @click="onDeleteShop(item)">❌</button>
        </div>
      </div>
    </div>

    <div id="store-right">
      <div id="select-header">
        <h1>음료</h1>
        <button class="btn" id="select-btn" @click="addDrinkStore">Add Store</button>
      </div>      
      <div><input class="snack-input" disabled placeholder="선택하면 자동 입력됩니다." v-model="selectDrink.shopName" /></div> 
      <div id="select-drink">
        <div v-for="(item, idx) in allDrinkStoreList" :key="idx" class="menu" @click="onClickDrinkStore(item)">
          {{ item.shopName }}<button id="delete-menu" @click="onDeleteShop(item)">❌</button>
        </div>
      </div>
    </div>   
  </div>
  <div>
      <button class="btn" id="create-snack-btn" @click="onClickSelectStore">오늘의 간식 시작</button>
  </div>
  <ModalDelStore class="del-store none" />
  <ModalChkPassword class="chk-pwd none" :foodData="selectFood" :drinkData="selectDrink" />
</template>

<script>
import ModalDelStore from '@/components/ModalDelStore';
import ModalChkPassword from '@/components/ModalChkPassword';

export default {
  name: 'SelectStore',
  components: {
    ModalDelStore,
    ModalChkPassword
  },
  data() {
    return {
      selectFood: {},
      selectDrink: {}
    }
  },
  methods: {
    addFoodStore() {
      this.$store.commit('setAddShopType', 'FOOD')
      this.$router.push('/pickshop/create');
    },
    addDrinkStore() {
      this.$store.commit('setAddShopType', 'DRINK')
      this.$router.push('/pickshop/create');
    },
    onClickFoodStore(item) {
      this.selectFood = item
    },
    onClickDrinkStore(item) {
      this.selectDrink = item
    },
    onClickSelectStore() {
      if (this.selectFood.shopName && this.selectDrink.shopName) {
        document.querySelector('.chk-pwd').classList.remove('none')
      } else {
        alert("디저트와 음료를 모두 선택해주세요.")
      } 
    },
    onDeleteShop(item) {
      this.$store.commit('setDeleteShop', item)
      document.querySelector('.del-store').classList.remove('none')
    }
  },
  computed: {
    allFoodStroeList() {
      return this.$store.getters.getAllFoodStoreList
    },
    allDrinkStoreList() {
      return this.$store.getters.getAllDrinkStoreList
    }
  },
  mounted() {
    this.$store.dispatch('getAllFoodStore')
    this.$store.dispatch('getAllDrinkStore')
  }
}
</script>

<style>
  #select-store {
    display: flex;
  }

  #store-left,
  #store-right {
    width: 50vw;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #select-header {
    display: flex;
    align-items: center;
  }

  #select-btn {
    font-size: 1rem;
    font-weight: normal;
    padding: 0.5rem 1rem;
    margin-left: 4rem;
  }

  #delete-menu {
    margin-left: 3rem;
    border: none;
    background-color: #FE929F;
    border-radius: 5px;
    padding: 0.5rem 1rem;
  }

  #delete-menu:hover {
    cursor: pointer;
    background-color: #C4C4C4;
  }

  #select-food,
  #select-drink {
    width: 35vw;
    height: 50vh;
    overflow-y: auto;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #select-food::-webkit-scrollbar,
  #select-drink::-webkit-scrollbar {
    width: 15px;
  }

  #select-food::-webkit-scrollbar-thumb,
  #select-drink::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ECE4E2;
  }

  #select-food::-webkit-scrollbar-track,
  #select-drink::-webkit-scrollbar-thumb { 
    background-color: none;
  }

  .none {
    display: none;
  }
</style>