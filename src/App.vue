<template>
  <div class="container">
    <div class="buttons">
      <button @click="sortNumber">Отсортировать по номеру</button>
      <button @click="sortString">Отсортировать по алфавиту</button>
    </div>

    <div class="cities" v-for="city in cities" :key="city.id">
      <p>{{ city.id }}) {{ city.name }}</p>
    </div>
    <Form />
  </div>
</template>

<script>
import Form from "@/components/Form.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    Form,
  },
  computed: {
    ...mapGetters(["cities"]),
  },
  methods: {
    ...mapMutations(["sortNumber", "sortString"]),
    ...mapActions(["fetchCities"]),
  },
  mounted() {
    this.fetchCities();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.buttons {
  width: 50%;
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
.cities {
  border: 1px solid #ccc;
  width: 50%;
  margin-bottom: 5px;
}
p {
  margin: 5px 0;
}
</style>
