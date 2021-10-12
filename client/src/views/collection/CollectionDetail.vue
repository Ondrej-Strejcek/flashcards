<template>
    <div class="collection-detail-view container">
        <div v-if="isLoading" class="preloader"></div>
        <router-link v-show="!this.isShared" :to="`/collection/${$route.params.slug}/add-card`" class="btn btn-fixed">Add</router-link>
        <div class="page-header">
            <h1>{{collectionTitle}} <small v-if="isShared">by: {{creatorUsername}}</small></h1>
            <router-link v-if="!isShared" class="quick-action" :to="`/collection/${$route.params.slug}/edit`"><i class="fas fa-edit"></i></router-link>
            <router-link v-if="!isShared" class="quick-action" :to="`/collection/${$route.params.slug}/share`"><i class="fas fa-share"></i></router-link>
            <button @click="deleteCollection" v-if="!isShared" class="btn btn-small danger">Delete</button>
        </div>
        <div class="content-body">
            <Card 
                v-for="card in cards"
                :key="card.id"
                :header="card.question"
                :body="card.answer"
                :id="card._id"
                @deleteCard="deleteCard"
                btnTitle="Show"
                />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Card from '../../components/Card'

export default{
    name: "CollectionDetail",
    data(){
        return{
            cards: [],
            isLoading: true,
            isShared: false,
            creatorUsername: '',
            collectionTitle: '',
        }
    },
    components: {
        Card
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        deleteCollection(){
            if(!this.isShared){
                axios
                    .delete(`http://localhost:3000/api/flashcards/${this.$route.params.slug}/delete`)
                    .then(() => {
                        this.$router.push('/collections')
                    })
                    .catch(err => console.log(err)) 
            }
        },
        deleteCard(cardID){
            this.cards = []
            this.isLoading = true
            const url = `http://localhost:3000/api/flashcards/${this.$route.params.slug}/${cardID}/delete`
            console.log(url)
            axios
                .delete(url)
                .then(response => {
                    this.fetchData()
                    console.log(response)
                })
                .catch(err => {
                    console.log(err.response.data.err)
                })
        },
        fetchData(){
            axios
            .get(`http://localhost:3000/api/flashcards/${this.$route.params.slug}`,{
                params: {
                    shared: this.$route.params.shared
                }
            })
            .then(response => {
                this.cards = response.data.collection.flashcards
                this.isShared = response.data.shared
                this.collectionTitle = response.data.collection.name
                this.creatorUsername = response.data.creatorUsername
                this.isLoading = false
            })
            .catch(err=> console.log(err))
        }
    }
}
</script>

<style scoped>
.quick-action{
    color: var(--second-color);
    font-size: 18px;
}
</style>
