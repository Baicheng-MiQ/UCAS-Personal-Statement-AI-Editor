<template>
<div class="flex flex-row justify-between">
  <div class="flex flex-row space-x-4">
    <button class="rounded-full p-1 bg-slate-100 hover:bg-slate-200"
    @click="toggleFullscreen" v-show="showFullscreenButton">
        <svg style="height: 20px; width: 20px; color: rgb(0, 0, 255);" width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"></rect><path d="M30 6H42V18" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6H6V18" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M30 42H42V30" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 42H6V30" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M42 6L29 19" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 29L6 42" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </button>
    <button class="rounded-full p-1 bg-slate-100 hover:bg-slate-200"
    @click="copyStatement">
        <svg class="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
        </svg>
    </button>
  </div>
<div class="flex flex-row">
    <p class="my-auto mx-2">{{saveStatus}}</p>
    <div class="py-1 px-2 my-auto bg-gray-100 text-sm rounded-full text-gray-800">
        <span :class="{'text-red-500 font-bold': lineCount>47}">{{lineCount}} of 47 Lines</span>
        <span class="text-gray-500"> | </span>
        <span :class="{'text-red-500 font-bold': charCount>4000}">{{charCount}} of 4000 characters</span>
    </div>
</div>
</div>
</template>

<script>
export default {
    name: 'InputFormBarC',
    emits: ['toggleFullscreen'],
    props: {
        saveStatus: {
            type: String,
            default: 'Saved.',
        },
        showFullscreenButton: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        toggleFullscreen() {
            this.$emit('toggleFullscreen');
        },
        copyStatement() {
            navigator.clipboard.writeText(this.$store.getters.pureContent);
            this.$store.commit('notify', {
                type: 'success',
                message: 'Copied to clipboard.',
            });
        },
    },
    computed: {
        content: {
            get() {
                return this.$store.state.content;
            },
            set(value) {
                this.$store.commit('setContent', value);
            }
        },


        pureContent () {
            return this.$store.getters.pureContent;
        },

        charCount() {
            // only count the characters in this HTML (No tags)
            return this.pureContent.length;
        },
        lineCount() {
            const ps = this.pureContent;
            if (ps==='') {
                return 0;
            }
            var pars = ps.split('\n');

            var total_lines = 0;
            for (var i=0; i<pars.length; i++) {
                var par_line = 1;
                var line_char = 0;
                var words = pars[i].split(' ');
                for (var j=0; j<words.length; j++) {
                    if (line_char + words[j].length > 93) {
                        line_char = words[j].length;
                        par_line += 1;
                    } else {
                        line_char = line_char + words[j].length + 1;
                    }
                }
                total_lines += par_line;
            }
            return total_lines;
        },

    }
}
</script>

<style>

</style>