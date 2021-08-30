<template>
    <base-modal :show="show">
        <div class="px-4 py-4">
            <label class="block text-sm font-medium text-gray-700">
                Import cards
            </label>
            <div
                class="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md "
            >
                <div class="space-y-1 text-center">
                    <svg
                        class="w-12 h-12 mx-auto text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                        <label
                            for="file-upload"
                            class="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                            <span>Upload a file</span>
                            <input
                                id="file-upload"
                                class="sr-only"
                                type="file"
                                ref="file"
                                @change="selectFile"
                            />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                    </p>
                </div>
            </div>
        </div>
        <div
            class="px-4 py-3 text-right border-t border-gray-200 bg-gray-50 sm:px-6"
        >
            <button
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="upload()"
            >
                Upload
            </button>
        </div>
    </base-modal>
</template>

<script>
import repository from "../../api/repository";
import BaseModal from "./BaseModal.vue";

export default {
    components: { BaseModal },
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