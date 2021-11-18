<template>
    <div id="app">
        <App-layout>
            <router-view />
        </App-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLayout from "./layouts/AppLayout.vue";

export default {
    components: { AppLayout },
    mounted() {
        this.changeTheme();
    },
    computed: {
        ...mapGetters("theme", ["getTheme"]),
    },
    methods: {
        changeTheme() {
            if (this.getTheme === "dark") {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        },
    }
};
</script>

<style src="./assets/tailwind.css">
