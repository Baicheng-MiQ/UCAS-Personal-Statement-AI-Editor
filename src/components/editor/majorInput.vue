<template>
    <div>
        <ul class="flex flex-row pt-6 font-bold text-base overflow-x-scroll">

            <li v-for="(item, index) in major" :key="index"
                class="flex flex-row mx-2 mb-3 px-2 py-1 bg-gray-50 rounded-full shadow-md">
                <p class="whitespace-nowrap">{{item}}</p>
                <!-- round cross icon -->
                <div class="my-auto rounded-full bg-gray-100 ml-1 cursor-pointer hover:bg-white"
                    @click="delMajor(index)">
                    <svg class="fill-current text-gray-500 h-4 w-4" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
            </li>
            
            <li>
                <div class="flex flex-row mx-2 mb-3 pr-2 bg-gray-50 rounded-full shadow-md focus-within:shadow-lg">
                    <input type="text" class="w-28 h-full m-0.5 px-2 py-1 font-bold bg-white rounded-full"
                        :class="{'hidden': !addingMajor}"
                        maxlength="100" v-model="newMajor" @keyup.enter="addMajor" @focusout="addMajor"
                        placeholder="New Major">

                    <!-- this button toggle add major input block -->
                    <div class="h-8 my-auto rounded-full bg-gray-50 ml-2 cursor-pointer hover:bg-white"
                        @click="manualAddMajor=true" :class="{'hidden': manualAddMajor}" >
                        <svg class="my-2 fill-current text-gray-500 h-4 w-4" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </div>

                    <!-- this button submit major to add, same as press enter -->
                    <div class="h-8 my-auto rounded-full bg-gray-50 ml-2 cursor-pointer hover:bg-white"
                        @click="addMajor" :class="{'hidden': !manualAddMajor}" >
                        <svg class="my-2 fill-current text-gray-500 h-4 w-4" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </div>
                </div>
            </li>

        </ul>
    </div>

</template>

<script>
export default {
    name: 'MajorInputC',
    data() {
        return {
            newMajor: '',
            manualAddMajor: false
        }
    },
    computed: {
        major() {
                return this.$store.state.major;
            },
        addingMajor () {
            return this.manualAddMajor || this.major.length === 0;
        }
    },
    methods: {
        delMajor(value) {
            this.major.splice(value, 1);
            this.$store.commit('setMajor', this.major);
            this.$store.dispatch('dbUpdateUserStatus', {
                "application.majors": this.major,
            });
        },
        addMajor() {
            // if not in major, add it
            if (this.newMajor && !this.major.includes(this.newMajor)) {
                this.major.push(this.newMajor);
                this.$store.commit('setMajor', this.major);
                this.newMajor = '';
                this.manualAddMajor = false;
                this.$store.dispatch('dbUpdateUserStatus', {
                    "application.majors": this.major,
                });
            } else {
                this.$store.commit('notify',
                    {
                        type: 'error',
                        message: 'Major is empty or already exists',
                    }
                );
                
            }
        }
    }
}
</script>

<style>

</style>