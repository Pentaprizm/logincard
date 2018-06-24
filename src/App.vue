<template>
  <div>
    <div class="usercard card">
      <h1 class="usercard__header">New user</h1>
      <p class="usercard__details">
        <span class="usercard__item">{{firstName}} {{lastName}}</span>
        /
        <span class="usercard__item usercard__item--fade">{{login}}</span>
      </p>
      <p class="usercard__details">
        <span class="usercard__item">{{email}}</span>
      </p>
    </div>
   
    <form class="form card" action="">
      <h1 class="form__header">Sign Up</h1>
      <div class="form-group">
        <label class="form-group__label">
          Login<sup class="required-mark">*</sup>
          <input type="text" name="userlogin" :value="login" :class="[{'form-group__input_error': isInvalidLogin}, 'form-group__input']" @change="setLogin" />
        </label>
      </div>
      <div class="form-group">
        <label class="form-group__label">
          E-mail<sup class="required-mark">*</sup>
          <input type="email" name="email" :value="email" :class="[{'form-group__input_error': isInvalidEmail}, 'form-group__input']" @change="setEmail" />
        </label>
      </div>
      <div class="form-group">
        <label class="form-group__label">
          Password<sup class="required-mark">*</sup>
          <input type="password" name="password" :value="password" :class="[{'form-group__input_error': isInvalidPassword}, 'form-group__input']" @change="setPassword" />
        </label>
      </div>
      <div class="form-group">
        <div class="form-group--col">
          <label class="form-group__label">
            First name
            <input type="text" name="" :value="firstName" class="form-group__input" @change="setFirstName" />
          </label>
        </div>
        <div class="form-group--col">
          <label class="form-group__label">
            Last name
            <input type="text" name="lastName" :value="lastName" class="form-group__input" @change="setLastName" />
          </label>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group--col">
          <label class="form-group__label">
            Country
          </label>
          <v-select :options="countries" v-model="selectedCountry"/>
        </div>
        <div class="form-group--col">
          <label class="form-group__label">
            City
          </label>
          <v-select :options="cities" v-model="selectedCity" :disabled="!isCountrySet"/>
        </div>
       </div>
      <div class="form-group">
        <div class="form-group--col">
          <label for="datepicker" class="form-group__label">
            Date of birth
          </label>
          <datepicker id="datepicker" v-model="selectedBirthDate" :calendar-button="true" calendar-button-icon="vdp-datepicker__calendar-icon" input-class="form-group__input"/>
        </div>
        <div class="form-group--col">
          <label class="form-group__label">
            Zip code
            <input type="text" name="zip" :value="zip" class="form-group__input" @change="setZipCode" />
          </label>
        </div>
      </div>
        <div class="form-group button-group">
          <button type="submit" name="submit" class="form-group__button" @click.prevent="submitForm">Sign up</button>
        </div>
        <div class="message" v-show="isFormSubmitted">
          <p class="message__text--success" v-if="isFormValid">{{messages.success}}</p>
          <p class="message__text--error" v-else>{{messages.error}}</p>
        </div>
    </form>

    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import vSelect from 'vue-select';
import './assets/styles.css';

export default {
    data() {
      return {
        messages: {
          success: 'Form has been successfully submitted!',
          error: 'Error occured! Fill all the required fields.'
        },
        cities: [
          { id: 1, label: 'London'},
          { id: 2, label: 'Paris'},
          { id: 3, label: 'Berlin'},
          { id: 4, label: 'Minsk'}
        ],
        countries: [
          { id: 1, label: 'Great Britain' },
          { id: 2, label: 'France' },
          { id: 3, label: 'German' },
          { id: 4, label: 'Belarus' }
        ],
        isInvalidLogin: false,
        isInvalidEmail: false,
        isInvalidPassword: false,
        isCountrySet: false,
        isFormValid: false,
        isFormSubmitted: false,
      }
    },
    methods: {
      ...mapMutations([
        'setFirstName',
        'setLastName',
        'setEmail',
        'setLogin',
        'setPassword',
        'setZipCode'
      ]),
      submitForm() {
        this.isFormSubmitted = true;

        this.isInvalidLogin = !this.$store.getters.login;
        this.isInvalidEmail = !this.$store.getters.email;
        this.isInvalidPassword = !this.$store.getters.password;

        this.isFormValid = this.$store.getters.login && this.$store.getters.email && this.$store.getters.password;

        setTimeout(() => {
          this.isFormSubmitted = false;
        }, 2500); 
      }
    },
    components: {
      Datepicker,
      vSelect
    },
    computed: {
      ...mapGetters([
        'login',
        'email',
        'password',
        'firstName',
        'lastName',
        'zip'
      ]),
      selectedCountry: {
        get() {
          return this.$store.getters.country;
        },
        set(val) {
          this.$store.commit('setCountry', val);
          if (val) {
            this.isCountrySet = true;
          } else {
            this.isCountrySet = false;
            this.$store.commit('setCity', null);
          }
        }
      },
      selectedCity: {
        get() {
          return this.$store.getters.city;
        },
        set(val) {
          this.$store.commit('setCity', val);
        }
      },
      selectedBirthDate: {
        get() {
          return this.$store.getters.birthDate;
        },
        set(val) {
          this.$store.commit('setBirthDate', val);
        }
      }
    }
}
</script>

<style></style>
