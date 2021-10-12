<template>
    <nav :scroll="showMobileNav ? 'no' : ''">
        <h1 class="">Flashcards</h1>
        <div v-if="!getIsAuthenticated" class="nav-content">
            <router-link to="/" class="has-text-white mr-2">Home</router-link>
            <router-link to="/register" class="has-text-white mr-2">Register</router-link>
            <router-link to="/login" class="has-text-white mx-2">Login</router-link>
        </div>
        <div v-if="getIsAuthenticated" class="nav-content">
            <router-link to="/">Home</router-link>
            <router-link to="/collections">Flashcards</router-link>
            <router-link to="/logout">Logout</router-link>
        </div>
        <div @click="showMobileNav = !showMobileNav" class="mobile-nav" v-if="showMobileNav">
            <div v-if="!getIsAuthenticated">
                <router-link to="/" class="has-text-white mr-2">Home</router-link>
                <router-link to="/register" class="has-text-white mr-2">Register</router-link>
                <router-link to="/login" class="has-text-white mx-2">Login</router-link>
            </div>
            <div v-if="getIsAuthenticated">
                <router-link to="/">Home</router-link>
                <router-link to="/collections">Flashcards</router-link>
                <router-link to="/logout">Logout</router-link>
            </div>
        </div>
        <div @click="showMobileNav = !showMobileNav" :class="showMobileNav ? 'cross' : 'nav-toggle'">
            <span></span>
        </div>
    </nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default{
    name: 'Navbar',
    computed:{
        ...mapGetters(['getIsAuthenticated'])
    },
    data(){
        return{
            showMobileNav: false
        }
    },
}
</script>

<style scoped>
nav{
    width: 100vw;
    height: 76px;
    background-color: var(--primary-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5rem;
}
nav * {
    margin: 0em 1rem;
}
nav a {
    color: white;
    text-decoration: none;
}
.nav-content{
    display: none;
}
.nav-toggle{
    position: absolute;
    top: 0;
    right: 0;
    margin-left: 1em;
    height: 75px;
    display: flex;
    align-items: center;
}

.nav-toggle span,
.nav-toggle span::before,
.nav-toggle span::after {
  display: block;
  background: var(--third-color);
  height: 2px;
  width: 2em;
  border-radius: 2px;
  position: relative;
}

.nav-toggle span::before,
.nav-toggle span::after {
  content: '';
  position: absolute;
}

.cross span,
.cross span::before{
  display: block;
  background: var(--third-color);
  height: 2px;
  width: 2em;
  border-radius: 2px;
  position: relative;
}

.cross span{
    transform: rotate(-45deg);
}

.cross span::before{
  content: '';
  position: absolute;
  transform: rotate(90deg)
}


.nav-toggle span::before {
  bottom: 7px;
}

.nav-toggle span::after {
  top: 7px;
}
.mobile-nav{
    position: fixed;
    top: 75px;
    left: 0;
    height: 100vh;
    width: 100vw;
    margin: 0;
    z-index: 100;
    background-color: var(--primary-color);
    transform-origin: top;
    animation: mnAnimation 400ms ease-in-out;
}
.mobile-nav > div{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 2.5rem;
    font-weight: bolder;
}
.mobile-nav > div > *{
    margin: 1em 0em;
    opacity: 100;
    animation: linksAnimation 800ms ease-in;
}

@keyframes mnAnimation {
    from{
        transform: scale(1,0);
    }
    to{
        transform: scale(1);
    }
}
@keyframes linksAnimation{
    from{
        opacity: 0;
    }
    to{
        opacity: 100;
    }
}

/*
    Navigation styles --Media
*/
@media only screen and (min-width: 1000px){
    .nav-content{
        display: block;
    }
    .nav-toggle{
        display: none;
    }
}
</style>