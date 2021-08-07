<template>
    <div id="app">
        <App-layout>
            <router-view />
        </App-layout>
    </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";

export default {
    components: { AppLayout },
};
</script>

<style src="./assets/tailwind.css">
