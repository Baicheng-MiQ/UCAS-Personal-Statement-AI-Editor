<template>
    <div class="flex flex-col lg:flex-row lg:space-x-3 justify-between lg:h-[calc(100vh-4rem)] ">

        <div class="left flex flex-col lg:flex-row lg:w-11/12 space-x-3">
            <div class="h-full lg:w-1/3 p-5 overflow-scroll">
                <h1 class="text-3xl">
                    <span class="font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-600">
                        Research <br>
                    </span>
                    Know what unis are looking for.
                </h1>

                <div class="">
                    <img alt="background image"
                    class="vector -z-10 top-20 left-5 absolute w-[calc(37vw)]"
                    src="https://static.overlay-tech.com/assets/09df6e20-5a97-4f2d-ba4e-7a224edbab81.svg"
                    />
                    <div class="z-10 top-0 relative flex flex-col space-y-5 my-10 justify-center" @click="saveChoice(); goDown();">
                        <UniMajTab :choice="userStatus.application.fiveChoices[0]" :choiceNo="0"
                            @click="goToPage(0)"/>
                        <UniMajTab :choice="userStatus.application.fiveChoices[1]" :choiceNo="1"
                            @click="goToPage(1)"/>
                        <UniMajTab :choice="userStatus.application.fiveChoices[2]" :choiceNo="2"
                            @click="goToPage(2)"/>
                        <UniMajTab :choice="userStatus.application.fiveChoices[3]" :choiceNo="3"
                            @click="goToPage(3)"/>
                        <UniMajTab :choice="userStatus.application.fiveChoices[4]" :choiceNo="4"
                            @click="goToPage(4)"/>
                    <p>Note: UCAS only allows you write one Personal Statement for all your five choices.</p>
                    </div>
                </div>
            </div>

            <transition
                enterActiveClass="animate__animated animate__fadeInLeft" 
                leaveActiveClass="animate__animated animate__fadeOutRight">
            <div class="right h-full p-5 lg:w-2/3" ref="choiceBox" v-show="transitionHandle">
                <ChoiceDetail 
                    :choice="userStatus.application.fiveChoices[selectedTab]"
                    :choiceNo="selectedTab"
                    @saveChoice="saveChoice"/>
                
            </div>
            </transition>
        </div>
        <div class="h-full  lg:w-1/12">
                
        </div>
    </div>
</template>

<script>
import UniMajTab from '../components/research/uniMajTab.vue';
import ChoiceDetail from '../components/research/choiceDetail.vue';
export default {
    name: 'researchView',
    components: {
    UniMajTab,
    ChoiceDetail
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
        goToPage(page){
            this.transitionHandle = false;
            setTimeout(() => {
                this.selectedTab = page
                this.transitionHandle = true;
            }, 500);         
        },
        saveChoice(){
            console.log('save choice')
            this.$store.dispatch('dbUpdateUserStatus', this.userStatus);
        },
        goDown(){
            console.log('go down');
            window.scrollTo(0, this.$refs['choiceBox'].offsetTop);
        },
    }

}
</script>

<style>

</style>