import Heading from "../components/layout/Heading";
import SEO from "../components/layout/SEO";
import SpotlightPreview from "../components/layout/SpotlightPreview";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Privacy Policy | DevUnity"
        description="Understand how DevUnity collects, uses, and protects your personal information."
        name="DevUnity"
        twitterCard="summary"
        ogType="article"
      />

      <SpotlightPreview
        heading={"Your Privacy, Our Priority"}
        subheading={
          "We protect your data with the highest standards. Learn how we safeguard your information and ensure your experience remains confidential."
        }
      />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <section className="rounded-lg p-6 shadow-lg md:p-8">
          <Heading>Privacy Policy</Heading>
          <p className="mb-4 text-lg">
            Welcome to DevUnity! This privacy policy outlines how we collect,
            use, and protect your information when you use our platform.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">1. Introduction</h2>
          <p className="mb-4 text-lg">
            This Privacy Policy applies to DevUnity(
            <a
              href={
                import.meta.env["VITE_FRONTEND_URI"] ||
                "https://localhost:5173/"
              }
              className="text-blue-400 hover:underline"
            >
              {import.meta.env["VITE_FRONTEND_URI"] ||
                "https://localhost:5173/"}
            </a>
            ). By using our platform, you agree to the collection and use of
            your information as described in this policy.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            2. Information We Collect
          </h2>
          <ul className="mb-4 list-inside list-disc text-lg">
            <li>
              <strong>Personal Information:</strong> Email addresses for account
              creation and communication.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about your interactions
              with the platform, including code submitted and edited by users.
            </li>
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            3. How We Use Your Information
          </h2>
          <ul className="mb-4 list-inside list-disc text-lg">
            <li>
              <strong>To Provide and Maintain Our Service:</strong> Ensuring a
              seamless and personalized experience.
            </li>
            <li>
              <strong>To Communicate with You:</strong> Sending updates,
              notifications, and other important information.
            </li>
            <li>
              <strong>To Improve Our Service:</strong> Analyzing usage patterns
              to enhance the platform.
            </li>
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            4. Data Storage and Security
          </h2>
          <p className="mb-4 text-lg">
            We take the security of your data seriously and implement
            appropriate measures to protect it. Your data may be stored both
            locally and in the cloud.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">5. Data Sharing</h2>
          <p className="mb-4 text-lg">
            We do not share your personal information with any third parties.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            6. Your Data Rights
          </h2>
          <p className="mb-4 text-lg">
            You have the right to access, modify, or delete your personal
            information stored on our platform. To exercise these rights, please
            contact our support team.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            7. Children’s Privacy
          </h2>
          <p className="mb-4 text-lg">
            DevUnity is intended for users aged 9 and above. We do not knowingly
            collect personal information from children under 9. If we discover
            that we have collected such information, we will take steps to
            delete it promptly.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            8. Changes to This Privacy Policy
          </h2>
          <p className="mb-4 text-lg">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">9. Contact Us</h2>
          <p className="mb-4 text-lg">
            If you have any questions about this Privacy Policy, please contact
            us at our official support email.
          </p>

          <footer className="mt-6 text-center">
            <p className="text-lg">
              By using DevUnity, you agree to the collection and use of your
              information as described in this Privacy Policy. Thank you for
              trusting DevUnity for your collaborative coding needs.
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
