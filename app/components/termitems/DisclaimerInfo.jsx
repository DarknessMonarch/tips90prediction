import styles from "@/app/styles/about.module.css";

export default function Disclaimer() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutWrapper}>
        <div className={styles.aboutContainerInner}>
          <h1>Disclaimer</h1>

          <h2>General Information</h2>
          <p>
            The information provided by Tips90Prediction is for entertainment and informational purposes only. 
            While we strive for accuracy, all predictions and tips are based on analysis and personal opinion.
          </p>

          <h2>No Guaranteed Outcomes</h2>
          <p>
            Sports events are subject to numerous variables and unforeseen circumstances. 
            Despite our thorough analysis and high success rate, no prediction service can guarantee results with absolute certainty.
          </p>

          <h2>Financial Risk</h2>
          <p>
            Any decisions made based on our predictions are done at your own risk. Tips90Prediction is not responsible 
            for any financial losses incurred from following our tips or predictions.
          </p>

          <h2>Legal Compliance</h2>
          <p>
            Users are responsible for ensuring that their use of our prediction services complies with all applicable laws 
            in their jurisdiction. Online betting and gambling may be restricted or prohibited in certain regions.
          </p>

          <h2>Content Accuracy</h2>
          <p>
            While we make every effort to provide accurate information, we cannot guarantee that all content 
            is error-free or current at all times. Tips90Prediction reserves the right to modify content without notice.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our platform may contain links to external websites or betting services. We are not responsible for 
            the content or practices of these third-party sites.
          </p>

          <h2>Age Restriction</h2>
          <p>
            Tips90Prediction services are strictly for individuals of legal betting age in their jurisdiction. 
            By using our services, you confirm that you meet the minimum age requirement.
          </p>
        </div>

        <div className={styles.aboutContainerInner}>
          <h1>VIP Subscription</h1>
          
          <h2>Premium Prediction Service</h2>
          <p>
            Our VIP subscription offers exclusive access to our highest-quality predictions with a remarkable 
            95% winning rate based on our historical performance.
          </p>

          <h2>What You Get</h2>
          <p><strong>Verified Winners:</strong> Access to thoroughly researched premium tips with our highest confidence rating.</p>
          <p><strong>Advanced Analysis:</strong> Detailed statistical breakdowns and insider insights not available to regular users.</p>
          <p><strong>Priority Picks:</strong> Receive our most confident selections with 95% historical success rate.</p>
          <p><strong>Early Access:</strong> Get predictions hours before regular users.</p>
          <p><strong>VIP Support:</strong> Direct access to our prediction experts for questions and guidance.</p>

          <h2>Success Rate</h2>
          <p>
            Our VIP predictions have maintained a 95% success rate over time. This exceptional performance 
            is achieved through comprehensive analysis, expert insights, and our proprietary prediction algorithms.
          </p>

          <h2>Subscription Details</h2>
          <p>
            VIP memberships are available in daily, weekly, monthly, and annual packages. All subscriptions 
            are automatically renewed unless canceled before the billing cycle ends.
          </p>

          <h2>Responsible Use</h2>
          <p>
            While our 95% success rate reflects our commitment to quality, we encourage responsible betting practices. 
            Never wager more than you can afford to lose, regardless of prediction confidence.
          </p>
        </div>
      </div>
    </div>
  );
}