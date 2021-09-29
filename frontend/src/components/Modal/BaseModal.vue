<template>
    <transition
        leave-active-class="transition duration-200 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-show="show"
            ref="modal"
            class="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 "
            role="dialog"
            aria-modal="true"
        >
            <transition
                enter-active-class="transition duration-300 ease-out"
                enter-class="transform -translate-y-32 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-40 opacity-0"
            >
                <div
                    v-show="show"
                    class="relative w-full mx-2"
                    style="max-width: 28rem"
                >
                    <div
                        class="absolute right-0 flex items-center justify-center  -top-8"
                    >
                        <button
                            class="relative block focus:outline-none group"
                            @keydown.enter="$parent.$emit('close-modal')"
                            @click="$parent.$emit('close-modal')"
                        >
                            <div
                                class="flex flex-row items-center justify-center h-full "
                            >
                                <div
                                    class="transition duration-300 ease-out transform scale-0 bg-transparent bg-red-600 rounded-full opacity-0  group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100 w-7 h-7 bg-opacity-20"
                                ></div>
                            </div>
                            <div class="absolute inset-0">
                                <div
                                    class="flex items-center justify-center w-full h-full text-gray-900  group-hover:text-red-600 group-focus:text-red-600"
                                >
                                    <svg
                                        class="w-6 h-6 text-white  group-hover:text-red-600 group-focus:text-red-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div
                        class="overflow-y-auto bg-white rounded-md shadow"
                        style="max-height: calc(100vh - 150px)"
                    >
                        <slot :mounted-hook="mountedHook"></slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: Boolean
    },
    watch: {
        show(value) {
            if (value) {
                setTimeout(() => {
                    this.mountedHook();
                }, 10);

                document.querySelector("body").classList.add("overflow-hidden");
                return;
            }

            document.querySelector("body").classList.remove("overflow-hidden");
            return;
        }
    },
    beforeMount() {
        window.addEventListener("keydown", this.onEscapeKeyDown);
        window.addEventListener("keydown", this.onTabKeyDown);
    },
    beforeDestroy() {
        window.removeEventListener("keydown", this.onEscapeKeyDown);
        window.removeEventListener("keydown", this.onTabKeyDown);
    },
    methods: {
        onEscapeKeyDown(event) {
            if (event.which === 27 && this.show) {
                this.$parent.$emit("close-modal");
            }
        },
        onTabKeyDown(event) {
            if (event.which === 9 && this.show) {
                this.focusHandler(event);
            }
        },
        focusHandler(e) {
            const { activeElement } = document;

            const focusableElements = this.getFocusableElements();

            if (!focusableElements.length) return;

            const firstFocusableElement = focusableElements[0];
            const lastFocusedElement =
                focusableElements[focusableElements.length - 1];

            let element;

            if (activeElement === firstFocusableElement && e.shiftKey) {
                element = lastFocusedElement;
            } else if (activeElement === lastFocusedElement && !e.shiftKey) {
                element = firstFocusableElement;
            }

            if (element) {
                e.preventDefault();
                element.focus();
            }
        },
        getFocusableElements() {
            const { modal } = this.$refs;
            const elements = modal.querySelectorAll(
                'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
            );

            return Array.from(elements).filter(
                element => element.offsetParent !== null
            );
        },
        mountedHook() {
            const focusableElements = this.getFocusableElements();

            if (focusableElements.length !== 0) {
                focusableElements[0].focus();
            }
        }
    }
};
</script>