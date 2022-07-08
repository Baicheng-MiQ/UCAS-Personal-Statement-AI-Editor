<template>
    <div class="flex flex-col rounded-2xl h-full w-full bg-white/50 border-2 shadow-xl overflow-scroll">
        <div class="uniAndMajor m-5 flex flex-col space-y-5 relative">
            
            <p class="text-gray-700">Your Choice:</p>

            <div @focusin="autoComplete=true" class="min-w-full overflow-visible" @focusout="sleep(300).then(()=>(autoComplete=false))">

                <input type="text" v-model="choice.uniName" placeholder="Name of University"  @keydown.esc="autoComplete=false"
                class="bg-transparent border-0 text-5xl font-black w-full" @input="inputFlag=true; autoComplete=true">

                        <ul v-show="autoComplete && searchResults.length"
                            class="z-50 absolute top-28 -left-2 bg-white rounded-lg border-2 shadow-sm divide-y">
                            <li v-for="(item, index) in searchResults" :key="index"
                                class="text-2xl px-4 py-3 
                                    hover:bg-gray-200 hover:cursor-pointer"
                                @click="this.choice.uniName=item; inputFlag=true; autoComplete=false; this.$emit('saveChoice')">
                                {{item}}
                            </li>
                        </ul>
            </div>

            <input type="text" v-model="choice.major" placeholder="Name of Major"
                class="bg-transparent border-0 text-xl hidden " @input="inputFlag=true">


            <div class="flex flex-col lg:flex-row lg:space-x-4 justify-start">
                <button class="btn btn-primary border-2 bg-gradient-to-r from-blue-600 to-blue-800 border-blue-600 shadow-xl capitalize text-xl max-w-xs w-fit h-fit p-2 " 
                @click="openPSlink" v-if=" choice.uniName && isOneOfUnis(choice.uniName)" :class="{'loading': psLinkLoading}">
                    <p class="text-white"><span class="font-light">Official Advice from</span> <br> {{choice.uniName}}</p>
                </button>

                <button class="btn btn-ghost border-2 bg-gradient-to-r from-blue-50 to-blue-100 border-red-600 shadow-xl capitalize text-xl max-w-xs w-fit h-fit p-2 " 
                v-else disabled>
                    <p class=""><span class="font-light">Official Advice from</span>
                    <br>this university</p>
                    <br> <span class="font-light">not available</span>
                </button>

                <button class="btn btn-ghost border-2 border-gray-200 capitalize text-xl max-w-xs h-fit p-2 hidden" 
                    @click="openMajPS" v-show="false">
                    <p><span class="font-light">General Advice For</span> <br>{{choice.major}}</p>
                </button>
            </div>

            <textarea v-model="choice.notes" rows="10" placeholder="Notes: "
                class="p-5 text-lg border-black border-2" @input="inputFlag=true"/>

                <button class="btn w-fit px-5" @click="saveChoice">
                    Save
                </button>
        </div>
    </div>

</template>

<script>
import uniListCache from './uniList'
import { db } from '../../firebase/config.js';
import { doc, getDoc } from 'firebase/firestore'

export default {
    name: 'choiceDetailC',
    components: {

    },
    data(){
        return {
            inputFlag: false,
            autoComplete: false,
            psLinkLoading: false,
        }
    },
    computed: {
        uniList() {
            if(this.$store.state.uniList) {
                return this.$store.state.uniList;
            } else {
                return uniListCache.uniList
            }
        },
        searchResults() {
                if (this.choice.uniName === '') {
                    return []
                }

                let matches = [];

                for (let i = 0; i < this.uniList.length; i++) {
                    if (
                    (this.uniList[i].toLowerCase().includes(this.choice.uniName.toLowerCase()) || 
                    this.uniList[i].split(' ').map((x) => {return x[0]}).join('').toLowerCase().includes(this.choice.uniName.toLowerCase()))
                    && matches.length < 10
                    ) {
                        matches.push(this.uniList[i])
                    }
                };
                return matches
            },

    },

    methods: {
        openMiniPage(link) {
            window.open(link, '_blank', 'left=100,top=100,width=720,height=1280');
        },
        saveChoice() {
            this.$emit('saveChoice');
            window.scrollTo(0, 0);
        },
        sleep (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        },
        isOneOfUnis(uni) {
            return this.uniList.includes(uni);
        },
        async openPSlink() {
            this.psLinkLoading = true;
            if(this.choice.uniName && this.isOneOfUnis(this.choice.uniName)) {
                var thisUniRef = doc(db, 'unis', this.choice.uniName);
                getDoc(thisUniRef).then((doc) => {
                    this.psLinkLoading = false;
                    if(doc.exists) {
                        this.openMiniPage(doc.data().uniPS);
                    } else {
                        alert('No official advice found for this university.')
                    }
                });
            } else {
                return ''
            }
        },

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
    },
    unmounted() {
        if (this.inputFlag) {
            this.saveChoice()
        }
    }
}
</script>

<style>

</style>