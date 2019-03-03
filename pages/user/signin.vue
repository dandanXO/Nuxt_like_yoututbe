<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container class="text-xs-center">
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    autocomplete="username"
                      name="email"
                      label="Mail"
                      id="email"
                      type="email"
                      v-model="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="password"
                      id="password"
                      type="password"
                      autocomplete="current-password"
                      v-model="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 >
                    <v-btn @click.stop="onSignIn">Sign In</v-btn>
                  </v-flex>
                </v-layout>
                <v-flex xs12>
                  <hr class="hr-text" data-content="OR">
                </v-flex>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn @click.stop="onSignInGithub">Sign In With Github</v-btn>
                  </v-flex>
                </v-layout>
                {{getUserMessages.message}}
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="scss">
  
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: .5;
  &:before {
    content: '';
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 .5em;
    line-height: 1.5em;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: #818078;
    background-color: #fcfcfa;
  }
}
</style>

<script>
import firebase from "firebase";
// firebse is already in plugin
import axios  from 'axios';

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    getUserMessages() {
      return this.$store.getters["users/getUserMessages"];
    }
  },
  methods: {
    onSignIn() {
      this.$store.dispatch("users/signIn", {
        email: this.email,
        password: this.password
      });
    },
    onSignInGithub() {
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((result)=>{
        firebase.auth().onAuthStateChanged(user => {
        this.$store.dispatch('users/ThirdPartyLogin',{topic:'github',user:user})
      })
      });
      
    }
  },
  fetch({ store, redirect }) {
    if (store.state.users.userMessages.signinStatus) {
      return redirect("/");
    }
  },
  watch: {
    getUserMessages(value) {
      if (value.signinStatus) {
        this.$router.go("/");
      } else {
        this.password = "";
        this.confirmPassword = "";
      }
    }
  }
};
</script>
