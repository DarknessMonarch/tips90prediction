"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/styles/about.module.css";

export default function About() {
  const router = useRouter();

  const openTips = (tip) => {
    router.push(tip, { scroll: false });
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContainerInner}>
        <h1>Welcome to Tips90predict – Your Premier Sports Prediction Hub</h1>
        <p>
          At Tips90predict, we pride ourselves on being the leading source for
          in-depth sports analysis and predictions. Our focus extends across
          various sports, including football, basketball, hockey, and tennis,
          providing you with data-driven insights designed to empower both
          investors and sports enthusiasts.
        </p>
      </div>
      <div className={styles.aboutContainerInner}>
        <h1>Why Choose Tips90predict?</h1>
        <p>
          Our dedicated team meticulously crafts well-researched predictions
          based on extensive statistical analysis and a deep understanding of
          the games. You can trust our expert insights to guide your betting
          strategies, as we aim to ensure you make informed decisions. Our
          predictions are integrated with major betting platforms like Unibet,
          Sportybet, William Hill, and Sportpesa, offering you reliable options
          to consider.
        </p>
      </div>
      <div className={styles.aboutContainerInner}>
        <h1>The Value of Using Prediction Websites</h1>
        <p>
          Utilizing Tips90predict is crucial for anyone looking to enhance their
          betting experience. We provide essential insights that save you time
          and effort, helping you quickly evaluate probabilities for various
          sporting events. Our team&apos;s expertise not only broadens your
          understanding but also equips you with tools and strategies to manage
          risks effectively. We cover a wide range of sports, and our
          educational resources will elevate your betting skills.
        </p>
        <p>
          Please remember that while we strive for accuracy, predictions cannot
          be guaranteed, and responsible gambling practices are vital.
        </p>
      </div>
      <div className={styles.aboutContainerInner}>
        <h1>Benefits of Using a Betting Prediction Platform</h1>
        <li>
          A reliable betting prediction platform significantly enhances your
          betting strategy by providing:
        </li>
          <li>
            Increased Success Probability: Our expert analysts leverage their
            knowledge and data to deliver accurate predictions.
          </li>
          <li>
            Time Savings: Save hours on research by accessing our pre-analyzed
            information.
          </li>
          <li>
            Access to Expertise: Benefit from a professional team with years of
            industry experience.
          </li>
      </div>
      <div className={styles.aboutContainerInner}>
        <h1>Placing Bets with Confidence</h1>
        <p>
          We advise against betting all your funds on a single slip. Instead,
          focus on 1 to 3 games per slip for better success rates. For premium
          selections, explore our VIP PLAN section to maximize your potential
          returns. Please remember that our services are strictly for
          individuals aged 18 and above, and we advocate for responsible betting
          practices. While we can&apos;t guarantee success due to unpredictable
          factors, our analysis maintains a remarkable success rate of over 98%.
        </p>
        <p>
          Let’s make betting exciting! Our VIP Tips are not just predictions;
          they’re treasures crafted from expert analysis. Join our VIP program
          to unlock exclusive insights and become part of a winning community.
          Embrace your journey to unmatched success with Tips90predict!
        </p>
      </div>
      <div className={styles.aboutContainerInner}>
        <h1>Explore Our Betting Tips</h1>
        <p>
          Discover our curated links for free football predictions tailored for
          major bets:
        </p>
        <ul>
        <li onClick={() => openTips("vip")}>VIP Tips</li>
        <li onClick={() => openTips("banker")}>Banker of the Day</li>
          <li onClick={() => openTips("winning")}>100% Winning Tips</li>
          <li onClick={() => openTips("straight")}>Straight Wins</li>
          <li onClick={() => openTips("basketball")}>Basketball Tips</li>
        </ul>
      </div>
    </div>
  );
}
