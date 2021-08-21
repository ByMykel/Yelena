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
        <import-cards
            :show="showImportCardModal"
            @close-modal="showImportCardModal = false"
        ></import-cards>
        <navbar
            @create-deck="showDeckModal = true"
            @create-card="showCardModal = true"
            @import-card="showImportCardModal = true"
        ></navbar>
        <div class="mx-auto my-10 max-w-7xl sm:px-6 lg:px-8">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import CreateDeck from "../components/CreateDeck.vue";
import CreateCard from "../components/CreateCard.vue";
import ImportCards from "../components/ImportCards.vue";

export default {
    components: { Navbar, CreateDeck, CreateCard, ImportCards },
    data() {
        return {
            showDeckModal: false,
            showCardModal: false,
            showImportCardModal: false,
        };
    },
};
</script>