import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  ogType,
  twitterCard,
  description,
  name,
}: {
  name: string;
  title: string;
  ogType: "article" | "website" | "profile";
  twitterCard: "summary" | "summary_large_image" | "app" | "player";
  description: string;
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Open Graph tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/m4dd0c/devunity/main/images/home.png"
      />
      <meta
        property="og:image:secure_url"
        content="https://raw.githubusercontent.com/m4dd0c/devunity/main/images/home.png"
      />
      {/* End Open Graph tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta
        name="twitter:image"
        content="https://raw.githubusercontent.com/m4dd0c/devunity/main/images/home.png"
      />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};
export default SEO;
