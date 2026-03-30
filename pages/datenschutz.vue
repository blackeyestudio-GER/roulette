<template>
    <div class="mx-auto max-w-2xl px-4 py-8 text-gray-300">
        <h1 class="mb-8 text-2xl font-bold tracking-wide text-moonstone">Datenschutzerklärung</h1>
        <div class="legal-content space-y-8 text-sm leading-relaxed">
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">1. Verantwortlicher</h2>
                <p>Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist:</p>
                <p>
                    {{ legal.name }}<br />
                    {{ c.address.street }}<br />
                    {{ c.address.zip }} {{ c.address.city }}<br />
                    Telefon: {{ c.phone }}<br />
                    E-Mail:
                    <a :href="`mailto:${c.email}`" class="text-moonstone underline decoration-moonstone/40 underline-offset-2 hover:text-white">{{ c.email }}</a>
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">2. Art des Angebots und Speicherung durch uns</h2>
                <p>
                    Dieses Angebot ist ein Roulette-Tool, das überwiegend <strong>in Ihrem Browser</strong> ausgeführt wird. Die von Ihnen eingegebenen Begriffe und Einstellungen werden
                    <strong>von uns nicht auf Servern gespeichert</strong> und nicht in einer Datenbank abgelegt. Sie verbleiben lokal in Ihrem Endgerät (z. B. im Speicher des Browsers), bis Sie die
                    Seite verlassen oder den Inhalt ändern. Über geteilte Links können Einstellungen ausschließlich in der URL kodiert sein; auch dabei erfolgt keine serverseitige Speicherung durch uns.
                </p>
                <p>
                    Es gibt auf dieser Seite <strong>kein Kontaktformular</strong> und <strong>keinen Newsletter</strong>. Wir setzen <strong>keine Analyse- oder Tracking-Tools</strong> ein, die wir
                    steuern würden.
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">3. Hosting und Server-Logfiles</h2>
                <p>
                    Die Website wird über einen <strong>Hosting-Anbieter</strong> bereitgestellt. Beim Aufruf können dabei technisch bedingt <strong>Zugriffsdaten</strong> verarbeitet werden (z. B.
                    IP-Adresse, Zeitpunkt des Abrufs, angefragte Ressource). Umfang und Zweck richten sich nach den Angaben des jeweiligen Hosters. <strong>Wir haben keinen Zugriff auf diese Logfiles</strong>
                    und speichern sie nicht selbst.
                </p>
                <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren und stabilen Bereitstellung der Website).
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">4. Werbung</h2>
                <p>
                    Auf dieser Website werden <strong>keine Werbeanzeigen</strong> eingebunden. Es kommen <strong>keine werblichen Drittanbieter-Tools</strong> (z. B. Werbenetzwerke oder zielgerichtetes
                    Marketing) zum Einsatz, die wir steuern würden.
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">5. Kontaktaufnahme per E-Mail</h2>
                <p>
                    Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben (z. B. E-Mail-Adresse, Inhalt der Nachricht) zur Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
                    DSGVO (Vertragsanbahnung bzw. Anbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung).
                </p>
                <p>Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">6. Ihre Rechte</h2>
                <p>Sie haben gegenüber uns folgende Rechte hinsichtlich personenbezogener Daten, soweit diese bei uns verarbeitet werden:</p>
                <ul class="ml-5 list-disc space-y-1">
                    <li><strong>Auskunft</strong> (Art. 15 DSGVO)</li>
                    <li><strong>Berichtigung</strong> (Art. 16 DSGVO)</li>
                    <li><strong>Löschung</strong> (Art. 17 DSGVO)</li>
                    <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                    <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                    <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO), soweit eine Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht</li>
                </ul>
                <p class="mt-3">
                    Sie haben das Recht, sich bei einer <strong>Datenschutz-Aufsichtsbehörde</strong> zu beschweren. Für Nordrhein-Westfalen: Landesbeauftragte für Datenschutz und Informationsfreiheit
                    NRW, Kavalleriestr. 2–4, 40213 Düsseldorf,
                    <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" class="text-moonstone underline decoration-moonstone/40 underline-offset-2 hover:text-white">www.ldi.nrw.de</a>
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">7. Widerspruch gegen Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO</h2>
                <p>
                    Sofern wir Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO verarbeiten, haben Sie nach Art. 21 DSGVO das Recht, Widerspruch einzulegen, soweit sich
                    Gründe aus Ihrer besonderen Situation ergeben.
                </p>
            </section>
        </div>
        <p class="mt-10">
            <NuxtLink to="/" class="text-moonstone underline decoration-moonstone/40 underline-offset-2 hover:text-white">Zurück zum Roulette</NuxtLink>
        </p>
    </div>
</template>

<script setup>
import {siteConfig} from '~/config/site';

const {legal} = siteConfig;
const c = siteConfig.contact;

useHead({
    title: 'Datenschutz',
});
</script>
