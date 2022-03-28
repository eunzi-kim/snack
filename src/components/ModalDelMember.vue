<template>
  <div class="modal">
    <div class="modal-body">
      <h1>{{ userInfo.name }} 님을 삭제하시겠습니까?</h1>
      <div>
        <button class="btn add-btn" @click="onDeleteMember">삭제</button>
        <button class="btn cancel-btn" @click="noneModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ModalDelMember',
  methods: {
    noneModal() {
      document.querySelector('.del-mem').classList.add('none')
    },
    async onDeleteMember() {
      const url = `https://sheltered-castle-40247.herokuapp.com/api/member/${this.userInfo.id}`
      await axios.delete(url)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          alert(`${this.userInfo.name}님이 삭제되었습니다.`)
          this.$store.dispatch('getAllMemberList')
          .then(() => {
            this.noneModal()
          })
        }
      })      
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.delModal
    }
  }
}
</script>

<style>

</style>