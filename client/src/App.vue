<template>
  <div id="nav">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './components/Navbar'

export default{
  components: {
    Navbar
  }, 
  beforeCreate(){ 
    const token = localStorage.getItem("auth-token");

    if (token){
      this.$store.commit('setAuthToken', token);
      axios.defaults.headers.common['auth-token'] = token
    }else{
      axios.defaults.headers.common['auth-token'] = ""
    }
  }
}
</script>

<style>
@import "../public/style.css";
</style>
