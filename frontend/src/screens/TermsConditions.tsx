import Heading from "../components/layout/Heading";
import SEO from "../components/layout/SEO";
import SpotlightPreview from "../components/layout/SpotlightPreview";
import { langs } from "../constants";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Terms & Conditions | DevUnity"
        description="Read the Terms and Conditions governing the use of DevUnity."
        name="DevUnity"
        ogType="article"
        twitterCard="summary"
      />
      <SpotlightPreview
        heading={"Guardians of Your Journey"}
        subheading={
          "Our terms set the rules for a smooth voyage through DevUnity. Understanding them ensures a secure and collaborative experience for all."
        }
      />{" "}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <section className="rounded-lg p-6 shadow-lg md:p-8">
          <Heading>Terms and Conditions</Heading>
          <p className="mb-4 text-lg">
            Welcome to DevUnity! By using our platform, you agree to comply with
            and be bound by the following terms and conditions.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4 text-lg">
            By accessing and using DevUnity (
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
            ), you accept and agree to be bound by the terms and conditions
            outlined in this agreement.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">2. Eligibility</h2>
          <p className="mb-4 text-lg">
            You must be at least 9 years old to use DevUnity.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">3. User Conduct</h2>
          <p className="mb-4 text-lg">
            Users are expected to behave respectfully and professionally. This
            includes, but is not limited to:
          </p>
          <ul className="mb-4 list-inside list-disc text-lg">
            <li>No abuse or harassment of any kind.</li>
            <li>No stealing of code.</li>
            <li>Maintaining a respectful environment for all users.</li>
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            4. Prohibited Actions
          </h2>
          <p className="mb-4 text-lg">
            The following actions are strictly prohibited:
          </p>
          <ul className="mb-4 list-inside list-disc text-lg">
            <li>Any form of abuse or harassment.</li>
            <li>Stealing or plagiarizing code from other users.</li>
            <li>Disrespecting other users.</li>
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            5. Data Collection
          </h2>
          <p className="mb-4 text-lg">
            DevUnity collects and stores the following data:
          </p>
          <ul className="mb-4 list-inside list-disc text-lg">
            <li>
              <strong>Code:</strong> Submitted and edited by users.
            </li>
            <li>
              <strong>Email Addresses:</strong> For account creation and
              communication.
            </li>
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">6. Data Storage</h2>
          <p className="mb-4 text-lg">
            Your data may be stored both locally and in the cloud to ensure a
            seamless experience.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">7. Data Sharing</h2>
          <p className="mb-4 text-lg">
            DevUnity does not share your data with any third parties.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            8. Account Termination
          </h2>
          <p className="mb-4 text-lg">
            While the feature is not yet implemented, DevUnity reserves the
            right to terminate user accounts for violations of these terms.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            9. Account Recovery
          </h2>
          <p className="mb-4 text-lg">
            Currently, there is no account recovery process. Please ensure you
            maintain your account credentials securely.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            10. Room Creation and Usage
          </h2>
          <ul className="mb-4 list-inside list-disc text-lg">
            <li>There is no limit on the number of rooms a user can create.</li>
            <li>A maximum of 3 users can join a single room simultaneously.</li>
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            11. Allowed File Types
          </h2>
          <ul className="mb-4 list-inside list-disc text-lg">
            {langs.map((lang) => (
              <li key={lang.id}>{lang.value}</li>
            ))}
          </ul>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            12. Jurisdiction and Governing Law
          </h2>
          <p className="mb-4 text-lg">
            These terms and conditions are governed by the laws of India. Any
            disputes will be resolved in the courts of India.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">13. Arbitration</h2>
          <p className="mb-4 text-lg">
            DevUnity does not currently offer arbitration for disputes.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">
            14. Modifications to Terms
          </h2>
          <p className="mb-4 text-lg">
            DevUnity reserves the right to modify these terms at any time. Users
            will be notified of any changes.
          </p>

          <h2 className="mb-4 mt-6 text-2xl font-semibold">15. Support</h2>
          <p className="mb-4 text-lg">
            For support, please contact us at our official support email.
          </p>

          <footer className="mt-6 text-center">
            <p className="text-lg">
              By using DevUnity, you agree to these terms and conditions. Thank
              you for choosing DevUnity for your collaborative coding needs.
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
