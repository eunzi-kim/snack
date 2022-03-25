<template>
  <div id="main-container">
    <div id="main-left">
      <div id="no-select">
        <h2 id="select-title">미선택자</h2>
        <div id="no-member">
          <span v-for="(item, idx) in allMemberList" :key="idx">
            <h4 v-if="!item.food || !item.drink">{{ item.name }}</h4>
          </span>     
        </div>        
      </div>      
      <button class="btn" id="add-member" @click="addMember">멤버 추가</button>
    </div>

    <div id="main-right">
      <div class="main-search">
        <input 
          id="main-input" 
          placeholder="이름을 입력해주세요." 
          @input="onSearchName"
          v-model="searchName"
        />
      </div>
      <div id="main-table">
        <table>
          <thead>
            <tr>
              <th></th><th>간식</th><th>음료</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in memberList" :key="idx">
              <td @click="delMember(item.name, item.id)" id="item-name">{{ item.name }}</td>
              <div v-if="item.drink || item.food" class="update-snack" @click="onClick(item.id)">
                <td v-if="item.foodOption">{{ item.food }} & {{ item.foodOption }}</td>
                <td v-else>{{ item.food }}</td>
                <td v-if="item.drinkOption">{{ item.drink }} & {{ item.drinkOption }}</td>
                <td v-else>{{ item.drink }}</td>
              </div>
              <td v-else colspan="2" id="no-select-td">
                <button class="btn" @click="onClick(item.id)">선택</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>  
  <ModalAddMember class="add-mem none" />
  <ModalDelMember class="del-mem none" />
</template>

<script>
import ModalAddMember from '@/components/ModalAddMember';
import ModalDelMember from '@/components/ModalDelMember';

export default {
  name: 'MainSnack',
  components: {
    ModalAddMember,
    ModalDelMember
  },
  data() {
    return {
      searchName: ''
    }
  },
  computed: {
    memberList() {
      return this.$store.getters.getMemberList
    },
    allMemberList() {
      return this.$store.getters.getAllMemberList
    }
  },
  methods: {
    onClick(idx) {
      this.$router.push(`/snack/create/${idx}`);
    },
    addMember() {
      document.querySelector('.add-mem').classList.remove('none')
    },
    delMember(name, id) {
      let data = {
        "name": name,
        "id": id
      }
      this.$store.commit('setDelModal', data)
      document.querySelector('.del-mem').classList.remove('none');
    },
    onSearchName(e) {
      this.$store.dispatch('getSearchMember', {
        searchName: e.target.value
      })
    }
  },  
  mounted() {
    this.$store.dispatch('getAllMemberList')
    this.$store.dispatch('getAllFoodStore')
    this.$store.dispatch('getAllDrinkStore')
  }
}
</script>

<style>
  #main-container {
    display: flex;
    justify-content: center;
  }

  #main-left {
    width: 20vw;
  }

  #no-select {
    height: 70vh;
    background-color: #ECE4E2;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #select-title{
    color: #EC1A1A;
    padding: 1.5rem 0;
  }

  #no-member {
    overflow-y: auto;
    width: 80%;
    height: 50vh;
  }

  #no-member span h4 {
    margin-top: 0;
  }

  #no-member::-webkit-scrollbar {
    width: 10px;
  }

  #no-member::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #C4C4C4;
  }

  #no-member::-webkit-scrollbar-track{ 
    background-color: none;
  }

  .btn {
    background-color: #FCD3D1;
    border: none;
    font-weight: bold;
    font-family: CBNUJIKJI;
    border-radius: 8px;
    padding: 0.5rem 2rem;
    font-size: 1rem;
  }

  .btn:hover {
    cursor: pointer;
    background-color: #FCDFF3;
  }

  #add-member {
    margin-top: 1.75rem;
    font-size: 1rem;
  }

  #main-right {
    width: 70vw;
    margin: 1rem;
  }

  #main-input {
    width: 20vw;
    padding: 0.5rem 2rem;
    font-size: 1.25rem;
    text-align: center;
    font-family: CBNUJIKJI;
  }

  #main-table {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  #item-name:hover {
    cursor: pointer;
    color: #FE929F;
  }

  table {
    margin-top: 5rem;
    width: 65vw;
    height: 100%;
    border-collapse: collapse;
    text-align: center;
    display: block;
  }

  th {
    font-weight: bold;
    font-size: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #000;
  }

  td {
    padding: 1rem 0;
    border-bottom: 1px solid #ECE4E2;
  }

  th, td {
    width: 20vw;
  }

  #no-select-td {
    width: 40vw;
  }

  tbody {
    max-height: 50vh;
    overflow-y: auto;
    display: block;
  }

  tbody::-webkit-scrollbar {
    width: 15px;
  }

  tbody::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ECE4E2;
  }

  tbody::-webkit-scrollbar-track { 
    background-color: none;
  }

  .none {
    display: none;
  }

  .update-snack:hover {
    cursor: pointer;
    color: #FE929F;
  }
</style>