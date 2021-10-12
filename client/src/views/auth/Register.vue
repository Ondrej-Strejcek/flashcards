<template>
  <div class="centered-form">
    <h1>Register</h1>
    <Message  v-if="getMsg.text" :msg="getMsg"/>
    <div class="form">
      <input type="text" placeholder="Username" v-model="username">
      <input type="email" placeholder="Email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <input type="password" placeholder="Password again" v-model="password2">
      <button class="btn" @click="formSubmit">Register!</button>
      <small>Already have an accout? <router-link to="/login">Login</router-link></small>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from '../../components/Message'
import {mapGetters} from 'vuex'

export default {
  name: 'Register',
  data(){
    return{
      username: '',
      email: '',
      password: '',
      password2: '',
    }
  },
  components: {
    Message,
  },
  methods: {
    formSubmit(){
      axios.defaults.headers.common["auth-token"] = ""
      axios
        .post('http://localhost:3000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          password2: this.password2, 
        })
        .then((response) => {
            const token = response.data.token;
            axios.defaults.headers.common["auth-token"] = token;
            this.$store.commit('setAuthToken', token);
            localStorage.setItem("auth-token", token);
            this.$router.push('/collections');
        })
        .catch(err => {
          this.$store.commit('setMsg', {
            text:err.response.data.err,
            bool: false,
          })
        })
    },
  },
  computed: {
    ...mapGetters(['getMsg']),
  },
  beforeUnmount(){
    this.$store.commit('setMsg', '', Boolean)
  }
}
</script>
