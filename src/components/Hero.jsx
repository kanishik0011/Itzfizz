"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { statistics } from "@/data/statistics";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];
const LETTER_SELECTOR = ".hero-headline__letter";
const STAT_SELECTOR = ".stat-card";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const root = heroRef.current;

    if (!root) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ctx = gsap.context(() => {
      const car = root.querySelector(".scroll-visual__car");
      const trail = root.querySelector(".scroll-visual__trail");
      const visual = root.querySelector(".scroll-visual");
      const headline = root.querySelector(".hero-headline");
      const letters = gsap.utils.toArray(LETTER_SELECTOR, root);
      const statCards = gsap.utils.toArray(STAT_SELECTOR, root);

      if (!car || !trail || !visual || !headline) {
        return;
      }

      if (reduceMotion.matches) {
        gsap.set([headline, car, statCards, letters], {
          clearProps: "all",
          opacity: 1
        });
        gsap.set(trail, { width: "62%" });
        return;
      }

      gsap.set(headline, { opacity: 0, y: 24 });
      gsap.set(letters, { opacity: 0.16 });
      gsap.set(statCards, { opacity: 0, y: 22 });
      gsap.set(car, { opacity: 0, x: 0, scale: 0.94 });
      gsap.set(trail, { width: 0 });

      let entranceComplete = false;
      const updateReveal = () => {
        const carBox = car.getBoundingClientRect();
        const carFront = carBox.left + carBox.width * 0.72;
        const visualBox = visual.getBoundingClientRect();

        gsap.set(trail, {
          width: Math.max(0, carFront - visualBox.left)
        });

        if (!entranceComplete) {
          return;
        }

        letters.forEach((letter) => {
          const letterBox = letter.getBoundingClientRect();
          const crossed = carFront >= letterBox.left + letterBox.width * 0.2;

          gsap.set(letter, {
            opacity: crossed ? 1 : 0.16
          });
        });
      };

      const scrollTimeline = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: updateReveal,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 1.35, 980)}`,
          scrub: 0.45,
          pin: ".hero-track",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: updateReveal
        }
      });

      scrollTimeline
        .to(
          car,
          {
            x: () => {
              const visualWidth = visual.clientWidth;
              const carWidth = car.offsetWidth;
              const edgePadding = gsap.utils.clamp(
                12,
                42,
                window.innerWidth * 0.018
              );

              return Math.max(0, visualWidth - carWidth - edgePadding);
            },
            duration: 1
          },
          0
        );

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            entranceComplete = true;
            updateReveal();
          }
        })
        .to(headline, { opacity: 1, y: 0, duration: 1 })
        .to(
          statCards,
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power2.out",
            stagger: 0.14
          },
          "-=0.34"
        )
        .fromTo(
          visual,
          { scaleY: 0.92 },
          { scaleY: 1, duration: 0.68 },
          "-=0.18"
        )
        .to(car, { opacity: 1, scale: 1, duration: 0.72 }, "-=0.54");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main className="hero-section" ref={heroRef}>
      <section className="hero-track" aria-labelledby="hero-title">
        <div className="hero-stage">
          <h1 className="hero-headline" aria-label="Welcome Itzfizz">
            {WORDS.map((word) => (
              <span className="hero-headline__word" aria-hidden="true" key={word}>
                {word.split("").map((letter, index) => (
                  <span
                    className="hero-headline__letter"
                    key={`${word}-${letter}-${index}`}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="scroll-visual" aria-hidden="true">
            <div className="scroll-visual__trail" />
            <div className="scroll-visual__lane-line scroll-visual__lane-line--top" />
            <div className="scroll-visual__lane-line scroll-visual__lane-line--bottom" />
            <div className="scroll-visual__car">
              <Image
                src={`${BASE_PATH}/assets/images/mclaren-top.png`}
                alt=""
                width={820}
                height={360}
                priority
                sizes="(max-width: 767px) 42vw, 220px"
              />
            </div>
          </div>

          <div className="hero-stats" aria-label="Performance statistics">
            {statistics.map((stat) => (
              <article
                className={`stat-card stat-card--${stat.tone} ${stat.className}`}
                key={stat.value}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <p className="sr-only" id="hero-title">
            Welcome Itzfizz scroll driven car animation with performance
            statistics.
          </p>
        </div>
      </section>
    </main>
  );
}
