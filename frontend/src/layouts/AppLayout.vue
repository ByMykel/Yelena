<template>
    <div>
        <modal-create-deck
            :show="getModalVisibility('create_deck')"
        ></modal-create-deck>
        <modal-create-card
            :show="getModalVisibility('create_card')"
        ></modal-create-card>
        <modal-import-cards
            :show="getModalVisibility('import_card')"
        ></modal-import-cards>
        <navbar></navbar>
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
import { mapGetters } from "vuex";

export default {
    components: { Navbar, ModalCreateDeck, ModalCreateCard, ModalImportCards },
    computed: {
        ...mapGetters("modals", ["getModalVisibility"]),
    },
};
</script>