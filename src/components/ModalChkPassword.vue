<template>
  <div class="modal">
    <div class="modal-body">
      <h1>비밀번호</h1>
      <input 
        placeholder="비밀번호를 입력해주세요"
        id="modal-input"
        type="password"
        v-model="password"
        @keyup.enter="onSelectStore"
      />
      <div>
        <button class="btn add-btn" @click="onSelectStore">시작</button>
        <button class="btn cancel-btn" @click="noneModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalChkPassword',
  data() {
    return {
      password: "",
    }
  },
  props: {
    foodData: {},
    drinkData: {}
  },
  methods: {
    noneModal() {
      document.querySelector('.chk-pwd').classList.add('none')
    },
    onSelectStore() {
      if (this.password === "akflahdjwls") {
        this.$store.dispatch('todaySelectStore', {
          'foodShop': this.foodData,
          'drinkShop': this.drinkData
        })
        this.$store.dispatch('getTodayStore')
        this.$router.push('/snack/home')
      } else {
        alert("비밀번호를 확인해주세요.")
      }      
    }
  }
}
</script>

<style>
  .modal {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
  }

  .modal-body {
    background-color: #FEFEFE;
    width: 50vw;
    height: 30vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly
  }

  #modal-input {
    width: 30vw;
    font-size: 1.5rem;
    padding: 1rem;
    text-align: center;
  }

  .add-btn,
  .cancel-btn {
    margin: 0 3rem;
    font-size: 1.5rem !important;
    padding: 0.5rem 4rem !important;
  }

  .cancel-btn {
    background-color: #ECE4E2 !important;
  }

  .cancel-btn:hover {
    background-color: #FCDFF3 !important;
  }

</style>