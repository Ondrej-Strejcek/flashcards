<template>
    <div class="container">
        <h1>{{collection.name}}</h1>
        <div v-if="isLoading" class="preloader"></div>
        <div class="input-flex">
            <input type="text" v-model="newCollectionTitle" placeholder="New Title">
            <button class="btn btn-medium" @click="submit">Sumbit</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: "EditCollection",
    data(){
        return{
            collection: {},
            isLoading: true,
            newCollectionTitle: ''
        }
    },
    mounted(){
        this.isLoading = true,
        axios
            .get(`http://localhost:3000/api/flashcards/${this.$route.params.slug}/edit`)
            .then(response => {
                this.isLoading = false;
                this.collection = response.data.collection;
            })
            .catch(err => {
                this.isLoading = false
                this.collection.name = err.response.data.err
            })
    },
    methods:{
        submit(){
            axios
                .patch(`http://localhost:3000/api/flashcards/${this.$route.params.slug}/edit`, {
                    name: this.newCollectionTitle,
                })
                .then(() => {
                    this.$router.push('/collections')
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
        this.$store.commit('setMsg', {
            text: undefined,
            bool: undefined
        })
    }
}
</script>

<style scoped>
input{
    width: 70%;
    margin-bottom: 1rem;
}
button{
    font-size: 18px;
    padding: 1em 3rem;
}
.input-flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
@media only screen and (min-width: 800px){
    .input-flex{
        flex-direction: row;
    }
    input{
        margin: 0;
    }
}
</style>