import Image from "next/image";
import { Us, Es, No } from "react-flags-select";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <h2 className={styles.heading}>
        <span className={styles.accent}>About</span>
      </h2>

      <div className={styles.grid}>

        {/* Bio — 4 cols */}
        <div className={`${styles.tile} ${styles.tileBio}`}>
          <p className={styles.bioPara}>
            Born in the mountains of Patagonia, Argentina. Now at home in the
            Colorado Rockies.
          </p>
          <p className={styles.bioPara}>
            Fullstack developer with a love for front-end craft — building
            things that feel good to use, not just things that work.
          </p>
          <p className={styles.bioPara}>
            Volunteer. Swimmer. Hiker. Perpetually curious about the world.
          </p>
        </div>

        {/* USAW Coaching — 2 cols */}
        <div className={`${styles.tile} ${styles.tileUsaw}`}>
          <Image
            src="/usaw-logo-shield.png"
            alt="USA Weightlifting"
            width={72}
            height={56}
            className={styles.usawLogo}
          />
          <span className={styles.tileLabel}>USAW Certified Coach</span>
          <span className={styles.stat}>19</span>
          <p className={styles.tileText}>
            Years coaching recreational and competitive lifters — including
            athletes on the Norwegian national weightlifting team.
          </p>
        </div>

        {/* Norway — 3 cols */}
        <div className={`${styles.tile} ${styles.tileNorway} ${styles.photoTile}`}>
          <Image
            src="/nordsetter-2026.webp"
            alt="Nordsetter, Norway"
            fill
            className={styles.photo}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className={styles.photoOverlay}>
            <No className={styles.flag} />
            <span className={styles.tileLabelLight}>Norway</span>
            <p className={styles.tileTextLight}>
              Home away from home — the country, the people, the language, and its sports.
            </p>
          </div>
        </div>

        {/* Languages — 3 cols */}
        <div className={`${styles.tile} ${styles.tileLanguages}`}>
          <span className={styles.tileLabel}>Languages</span>
          <div className={styles.langList}>
            <div className={styles.langRow}>
              <Us className={styles.flag} />
              <div>
                <p className={styles.langName}>English</p>
                <p className={styles.langLevel}>Fluent</p>
              </div>
            </div>
            <div className={styles.langRow}>
              <Es className={styles.flag} />
              <div>
                <p className={styles.langName}>Español</p>
                <p className={styles.langLevel}>Native</p>
              </div>
            </div>
            <div className={styles.langRow}>
              <No className={styles.flag} />
              <div>
                <p className={styles.langName}>Norsk Bokmål</p>
                <p className={styles.langLevel}>Intermediate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nico in the Colorado mountains — 2 cols */}
        <div className={`${styles.tile} ${styles.tileExtra} ${styles.photoTile}`}>
          <Image
            src="/nico-ski-shop.webp"
            alt="Nico at the ski shop"
            fill
            className={styles.photoTop}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>

        {/* Nordic Skiing — 2 cols, action photo */}
        <div className={`${styles.tile} ${styles.tileSkiPhoto} ${styles.photoTile}`}>
          <Image
            src="/langrenn-klassisk-granåsen.png"
            alt="Classic cross-country skiing"
            fill
            className={styles.photo}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className={styles.photoOverlay}>
            <span className={styles.tileLabelLight}>Nordic Skiing</span>
            <p className={styles.tileTextLight}>
              Classic technique · Granåsen, Norway
            </p>
          </div>
        </div>

        {/* Winter Park, CO — 2 cols, hiking photo */}
        <div className={`${styles.tile} ${styles.tileNordic} ${styles.photoTile}`}>
          <Image
            src="/co-hike.webp"
            alt="Colorado mountain hike"
            fill
            className={styles.photo}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className={styles.photoOverlay}>
            <span className={styles.tileLabelLight}>Winter Park, CO</span>
            <p className={styles.tileTextLight}>Continental Divide 12,000 ft · Mountain Time</p>
          </div>
        </div>

        {/* Availability — 2 cols */}
        <div className={`${styles.tile} ${styles.tileLocation}`}>
          <span className={styles.tileLabel}>Open to Opportunities</span>
          <p className={styles.tileText}>
            Seeking fullstack roles in the <strong>USA</strong> or <strong>Norway</strong> — hybrid, remote, or onsite.
          </p>
        </div>

      </div>
    </section>
  );
}
