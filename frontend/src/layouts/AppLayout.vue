<template>
    <div>
        <modal-create-deck
            :show="showDeckModal"
            @close-modal="showDeckModal = false"
        ></modal-create-deck>
        <modal-create-card
            :show="showCardModal"
            @close-modal="showCardModal = false"
        ></modal-create-card>
        <modal-import-cards
            :show="showImportCardModal"
            @close-modal="showImportCardModal = false"
        ></modal-import-cards>
        <navbar
            @create-deck="showDeckModal = true"
            @create-card="showCardModal = true"
            @import-card="showImportCardModal = true"
        ></navbar>
        <div class="mx-auto my-10 -mt-56 max-w-7xl sm:px-6 lg:px-8">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ModalCreateDeck from "../components/Modal/ModalCreateDeck.vue";
import ModalCreateCard from "../components/Modal/ModalCreateCard.vue";
import ModalImportCards from "../components/Modal/ModalUploadFiles.vue";

export default {
    components: { Navbar, ModalCreateDeck, ModalCreateCard, ModalImportCards },
    data() {
        return {
            showDeckModal: false,
            showCardModal: false,
            showImportCardModal: false,
        };
    },
};
</script>