<template>
    <div class="drawer drawer-end lg:h-[calc(100vh-4rem)]">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">

            <div class="flex flex-col lg:flex-row lg:space-x-3 justify-between lg:h-[calc(100vh-4rem)] ">

                <div class="left flex flex-col lg:flex-row lg:w-11/12 space-x-3">
                    <div class="h-full lg:w-1/3 p-5 overflow-scroll">
                        <h1 class="text-3xl">
                            <span
                                class="font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-600">
                                Research <br>
                            </span>
                            Know what unis are looking for.
                        </h1>

                        <!-- The button to open modal -->
                        <label for="my-modal"
                            class="btn mt-4 w-full btn-ghost text-base text-blue-800 underline modal-button">
                            <Play />
                            <p class="mx-1">UCAS: How to write a PS? </p>
                        </label>

                        <!-- Put this part before </body> tag -->
                        <input type="checkbox" id="my-modal" class="modal-toggle" />
                        <div class="modal w-screen">
                            <div class="modal-box max-w-5xl">
                                <h3 class="font-bold text-lg mb-3">Official advice from UCAS</h3>
                                <iframe class="w-full" height="549" src="https://www.youtube.com/embed/_8hFkMAjW-I"
                                    title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                                <p>There may be some Ads provided by YouTube</p>
                                <div class="modal-action">
                                    <label for="my-modal" class="btn" @click="stopYoutube">
                                        Yay!
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <img alt="background image" class="vector -z-10 top-20 left-5 absolute w-[calc(37vw)]"
                                src="https://static.overlay-tech.com/assets/09df6e20-5a97-4f2d-ba4e-7a224edbab81.svg" />
                            <div class="z-10 top-0 relative flex flex-col space-y-5 my-6 justify-center"
                                @click="saveChoice(); goDown();">
                                <UniMajTab :choice="userStatus.application.fiveChoices[0]" :choiceNo="0"
                                    @click="goToPage(0)"
                                    :class="{ 'border-4 border-blue-700 shadow-xl': selectedTab == 0 }" />
                                <UniMajTab :choice="userStatus.application.fiveChoices[1]" :choiceNo="1"
                                    @click="goToPage(1)"
                                    :class="{ 'border-4 border-blue-700 shadow-xl': selectedTab == 1 }" />
                                <UniMajTab :choice="userStatus.application.fiveChoices[2]" :choiceNo="2"
                                    @click="goToPage(2)"
                                    :class="{ 'border-4 border-blue-700 shadow-xl': selectedTab == 2 }" />
                                <UniMajTab :choice="userStatus.application.fiveChoices[3]" :choiceNo="3"
                                    @click="goToPage(3)"
                                    :class="{ 'border-4 border-blue-700 shadow-xl': selectedTab == 3 }" />
                                <UniMajTab :choice="userStatus.application.fiveChoices[4]" :choiceNo="4"
                                    @click="goToPage(4)"
                                    :class="{ 'border-4 border-blue-700 shadow-xl': selectedTab == 4 }" />
                                <p>Note: UCAS only allows you write one Personal Statement for all your five choices.
                                </p>
                            </div>
                        </div>
                    </div>

                    <transition enterActiveClass="animate__animated animate__fadeInLeft"
                        leaveActiveClass="animate__animated animate__fadeOutRight">
                        <div class="right h-full p-3 lg:w-2/3" ref="choiceBox" v-show="transitionHandle">
                            <ChoiceDetail :choice="userStatus.application.fiveChoices[selectedTab]"
                                :choiceNo="selectedTab" @saveChoice="saveChoice" />

                        </div>
                    </transition>
                </div>

                <div class="h-full lg:w-1/12 flex-col justify-end hidden lg:flex">
                    <label for="my-drawer-4" class="drawer-button btn btn-ghost h-fit mb-10 p-2 mr-1">quick <br>PS editor<EditorIcon class="ml-1 w-20 h-20" /></label>
                </div>
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-4" class="drawer-overlay"></label>
            <InputFormC class="bg-white border-r-2 lg:w-2/5 lg:h-[calc(100vh-4rem)] shadow-2xl"
                :showFullScreenButtonHandle="false"/>
        </div>
    </div>
</template>

<script>
import UniMajTab from '../components/research/uniMajTab.vue';
import ChoiceDetail from '../components/research/choiceDetail.vue';
import InputFormC from '../components/editor/inputForm.vue';
export default {
    name: 'researchView',
    components: {
        UniMajTab,
        ChoiceDetail,
        InputFormC
    },
    data() {
        return {
            selectedTab: 0,
            transitionHandle: true
        }
    },
    computed: {
        userStatus() {
            if (this.$store.state.userStatus) {
                return this.$store.state.userStatus;
            } else {
                return {
                    application: {
                        fiveChoices: [
                            {
                                notes: "",
                                major: "",
                                uniName: "",
                                links: {
                                    uniPS: "",
                                    uniMainSite: "",
                                    majPS: ""
                                }
                            },
                            {
                                notes: "",
                                major: "",
                                uniName: "",
                                links: {
                                    uniPS: "",
                                    uniMainSite: "",
                                    majPS: ""
                                }
                            },
                            {
                                notes: "",
                                major: "",
                                uniName: "",
                                links: {
                                    uniPS: "",
                                    uniMainSite: "",
                                    majPS: ""
                                }
                            },
                            {
                                notes: "",
                                major: "",
                                uniName: "",
                                links: {
                                    uniPS: "",
                                    uniMainSite: "",
                                    majPS: ""
                                }
                            },
                            {
                                notes: "",
                                major: "",
                                uniName: "",
                                links: {
                                    uniPS: "",
                                    uniMainSite: "",
                                    majPS: ""
                                }
                            }]
                    }
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch('getUniList')
    },
    methods: {
        stopYouTube() {
            document.getElementById('myVideoId').contentWindow.postMessage(`{'event':'command','func':'stopVideo','args':''}`, '*');
        },
        goToPage(page) {
            this.transitionHandle = false;
            setTimeout(() => {
                this.selectedTab = page
                this.transitionHandle = true;
            }, 500);
        },
        saveChoice() {
            console.log('save choice')
            this.$store.dispatch('dbUpdateUserStatus', this.userStatus);
        },
        goDown() {
            console.log('go down');
            window.scrollTo(0, 10000);
        },
    }

}
</script>

<style>
</style>