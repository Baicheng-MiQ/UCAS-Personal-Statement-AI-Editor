<template>
<div class="flex flex-row p-1 lg:px-24 shadow-sm border-b-2 border-gray-200 h-16 items-center justify-between
            bg-gradient-to-br from-pink-50 via-indigo-50 to-blue-50 opacity-90">
    <div class="dropdown md:hidden" v-show="user">
        <label tabindex="0" class="btn btn-ghost px-2 bg-gray-300"> <menuButton/> </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li> <a :class="{'font-bold': this.$store.state.activeTab==='researchView'}"
            @click="this.$store.state.activeTab='researchView';
                    this.$router.push('/research');">
            1. Research </a> </li>
        <li><a :class="{'font-bold': this.$store.state.activeTab==='brainstormView'}" 
            @click="this.$store.state.activeTab='brainstormView';
                    this.$router.push('/brainstorm')">
            2. Brainstorm </a> </li>
        <li> <a :class="{'font-bold': this.$store.state.activeTab==='constructView'}"
            @click="this.$store.state.activeTab='constructView';
                    this.$router.push('/construct')">
            3. Construct </a></li>
        <li> <a :class="{'font-bold': this.$store.state.activeTab==='finaliseView'}"
            @click="this.$store.state.activeTab='finaliseView';
                    this.$router.push('/finalise')">
            4. Finalise </a></li>
        </ul>
    </div>
    <!-- logo -->
    <img src="/src/assets/psai_logo.png" alt="logo" width=150  class="">

    <div class="tabSwitch hidden md:flex" v-show="user">
        <div class="tabs tabs-boxed">
        <a class="tab" :class="{'tab-active': this.$store.state.activeTab==='researchView'}"
            @click="this.$store.state.activeTab='researchView';
                    this.$router.push('/research');">
            1. Research </a> 
        <a class="tab" :class="{'tab-active': this.$store.state.activeTab==='brainstormView'}" 
            @click="this.$store.state.activeTab='brainstormView';
                    this.$router.push('/brainstorm')">
            2. Brainstorm </a> 
        <a class="tab" :class="{'tab-active': this.$store.state.activeTab==='constructView'}"
            @click="this.$store.state.activeTab='constructView';
                    this.$router.push('/construct')">
            3. Construct </a>
        <a class="tab" :class="{'tab-active': this.$store.state.activeTab==='finaliseView'}"
            @click="this.$store.state.activeTab='finaliseView';
                    this.$router.push('/finalise')">
            4. Finalise </a>
        </div>
    </div>

    <!-- a material design gray Sign out button -->
    <div class="userInfo flex flex-row" v-show="user">
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost flex h-fit w-fit p-0">
                <img :src="userImage" alt="user" width="50"
                class="" v-show="user"/>
                <!-- an svg elegent down arrow -->
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                <button
                    @click="signOut" >
                    Sign out
                </button>
                </li>
            </ul>
        </div> 
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