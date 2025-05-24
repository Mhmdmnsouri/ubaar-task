<template>
    <div class="layout">
        <header class="layout-header">
            <div class="logo"><img src="../assets/images/logo.png" alt=""></div>
            <nav class="nav">
                <RouterLink to="/add-address" class="link" :class="{ active: route.path === '/add-address' }">ثبت آدرس
                </RouterLink>
                <RouterLink to="/address-list" class="link" :class="{ active: route.path === '/address-list' }">مشاهده
                    آدرس‌ ها</RouterLink>
            </nav>
        </header>

        <main class="layout-content">
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import { useRoute, RouterLink, RouterView } from 'vue-router'
const route = useRoute()
</script>


<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--color-background);
}

.layout-header {
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: #fff;
    box-shadow: 0px 0px 4px 0px #00000026;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo img {
    width: 45px;
    height: 25px;
}

.nav {
    display: flex;
    gap: 28px;
}

.link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: color 0.2s;
}

.link.active {
    color: var(--color-secondary);
}

@media (min-width: 768px) {
    .layout-header {
        padding-left: 100px;
        padding-right: 100px;
    }

    .logo img {
        width: 70px;
        height: 40px;
    }
}
</style>
