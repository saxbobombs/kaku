<template>
    <span>{{appVersion}}</span>
</template>

<script>
import store from '@/store/packageStore'

export default {
	name: "Version",
    store: store,
    computed: {
        appVersion () {
            return this.$store.getters.appVersion
        } 
    // other computed values here
    },
}
</script>