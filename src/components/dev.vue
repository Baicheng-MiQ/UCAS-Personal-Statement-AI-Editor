<template>
  <div class="p-2 border-2 flex flex-col bg-white opacity-60">
    <div>
      <p>Developer only: <br> If you see this, please contact us. </p>
      <button @click="runDevCode"> dev code </button>
      <button @click="appLoading"> global Load </button>
      <button @click="loadUserToken"> Load Token ID </button>
      <button @click="viewUserToken"> View Token ID </button>
      <!-- GPT -->
      <button @click="removeResultObject"> Remove Result</button>
      <button @click="onLoadingState"> Loading </button>
      <button @click="injectResultObject"> Inject Result </button>
    </div>
    <div>
        <button @click="noti_def">default</button>
        <button @click="noti_suc">success</button>
        <button @click="noti_warn">warn</button>
        <button @click="noti_err">error</button>
    </div>
    <div>
        <button @click="createData"> write db </button>
        <button @click="getUserStatus"> get userStatus </button>
        <button @click="vef"> get (vef) </button>
    </div>
    <div>
        <button @click="devLogin"> dev login </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'devC',
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        runDevCode() {
            this.$store.dispatch('devDevCodeRunner')
        },
        showhide() {
            this.showThis = !this.showThis;
        },
        // app load
        appLoading () {
            this.$store.commit('devAppLoading');
        },

        // auth
        loadUserToken () {
        this.$store.dispatch('getUserIDtoken')
        },
        viewUserToken () {
        console.log(this.$store.state.userIDtoken)
        },
        devLogin () {
            this.$store.commit('devSignIn', {
                email: 'y@y.com',
                password: '123456789'
            })
        },
        // GPT
        injectResultObject () {
        this.$store.commit('devInjectResult',
             {
            "pro": [
                "-The applicant has a genuine interest in sociology and is enthusiastic about pursuing a degree in the subject.",
                "-The applicant has a good understanding of the psychological explanations for mental health disorders and has a curiosity about how these views have changed over time.",
                "-The applicant has experience working in a library and has gained valuable skills in customer service.",
                "-The applicant is a reliable and hard-working student."
            ],
            "con": [
                "-It could be helpful to flesh out your understanding of the psychological explanations for mental disorders, and how sociology could offer a more realistic explanation.",
                "-It would be helpful to provide more concrete examples of how you have participated in and contributed to society, both in your previous roles and during your time at college.",
                "-It would also be helpful to provide more information about your academic record and any extracurricular activities you have participated in."
            ],
            "comm": [
                "Your personal statement is well written and provides a good overview of your interests and motivations in sociology. It is clear that you have a strong interest in the subject and are able to engage with it well.",
                "One area that you could improve on is your ability to articulate your thoughts in a more concise and organised way. It can be difficult to follow your argument when it is scattered throughout your essay. It would be helpful to break down your main points more clearly and develop them further in a more systematic way.",
                "Overall, your essay is well written and shows a strong interest in sociology. However, it could be improved in terms of organisation and clarity of thought."
            ]
            })
        },
        removeResultObject () {
        this.$store.commit('devInjectResult',
            {
            "pro": null,
            "con": null,
            "comm": null
            }
        )},
        onLoadingState () {
        this.$store.commit('devLoadingState', true)
            },
        offLoadedState () {
        this.$store.commit('devLoadingState', false)
            },

        // notification
        noti_def () {
            this.$store.commit('notify', {type: 'default', 
                                            title: 'Title', 
                                            message: 'Message'})
            },

        noti_suc () {
            this.$store.commit('notify', {type: 'success', 
                                            title: 'Title', 
                                            message: 'Message'})
            },

        noti_warn () {
            this.$store.commit('notify', {type: 'warn', 
                                            title: 'Title', 
                                            message: 'Message'})
            },

        noti_err () {
            this.$store.commit('notify', {type: 'error', 
                                            title: 'Title', 
                                            message: 'Message'})
            },
        
        // db
        createData () {
            this.$store.dispatch('devFSreadData')
            },
        
        getUserStatus () {
            this.$store.dispatch('dbGetUserStatus')
            },
        
    },

}
</script>   

<style scoped>
button {
    margin: 0.5rem;
    border: 1px solid #ccc;
}
</style>