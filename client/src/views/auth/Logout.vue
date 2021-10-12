<template>
    <div class="logout-view container">
        <h1>Logged out.</h1>
    </div>    
</template>

<script>
import axios from 'axios'

export default{
    name: "Logout",
    mounted(){
        localStorage.setItem("auth-token", "")
        axios.defaults.headers.common["auth-token"] = ""
        this.$store.commit('logout')
    }
}
</script>