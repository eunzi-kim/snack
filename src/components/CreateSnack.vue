<template>
  <div class="create-snack">
    <div id="snack-left">
      <h1>🧁{{todayFood.shopName}}🧁</h1>
      <button id="snack-menu-url" @click="openUrl('food')">메뉴판 홈페이지</button>
      <input id="snack-input" disabled placeholder="선택하면 자동 입력됩니다." v-model="viewFood"/>
      <div id="food">
        <div v-for="(item, idx) in todayFoodMenu" :key="idx" class="menu" @click="onClickFood(item)">{{item}}</div>
      </div>
      <div>
        <div id="personal">
          <input id="personal-input" placeholder="옵션 추가 예) 눈꽃 치즈" v-model="foodOptionInput"/>
          <button id="personal-btn" @click="addFoodOption">추가</button>
        </div>
      </div>
    </div>

    <div id="snack-right">
      <h1>🥤{{todayDrink.shopName}}🥤</h1>
      <button id="snack-menu-url" @click="openUrl('drink')">메뉴판 홈페이지</button>
      <div><input id="snack-input" disabled placeholder="선택하면 자동 입력됩니다." v-model="viewDrink" /></div> 
      <div id="drink">
        <div v-for="(item, idx) in todayDrinkMenu" :key="idx" class="menu" @click="onClickDrink(item)">{{item}}</div>
      </div>
      <div>
        <div id="personal">
          <input id="personal-input" placeholder="옵션 추가 예) 얼음 50% ; 당도 50% ; 화이트펄" v-model="drinkOptionInput" />
          <button id="personal-btn" @click="addDrinkOption">추가</button>
        </div>
      </div>
    </div>   
  </div>
  <div>
    <button class="btn" id="create-snack-btn" @click="onClickSnack">선택 완료</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateSnack',
  props: {
    userId: Number
  },
  data() {
    return {
      "memberId": this.$route.params.userId,
      "foodOption": "",
      "foodSnack": "",
      "drinkOption": "",
      "drinkSnack": "",
      "foodOptionInput": "",
      "drinkOptionInput": "",
      "viewFood": "",
      "viewDrink": ""
    }
  },
  computed: {
    todayFood() {
      return this.$store.getters.getTodayFoodStore
    },
    todayDrink() {
      return this.$store.getters.getTodayDrinkStore
    },
    todayFoodMenu() {
      return this.$store.getters.getTodayFoodMenu
    },
    todayDrinkMenu() {
      return this.$store.getters.getTodayDrinkMenu
    },
    allMemberList() {
      return this.$store.getters.getAllMemberList
    }
  },
  methods: {
    onViewFood() {
      if (this.foodOption) {
        this.viewFood = this.foodSnack + " & " + this.foodOption
      } else {
        this.viewFood = this.foodSnack
      }
    },
    onViewDrink() {
      if (this.drinkOption) {
        this.viewDrink = this.drinkSnack + " & " + this.drinkOption
      } else {
        this.viewDrink = this.drinkSnack
      }
    },
    onClickFood(item) {
      if (item === 'Random') {
        item = this.todayFoodMenu[Math.floor(Math.random()*(this.todayFoodMenu.length-2)+2)]
      }
      this.foodSnack = item
      this.onViewFood()
    },
    onClickDrink(item) {
      if (item === 'Random') {
        item = this.todayDrinkMenu[Math.floor(Math.random()*(this.todayDrinkMenu.length-2)+2)]
      }
      this.drinkSnack = item 
      this.onViewDrink()
    },
    addFoodOption() {
      this.foodOption = this.foodOptionInput
      this.foodOptionInput = ""
      this.onViewFood()
    },
    addDrinkOption() {
      this.drinkOption = this.drinkOptionInput
      this.drinkOptionInput = ""
      this.onViewDrink()
    },
    async onClickSnack() {
      if (this.foodSnack && this.drinkSnack) {
        let chk = [0, 0]
        const url = 'https://sheltered-castle-40247.herokuapp.com/api/snack/pick'
        const foodData = {
          "memberId": this.memberId,
          "option": this.foodOption,
          "snack": this.foodSnack,
          "snackType": "FOOD"
        }
        const drinkData = {
          "memberId": this.memberId,
          "option": this.drinkOption,
          "snack": this.drinkSnack,
          "snackType": "DRINK"
        }
        const headers = {
          'Content-Type': 'application/json'
        }
        await axios.post(url, foodData, { headers })
        .then(res => {
          if (res.data.status === "SUCCESS") {
            chk[0] = 1
          }
        })
        await axios.post(url, drinkData, { headers })
        .then(res => {
          if (res.data.status === "SUCCESS") {
            chk[1] = 1
          }
        })
        if (chk[0]+chk[1] === 2) {
          alert("오늘의 간식이 선택되었습니다.")
          this.$router.push('/snack/home');
        }
      } else {
        alert("정보를 입력해주세요.")
      }      
    },
    openUrl(type) {
      if (type === 'food') {
        window.open(this.todayFood.menuURI)
      } else {
        window.open(this.todayDrink.menuURI)
      }
    }
  },
  mounted() {
    this.$store.dispatch('getAllFoodStore')
    this.$store.dispatch('getAllDrinkStore')
    this.$store.dispatch('getTodayStore')
    let data = this.allMemberList.filter(item => item.id == this.memberId)[0]
    if (data.food) {
      this.foodSnack = data.food
      this.viewFood = this.foodSnack
      if (data.foodOption) {
        this.foodOption = data.foodOption
        this.viewFood = this.foodSnack + " & " + this.foodOption
      }
    }
    if (data.drink) {
      this.drinkSnack = data.drink
      this.viewDrink = this.drinkSnack
      if (data.drinkOption) {
        this.drinkOption = data.drinkOption
        this.viewDrink = this.drinkSnack + " & " + this.drinkOption
      }
    }

    if (this.todayFood.shopName === undefined || this.todayDrink.shopName === undefined) {
      alert("음식점이 선택되지 않았습니다.")
      this.$router.push('/pickshop/shop')
    }
  },
  created() {
    if (this.todayFood.shopName === undefined || this.todayDrink.shopName === undefined) {
      alert("음식점이 선택되지 않았습니다.")
      this.$router.push('/pickshop/shop')
    }
  }
}
</script>

