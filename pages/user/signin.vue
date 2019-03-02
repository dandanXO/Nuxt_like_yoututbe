<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
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
                      v-model="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn @click.stop="onSignIn">Sign In</v-btn>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn @click.stop="SignInGithub">Sign In With Github</v-btn>
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
    },
    user() {
      return this.$store.getters.getUserData;
    }
  },
  methods: {
    onSignIn() {
      this.$store.dispatch("users/signIn", {
        email: this.email,
        password: this.password
      });
    },
    SignInGithub() {
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          return user.getIdToken().then(token => {
            // eslint-disable-next-line no-undef
            console.log(token);
            return axios.post(process.env.API_URL+'auth/otherSinginCheck',{
               token:token
            })
          });
        } else {
          this.setState({ user: null });
          // eslint-disable-next-line no-undef
        }
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
      console.log(value.signinStatus);
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
