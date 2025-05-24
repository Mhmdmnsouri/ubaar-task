<template>
    <div class="success-box">
        <div>
            <div class="success-icon">
                <CheckIcon />
            </div>
            <p class="success-text">اطلاعات شما با موفقیت ثبت شد</p>
        </div>
        <UiButton to="/address-list" class="btn-outline">مشاهده اطلاعات</UiButton>
    </div>
</template>

<script setup>
import CheckIcon from '@/assets/icons/Check.vue'
import UiButton from '@/components/ui/Button.vue'
</script>

<style scoped>
.success-box {
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 48px 16px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: 60vh;
}

.success-icon {
    color: var(--color-secondary);
}

.success-text {
    font-size: 14px;
    color: var(--color-secondary);
    margin: 0;
}
</style>
