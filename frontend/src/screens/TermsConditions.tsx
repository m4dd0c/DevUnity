import Heading from "../components/layout/Heading";
import SpotlightPreview from "../components/layout/SpotlightPreview";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SpotlightPreview
        heading={"Guardians of Your Journey"}
        subheading={
          "Our terms set the rules for a smooth voyage through Collabrite. Understanding them ensures a secure and collaborative experience for all."
        }
      />{" "}
      <div className="mx-auto px-4 py-8 max-w-5xl">
        <section className="p-6 md:p-8 rounded-lg shadow-lg">
          <Heading>Terms and Conditions</Heading>
          <p className="text-lg mb-4">
            Welcome to Collabrite! By using our platform, you agree to comply
            with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-lg mb-4">
            By accessing and using Collabrite (
            <a
              href="https://collabrite.netlify.app"
              className="text-blue-400 hover:underline"
            >
              https://collabrite.netlify.app
            </a>
            ), you accept and agree to be bound by the terms and conditions
            outlined in this agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Eligibility</h2>
          <p className="text-lg mb-4">
            You must be at least 9 years old to use Collabrite.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. User Conduct</h2>
          <p className="text-lg mb-4">
            Users are expected to behave respectfully and professionally. This
            includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>No abuse or harassment of any kind.</li>
            <li>No stealing of code.</li>
            <li>Maintaining a respectful environment for all users.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            4. Prohibited Actions
          </h2>
          <p className="text-lg mb-4">
            The following actions are strictly prohibited:
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>Any form of abuse or harassment.</li>
            <li>Stealing or plagiarizing code from other users.</li>
            <li>Disrespecting other users.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            5. Data Collection
          </h2>
          <p className="text-lg mb-4">
            Collabrite collects and stores the following data:
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>
              <strong>Code:</strong> Submitted and edited by users.
            </li>
            <li>
              <strong>Email Addresses:</strong> For account creation and
              communication.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Data Storage</h2>
          <p className="text-lg mb-4">
            Your data may be stored both locally and in the cloud to ensure a
            seamless experience.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">7. Data Sharing</h2>
          <p className="text-lg mb-4">
            Collabrite does not share your data with any third parties.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            8. Account Termination
          </h2>
          <p className="text-lg mb-4">
            While the feature is not yet implemented, Collabrite reserves the
            right to terminate user accounts for violations of these terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            9. Account Recovery
          </h2>
          <p className="text-lg mb-4">
            Currently, there is no account recovery process. Please ensure you
            maintain your account credentials securely.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            10. Room Creation and Usage
          </h2>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>There is no limit on the number of rooms a user can create.</li>
            <li>A maximum of 3 users can join a single room simultaneously.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            11. Allowed File Types
          </h2>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>.js</li>
            <li>.md</li>
            <li>.cpp</li>
            <li>.py</li>
            <li>.c</li>
            <li>.java</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            12. Jurisdiction and Governing Law
          </h2>
          <p className="text-lg mb-4">
            These terms and conditions are governed by the laws of India. Any
            disputes will be resolved in the courts of India.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">13. Arbitration</h2>
          <p className="text-lg mb-4">
            Collabrite does not currently offer arbitration for disputes.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            14. Modifications to Terms
          </h2>
          <p className="text-lg mb-4">
            Collabrite reserves the right to modify these terms at any time.
            Users will be notified of any changes.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">15. Support</h2>
          <p className="text-lg mb-4">
            For support, please contact us at our official support email.
          </p>

          <footer className="mt-6 text-center">
            <p className="text-lg">
              By using Collabrite, you agree to these terms and conditions.
              Thank you for choosing Collabrite for your collaborative coding
              needs.
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
