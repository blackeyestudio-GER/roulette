<template>
    <div
        class="min-h-screen bg-night text-white relative"
        :class="obsMode ? 'flex flex-col items-center justify-center px-2 py-4' : 'px-4 py-6'"
    >
        <!-- Header with image and text -->
        <div v-if="!obsMode" class="mx-auto mb-6 flex max-w-7xl flex-col gap-4 md:flex-row">
            <img class="w-full md:w-1/4 aspect-square object-cover rounded shadow" src="/logo.png" alt="logo" />
            <div class="md:w-3/4 bg-eerie-black p-4 rounded shadow text-sm leading-relaxed text-gray-200">
                <p>
                    Hier kannst du ein Glücksrad drehen und per Zufall aus deinen eigenen Begriffen wählen lassen – praktisch für Streams, Gewinnspiele, wer als Nächstes dran ist oder einfach, wenn niemand entscheiden will. Trage deine Einträge ein (kommagetrennt), wähle Farben und Dauer, und leg los.
                </p>
                <p class="mt-3">
                    Die Nutzung ist für dich dauerhaft kostenlos. Es gibt <strong>keine Werbung</strong> auf dieser Seite – ich trage die Kosten selbst und finanziere das Projekt aus eigener Tasche.
                </p>
                <p class="mt-3">
                    Wenn du dich mit dem Angebot verbunden fühlst und mich dennoch unterstützen möchtest, kannst du das freiwillig über die folgenden Kanäle tun:
                    <a
                        href="https://paypal.me/blackeye1987"
                        class="font-medium text-moonstone underline decoration-moonstone/50 underline-offset-2 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        >PayPal</a
                    >,
                    <a
                        href="https://ko-fi.com/blackeye1987"
                        class="font-medium text-moonstone underline decoration-moonstone/50 underline-offset-2 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Ko-fi</a
                    >
                    oder
                    <a
                        href="https://www.patreon.com/blackeye1987"
                        class="font-medium text-moonstone underline decoration-moonstone/50 underline-offset-2 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Patreon</a
                    >. Das ist keine Verpflichtung – ein einfaches Danke reicht mir auch. Vielen Dank fürs Vorbeischauen.
                </p>
            </div>
        </div>

        <!-- Main Content -->
        <div
            class="flex w-full"
            :class="obsMode ? 'max-w-none flex-1 flex-col items-center justify-center' : 'mx-auto max-w-7xl flex-col gap-8 lg:flex-row'"
        >
            <!-- Roulette Canvas + Result -->
            <div class="flex flex-col items-center" :class="obsMode ? 'w-full max-w-[min(100%,600px)]' : 'flex-1'">
                <div
                    class="relative mx-auto w-full max-w-[min(100%,600px)] aspect-square shadow-2xl rounded-full ring-4 ring-moonstone/30 ring-offset-4 ring-offset-night"
                >
                    <canvas
                        ref="canvas"
                        width="600"
                        height="600"
                        class="block h-full w-full rounded-full bg-eerie-black"
                    ></canvas>
                    <!-- Pointer: top of wheel = canvas angle -π/2 (must match POINTER_RAD in script) -->
                    <div
                        class="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1"
                        aria-hidden="true"
                    >
                        <div
                            class="h-0 w-0 border-x-[14px] border-x-transparent border-b-[26px] border-b-red-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                        ></div>
                    </div>
                    <!-- Winner overlay on the wheel -->
                    <div
                        v-if="winner"
                        class="absolute inset-0 z-30 flex items-center justify-center rounded-full bg-night/70 px-4 backdrop-blur-[2px]"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="winner-heading"
                    >
                        <div
                            class="pointer-events-auto relative max-w-[min(90%,280px)] rounded-xl border border-white/15 bg-eerie-black/95 p-5 text-center shadow-xl"
                        >
                            <button
                                type="button"
                                @click="closeWinnerModal"
                                class="absolute right-3 top-3 rounded p-1 text-dim-gray hover:bg-white/10 hover:text-white"
                                aria-label="Schließen"
                            >
                                ✕
                            </button>
                            <p id="winner-heading" class="text-[10px] font-semibold uppercase tracking-[0.2em] text-moonstone">
                                Gewinner
                            </p>
                            <p class="mt-2 break-words text-xl font-bold text-white">🎉 {{ winner }} 🎉</p>
                            <button
                                type="button"
                                @click="closeWinnerModal"
                                class="mt-4 w-full rounded-lg bg-twitch-purple py-2 text-sm font-semibold text-white hover:bg-violet-600"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="!obsMode" class="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <button
                        type="button"
                        :disabled="spinning || segments.length === 0"
                        @click="spinWheel"
                        class="px-8 py-3 rounded-lg font-bold text-white shadow-lg transition enabled:bg-twitch-purple enabled:hover:bg-violet-600 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {{ spinning ? 'Dreht …' : 'Starte das Roulette' }}
                    </button>
                    <div class="relative">
                        <button
                            type="button"
                            @click="shareOpen = !shareOpen"
                            class="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-eerie-black text-white hover:border-moonstone/50 hover:bg-white/5"
                            :aria-expanded="shareOpen"
                            aria-controls="share-panel"
                            title="Link teilen"
                        >
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                            </svg>
                        </button>
                        <div
                            v-show="shareOpen"
                            id="share-panel"
                            class="absolute left-1/2 top-full z-40 mt-2 w-[min(100vw-2rem,22rem)] -translate-x-1/2 rounded-lg border border-white/15 bg-eerie-black p-3 shadow-xl"
                        >
                            <p class="mb-2 text-xs text-dim-gray">Link mit aktuellen Einstellungen</p>
                            <label class="mb-2 flex cursor-pointer items-center gap-2 text-sm">
                                <input v-model="shareIncludeAutostart" type="checkbox" class="rounded border-gray-500" />
                                Autostart
                            </label>
                            <label class="mb-2 flex cursor-pointer items-center gap-2 text-sm">
                                <input v-model="shareIncludeObs" type="checkbox" class="rounded border-gray-500" />
                                OBS
                            </label>
                            <div class="flex gap-2">
                                <input
                                    :value="shareUrlDisplay"
                                    readonly
                                    class="min-w-0 flex-1 rounded border border-gray-600 bg-night px-2 py-1.5 text-xs text-white"
                                    @focus="($event) => $event.target.select()"
                                />
                                <button
                                    type="button"
                                    class="shrink-0 rounded bg-twitch-purple px-3 py-1.5 text-xs font-semibold hover:bg-violet-600"
                                    @click="copyShareLink"
                                >
                                    {{ shareCopied ? 'Kopiert' : 'Kopieren' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Configuration Panel -->
            <div v-if="!obsMode" class="flex flex-col gap-4 lg:w-1/3">
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
                <div class="flex flex-col gap-2 rounded border border-white/10 bg-night/50 p-3 text-sm">
                    <span class="text-xs font-semibold uppercase tracking-wide text-dim-gray">Sound</span>
                    <label class="flex cursor-pointer items-center gap-2">
                        <input type="checkbox" v-model="soundTickEnabled" />
                        Roulette-Klacken beim Drehen
                    </label>
                    <label class="flex cursor-pointer items-center gap-2">
                        <input type="checkbox" v-model="soundVictoryEnabled" />
                        Siegton bei Gewinner
                    </label>
                </div>
                <div>
                    <p class="mb-3 text-sm text-white">Farbschema auswählen</p>
                    <div class="flex flex-col gap-4">
                        <div v-for="(group, groupIndex) in colorSchemeGroups" :key="group.title">
                            <h3 class="mb-2 text-[11px] font-semibold uppercase tracking-wider text-dim-gray">
                                {{ group.title }}
                            </h3>
                            <div class="grid grid-cols-2 gap-3">
                                <label
                                    v-for="(scheme, schemeIndex) in group.schemes"
                                    :key="`${group.title}-${schemeIndex}`"
                                    class="flex min-w-0 cursor-pointer items-center gap-2 rounded-md border border-transparent p-1.5 hover:border-white/10 has-[:checked]:border-moonstone/50 has-[:checked]:bg-white/5"
                                >
                                    <input
                                        type="radio"
                                        class="sr-only"
                                        :value="presetGlobalIndex(groupIndex, schemeIndex)"
                                        v-model="selectedColorPreset"
                                        @change="drawWheel"
                                    />
                                    <div class="flex flex-nowrap gap-0.5">
                                        <div
                                            v-for="(c, ci) in scheme.colors"
                                            :key="`${c}-${ci}`"
                                            :style="{ backgroundColor: c }"
                                            class="h-4 w-4 shrink-0 rounded-sm ring-1 ring-black/20"
                                        ></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from 'vue';

const route = useRoute();

const obsMode = computed(() => {
    const o = route.query.obs;
    return o === '1' || o === 'true' || o === 'yes';
});

/**
 * URL-Parameter (steuern die Seite beim Laden):
 * - entries | e — Einträge, kommagetrennt (URL-kodiert)
 * - duration | d — Drehdauer in Sekunden (1–300)
 * - remove — 1/true: Gewinner entfernen
 * - preset | color — Farbschema-Index (0 … Anzahl−1)
 * - tick — 0/false/off: Klacken aus; 1/true: an
 * - victory | win — 0/false/off: Siegton aus; 1/true: an
 * - autostart — 1/true: Rad startet automatisch nach 1&nbsp;s (z. B. OBS; Ton ggf. ohne Nutzerinteraktion nicht möglich)
 * - obs — 1/true: nur Glücksrad + Gewinner-Overlay (kein Text, keine Seitenleiste, kein Footer)
 */

/** Canvas convention: 0 rad = 3 o'clock, angles increase clockwise. Top of wheel = this value. */
const POINTER_RAD = -Math.PI / 2;
const TWO_PI = 2 * Math.PI;

function posMod(n, m) {
    return ((n % m) + m) % m;
}

/** 0–1; helle Pastells — dunkle Schrift auf dem Segment. */
function relativeLuminance(hex) {
    const h = hex.replace('#', '');
    if (h.length !== 6) return 0;
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const inputText = ref('Pizza,Burger,Pasta,Sushi');
const segments = ref([]);
const spinDuration = ref(10);
const removeWinnerAfterSpin = ref(false);
const winner = ref(null);
const soundTickEnabled = ref(true);
const soundVictoryEnabled = ref(true);

const shareOpen = ref(false);
const shareIncludeAutostart = ref(false);
const shareIncludeObs = ref(false);
const shareCopied = ref(false);
let shareCopyResetId = 0;

let audioCtx = null;
function getAudioContext() {
    if (import.meta.server) return null;
    if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        audioCtx = new AC();
    }
    return audioCtx;
}

function playRouletteTick() {
    if (!soundTickEnabled.value || import.meta.server) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1350, t);
    osc.frequency.exponentialRampToValueAtTime(380, t + 0.045);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
}

function playVictorySound() {
    if (!soundVictoryEnabled.value || import.meta.server) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    const t0 = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = t0 + i * 0.11;
        g.gain.setValueAtTime(0.0001, start);
        g.gain.exponentialRampToValueAtTime(0.14, start + 0.025);
        g.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.45);
    });
}

