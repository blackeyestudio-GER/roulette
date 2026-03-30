<template>
    <div class="mx-auto max-w-2xl px-4 py-8 text-gray-300">
        <h1 class="mb-8 text-2xl font-bold tracking-wide text-moonstone">Impressum</h1>
        <div class="legal-content space-y-8 text-sm leading-relaxed">
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">
                    Angaben gemäß § 5 Telemediengesetz (TMG)
                </h2>
                <p>
                    {{ legal.name }}<br />
                    {{ c.address.street }}<br />
                    {{ c.address.zip }} {{ c.address.city }}
                </p>
                <p class="mt-2 text-xs italic text-dim-gray">Präsentation unter dem Namen {{ company }}</p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">Kontakt</h2>
                <p>
                    Telefon: {{ c.phone }}<br />
                    E-Mail:
                    <a :href="`mailto:${c.email}`" class="text-moonstone underline decoration-moonstone/40 underline-offset-2 hover:text-white">{{ c.email }}</a>
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p>{{ legal.name }}, {{ c.address.street }}, {{ c.address.zip }} {{ c.address.city }}</p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">Haftung für Inhalte</h2>
                <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                    Tätigkeit hinweisen.
                </p>
                <p>
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben unberührt. Eine diesbezügliche Haftung ist jedoch erst ab
                    dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">Haftung für Links</h2>
                <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
                    übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
                    Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
                    verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
                    entfernen.
                </p>
            </section>
            <section>
                <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-dim-gray">Urheberrecht</h2>
                <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                    Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
                    privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
                    Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                    Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
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

const {legal, company} = siteConfig;
const c = siteConfig.contact;

useHead({
    title: 'Impressum',
});
</script>
