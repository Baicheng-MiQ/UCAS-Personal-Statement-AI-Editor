<template>
    <div class="flex justify-center">
        <h1 class="text-lg flex flex-row items-baseline">
            I'm Applying <majorInput class="translate-y-px"/>
        </h1>
    </div>
    <div class="flex flex-col">
        <p>{{brainstormData}}</p>
        <button @click="addIdea">
            add an empty idea
        </button>
        <ideaCard class="mx-auto" :idea="this.tempIdea"/>
    </div>
</template>

<script>
import majorInput from "../components/brainstorm/majorInput.vue";
import ideaCard from "../components/brainstorm/ideaCard.vue";

const NEW_ENTRY = {
                        "meta": {
                            "createdAt": null,
                            "updatedAt": null,
                            "contentID": null
                        },
                        "dateFrom": null,
                        "dateTo": null,
                        "type": null,
                        "title": null,
                        "content": [null],
                    }

const SAMPLE_ENTRY = {
                        "meta": {
                            "createdAt": "2018-01-01",
                            "updatedAt": "2018-01-01",
                            "contentID": "1"
                        },
                        "dateFrom": "2018-01-01",
                        "dateTo": "2018-01-01",
                        "type": "major",
                        "title": "I love Minecraft",
                        "content": ["I play Minecraft since I was 6",
                             "I host a MC server", "I created a mod"],
                    }
export default {
    name: 'brainstormView',
    components: {
        majorInput,
        ideaCard
    },
    data() {
        return {
            thisNewEntry: NEW_ENTRY,
            tempIdea: SAMPLE_ENTRY
        }
    },
    computed: {
      brainstormData:{
        get() {
            return this.$store.state.brainstormData;
        },
        set(value) {
            this.$store.commit('setBrainstormData', value);
        }
      },
    },
    methods : {
        updateBrainstorm() {
            this.$store.dispatch('dbUpdateUserBrainstorm', this.brainstormData);
        },
        addIdea() {
            this.brainstormData.content.push(this.thisNewEntry);
            this.updateBrainstorm();
        },
    },

}
</script>

<style>

</style>