/** Farbgruppen à 4 Schemas (2×2). Pastel unter Bunt, Dark unter Zweifarbig. */
const colorSchemeGroups = [
    {
        title: 'Bunt',
        schemes: [
            {colors: ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22']},
            {colors: ['#1abc9c', '#e67e22', '#34495e', '#ff6f61', '#8e44ad', '#f39c12']},
            {colors: ['#2c3e50', '#16a085', '#f39c12', '#c0392b', '#7f8c8d', '#2980b9']},
            {colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#AA96DA', '#FCBAD3']}
        ]
    },
    {
        title: 'Pastel',
        schemes: [
            {colors: ['#F5E6D8', '#EDD5C4', '#E4C4B0', '#D9B49A', '#CEA88A', '#E8DDD0']},
            {colors: ['#E3EDE3', '#D2E4D4', '#C0D9C4', '#ADC8B2', '#9BB8A4', '#F0F7F1']},
            {colors: ['#F3E4E8', '#E8D0DA', '#DDBCC8', '#D0A8B8', '#C498A8', '#EFE2E6']},
            {colors: ['#E8E4F2', '#DDD6EA', '#D0C8E0', '#C4BAD6', '#D8D2EC', '#F0ECFA']}
        ]
    },
    {
        title: 'Monochrom',
        schemes: [
            {colors: ['#0d47a1', '#1565c0', '#1976d2', '#1e88e5', '#42a5f5', '#64b5f6', '#90caf9']},
            {colors: ['#311b92', '#4527a0', '#512da8', '#5e35b1', '#673ab7', '#7e57c2', '#9575cd']},
            {colors: ['#1b5e20', '#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a', '#81c784']},
            {colors: ['#bf360c', '#d84315', '#e64a19', '#f4511e', '#ff5722', '#ff7043', '#ff8a65']}
        ]
    },
    {
        title: 'Farbenblindfreundlich',
        schemes: [
            {
                colors: [
                    '#E69F00',
                    '#56B4E9',
                    '#009E73',
                    '#F0E442',
                    '#0072B2',
                    '#D55E00',
                    '#CC79A7'
                ]
            },
            {
                colors: [
                    '#332288',
                    '#117733',
                    '#44AA99',
                    '#882255',
                    '#DDCC77',
                    '#AA4499',
                    '#661100'
                ]
            },
            {
                colors: [
                    '#648FFF',
                    '#785EF0',
                    '#DC267F',
                    '#FE6100',
                    '#FFB000',
                    '#009F4D',
                    '#3B1F2B'
                ]
            },
            {
                colors: [
                    '#88CCEE',
                    '#CC6677',
                    '#DDCC77',
                    '#117733',
                    '#332288',
                    '#AA4499',
                    '#44AA99'
                ]
            }
        ]
    },
    {
        title: 'Zweifarbig',
        schemes: [
            {colors: ['#0a0a0a', '#ffffff']},
            {colors: ['#d32f2f', '#0a0a0a']},
            {colors: ['#39ff14', '#0a0a0a']},
            {colors: ['#1e88e5', '#0a0a0a']}
        ]
    },
    {
        title: 'Dark',
        schemes: [
            {colors: ['#0a0a0a', '#1a0a0f', '#2d0a14', '#4a1022', '#5c1830', '#3d1420']},
            {colors: ['#08060c', '#120a18', '#1c0f28', '#2a1840', '#3a2060', '#241838']},
            {colors: ['#0c0c0e', '#16161c', '#22222a', '#2e2e3a', '#3a3a48', '#1e1e26']},
            {colors: ['#0a0408', '#140810', '#1e1018', '#2a1824', '#3a2030', '#22141c']}
        ]
    }
];

const allColorPresets = colorSchemeGroups.flatMap((g) => g.schemes.map((s) => s.colors));

function presetGlobalIndex(groupIndex, schemeIndex) {
    let idx = 0;
    for (let i = 0; i < groupIndex; i++) {
        idx += colorSchemeGroups[i].schemes.length;
    }
    return idx + schemeIndex;
}

const selectedColorPreset = ref(0);

function buildShareUrl(includeAutostart, includeObs) {
    if (import.meta.server) return '';
    const params = new URLSearchParams();
    const ent = inputText.value.trim();
    if (ent) params.set('entries', ent);
    if (spinDuration.value !== 10) params.set('duration', String(spinDuration.value));
    if (removeWinnerAfterSpin.value) params.set('remove', '1');
    if (selectedColorPreset.value !== 0) params.set('preset', String(selectedColorPreset.value));
    if (!soundTickEnabled.value) params.set('tick', '0');
    if (!soundVictoryEnabled.value) params.set('victory', '0');
    if (includeAutostart) params.set('autostart', '1');
    if (includeObs) params.set('obs', '1');
    const qs = params.toString();
    const path = route.path || '/';
    return `${window.location.origin}${path}${qs ? `?${qs}` : ''}`;
}

const shareUrlDisplay = computed(() => buildShareUrl(shareIncludeAutostart.value, shareIncludeObs.value));

async function copyShareLink() {
    const url = buildShareUrl(shareIncludeAutostart.value, shareIncludeObs.value);
    try {
        await navigator.clipboard?.writeText(url);
        shareCopied.value = true;
        clearTimeout(shareCopyResetId);
        shareCopyResetId = window.setTimeout(() => {
            shareCopied.value = false;
        }, 2000);
    } catch {
        shareCopied.value = false;
    }
}

const canvas = ref(null);
let angle = 0;
let spinning = false;
let spinRafId = 0;

const updateSegments = () => {
    segments.value = inputText.value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    drawWheel();
};

function applyQueryFromRoute() {
    const q = route.query;

    if (typeof q.entries === 'string' && q.entries.length > 0) {
        inputText.value = q.entries;
    } else if (typeof q.e === 'string' && q.e.length > 0) {
        inputText.value = q.e;
    }

    const d = Number(q.duration ?? q.d);
    if (!Number.isNaN(d) && d >= 1 && d <= 300) {
        spinDuration.value = Math.floor(d);
    }

    const r = q.remove;
    if (r === '1' || r === 'true' || r === 'yes') removeWinnerAfterSpin.value = true;
    else if (r === '0' || r === 'false' || r === 'no') removeWinnerAfterSpin.value = false;

    const p = Number(q.preset ?? q.color);
    if (!Number.isNaN(p) && p >= 0) {
        selectedColorPreset.value = Math.min(allColorPresets.length - 1, Math.floor(p));
    }

    const tick = q.tick;
    if (tick === '0' || tick === 'false' || tick === 'off' || tick === 'no') soundTickEnabled.value = false;
    else if (tick === '1' || tick === 'true' || tick === 'yes' || tick === 'on') soundTickEnabled.value = true;

    const w = q.victory ?? q.win;
    if (w === '0' || w === 'false' || w === 'off' || w === 'no') soundVictoryEnabled.value = false;
    else if (w === '1' || w === 'true' || w === 'yes' || w === 'on') soundVictoryEnabled.value = true;

    updateSegments();
}

const drawWheel = () => {
    if (!canvas.value || segments.value.length === 0) return;
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;

    const size = canvas.value.width;
    const center = size / 2;
    const radius = center - 4;
    const arc = TWO_PI / segments.value.length;
    const preset = allColorPresets[selectedColorPreset.value];

    ctx.clearRect(0, 0, size, size);

    const fontSize = Math.max(14, Math.min(32, Math.floor((radius * 0.9) / Math.max(segments.value.length, 3))));

    segments.value.forEach((label, i) => {
        const angleStart = i * arc + angle;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, angleStart, angleStart + arc);
        ctx.closePath();
        const segHex = preset[i % preset.length];
        ctx.fillStyle = segHex;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const lightSegment = relativeLuminance(segHex) > 0.55;

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(angleStart + arc / 2);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = lightSegment ? '#1c1e1e' : '#fff';
        ctx.strokeStyle = lightSegment ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.85)';
        ctx.lineWidth = Math.max(2, Math.round(fontSize / 14));
        ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
        const labelMax = radius - 18;
        let text = label;
        while (ctx.measureText(text).width > labelMax && text.length > 1) {
            text = text.slice(0, -1);
        }
        const display = text !== label ? `${text}…` : text;
        ctx.strokeText(display, radius - 14, 0);
        ctx.fillText(display, radius - 14, 0);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(center, center, Math.max(12, radius * 0.08), 0, TWO_PI);
    ctx.fillStyle = '#1c1e1e';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
};

const spinWheel = () => {
    if (spinning || segments.value.length === 0) return;
    spinning = true;
    winner.value = null;

    void getAudioContext()?.resume();

    const startAngle = angle;
    const minSpins = 5;
    const extraTurns = minSpins * TWO_PI;
    const randomTurn = Math.random() * TWO_PI;
    const endAngle = startAngle + extraTurns + randomTurn;

    const start = performance.now();
    const duration = Math.max(300, spinDuration.value * 1000);

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const n = segments.value.length;
    const arc = TWO_PI / n;
    let lastPocket = null;

    const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        angle = startAngle + (endAngle - startAngle) * eased;

        const pocket = Math.floor(posMod(POINTER_RAD - angle, TWO_PI) / arc);
        if (lastPocket !== null && pocket !== lastPocket) {
            playRouletteTick();
        }
        lastPocket = pocket;

        drawWheel();
        if (progress < 1) {
            spinRafId = requestAnimationFrame(animate);
        } else {
            angle = endAngle;
            drawWheel();
            finalizeSpin();
        }
    };

    spinRafId = requestAnimationFrame(animate);
};

const finalizeSpin = () => {
    const n = segments.value.length;
    const arc = TWO_PI / n;
    const rel = posMod(POINTER_RAD - angle, TWO_PI);
    let index = Math.floor(rel / arc);
    if (index >= n) index = n - 1;
    if (index < 0) index = 0;
    winner.value = segments.value[index];
    spinning = false;
    playVictorySound();
};

const closeWinnerModal = () => {
    if (removeWinnerAfterSpin.value && winner.value) {
        segments.value = segments.value.filter(s => s !== winner.value);
        inputText.value = segments.value.join(', ');
        drawWheel();
    }
    winner.value = null;
};

let autostartTimeoutId = 0;
let audioResumeBump = null;

function wantsAutostartFromQuery() {
    const a = route.query.autostart;
    return a === '1' || a === 'true' || a === 'yes';
}

/** Nach 1&nbsp;s automatisch drehen — ohne Tippen (z. B. Browser-Quelle in OBS). */
function scheduleAutostartFromQuery() {
    if (import.meta.server) return;
    if (!wantsAutostartFromQuery()) return;

    clearTimeout(autostartTimeoutId);
    autostartTimeoutId = window.setTimeout(() => {
        autostartTimeoutId = 0;
        void getAudioContext()?.resume();
        spinWheel();
    }, 1000);
}

applyQueryFromRoute();

onMounted(() => {
    audioResumeBump = () => {
        void getAudioContext()?.resume();
    };
    window.addEventListener('pointerdown', audioResumeBump, {capture: true, passive: true});
    window.addEventListener('touchstart', audioResumeBump, {capture: true, passive: true});

    nextTick(() => drawWheel());
    scheduleAutostartFromQuery();
});

watch(
    () => route.query,
    () => {
        applyQueryFromRoute();
        nextTick(() => drawWheel());
    },
    {deep: true}
);

onUnmounted(() => {
    if (spinRafId) cancelAnimationFrame(spinRafId);
    clearTimeout(autostartTimeoutId);
    clearTimeout(shareCopyResetId);
    if (audioResumeBump) {
        window.removeEventListener('pointerdown', audioResumeBump, true);
        window.removeEventListener('touchstart', audioResumeBump, true);
        audioResumeBump = null;
    }
    if (audioCtx) {
        void audioCtx.close();
        audioCtx = null;
    }
});
</script>
