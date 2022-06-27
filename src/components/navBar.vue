<template>
<div class="flex p-2 shadow-sm border-b-2 border-gray-200
            bg-gradient-to-br from-pink-50 via-indigo-50 to-blue-50 opacity-90">

    <!-- logo -->
    <img src="/src/assets/psai_logo.png" alt="logo" width=140  class="my-auto lg:ml-32">

    <!-- a material design Sign in with Google button -->
    <button class="btn mr-3 flex flex-row ml-auto rounded-full bg-blue-500 hover:bg-blue-700"
        @click="signIn" v-show="!user">
        <!-- give this image a white background rounded -->
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" class="rounded-full bg-white p-1 my-auto" alt="">
        <p class="my-auto ml-2">Sign in with Google</p>
    </button>

    <!-- a material design gray Sign out button -->
    <div class="userInfo flex flex-row ml-auto mr-0 lg:mr-24" v-show="user">
        <img :src="userImage" alt="user" width="50" height="50"
            class="mx-3" v-show="user"/>

        <button class="my-auto btn rounded-full"
            @click="signOut" >
            Sign out
        </button>
    </div> 

</div>
</template>

<script>
import { useStore } from 'vuex';
import { auth } from '../firebase/config';
export default {
    name: 'navBarC',
    components: {
    },
    data() {
        return {

        }
    },
    computed: {
        user()  {
            return this.$store.state.userDetail;
        },
        userImage() {
            try { 
                if (this.$store.state.userDetail.photoURL) {
                return this.$store.state.userDetail.photoURL;
                } else {
                    // this creates an avatar image from the user's email
                    return `https://avatars.dicebear.com/api/bottts/${this.$store.state.userDetail.email}.png`;
                }
            } catch (e) { 
                // if everything fails, return the default avatar
                return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E';};
        },
    },
    methods: {
        signIn () {
            // call vuex signIn mutaion
            this.$store.commit('signIn');
        },

        signOut () {
            // call vuex signOut mutaion
            this.$store.commit('signOut');
        },
    },

    created() {
        // Listen for auth state changes.
        // Mainly log back user after page refresh
        auth.onAuthStateChanged(user => {
            if (user) {
                this.$store.commit('logBackUser', user);
                this.$store.dispatch('dbGetUserStatus');
                this.$store.dispatch('dbGetUserStatement');
                }
        });
    },
};
</script>

<style>

</style>