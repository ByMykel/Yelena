<template>
    <button
        class="relative block focus:outline-none group"
        :class="{ 'cursor-not-allowed opacity-50': disabledIcon }"
        :disabled="disabledIcon"
        @keydown.enter="$emit('hover-icon')"
        @click="$emit('click-icon')"
    >
        <div class="flex flex-row items-center justify-center h-full">
            <div
                class="transition duration-300 ease-out transform scale-0 rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100 w-7 h-7"
                :class="{ 'bg-transparent bg-blue-600 bg-opacity-20': !disabledIcon }"
            ></div>
        </div>
        <div class="absolute inset-0">
            <div
                class="flex items-center justify-center w-full h-full text-gray-900 "
                :class="{
                    'group-hover:text-blue-600 group-focus:text-blue-600':
                        !disabledIcon,
                }"
            >
                <slot></slot>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        disabledIcon: {
            type: Boolean,
            default: false,
        },
    },
};
</script>