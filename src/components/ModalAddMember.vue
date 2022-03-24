<template>
  <div class="modal">
    <div class="modal-body">
      <h1>멤버추가</h1>
      <input 
        placeholder="이름을 입력해주세요"
        id="modal-input"
        v-model="addName"
      />
      <div>
        <button class="btn add-btn" @click="onCreateMember">추가</button>
        <button class="btn cancel-btn" @click="noneModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ModalAddMember',
  data() {
    return {
      addName: '',
      addMemberStatus: ''
    }
  },
  methods: {
    noneModal() {
      document.querySelector('.add-mem').classList.add('none')
    },
    async onCreateMember() {
      const url = 'https://sheltered-castle-40247.herokuapp.com/api/member'
      const headers = {
       'Content-Type': 'application/json'
      }
      await axios.post(url, {'name': this.addName}, { headers })
      .then(res => {
        if (res.data.status === "SUCCESS") {
          alert(`${this.addName}님이 추가되었습니다.`)          
          this.$store.dispatch('getAllMemberList')
          .then(() => {
            this.addName = ""
            this.noneModal()
          })
        }
      })
      .catch(err => {
        console.log(err.response)
      })
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