<template>
    <div class="flex justify-center">
        <h1 class="text-lg flex flex-row items-baseline">
            I'm Applying <majorInput class="translate-y-px"/>
        </h1>
    </div>
    <div class="flex flex-col">
        <p>{{brainstormData.meta}}</p>
        <p>{{this.editingIdea}}</p>

        <!-- this one is for adding new idea -->
        <ideaEditor v-if="this.addingNewIdea"
            :idea="this.thisNewEntry"
            :ideaIndex="this.expectNewIdeaIndex"
            @saveIdea="saveAddedIdea"
            @deleteIdea="deleteIdea(index)"/>
        <!-- this one is for editing existing idea -->
        <ideaEditor v-if="this.editingIdea || this.editingIdea===0" 
            :idea="brainstormData.content[this.editingIdea]" 
            :ideaIndex="this.editingIdea"
            @saveIdea="saveIdea"
            @deleteIdea="deleteIdea(index)"/>


        <button @click="addSampleIdea">
            add a sample idea
        </button>
        <button @click="addIdea">
            <label @click="addIdea" :for="this.expectNewIdeaIndex"> add </label>
            <input type="checkbox" :id="this.expectNewIdeaIndex" class="modal-toggle">
        </button>
        <!-- iterate through brainstormData.content and feed content to ideaCard:idea -->
        <div class="flex flex-col mx-auto" v-for="(idea, index) in brainstormData.content" :key="index">
            <label class="modal-button mb-5 w-fit" :for="index">
                <ideaCard class="mx-auto" :idea="idea" @editIdea="editIdea(index)"/>
            </label>
            <input type="checkbox" :id="index" class="modal-toggle" />
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
            addingNewIdea: false,

            editingIdea: null,

            tempIdea: SAMPLE_ENTRY,
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
      expectNewIdeaIndex() {
            return this.brainstormData.content.length;
      }
    },
    methods : {
        updateBrainstorm() {
            this.$store.dispatch('dbUpdateUserBrainstorm', this.brainstormData);
        },
        addIdea() {
            this.thisNewEntry = NEW_ENTRY;
            this.addingNewIdea = true;
        },
        saveAddedIdea() {
            this.addingNewIdea = false;
            this.brainstormData.content.push(this.thisNewEntry);
            this.updateBrainstorm();
        },
        // addSampleIdea() {
        //     this.brainstormData.content.push(this.tempIdea);
        //     this.updateBrainstorm();
        // },
        editIdea(index) {
            this.editingIdea = index;
        },
        saveIdea(idea) {
            this.brainstormData.content[this.editingIdea] = idea;
            this.updateBrainstorm();
            console.log(idea);
        },
        deleteIdea(index) {
            if (index ===this.expectNewIdeaIndex) {
                this.addingNewIdea = false;
            } else {
                this.brainstormData.content.splice(index, 1);
                this.updateBrainstorm();
            }
        }
    },

}
</script>

<style>

</style>