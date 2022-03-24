 <template>
  <div id="result">
    <div id="result-left">
      <h1>🧁{{ todayFoodStore.shopName }}🧁</h1>
      <h1 id="result-num">
        <span id="result-label">구매 / 체크</span>
        <span>
          <span v-if="resultInfo.food['오늘은 패스'] !== undefined">{{ resultInfo.foodCheck - resultInfo.food["오늘은 패스"] }}</span>
          <span v-else>{{ resultInfo.foodCheck }}</span>
           / {{ resultInfo.foodCheck }}
        </span>
      </h1>
      <div id="result-info">
        <div v-for="(item, idx) in resultInfo.food" :key="idx" class="result-menu-info">
          <span id="result-menu">{{ idx }}</span>
          <span>{{ item }}명</span>
        </div>
      </div>
    </div>

    <div id="result-right">
      <h1>🥤{{ todayDrinkStore.shopName }}🥤</h1>
      <h1 id="result-num">
        <span id="result-label">구매 / 체크</span>
        <span>
          <span v-if="resultInfo.drink['오늘은 패스'] !== undefined">{{ resultInfo.drinkCheck - resultInfo.drink["오늘은 패스"] }}</span>
          <span v-else>{{ resultInfo.drinkCheck }}</span>
           / {{ resultInfo.drinkCheck }}
        </span>
      </h1>
      <div id="result-info">
        <div v-for="(item, idx) in resultInfo.drink" :key="idx" class="result-menu-info">
          <span id="result-menu">{{ idx }}</span>
          <span>{{ item }}명</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultSnack',
  computed: {
    resultInfo() {
      return this.$store.getters.getResultInfo
    },
    todayFoodStore() {
      return this.$store.getters.getTodayFoodStore
    },
    todayDrinkStore() {
      return this.$store.getters.getTodayDrinkStore
    }
  },
  mounted() {
    this.$store.dispatch('getResultInfo')
  },
  created() {
    this.$store.dispatch('getTodayStore')
  }
}
</script>

<style>
  #result {
    display: flex;
  }

  #result-left,
  #result-right {
    width: 50vw;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #result-num {
    margin: 1rem 0;
    color: #FE929F;
  }

  #result-label,
  #result-menu {
    margin-right: 2rem;
  }

  #result-info {
    height: 50vh;
    overflow-y: auto;
    margin-top: 2.5rem;
    width: 40vw;
  }

  #result-info::-webkit-scrollbar {
    width: 15px;
  }

  #result-info::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ECE4E2;
  }

  #result-info::-webkit-scrollbar-track { 
    background-color: none;
  }

  .result-menu-info {
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }
</style>