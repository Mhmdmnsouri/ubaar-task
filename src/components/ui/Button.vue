<template>
    <component :is="tag" :to="to" :type="isButton ? type : undefined"
        :class="[baseClass, color, { 'is-loading': loading }]" :disabled="isButton ? (disabled || loading) : undefined"
        @click="$emit('click', $event)">
        <div class="loader-wrapper" v-if="loading">
            <Loader />
        </div>
        <span v-else>
            <slot />
        </span>
    </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Loader from '@/assets/icons/loader.vue'

const props = defineProps({
    type: { type: String, default: 'button' },
    color: { type: String, default: null },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    to: { type: String, default: null },
})

const baseClass = 'base-btn'
const isButton = computed(() => !props.to)
const tag = computed(() => {
    if (props.to) return RouterLink
    return 'button'
})

defineEmits(['click'])
</script>

<style scoped>
.base-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: var(--radius-xs);
    cursor: pointer;
    transition: opacity 0.2s ease;
    text-align: center;
    text-decoration: none;
}

.primary {
    background-color: var(--color-primary);
    color: #fff;
    transition: all .3s;
}

.primary:hover {
    background-color: #00ac95;
}

.btn-outline {
    width: 300px;
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    padding: 10px 16px;
    border-radius: var(--radius-xs);
}

.loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
}

.loader-wrapper svg {
    width: 50px;
    height: 50px;
}

.is-loading {
    position: relative;
    pointer-events: none;
}
</style>
