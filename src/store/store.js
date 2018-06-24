import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    login: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    country: null,
    city: null,
    birthDate: '',
    zip: ''

  },
  getters: {
    login: state => state.login,
    email: state => state.email,
    password: state => state.password,
    firstName: state => state.firstName,
    lastName: state => state.lastName,
    country: state => state.country,
    city: state => state.city,
    birthDate: state => state.birthDate,
    zip: state => state.zip
  },
  mutations: {
    setLogin: (state, e) => {
      state.login = e.target.value
    },
    setEmail: (state, e) => {
      state.email = e.target.value
    },
    setPassword: (state, e) => {
      state.password = e.target.value
    },
    setFirstName: (state, e) => {
      state.firstName = e.target.value
    },
    setLastName: (state, e) => {
      state.lastName = e.target.value
    },
    setCountry: (state, country) => {
      state.country = country
    },
    setCity: (state, city) => {
      state.city = city
    },
    setBirthDate: (state, date) => {
      state.birthDate = date
    },
    setZipCode: (state, e) => {
      state.zip = e.target.value
    }
  }

})
