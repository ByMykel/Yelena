<template>
    <div>
        <CreateDeck
            :show="showDeckModal"
            @close-modal="showDeckModal = false"
        ></CreateDeck>
        <CreateCard
            :show="showCardModal"
            @close-modal="showCardModal = false"
        ></CreateCard>
        <Navbar
            @create-deck="showDeckModal = true"
            @create-card="showCardModal = true"
        ></Navbar>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import CreateDeck from "../components/CreateDeck.vue";
import CreateCard from "../components/CreateCard.vue";

export default {
    components: { Navbar, CreateDeck, CreateCard },
    data() {
        return {
            showDeckModal: false,
            showCardModal: false,
        };
    },
};
</script>