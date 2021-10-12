<template>
  <div class="home">
    <div>
      <h1>Flashcards</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, est. Ratione laborum eligendi maiores, cumque necessitatibus ipsam omnis eaque, officia molestiae illo animi, veritatis quasi deserunt blanditiis iure provident quod?</p>
      <br>
      <router-link to="/login" class="btn btn-large">Login</router-link>
    </div>
    <InformationCard header="Lorem ipsum" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, est. Rat" btnTitle="Register" to="/register"/> 
  </div>
</template>

<script>
import InformationCard from '../../components/InformationCard'

export default {
  name: "Home",
  components: {
    InformationCard,
  },
};
</script>

<style scoped>
.home{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
}
button{
  font-size: 20px;
  margin: 1rem 0;
}

@media only screen and (min-width: 800px){
  .home{
    text-align: left;
  }
}
</style>
