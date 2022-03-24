<template>
  <div class="modal">
    <div class="modal-body">
      <h1>{{ storeInfo.shopName }}을 정말 삭제하시겠습니까?</h1>
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
  name: 'ModalDelStore',
  methods: {
    noneModal() {
      document.querySelector('.del-store').classList.add('none')
    },
    async onDeleteMember() {
      const idx = this.storeInfo.id
      const url = `https://sheltered-castle-40247.herokuapp.com/api/snack/shop/${idx}`
      await axios.delete(url)
      .then(res => {
        if (res.data.status === "SUCCESS") {
          this.$store.dispatch('getAllFoodStore')
          this.$store.dispatch('getAllDrinkStore')
        }
      })
      document.querySelector('.del-store').classList.add('none')
    }
  },
  computed: {
    storeInfo() {
      return this.$store.getters.getDeleteShop
    }
  }
}
</script>

<style>

</style>