 <template>
  <div id="create-store">
    <h1 v-if="addShopType==='FOOD'" id="create-store-title">디저트</h1>
    <h1 v-else-if="addShopType==='DRINK'" id="create-store-title">음료</h1>
    <div>
      <button class="btn btn-activate c-storeName" id="create-store-category" @click="onClickCategory('storeName')">가게이름</button>
      <button class="btn c-url" id="create-store-category" @click="onClickCategory('url')">메뉴판 URL</button>
      <button class="btn c-menu" id="create-store-category" @click="onClickCategory('menu')">메뉴</button>
    </div>
    <div>
      <input v-if="chkBtn==='storeName'" id="create-store-input" placeholder="가게이름을 입력해주세요" v-model="inputText" @keyup.enter="onAddInput" />
      <input v-else-if="chkBtn==='url'" id="create-store-input" placeholder="메뉴판 URL 주소를 입력해주세요" v-model="inputText" @keyup.enter="onAddInput" />
      <input v-else id="create-store-input" placeholder="메뉴를 입력해주세요" v-model="inputText" @keyup.enter="onAddInput" />
      <button class="btn" @click="onAddInput">추가</button>
    </div>
    <div id="create-store-info">
      <h3><span id="info-label">Store Name</span> {{ storeName }}</h3>
      <h3><span id="info-label">Menu URL Address</span> {{ menuURI }}</h3>
      <h3><span id="info-label-m">Menu</span> 
        <div v-for="(item, idx) in snackList" :key="idx" id="create-store-menu">{{ item }}
          <button id="delete-menu" @click="onDeleteMenu(idx)">❌</button>
        </div>
      </h3>
    </div>
    <button class="btn" id="create-store-btn" @click="onAddShop">등록</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateStore',
  computed: {
    addShopType() {
      return this.$store.getters.getAddShopType
    }
  },
  data() {
    return {
      "storeName": "",
      "menuURI": "",
      "snackList": [],
      "chkBtn": "storeName",
      "inputText": "",
      "chkClick": 0
    }
  },
  methods: {
    onClickCategory(category) {
      this.chkBtn = category
      document.querySelector(".btn-activate").classList.remove("btn-activate")
      document.querySelector(`.c-${category}`).classList.add("btn-activate")
    },
    onAddInput() {
      if (this.inputText.length) {
        if (this.chkBtn === "storeName") {
          this.storeName = this.inputText
          this.inputText = ""
        }
        else if (this.chkBtn === "url") {
          this.menuURI = this.inputText
          this.inputText = ""
        }
        else {
          this.snackList.push(this.inputText)
          this.inputText = ""
        }
      }
    },
    onDeleteMenu(idx) {
      this.snackList.splice(idx, 1)
    },
    async postAddShop() {
      const url = 'https://sheltered-castle-40247.herokuapp.com/api/shop'
      const headers = {
        'Content-Type': 'application/json'
      }
      let data = {
        "menuURI": this.menuURI,
        "shopName": this.storeName,
        "snackList": this.snackList,
        "snackType": this.addShopType
      }
      await axios.post(url, data, { headers })
      .then(res => {
        if (res.data.status === "SUCCESS") {
          alert("성공적으로 가게가 추가되었습니다.")
          this.$router.push('/pickshop/shop');
        }
      })
    },
    onAddShop() {

      if (this.menuURI && this.storeName && this.snackList.length && this.addShopType && this.chkClick === 0) {
        this.chkClick += 1
        this.postAddShop()
      } else if (this.chkClick === 0) {
        alert("정보를 모두 입력해주세요.")
      }      
    }
  }
}
</script>

<style>
  #create-store {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #create-store-title {
    margin: 2rem 0;
  }

  #create-store-category {
    background-color: #FE929F;
    border-radius: 0;
    padding: 0.5rem 2.5rem;
    margin: 2rem 5rem;
    font-size: 1.3rem;
  }

  #create-store-category:hover {
    cursor: pointer;
    background-color: #FCDFF3;
  }

  .btn-activate {
    background-color: #FCDFF3 !important;
  }

  #create-store-input {
    margin: 1rem 0;
    height: 2rem;
    width: 50vw;
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
  }
  
  #create-store-info {
    margin-top: 1rem;
    height: 37.5vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  #create-store-info::-webkit-scrollbar {
    width: 15px;
  }

  #create-store-info::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ECE4E2;
  }

  #create-store-info::-webkit-scrollbar-track { 
    background-color: none;
  }

  #info-label {
    color: #FE929F;
    margin-right: 1rem;
  }
  
  #info-label-m {
    color: #FE929F;
    margin-right: 0;
  }

  #create-store-menu {
    margin: 0.5rem 0;
  }

  #create-store-btn {
    font-size: 1.5rem;
    position: fixed;
    left: 50%;
    bottom: 3rem;
    transform: translate(-50%, -50%);
  }
</style>