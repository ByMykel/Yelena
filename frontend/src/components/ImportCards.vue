<template>
    <modal :show="show">
        <div class="">importar cosas</div>
        <input type="file" ref="file" @change="selectFile" />
        <button class="bg-red-400" @click="upload">Upload</button>
    </modal>
</template>

<script>
import repository from "../api/repository";
import Modal from "./Modal.vue";

export default {
    components: { Modal },
    props: {
        show: Boolean,
    },
    data() {
        return {
            selectedFiles: undefined,
        };
    },
    methods: {
        selectFile() {
            this.selectedFiles = this.$refs.file.files;
        },
        upload() {
            let formData = new FormData();
            formData.append("file", this.selectedFiles.item(0));
            repository.importDeck(formData);

            this.selectedFiles = undefined;
        },
    },
};
</script>