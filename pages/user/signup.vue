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
                                        required>
                                        </v-text-field>
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
                                        required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                         <v-text-field
                                        name="confirmpassword"
                                        label="password"
                                        id="confirmpassword"
                                        type="password"
                                        v-model="confirmPassword"
                                        v-bind:rules="[comparePasswords,SignupBtn]"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12 > 
                                        <v-btn   @click.stop="onSignUp" v-bind:disabled="comparePasswords == 'Password do not match!'">Sign Up</v-btn>
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


export default {
    data(){
        return{
            email:'',
            password:'',
            confirmPassword:'',
            SignupBtn: true
        }
    },
    computed:{
        comparePasswords () {
            if(this.password !== this.confirmPassword ){
                return  'Password do not match!'
            }else{
               
                return ''
            }
            
        },
        getUserMessages () {
            return  this.$store.getters['users/getUserMessages']
        }
    },
     watch: {
      getUserMessages (value) {
          console.log(value.signupStatus)
        if (value.signupStatus) {
          this.$router.push('/')
        }else{
            this.password = ''
            this.confirmPassword= ''
        }
      }
    },
    methods:{
        onSignUp(){
             this.$store.dispatch('users/signup',{email:this.email,password:this.password}) 
        }
        
    }
}
</script>
