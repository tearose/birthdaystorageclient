<script setup lang="ts">
import PersonCard from './PersonCard.vue';
import Utils from '../logic/utils';
import DataStore from "../logic/datastore";
import Person from "../datamodel/Person";

const date: number = Utils.getDate();
const month: string = Utils.getMonth();

const birthdaySource: Array<Person> = await DataStore.getAllBirthdays();

const testPerson = new Person();
testPerson.firstname = 'Test';
testPerson.lastname = 'Person';
testPerson.birthday = new Date().getDate() + '.' + (new Date().getMonth() + 1);

</script>

<template>
  <h1 style="text-align:center;margin: 15px 0;">Today is {{ date }}, {{ month }}</h1>
<!--  <div class="row" id="testCard">
    <person-card :person="testPerson"/>
  </div>-->
  <div class="row">
    <template
        v-for="person in birthdaySource"
        :key="person.firstname + person.lastname"
    >
      <person-card :person="person"/>
    </template>
  </div>
</template>

<style scoped>

</style>