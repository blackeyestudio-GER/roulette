<template>
    <div class="min-h-screen bg-night text-white px-4 py-6 relative">
        <!-- Header with image and text -->
        <div class="flex flex-col md:flex-row max-w-7xl mx-auto mb-6 gap-4">
            <img class="w-full md:w-1/4 aspect-square object-cover rounded shadow" src="/logo.png" alt="logo" />
            <div class="md:w-3/4 bg-eerie-black p-4 rounded shadow text-sm whitespace-pre-line">
                <p>
                    Willkommen bei unserem kostenlosen Roulette-Tool! Dieses Tool hilft dir, auf spielerische Weise Entscheidungen zu treffen – ob bei Gewinnspielen, Aufgabenverteilungen oder einfach zum Spaß. Gib Begriffe ein, starte das Rad und lass den Zufall entscheiden.
                </p>
                <p class="mt-2">
                    Die Nutzung ist komplett kostenlos und wird es auch immer bleiben. Werbung dient ausschließlich dazu, mich und den Betrieb der Seite zu unterstützen – ich halte sie so unaufdringlich wie möglich. Falls du möchtest, kannst du mich auf <a href="https://ko-fi.com/creatorpage" class="underline text-blue-400" target="_blank">Ko-fi</a> oder <a href="https://patreon.com/creatorpage" class="underline text-blue-400" target="_blank">Patreon</a> unterstützen. Vielen Dank!
                </p>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            <!-- Roulette Canvas + Result -->
            <div class="relative flex-1 flex flex-col items-center">
                <canvas ref="canvas" width="600" height="600" class="rounded-full shadow"></canvas>
                <!-- Arrow Pointer -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-red-500 rotate-180"></div>

                <button @click="spinWheel" class="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded">
                    Starte das Roulette
                </button>
                <!-- Winner Modal -->
                <div v-if="winner" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div class="bg-eerie-black text-white p-6 rounded shadow max-w-sm w-full relative">
                        <button @click="closeWinnerModal" class="absolute top-2 right-2 text-white">✕</button>
                        <h2 class="text-xl font-bold mb-2">Gewinner</h2>
                        <p class="text-lg">🎉 {{ winner }} 🎉</p>
                    </div>
                </div>
            </div>

            <!-- Configuration Panel -->
            <div class="lg:w-1/3 flex flex-col gap-4">
                <textarea
                    v-model="inputText"
                    @input="updateSegments"
                    rows="10"
                    class="w-full p-2 rounded border border-gray-600 bg-eerie-black text-white placeholder-gray-400 shadow-sm"
                    placeholder="Begriffe mit Komma trennen (z. B. Apfel, Banane, Kirsche)"
                ></textarea>
                <div class="flex items-center gap-2">
                    <label class="text-sm">Drehdauer (Sekunden):</label>
                    <input type="number" v-model.number="spinDuration" min="1" class="w-20 p-1 rounded bg-white text-black" />
                </div>
                <label class="flex items-center gap-2">
                    <input type="checkbox" v-model="removeWinnerAfterSpin" />
                    Gewinner nach Ziehung entfernen
                </label>
                <div>
                    <p class="mb-2 text-sm">Farbschema auswählen:</p>
                    <div class="grid grid-cols gap-4">
                        <div v-for="(colors, index) in colorPresets" :key="index" class="flex items-center gap-1">
                            <input type="radio" v-model="selectedColorPreset" :value="index" @change="drawWheel" />
                            <div class="flex gap-1">
                                <div v-for="c in colors" :key="c" :style="{ backgroundColor: c }" class="w-4 h-4 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Ad -->
        <div class="mt-8">
            <AdBannerBottom />
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import AdBannerBottom from '@/components/AdBannerBottom.vue';

const inputText = ref('Pizza,Burger,Pasta,Sushi');
const segments = ref([]);
const spinDuration = ref(10);
const removeWinnerAfterSpin = ref(false);
const winner = ref(null);

const colorPresets = [
    ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'],
    ['#1abc9c', '#e67e22', '#34495e', '#ff6f61', '#8e44ad'],
    ['#2c3e50', '#16a085', '#f39c12', '#c0392b', '#7f8c8d']
];
const selectedColorPreset = ref(0);

const canvas = ref(null);
let angle = 0;
let spinning = false;
let textInputTimeout;

const updateSegments = () => {
    segments.value = inputText.value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
    drawWheel();
};

const handleTextInput = () => {
    clearTimeout(textInputTimeout);
    textInputTimeout = setTimeout(() => {
        updateSegments();
    }, 2000);
};

const drawWheel = () => {
    console.log(canvas);
    console.log(segments.value);
    if (segments.value.length === 0) return;
    const ctx = canvas.value.getContext('2d');
    const size = canvas.value.width;
    const center = size / 2;
    const radius = center;
    const arc = (2 * Math.PI) / segments.value.length;
    ctx.clearRect(0, 0, size, size);

    segments.value.forEach((label, i) => {
        const angleStart = i * arc + angle;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, angleStart, angleStart + arc);
        ctx.fillStyle = colorPresets[selectedColorPreset.value][i % 5];
        ctx.fill();
        ctx.strokeStyle = '#111';
        ctx.stroke();

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(angleStart + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(label, radius - 10, 5);
        ctx.strokeText(label, radius - 10, 5);
        ctx.restore();
    });
};

const spinWheel = () => {
    if (spinning || segments.value.length === 0) return;
    spinning = true;
    const totalRotation = Math.random() * 360 + 360 * 5;
    const start = performance.now();
    const duration = spinDuration.value * 1000;

    const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        angle = (totalRotation * ease * Math.PI) / 180;
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            finalizeSpin();
        }
    };

    requestAnimationFrame(animate);
};

const finalizeSpin = () => {
    const arc = (2 * Math.PI) / segments.value.length;
    const index = segments.value.length - Math.floor(((angle % (2 * Math.PI)) / arc)) - 1;
    winner.value = segments.value[index];
    spinning = false;
};

const closeWinnerModal = () => {
    if (removeWinnerAfterSpin.value && winner.value) {
        segments.value = segments.value.filter(s => s !== winner.value);
        inputText.value = segments.value.join(', ');
        drawWheel();
    }
    winner.value = null;
};

onMounted(() => {
    updateSegments();
});
</script>

<style scoped>
.border-b-16 {
    border-bottom-width: 16px;
}
</style>
