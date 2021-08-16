<template>
    <div>
        <create-deck
            :show="showDeckModal"
            @close-modal="showDeckModal = false"
        ></create-deck>
        <create-card
            :show="showCardModal"
            @close-modal="showCardModal = false"
        ></create-card>
        <navbar
            @create-deck="showDeckModal = true"
            @create-card="showCardModal = true"
        ></navbar>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 my-10">
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