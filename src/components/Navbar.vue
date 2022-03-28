<template>
  <div id="nav">
    <div class="nav-item">
      <router-link to="/snack" class="nav-btn">Today Snack</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/result" class="nav-btn">Result Snack</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/pickshop" class="nav-btn">Pick Shop</router-link>
    </div>
  </div>
  <div id="nav-line" />
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  #nav {
    display: flex;
    font-family: 'IM_Hyemin-Regular';
    justify-content: space-around;
    font-size: 1.5rem;
  }

  .nav-btn {
    text-decoration: none;
    outline: none;
    color: black;
  }

  .nav-btn:hover {
    cursor: pointer;
    color: #FE929F;
  }

  #nav-line {
    background-color: #ECE4E2;
    height: 0.1rem;
    margin: 1rem 0;
  }

  #nav a.router-link-active {
    color: #FE929F;
  }

</style>