<template>
    <div class="flex justify-center">
        <h1 class="text-lg flex flex-row items-baseline">
            I'm Applying <majorInput class="translate-y-px"/>
        </h1>
    </div>
    <div class="flex flex-col">
        <p>{{brainstormData.meta}}</p>
        <p>{{this.isEditing}} {{this.editingIdea}}</p>
        <p v-show="this.isEditing && this.editingIdea!=null">editing: 
            <ideaEditor :idea="brainstormData.content[this.editingIdea]" :ideaIndex="this.editingIdea"/>
        </p>
        <button @click="addSampleIdea">
            add a sample idea
        </button>
        <!-- iterate through brainstormData.content and feed content to ideaCard:idea -->
        <div class="flex flex-col space-y-3">
            <ideaCard class="mx-auto" v-for="(idea, index) in brainstormData.content" :key="index" :idea="idea"
            @editIdea="editIdea(index)"/>
        </div>

    </div>
</template>

<script>
import majorInput from "../components/brainstorm/majorInput.vue";
import ideaCard from "../components/brainstorm/ideaCard.vue";
import ideaEditor from "../components/brainstorm/ideaEditor.vue";

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
        ideaCard,
        ideaEditor,
    },
    data() {
        return {
            thisNewEntry: NEW_ENTRY,
            tempIdea: SAMPLE_ENTRY,
            isEditing: false,
            editingIdea: null,
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
        addSampleIdea() {
            this.brainstormData.content.push(this.tempIdea);
            this.updateBrainstorm();
        },
        editIdea(index) {
            this.isEditing = true;
            this.editingIdea = index;
        },
        saveIdea(idea) {
            // this.brainstormData.content[this.editingIdea] = idea;
            // this.isEditing = false;
            // this.updateBrainstorm();
            console.log(idea);
        },
    },

}
</script>

<style>

</style>