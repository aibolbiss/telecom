import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: [],
    email: null,
    name: null,
    organization: null,
    catalog: null,
    phone: null,
    server: null,
    sitekey: "6LeEhH8fAAAAAJ_0RS9jZrQEX36LBdXLTzkPpTR8",
    error: {
      email: null,
      name: null,
      organization: null,
      catalog: null,
      phone: null,
      server: null,
    },
    success: false,
  },
  mutations: {
    getCities(state, data) {
      state.cities = data;
    },
    sortNumber(state) {
      state.cities.sort((a, b) => {
        return parseFloat(a.id) - parseFloat(b.id);
      });
    },
    sortString(state) {
      state.cities.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    },
    updateEmail(state, payload) {
      state.email = payload;
    },
    updateName(state, payload) {
      state.name = payload;
    },
    updateOrganization(state, payload) {
      state.organization = payload;
    },
    updateCatalog(state, payload) {
      state.catalog = payload;
    },
    updatePhone(state, payload) {
      state.phone = payload;
    },
    updateServer(state, payload) {
      state.server = payload;
    },
    errorEmail(state, payload) {
      state.error.email = payload;
    },
    errorName(state, payload) {
      state.error.name = payload;
    },
    errorOrganization(state, payload) {
      state.error.organization = payload;
    },
    errorCatalog(state, payload) {
      state.error.catalog = payload;
    },
    errorPhone(state, payload) {
      state.error.phone = payload;
    },
    errorServer(state, payload) {
      state.error.server = payload;
    },
    reset_1(state) {
      state.error.email = null;
      state.error.name = null;
      state.error.organization = null;
      state.error.catalog = null;
      state.error.phone = null;
      state.error.server = null;
    },
    reset_2(state) {
      state.email = null;
      state.name = null;
      state.organization = null;
      state.catalog = null;
      state.phone = null;
      state.server = null;
    },
    success(state, payload) {
      state.success = payload;
    },
  },
  getters: {
    cities(state) {
      return state.cities;
    },
    email(state) {
      return state.email;
    },
    name(state) {
      return state.name;
    },
    organization(state) {
      return state.organization;
    },
    sitekey(state) {
      return state.sitekey;
    },
  },
  actions: {
    async fetchCities(context) {
      const res = await fetch(
        "https://www.ismet.kz/bin/ocp/publicbpms.rest/bpmn/v1/reference/kt_cb_server"
      );
      const data = await res.json();

      context.commit("getCities", data);
    },

    success(context) {
      setTimeout(() => {
        context.commit("success", true);
      }, 500);

      setTimeout(() => {
        context.commit("success", false);
      }, 3000);
    },

    async send(context) {
      // Для валидаций полей
      let isValid = true;
      if (context.state.email === null) {
        context.commit("errorEmail", "Введите свою почту");
        isValid = false;
      }
      if (context.state.name === null) {
        context.commit("errorName", "Введите свое имя");
        isValid = false;
      }
      if (context.state.organization === null) {
        context.commit("errorOrganization", "Введите название организаций");
        isValid = false;
      }
      if (context.state.catalog === null) {
        context.commit("errorCatalog", "Выберите идентификатор услуги");
        isValid = false;
      }
      if (context.state.phone === null) {
        context.commit("errorPhone", "Введите свой номер телефона");
        isValid = false;
      }
      if (context.state.server === null) {
        context.commit("errorServer", "Выберите идентификатор региона");
        isValid = false;
      }

      if (isValid) {
        context.commit("reset_1");

        const res = await fetch(
          "https://kazaktelekom-test-api-default-rtdb.europe-west1.firebasedatabase.app/user.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: context.state.email,
              name: context.state.name,
              organization: context.state.organization,
              catalog_id: context.state.catalog,
              phone: context.state.phone,
              server_id: context.state.server,
              sitekey: context.state.sitekey,
            }),
          }
        );
        const firebaseData = await res.json();

        context.commit("reset_2");
        context.dispatch("success");
        console.log(firebaseData);
      }
    },
  },
});
