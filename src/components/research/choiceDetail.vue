<template>
    <div class="flex flex-col rounded-2xl h-full w-full bg-gray-50/50 border-2 shadow-xl overflow-scroll">
        <div class="uniAndMajor m-5 flex flex-col space-y-5">
            
            <p class="text-gray-700">Your Choice:</p>
            <input type="text" v-model="choice.uniName" placeholder="Name of University"
                class="bg-transparent border-0 text-5xl font-black">
            <input type="text" v-model="choice.major" placeholder="Name of Major"
                class="bg-transparent border-0 text-xl ">

            <div class="flex flex-row space-x-4 justify-start">
                <button class="btn btn-ghost border-2 bg-white border-black capitalize text-xl max-w-xs w-fit h-fit p-2 " 
                @click="openUniPS" v-show="choice.uniName && choice.links.uniPS">
                    <p><span class="font-light">Official Advice from</span> <br> {{choice.uniName}}</p>
                </button>
                <button class="btn btn-ghost border-2 border-gray-200 capitalize text-xl max-w-xs h-fit p-2" 
                    @click="openMajPS" v-show="choice.major && choice.links.majPS">
                    <p><span class="font-light">General Advice For</span> <br>{{choice.major}}</p></button>
            </div>
            <textarea v-model="choice.notes" rows="10" placeholder="This university is looking for..."
                class="p-5 text-lg border-black border-2"/>
        </div>
    </div>

</template>

<script>
export default {
    name: 'choiceDetailC',
    computed: {
        localChoice() {
            return this.choice;
        }
    },
    methods: {
        openUniPS() {
            window.open(this.choice.links.uniPS, '_blank', 'left=100,top=100,width=720,height=1280');
        },
        openMajPS() {
            window.open(this.choice.links.majPS, '_blank', 'left=100,top=100,width=720,height=1280');
        }
    },
    props: {
        choice: {
            type: Object,
            default: { notes: "", major: "", uniName: "", links: { uniPS: "", uniMainSite: "", majPS: "" }},
            // example:
            // { "links": { 
                    // "majPS": "https://www.ucas.com/undergraduate/applying-university/personal-statement-advice-computer-science", 
                    // "uniMainSite": "https://www.ucl.ac.uk/", 
                    // "uniPS": "https://www.ucl.ac.uk/prospective-students/writing-personal-statement" }, 
                // "uniName": "University College London", 
                // "notes": "This is a test note", 
                // "major": "Computer Science" }
        },
        choiceNo: {
            type: Number,
            default: 0,
        },
    }
}
</script>

<style>

</style>