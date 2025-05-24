<template>
    <div v-if="visible" class="toast">
        {{ message }}
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    message: String,
    visible: Boolean
})

const emit = defineEmits(['close'])

watch(() => props.visible, (val) => {
    if (val) {
        setTimeout(() => emit('close'), 3500)
    }
})
</script>

<style scoped>
.toast {
    position: fixed;
    bottom: 90px;
    right: 15px;
    background-color: var(--color-error);
    color: #fff;
    padding: 12px 24px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    z-index: 9999;
}
</style>
