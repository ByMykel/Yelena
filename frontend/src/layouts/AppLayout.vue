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
        <div class="mx-auto mt-8 mb-20 max-w-7xl sm:px-6 lg:px-8">
            <slot></slot>
        </div>
        <!-- Page background -->
        <div class="fixed top-0 w-full bg-blue-600 -z-10 h-80"></div>
        <svg
            class="fixed w-full h-5 text-blue-600 fill-current top-80 -z-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
        >
            <path
                d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z"
            ></path>
        </svg>
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