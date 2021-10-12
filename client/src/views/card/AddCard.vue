<template>
    <div class="container">
        <h1>Create card | Collection: {{this.$route.params.slug}}</h1>
        <Message v-if="getMsg.text" :msg="getMsg" />
        <div class="f-card">
            <input v-model="title" type="text" placeholder="Question">
            <div class="f-card-body">
                <textarea placeholder="Type answer here..." v-model="body"></textarea>
            </div>
            <button @click="submit" class="card-btn">Create</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Message from '../../components/Message'
import {mapGetters} from 'vuex'

export default{
    name: "AddCard",
    data(){
        return{
            title: '',
            body: ''
        }
    }, 
    methods: {
        submit(){
            const slug = this.$route.params.slug
            axios
                .post(`http://localhost:3000/api/flashcards/${slug}/create-card`,{
                    title: this.title,
                    body: this.body
                })
                .then(() => {
                    this.$router.push(`/collection/${slug}/false`)
                })
                .catch(err => {
                    console.log(err.response)
                    this.$store.commit('setMsg', {
                        text: err.response,
                        bool: false
                    })
                })
        }
    },
    components: {
        Message,
    },
    computed:{
        ...mapGetters(['getMsg'])
    }
}
</script>

<style scoped>
h1{
    margin-bottom: 1.5rem;
}
.f-card{
    margin: auto;
}
.f-card input{
    height: 50px;
    width: 80%;
    margin: 5px 0px;
    background-color: transparent;
    border-top: none; 
    border-left: none;
    border-right: none;
    border-radius: 0px;
}
.f-card textarea{
    width: 95%;
    height: 95%;
    background-color: var(--third-color);
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    resize: none;
    border: none;
}
.f-card textarea:focus{
    outline: none;
}
</style>