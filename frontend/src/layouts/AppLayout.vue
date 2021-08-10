<template>
    <div>
        <Modal :show="show" @close-modal="show = false">
            <CreateDeck></CreateDeck>
        </Modal>
        <Navbar @create-deck="show = true"></Navbar>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import Navbar from "../components/Navbar.vue";
import CreateDeck from "../components/CreateDeck.vue";
export default {
    components: { Navbar, Modal, CreateDeck },
    data() {
        return {
            show: false,
        };
    },
};
</script>