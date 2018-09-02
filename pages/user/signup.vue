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
                                        v-bind:rules="[comparePasswords]">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12> 
                                        <v-btn type="submit">Sign Up</v-btn>
                                    </v-flex>
                                </v-layout>
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
            confirmPassword:''
        }
    },
    computed:{
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Password do not match!':"password match"
        }
    },
    methed:{
        onSigninup(){
            
        }
    }
}
</script>
