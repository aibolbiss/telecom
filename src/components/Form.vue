<template>
  <div id="app">
    <h2>Отправка данных на FireBase</h2>
    <h4>
      https://kazaktelekom-test-api-default-rtdb.europe-west1.firebasedatabase.app/user.json
    </h4>
    <form method="post" @submit.prevent="send">
      <div class="form-group">
        <input
          type="email"
          name="email"
          v-model.trim="email"
          class="form-control"
          :class="{ danger: $store.state.error.email }"
          placeholder="E-mail почта"
        />
      </div>
      <small v-if="$store.state.error.email">{{
        $store.state.error.email
      }}</small>
      <div class="form-group">
        <input
          type="text"
          name="name"
          v-model.trim="name"
          class="form-control"
          :class="{ danger: $store.state.error.name }"
          placeholder="Имя"
        />
      </div>
      <small v-if="$store.state.error.name">{{
        $store.state.error.name
      }}</small>
      <div class="form-group">
        <input
          type="text"
          name="organization"
          v-model.trim="organization"
          class="form-control"
          :class="{ danger: $store.state.error.organization }"
          placeholder="Организация"
        />
      </div>
      <small v-if="$store.state.error.organization">{{
        $store.state.error.organization
      }}</small>
      <div class="form-group">
        <select
          v-model.number="catalog"
          :class="{ danger: $store.state.error.catalog }"
        >
          <option value="null" selected disabled hidden>
            Выберите идентификатор услуги
          </option>
          <option value="1111">1111</option>
          <option value="3941">3941</option>
          <option value="7777">7777</option>
        </select>
      </div>
      <small v-if="$store.state.error.catalog">{{
        $store.state.error.catalog
      }}</small>
      <div class="form-group">
        <input
          name="phone"
          v-model="phone"
          class="form-control"
          :class="{ danger: $store.state.error.phone }"
          v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
          placeholder="Номер телефона"
        />
      </div>
      <small v-if="$store.state.error.phone">{{
        $store.state.error.phone
      }}</small>
      <div class="form-group">
        <select v-model="server" :class="{ danger: $store.state.error.server }">
          <option value="null" selected disabled hidden>
            Выберите идентификатор региона
          </option>
          <option v-for="item in cities" :key="item.id" :value="item.id">
            {{ item.id }}) {{ item.name }}
          </option>
        </select>
      </div>
      <small v-if="$store.state.error.server">{{
        $store.state.error.server
      }}</small>
      <div class="form-group">
        <vue-recaptcha
          ref="recaptcha"
          size="invisible"
          :sitekey="sitekey"
          @verify="send"
          @expired="onCaptchaExpired"
        />
        <button type="submit" class="btn btn-primary btn-block">
          Отправить
        </button>

        <h5 v-if="$store.state.success" class="success">
          Данные успешно отправились
        </h5>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { VueRecaptcha } from "vue-recaptcha";
import { maska } from "maska";

export default {
  components: { VueRecaptcha },
  directives: { maska },
  computed: {
    email: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("updateEmail", value);
      },
    },
    name: {
      get() {
        return this.$store.state.name;
      },
      set(value) {
        this.$store.commit("updateName", value);
      },
    },
    organization: {
      get() {
        return this.$store.state.organization;
      },
      set(value) {
        this.$store.commit("updateOrganization", value);
      },
    },
    catalog: {
      get() {
        return this.$store.state.catalog;
      },
      set(value) {
        this.$store.commit("updateCatalog", value);
      },
    },
    phone: {
      get() {
        return this.$store.state.phone;
      },
      set(value) {
        this.$store.commit("updatePhone", value);
      },
    },
    server: {
      get() {
        return this.$store.state.server;
      },
      set(value) {
        this.$store.commit("updateServer", value);
      },
    },
    ...mapGetters(["sitekey", "cities"]),
  },
  methods: {
    ...mapActions(["send"]),

    // Метод onCaptchaExpired перезапускает капчу
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    },
  },
};
</script>

<style>
#app {
  margin: 50px 0;
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
input {
  width: 200px;
  height: 30px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 15px;
}
select {
  width: 220px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
small {
  color: red;
  margin-bottom: 10px;
}
.danger {
  border: 1px solid red;
}
.success {
  background-color: aquamarine;
  color: rgb(71, 71, 71);
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
