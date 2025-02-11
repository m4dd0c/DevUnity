import ContactForm from "../components/Contact/ContactForm";
import ContactHead from "../components/Contact/ContactHead";
import SEO from "../components/layout/SEO";

const Contact = () => {
  return (
    <div className="bg-black pt-20 text-white">
      {/* SEO - INVISIBLE IN PAGE */}
      <SEO
        title="Contact | DevUnity"
        description="Contact DevUnity for support, feedback, or general inquiries."
        name="DevUnity"
        ogType="website"
        twitterCard="summary"
      />
      <ContactHead />
      <ContactForm />
    </div>
  );
};
export default Contact;
