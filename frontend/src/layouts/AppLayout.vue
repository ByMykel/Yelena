<template>
    <div>
        <Navbar></Navbar>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
    components: { Navbar },
};
</script>