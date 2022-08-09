<template>
    <div class="drawer drawer-end lg:h-[calc(100vh-4rem)]">
        <input id="my-drawer-construct" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <div class="flex flex-col relative m-6 lg:mx-20 lg:p-6">

                <h1 id="bigHeading" class="text-3xl">
                    <span
                        class="font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-400">
                        Construct <br>
                    </span>
                    Paragraph by paragraph, sentence by sentence.
                    <img alt="background image" class="vector -z-10 top-20 right-5 fixed w-[calc(37vw)]"
                        src="https://static.overlay-tech.com/assets/09df6e20-5a97-4f2d-ba4e-7a224edbab81.svg" />

                </h1>

                <div class="flex flex-col" v-show="this.$store.getters.pureContent.length<5">
                    <button class="btn w-fit mx-auto mt-6 btn-primary border-2 bg-gradient-to-r from-blue-600 to-blue-800 border-blue-600 shadow-xl hover:scale-110">
                        <a target="popup"
                        onclick="window.open('https://www.ucas.com/undergraduate/applying-university/writing-personal-statement/personal-statement-the-killer-opening',
                            '_blank', 'width=768,height=1024')"> HOW TO START A PERSONAL STATEMENT?
                        </a>
                     </button>
                     <h1 class="text-lg font-bold my-5 mx-auto"> OR </h1>
                </div>

                <div class="flex flex-row">
                    <InputFormC />
                    <div class="lg:w-20 h-full flex-col align-baseline hidden lg:flex">
                        <label for="my-drawer-construct" class="fixed bottom-0 drawer-button btn btn-ghost h-fit mb-10 p-2 mr-1">
                            Quick Editor
                            <EditorIcon class="ml-1 w-20 h-20" />
                        </label>
                    </div>
                </div>


            </div>
    </div>
    <div class="drawer-side">
        <label for="my-drawer-construct" class="drawer-overlay"></label>
        <sideInputFormC class="bg-white border-r-2 lg:w-2/5 lg:h-[calc(100vh-4rem)] shadow-2xl"
            :showFullScreenButtonHandle="false" />
        </div>
    </div>



</template>

<script>
import InputFormC from "../components/construct/constructInputForm.vue";
import sideInputFormC from '../components/editor/inputForm.vue';


import axios from "axios";

export default {
    name: 'ConstructView',
    components: {
        InputFormC,
        sideInputFormC
    },
    data() {
        return {

        }
    },
    computed: {

    },

    mounted() {

        // warm up cloud run
        if (!this.$store.state.userIDtoken) {
            this.$store.dispatch('getUserIDtoken')
            .then(() => {
                axios.post("https://ps-htbbh2ws5a-uc.a.run.app/para-type",
                    {
                        userToken: this.$store.state.userIDtoken,
                        major: "TEST ",
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