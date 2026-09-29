import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { hero } from "@/content/site";

/**
 * Stutensee Hero — eigenes Layout (kein Baka-Rail/CJK).
 * Text immer explizit hell auf starkem Scrim, nie über semantic inverse.
 */
export function Hero() {
  return (
    <section className="relative isolate min-h-[min(92dvh,52rem)] w-full overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover object-[center_28%] sm:object-center"
          sizes="100vw"
        />
        {/* Full-frame darken so type never sits on bright photo */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,7,7,0.72) 0%, rgba(7,7,7,0.55) 42%, rgba(7,7,7,0.88) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,7,7,0.92) 0%, rgba(7,7,7,0.75) 38%, rgba(7,7,7,0.35) 70%, rgba(7,7,7,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(92dvh,52rem)] w-full max-w-shell flex-col justify-end px-5 pb-14 pt-28 sm:px-8 sm:pb-16 lg:justify-center lg:px-12 lg:pb-20 xl:px-14">
        <div className="max-w-[38rem]">
          <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-yellow-500">
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.1rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-balance text-white">
            {hero.headline.map((line, i) => (
              <span key={line} className="block">
                {i === hero.accentLineIndex ? (
                  <span className="text-yellow-400">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <span
            aria-hidden
            className="mt-6 block h-1 w-12 bg-yellow-500"
          />

          {hero.body.map((p) => (
            <p
              key={p}
              className="mt-6 max-w-lg text-[1.0625rem] leading-[1.65] text-pretty text-white/90 sm:text-lead"
            >
              {p}
            </p>
          ))}

          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <ButtonLink
              href={hero.primaryCta.href}
              variant="primary"
              className="w-full min-[420px]:w-auto"
            >
              {hero.primaryCta.label}
              <span aria-hidden>→</span>
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              className="w-full border border-white/55 bg-transparent text-white hover:border-yellow-400 hover:bg-white/5 hover:text-yellow-400 min-[420px]:w-auto"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
