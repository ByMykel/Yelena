<template>
    <base-modal :show="show" v-slot:default="slotProps">
        <div
            v-if="showUploadFileInput"
            class="px-4 py-4"
            :class="{ 'py-12': !getFileName }"
        >
            <div class="flex flex-col items-center">
                <div class="flex items-center text-gray-600 text-md">
                    <label
                        for="file-upload"
                        class="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer dark:bg-gray-700 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                        <span>Upload a file</span>
                        <input
                            id="file-upload"
                            class="sr-only"
                            type="file"
                            ref="file"
                            @click="$refs.file.value = ''"
                            @change="selectFile"
                        />
                    </label>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-300">
                    Upload a .csv with your saved translations in
                    <a
                        class="text-blue-500"
                        target="_blank"
                        href="https://translate.google.com/saved?hl=en"
                        >Google Translate</a
                    >
                </div>
            </div>
            <div
                v-if="getFileName"
                class="flex items-center p-2 mt-3 bg-gray-200 rounded-md dark:bg-gray-800"
            >
                <div class="mr-3">
                    <hero-icons-solid
                        class="w-8 h-8 text-gray-500"
                        name="document-text"
                    ></hero-icons-solid>
                </div>
                <div
                    class="w-full text-sm"
                    style="max-width: calc(100% - 80px)"
                >
                    <div
                        class="w-full font-medium text-gray-900 truncate dark:text-gray-100"
                    >
                        {{ getFileName }}
                    </div>
                    <div class="font-normal text-gray-800 dark:text-gray-400">
                        {{ getFileSize }}
                    </div>
                </div>
                <button
                    class="ml-auto"
                    @click="(selectedFile = undefined), slotProps.mountedHook()"
                >
                    <hero-icons-outline
                        class="w-6 h-6 text-gray-500"
                        name="x"
                    ></hero-icons-outline>
                </button>
            </div>
        </div>
        <div v-if="showSelectedFileData">
            <div
                class="px-4 py-3 text-sm font-medium text-center text-gray-700 truncate border-b border-gray-200 dark:text-gray-200 md:text-base dark:border-gray-500"
            >
                The file that you have uploaded contains this data
            </div>
            <div
                class="h-full px-4 py-2 space-y-1 overflow-auto bg-gray-50 dark:bg-gray-600"
                style="max-height: calc(100vh - 267px)"
            >
                <file-deck-information
                    v-for="(deck, index) in selectedFileData.decks"
                    :key="index"
                    :deckName="index"
                    :deck="deck"
                    @toggle-check-deck="toggleCheckDeck($event)"
                ></file-deck-information>
            </div>
        </div>
        <div
            v-if="showUploadingData"
            class="flex items-center justify-center p-4"
        >
            <svg
                class="text-gray-600 fill-current dark:text-gray-300 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
            >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
            </svg>
            <span class="ml-1 text-sm text-gray-600 dark:text-gray-300"
                >Uploading data</span
            >
        </div>
        <div
            v-if="showCreatedDecksInfo"
            class="p-4 text-sm text-center text-gray-600 md:text-base dark:text-gray-200"
        >
            {{ CreatedDecksInfo }}
        </div>
        <div
            v-if="showSomeButton"
            class="px-4 py-3 space-x-2 text-right border-t border-gray-200 bg-gray-50 sm:px-6 dark:border-gray-500 dark:bg-gray-600"
        >
            <button
                v-if="showUploadButton"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="upload(), slotProps.mountedHook()"
            >
                Upload
            </button>
            <button
                v-if="showGoBackButton"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                @click="resetData(), slotProps.mountedHook()"
            >
                Go back
            </button>
            <button
                v-if="showCreateButton"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="create(), slotProps.mountedHook()"
            >
                Create
            </button>
        </div>
    </base-modal>
</template>

<script>
import HeroIconsOutline from "../HeroIconsOutline.vue";
import HeroIconsSolid from "../HeroIconsSolid.vue";
import BaseModal from "./BaseModal.vue";
import FileDeckInformation from "../Deck/FileDeckInformation.vue";
import { mapActions } from "vuex";

export default {
    components: {
        BaseModal,
        HeroIconsSolid,
        HeroIconsOutline,
        FileDeckInformation,
    },
    props: {
        show: Boolean,
    },
    data() {
        return {
            showUploadFileInput: true,
            showUploadingData: false,
            showDecksCreated: false,
            showCreatedDecksInfo: false,
            selectedFile: undefined,
            selectedFileData: undefined,
            CreatedDecksInfo: undefined,
        };
    },
    computed: {
        showSelectedFile() {
            return this.selectedFile !== undefined;
        },
        showSelectedFileData() {
            return (
                this.selectedFileData !== undefined &&
                !this.showCreatedDecksInfo &&
                !this.showUploadingData
            );
        },
        showUploadButton() {
            return (
                this.selectedFile !== undefined &&
                this.selectedFileData === undefined &&
                this.selectedFileData === undefined
            );
        },
        showGoBackButton() {
            return !this.showUploadFileInput;
        },
        showCreateButton() {
            return (
                this.selectedFileData !== undefined &&
                !this.showCreatedDecksInfo &&
                !this.showUploadingData
            );
        },
        showSomeButton() {
            return (
                this.showUploadButton ||
                this.showGoBackButton ||
                this.showCreateButton
            );
        },
        getFileName() {
            return this.selectedFile?.item(0)?.name;
        },
        getFileSize() {
            return this.formatBytes(this.selectedFile?.item(0)?.size);
        },
    },
    watch: {
        show(value) {
            if (!value) {
                setTimeout(() => this.resetData(), 200);
            }
        },
    },
    methods: {
        ...mapActions("deck", ["fetchDecks", "importDeck"]),
        selectFile() {
            this.selectedFile = this.$refs.file.files;
        },
        upload() {
            this.showUploadFileInput = false;

            const input = this.selectedFile.item(0);
            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target.result;
                const data = this.csvToArray(text);

                this.selectedFileData = data;
            };

            reader.readAsText(input);
        },
        async create() {
            this.showUploadingData = true;

            this.importDeck(this.selectedFileData).then((message) => {
                this.showUploadingData = false;
                this.showCreatedDecksInfo = true;
                this.CreatedDecksInfo = message;
            });
        },
        resetData() {
            this.showUploadFileInput = true;
            this.showUploadingData = false;
            this.showDecksCreated = false;
            this.showCreatedDecksInfo = false;
            this.selectedFile = undefined;
            this.selectedFileData = undefined;
            this.CreatedDecksInfo = undefined;
        },
        csvToArray(str, delimiter = ",") {
            const rows = str
                .split(/\r\n/)
                .map((element) => element.replaceAll('"', "").split(delimiter));

            let result = {};

            rows.forEach((row) => {
                const deck = `${row[0]}-${row[1]}`;

                if (!(deck in result)) {
                    result[deck] = {
                        checked: true,
                        cards: [],
                    };
                }

                result[deck].cards.push({
                    checked: true,
                    question: row[2],
                    answer: row[3],
                });
            });

            return { decks: result };
        },
        formatBytes(bytes = 0, decimals = 2) {
            if (bytes === 0) return "0 Bytes";

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = [
                "Bytes",
                "KB",
                "MB",
                "GB",
                "TB",
                "PB",
                "EB",
                "ZB",
                "YB",
            ];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return (
                parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
                " " +
                sizes[i]
            );
        },
    },
};
</script>