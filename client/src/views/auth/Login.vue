<template>
    <div class="centered-form">
        <h1>Login</h1>
        <p v-if="getMsg.text" :class="'msg-box ' + (getMsg.succesful ? 'succesful' : 'err')">
            {{getMsg.text}}
        </p>
        <div class="form">
            <input type="email" placeholder="Email" v-model="email">
            <input type="password" placeholder="Password" v-model="password">
            <button class="btn" @click="formSubmit">Login!</button>
            <small>Don't have an account? <router-link to="/register">Register</router-link></small>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default{
    name: 'Login',
    computed: {
        ...mapGetters(['getMsg'])
    }, 
    data(){
        return{
            email: '',
            password: '',
        }
    },
    methods: {
        formSubmit(){
            axios.defaults.headers.common["auth-token"] = ""
            axios
                .post('http://localhost:3000/api/auth/login/', {
                    "email": this.email,
                    "password": this.password
                })
                .then(response => {
                    const token = response.data.token;
                    axios.defaults.headers.common["auth-token"] = token;
                    this.$store.commit('setAuthToken', token);
                    localStorage.setItem("auth-token", token);
                    this.$router.push('/collections');
                })
                .catch(err => {
                    this.$store.commit('setMsg', {
                        text:err.response.data.err,
                        bool: false
                    })
                })
        }
    },
    beforeUnmount(){
        this.$store.commit('setMsg', '', Boolean)
    }
}
</script>

<style>

</style>