<style>
  .create-snack {
    display: flex;
  }

  #snack-left,
  #snack-right {
    width: 50vw;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #snack-menu-url {
    margin-bottom: 1rem;
  }

  #snack-menu-url:hover {
    cursor: pointer;
  }

  #snack-input {
    width: 30vw;
    height: 3rem;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    background-color: #ECE4E2;
    border: none;
  }

  #food,
  #drink {
    width: 35vw;
    height: 40vh;
    overflow-y: auto;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu {
    font-size: 1.25rem;
    padding: 2rem 0;
    width: 33vw;
  }

  .menu:hover {
    cursor: pointer;
    background-color: #FCDFF3;
  }

  #food::-webkit-scrollbar,
  #drink::-webkit-scrollbar {
    width: 15px;
  }

  #food::-webkit-scrollbar-thumb,
  #drink::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ECE4E2;
  }

  #food::-webkit-scrollbar-track,
  #drink::-webkit-scrollbar-track { 
    background-color: none;
  }

  #personal {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
  }

  #personal-input {
    width: 23vw;
    height: 2rem;
    padding-left: 1rem;
  }

  #personal-btn {
    background-color: #FE929F;
    height: 2.4rem;
    padding: 0 1rem;
    border: 1px solid #000;
  }

  #personal-btn:hover {
    cursor: pointer;
    background-color: #FCDFF3;
  }

  #create-snack-btn {
    font-size: 1.5rem;
  }
</style>