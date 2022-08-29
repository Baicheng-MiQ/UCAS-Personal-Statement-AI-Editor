<template>
    <!-- a right arrow, click to learn more -->
    <!-- LEARN MORE! -->
    <label class="modal-button" :for="this.ideaIndex">
    </label>

    <input type="checkbox" :id="this.ideaIndex" class="modal-toggle " />
    <div class="modal modal-bottom sm:modal-middle">
        <label for="" class="modal-box sm:w-11/12 sm:max-w-[100rem] h-[70vh] sm:h-[90vh] p-0 mt-16">
            <label :for="this.ideaIndex" class="hidden btn btn-sm opacity-50 btn-circle z-50 absolute right-4 top-4">✕</label>
            <div class="flex flex-row h-full">

                <div class="left w-1/2 flex justify-center bg-sky-200 py-10 overflow-y-scroll">
                    <!-- ====LEFT===== -->
                    <ideaCard class="mx-auto my-auto" :idea="activeIdea" :showArrow="false" :showMore="true"/>
                </div>

                <div class="right w-1/2 p-10 overflow-y-scroll">
                    <!-- ====RIGHT===== -->
                    <h1 class="text-6xl">Idea</h1>
                    <div class="mt-4 space-y-4">
                        <div class="flex flex-col">
                            <label for="title">Title</label>
                            <input type="text" name="title" id="title" v-model="activeIdea.title"
                            class="input input-bordered">
                        </div>
                        <div class="flex flex-row space-x-3">
                            <div class="flex flex-col w-1/2">
                                <label for="dateFrom">Date From</label>
                                <input type="date" name="dateFrom" id="dateFrom" v-model="activeIdea.dateFrom"
                                class="input input-bordered">
                            </div>
                            <div class="flex flex-col w-1/2">
                                <label for="dateTo">Date To</label>
                                <input type="date" name="dateTo" id="dateTo" v-model="activeIdea.dateTo"
                                class="input input-bordered">
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <label for="type">Type</label>
                            <input type="text" name="type" id="type" v-model="activeIdea.type"
                            class="input input-bordered">
                        </div>
                        <div class="flex flex-col">
                            <label for="content">Content</label>
                            <!-- iterate activeIdea.content as text input -->
                            <!-- and at right side of each input box, there is a delete button to call a method -->
                            <div class="flex flex-row mb-2" v-for="(content, index) in activeIdea.content" :key="index">
                                <input type="text" name="content" id="content" v-model="activeIdea.content[index]"
                                class="input input-bordered w-full">
                                <button @click="deleteContent(index)">
                                    <deleteIcon class="w-4 h-4 ml-1" />
                                </button>
                            </div>
                            <button @click="addContent" 
                            class="p-1 mr-5 btn btn-ghost border-gray-200 border-2">
                                + 
                            </button>
                        </div>
                        <!-- save or discard -->
                        <div class="flex flex-row space-x-3">
                            <button @click="this.save"
                            class="btn btn-success">save</button>
                            <button @click="this.discard"
                            class="btn btn-ghost">discard</button>
                        </div>
                    </div>
                </div>
            </div>



        </label>
    </div>
</template>

<script>
import ideaCard from './ideaCard.vue';
import rightArrowIcon from "@carbon/icons-vue/es/arrow--right/32.js"
import deleteIcon from "@carbon/icons-vue/es/trash-can/16.js"
export default {
    name: 'ideaEditor',
    components: {
        ideaCard,
        rightArrowIcon,
        deleteIcon
    },
    props: {
        idea: {
            type: Object,
            required: true,
        },
        ideaIndex: {
            type: Number,
            required: true,
        },
    },
    emits: ['saveIdea'],
    data() {
        return {
            activeIdea: {...this.idea},
            // 
            // { "meta": 
            //     { "createdAt": "2018-01-01", 
            //       "updatedAt": "2018-01-01", 
            //       "contentID": "1" }, 
            //   "content": [ "I love mc", "I host a MC server", "I created a mod" ], 
            //   "dateTo": "2018-01-01", 
            //   "title": "I love Minecraft", 
            //   "type": "major", 
            //   "dateFrom": "2018-01-01" }
        }
    },
    computed: {
    },
    watch: {
        idea: {
            handler: function (newVal, oldVal) {
                this.activeIdea = newVal;
            },
            deep: true,
        },
    },
    methods: {
        save() {
            this.$emit('saveIdea', this.activeIdea);
            document.getElementById(this.ideaIndex).click();
        },
        discard() {
            this.activeIdea = {...this.idea};
            // then close the modal
            // emulating a click on the label
            document.getElementById(this.ideaIndex).click();
        },
        addContent() {
            this.activeIdea.content.push('');
        },
        deleteContent(index) {
            this.activeIdea.content.splice(index, 1);
        },
    },
}
</script>

<style>

</style>