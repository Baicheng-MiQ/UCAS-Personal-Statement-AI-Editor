<template>
    <div class="flex flex-col relative m-6 lg:mx-20 lg:p-6">

        <h1 id="bigHeading" class="text-3xl">
            <span
                class="font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-400">
                Construct <br>
            </span>
                Paragraph by paragraph, sentence by sentence.        
        </h1>

        <div>
            <InputFormC/>
        </div>


    </div>


</template>

<script>
import InputFormC from "../components/construct/constructInputForm.vue";
import axios from "axios";

export default {
    name: 'ConstructView',
    components: {
        InputFormC
    },
    data(){
        return{
            
        }
    },
    computed: {

    },

    mounted(){
        // warm up cloud run
        if (!this.$store.state.userIDtoken)
        {this.$store.dispatch('getUserIDtoken')
        .then(()=>{
        axios.post("https://ps-htbbh2ws5a-uc.a.run.app/para-type",
            {
                userToken: this.$store.state.userIDtoken,
                major: this.$store.state.major.join(", "),
                statement: (Math.random() + 1).toString(36).substring(2),
            }
            )
        }
        )
        } else {
            axios.post("https://ps-htbbh2ws5a-uc.a.run.app/para-type",
                {
                    userToken: this.$store.state.userIDtoken,
                    major: this.$store.state.major.join(", "),
                    statement: (Math.random() + 1).toString(36).substring(2),
                }
                )
        }
    },

    methods: {

    },
}
</script>

<style scoped>

</style>