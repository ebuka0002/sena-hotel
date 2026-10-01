import { Star } from "lucide-react";
import Reveal from "./Reveal";
import { hotelData } from "../data/hotelData";
import { directionsUrl } from "../lib/booking";

export default function Reviews() {
  const { score, outOf, countLabel } = hotelData.rating;
  const href = hotelData.googleReviewsUrl || directionsUrl();

  return (
    <section aria-labelledby="reviews-title" className="section bg-sand/60">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="reviews-title" className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">Guest Reviews</h2>
          <div className="mt-10 flex flex-col items-center">
            <p className="font-serif text-8xl leading-none sm:text-9xl">
              {score}
              <span className="text-4xl text-ink/50 sm:text-5xl"> / {outOf}</span>
            </p>
            <div className="mt-4 flex gap-1" role="img" aria-label={`Rated ${score} out of ${outOf}`}>
              {[1, 2, 3, 4, 5].map((n) => {
                const fill = Math.max(0, Math.min(1, score - (n - 1)));
                return (
                  <span key={n} className="relative inline-block">
                    <Star size={26} className="text-ink/20" aria-hidden />
                    <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                      <Star size={26} className="fill-gold-deep text-gold-deep" aria-hidden />
                    </span>
                  </span>
                );
              })}
            </div>
            <p className="mt-4 text-ink/75">Based on {countLabel}</p>
          </div>
          <a href={href} target="_blank" rel="noreferrer" className="btn btn-dark mt-9">Read More Reviews</a>
        </Reveal>
      </div>
    </section>
  );
}
