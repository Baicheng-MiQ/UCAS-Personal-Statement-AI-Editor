<template>
<!-- fancy headings -->
<HeadingC/>

<div class="flex flex-col mt-8 mx-auto border-2 w-5/6 shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg p-10 lg:mt-20">
    <h1 class="text-4xl font-bold">
        Welcome!
    </h1>
    <button class="flex flex-row my-20 top-20 bg-blue-500 hover:bg-blue-700 text-white 
                    font-bold mx-auto py-2 px-4 rounded-full shadow-md
                    focus:shadow-outline"
        @click="signIn">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" class="rounded-full bg-white p-1 my-auto" alt="">
        <p class="my-auto ml-2">Sign in with Google</p>
    </button>
</div>
</template>

<script>
import HeadingC from "../components/heading.vue";
export default {
    name: 'authC',
    components: {
        HeadingC,
    },
    computed: {
        user()  {
            return this.$store.state.userDetail;
        },
    },
    methods: {
        signIn () {
        // call vuex signIn mutaion
        this.$store.commit('signIn');
        },

    },
    watch: {
        user() {
            if (this.user) {
                this.$router.push('/home');
            }
        },
    },

}
</script>

<style>

</style>