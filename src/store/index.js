import axios from 'axios';
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

axios.defaults.baseURL = 'http://10.10.1.82:8080/api'

const store = createStore({
  state: () => ({
    allMemberList: [],
    memberList: [],
    deleteModal: {},
    allFoodStore: [],
    allDrinkStore: [],
    todayFoodStore: {"id": 0},
    todayDrinkStore: {"id": 0},
    addShopType: "",
    deleteShop: {},
    todayFoodMenu: [],
    todayDrinkMenu: [],
    todayFoodStoreName: "",
    todayDrinkStoreName: "",
    resultInfo: {},
    updateStoreInfo: {}
  }),

  getters: {
    getAllMemberList(state) {
      return state.allMemberList
    },
    getMemberList(state) {
      return state.memberList
    },
    delModal(state) {
      return state.deleteModal
    },
    getAllFoodStoreList(state) {
      return state.allFoodStore
    },
    getAllDrinkStoreList(state) {
      return state.allDrinkStore
    },
    getTodayFoodStore(state) {
      return state.todayFoodStore
    },
    getTodayDrinkStore(state) {
      return state.todayDrinkStore
    },
    getAddShopType(state) {
      return state.addShopType
    },
    getDeleteShop(state) {
      return state.deleteShop
    },
    getTodayFoodMenu(state) {
      return state.todayFoodMenu
    },
    getTodayDrinkMenu(state) {
      return state.todayDrinkMenu
    },
    getTodayFoodStoreName(state) {
      return state.todayFoodStoreName
    },
    getTodayDrinkStoreName(state) {
      return state.todayDrinkStoreName
    },
    getResultInfo(state) {
      return state.resultInfo
    },
    getUpdateStoreInfo(state) {
      return state.updateStoreInfo
    }
  },

  mutations: {
    setAllMemberList(state, payload) {
      state.allMemberList = payload
    },
    setMemberList(state, payload) {
      state.memberList = payload
    },
    setDelModal(state, payload) {
      state.deleteModal = payload
    },
    setAllFoodStoreList(state, payload) {
      state.allFoodStore = payload
    },
    setAllDrinkStoreList(state, payload) {
      state.allDrinkStore = payload
    },
    setTodayFoodStore(state, payload) {
      state.todayFoodStore = payload
    },
    setTodayDrinkStore(state, payload) {
      state.todayDrinkStore = payload
    },
    setAddShopType(state, payload) {
      state.addShopType = payload
    },
    setDeleteShop(state, payload) {
      state.deleteShop = payload
    },
    setTodayFoodMenu(state, payload) {
      state.todayFoodMenu = payload
    },
    setTodayDrinkMenu(state, payload) {
      state.todayDrinkMenu = payload
    },
    setTodayFoodStoreName(state, payload) {
      state.todayFoodStoreName = payload
    },
    setTodayDrinkStoreName(state, payload) {
      state.todayDrinkStoreName = payload
    },
    setResultInfo(state, payload) {
      state.resultInfo = payload
    },
    setUpdateStoreInfo(state, payload) {
      state.updateStoreInfo = payload
    }
  },

  actions: {
    async getAllMemberList() {
      const MEMBER_LIST_URL = '/snack/pick'
      const res = await axios.get(MEMBER_LIST_URL)
      let members = res.data.data
      members.sort((a, b) => a.id-b.id)
      store.commit('setAllMemberList', members)
      store.commit('setMemberList', members)
    },
    getSearchMember({commit}, payload) {
      let allMember = store.getters.getAllMemberList
      let temp = []
      for (let x of allMember) {
        if (x['name'].includes(payload.searchName)) {
          temp.push(x)
        }
      }
      commit('setMemberList', temp)
    },
    async getAllFoodStore() {
      const FOOD_STORE_URL = '/shop/FOOD'
      const res = await axios.get(FOOD_STORE_URL)
      store.commit('setAllFoodStoreList', res.data.data)
    },
    async getAllDrinkStore() {
      const DRINK_STORE_URL = '/shop/DRINK'
      const res = await axios.get(DRINK_STORE_URL)
      store.commit('setAllDrinkStoreList', res.data.data)
    },
    todaySelectStore({commit}, payload) {
      const selectFoodShop = async() => {
        const SELECT_FOOD_SHOP_URL = `/snack/FOOD/${payload.foodShop.id}`
        const res = await axios.put(SELECT_FOOD_SHOP_URL)
        let id = res.data.data.foodId
        let data = store.getters.getAllFoodStoreList.filter(item => item.id == id)
        commit('setTodayFoodStore', data)
      }
      const selectDrinkShop = async() => {
        const SELECT_DRINK_SHOP_URL = `/snack/DRINK/${payload.drinkShop.id}`
        const res = await axios.put(SELECT_DRINK_SHOP_URL)
        let id = res.data.data.drinkId
        let data = store.getters.getAllDrinkStoreList.filter(item => item.id == id)
        commit('setTodayDrinkStore', data)
      }
      const initMenu = async() => {
        const INIT_MENU_URL = '/snack/init'
        await axios.get(INIT_MENU_URL)
      }
      selectFoodShop()
      selectDrinkShop()
      initMenu()
    },
    async getTodayStore() {
      const TODAY_STORE_URL = '/snack'
      const res = await axios.get(TODAY_STORE_URL)
      const foodId = res.data.data.foodId
      const drinkId = res.data.data.drinkId
      let foodData = store.getters.getAllFoodStoreList.filter(item => item.id == foodId)
      let drinkData = store.getters.getAllDrinkStoreList.filter(item => item.id == drinkId)
      
      if (foodId === 0 || drinkId === 0) {
        const temp = {'id': 0, 'shopName': '', menuURI: ''}
        this.commit('setTodayFoodStore', temp)
        this.commit('setTodayDrinkStore', temp)
      } else {
        this.commit('setTodayFoodStore', foodData[0])
        this.commit('setTodayDrinkStore', drinkData[0])
      }
      
      const getTodayFoodMenu = async (idx) => {
        const TODAY_FOOD_MENU_URL = `/shop/FOOD/${idx}`
        const res = await axios.get(TODAY_FOOD_MENU_URL)
        let data = res.data.data.snackList
        data.unshift("Random")
        data.unshift("오늘은 패스")
        store.commit('setTodayFoodMenu', data)
      }
      const getTodayDrinkMenu= async (idx) => {
        const TODAY_DRINK_MENU_URL = `/shop/DRINK/${idx}`
        const res = await axios.get(TODAY_DRINK_MENU_URL)
        let data = res.data.data.snackList
        data.unshift("Random")
        data.unshift("오늘은 패스")    
        store.commit('setTodayDrinkMenu', data)
      }

      if (foodId && drinkId) {
        getTodayFoodMenu(foodId)
        getTodayDrinkMenu(drinkId)
      } else {
        store.commit('setTodayFoodMenu', [])
        store.commit('setTodayDrinkMenu', [])
      }      
    },
    async getResultInfo() {
      const RESULT_INFO_URL = '/snack/result'
      const res = await axios.get(RESULT_INFO_URL)
      store.commit('setResultInfo', res.data.data)
    },
    async getUpdateStoreInfo({commit}, payload) {
      const STORE_INFO_URL = `/shop/${payload.type}/${payload.id}`
      const res = await axios.get(STORE_INFO_URL)
      let data = res.data.data
      data['id'] = payload.id
      commit('setUpdateStoreInfo', res.data.data)
    }
  },

  plugins: [createPersistedState()]
})

export default store; 