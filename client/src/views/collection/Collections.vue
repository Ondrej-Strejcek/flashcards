<template>
    <div class="collection-view">
        <div class="switch">
            <h3 @click="fetchUserFlashcards" :class="showShared ? '' : 'active'" >My Flashcards</h3>
            <h3 @click="fetchShared" :class="showShared ? 'active' : ''">Shared Flashcards</h3>
        </div>
        <div class="content">
            <div class="content-heading">
                <div>
                    <h5>Sort by:</h5>
                    <select @change="sortBy" v-model="selected">
                        <option selected value="-date">By Date</option>
                        <option selected value="date">By Date (from oldest)</option>
                        <option value="-name">By Name A-Z</option>
                        <option value="name">By Name Z-A</option>
                    </select>
                </div>
            </div>
            <Message v-if="getMsg.text" :msg="getMsg"/>
            <div class="content-body">
                <div v-if="isLoading" class="preloader"></div>
                <InformationCard 
                    v-for="collection in collections"
                    :key="collection.slug"
                    :header="collection.name"
                    :text="collection.flashcards.forEach(flashcard => '1')"
                    btnTitle="View"
                    :to="`/collection/${collection.slug}/${showShared}`"
                />
            </div>
        </div>
        <button v-show="!this.showShared" @click="createCollection" class="btn btn-fixed">{{showCreateCollection ? "Close" : "Add"}}</button>
        <CenteredInput @hide-input="hideInput" @submitted="submitForm" v-if="showCreateCollection" placeholder_text="Create collection" />
    </div>
</template>

<script>
import axios from 'axios'
import InformationCard from '../../components/InformationCard'
import CenteredInput from '../../components/CenteredInput'
import Message from '../../components/Message'
import {mapGetters} from 'vuex'

export default{
    name: 'CollectionView',
    components: {
        InformationCard,
        CenteredInput,
        Message
    },
    data(){
        return {
            showShared: false,
            isLoading: true,
            collections: [],
            showCreateCollection: false, 
            selected: '-date'
        }
    },
    computed:{
        ...mapGetters(['getMsg'])
    },
    methods:{
        fetchShared(){
            this.showShared = true
            this.collections= []
            this.isLoading = true
            axios
                .get("http://localhost:3000/api/flashcards/shared-with-me/",
                {params: {
                    sortBy: this.selected
                }})
                .then(response => {
                    this.collections = response.data.collections
                    this.isLoading = false
                })
                .catch(err => console.log(err))
        },
        fetchUserFlashcards(){
            this.showShared = false;
            this.isLoading=true;
            axios
                .get("http://localhost:3000/api/flashcards/", {params: { sortBy: this.selected}})
                .then(response => {
                    this.collections = response.data.collections
                    this.isLoading = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createCollection(){
            this.showCreateCollection = !this.showCreateCollection
        },
        submitForm(textInput){
            axios
                .post("http://localhost:3000/api/flashcards/create-collection", {
                    name: textInput,
                })
                .then(response => {
                    console.log(response.msg)
                    this.showCreateCollection = false
                    this.$store.commit('setMsg', {
                        text: response.data.msg,
                        bool: true
                    })
                    this.fetchUserFlashcards()
                })
                .catch(err => {
                    this.showCreateCollection = false
                    this.$store.commit('setMsg', {
                        text: err.response.data.err,
                        bool: false
                    })
                })
        },
        hideInput(){
            this.showCreateCollection = false
        },
        sortBy(){
            console.log("sortBy")
            if(this.showShared){
                this.fetchShared()
            }else{
                this.fetchUserFlashcards()
            }
        }
    },
    mounted(){
        this.fetchUserFlashcards()
    },
}
</script>

<style scoped>
.content-heading > div {
    display: flex;
}
select {
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  height: 1.5em;
  padding: 0 4em 0 1em;
  color: #2c3e50;
  background-color: var(--third-color);
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  font-size: 17px;
  cursor: pointer;
  margin: 0 1em;
}
option {
    color: inherit;
    background-color: var(--third-color);
    border-radius: 0.25em;
}
option:hover{
    background-color: var(--second-color);
}
option:focus {
    outline: none;
    background-color: var(--second-color);
}
option::-ms-expand {
    display: none;
}

</style>