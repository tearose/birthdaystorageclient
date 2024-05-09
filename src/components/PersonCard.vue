<script setup lang="ts">
import Person from '../datamodel/Person';

defineProps({
  person: {
    type: Person,
    required: true
  }
});
</script>

<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="our-team">
      <div class="picture">
        <img class="img-fluid" src="https://picsum.photos/130/130?image=1027" alt=""/>
      </div>
      <div class="team-content">
        <h3 class="name">{{ person.firstname }} {{ person.lastname }}</h3>
<!--        <h4 class="title">Web Developer</h4>-->
      </div>
      <ul class="social">
        <li v-if="person.facebook"><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
        <li v-if="person.instagram"><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-instagram" aria-hidden="true"></a></li>
        <li v-if="person.googleplus"><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
        <li v-if="person.telegram"><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-telegram" aria-hidden="true"></a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>