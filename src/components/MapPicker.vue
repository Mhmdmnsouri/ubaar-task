<template>
    <div class="map-picker">
        <div class="map-header">
            <button class="back-btn" @click="onBack">
                <RightIcon />
            </button>
            <span class="title mobile-only">انتخاب موقعیت</span>
            <span class="title desktop-only">موقعیت مورد نظر خود را روی نقشه مشخص کنید</span>
        </div>

        <div ref="mapRef" class="map-container"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import RightIcon from '@/assets/icons/Right.vue'

const emit = defineEmits(['location-selected', 'back'])

const mapRef = ref(null)
const mapInstance = ref(null)
const marker = ref(null)

function onBack() {
    emit('back')
}

onMounted(() => {
    mapInstance.value = L.map(mapRef.value, { preferCanvas: true, zoomControl: false })
        .setView([35.6892, 51.3890], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.value)

    mapInstance.value.on('click', ({ latlng }) => {
        const { lat, lng } = latlng

        if (marker.value) marker.value.setLatLng(latlng)
        else marker.value = L.marker(latlng).addTo(mapInstance.value)

        emit('location-selected', { lat, lng })
    })
})

onUnmounted(() => {
    if (mapInstance.value) {
        mapInstance.value.off()
        mapInstance.value.remove()
        mapInstance.value = null
    }
})
</script>

<style scoped>
.map-picker {
    position: relative;
}

.map-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffffed;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    z-index: 5;
}

.back-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
}

.title {
    font-size: 12px;
    font-weight: 500;
    color: #333;
}

.mobile-only {
    display: inline;
}

.desktop-only {
    display: none;
    translate: -40px;
    font-size: 14px;
}

.map-container {
    width: 100%;
    height: calc(100vh - 48px);
    z-index: 1;
}

@media (min-width: 768px) {
    .map-container {
        height: 600px;
        box-shadow: 0px 2px 6px 0px #00000040;
        border-radius: var(--radius-xs);
    }

    .map-header {
        z-index: 2;
        justify-content: right;
        border-start-start-radius: var(--radius-xs);
        border-start-end-radius: var(--radius-xs);
    }

    .mobile-only {
        display: none;
    }

    .desktop-only {
        display: inline;
    }

    .back-btn {
        display: none;
    }
}
</style>
