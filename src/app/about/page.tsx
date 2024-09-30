import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import Markdown from "react-markdown";

// ![Cariur Logo](https://your-image-link.com/logo.png)
const content = `# About Cariur


Welcome to **Cariur**, a platform designed for developers, creatives, and students to grow, collaborate, and showcase their talents. Whether you're a seasoned tech professional or just starting out, Cariur provides a supportive community to help you achieve your goals.

At Cariur, our mission is to bridge the gap between learning and real-world experience. We provide opportunities for hands-on projects, mentorship, and peer feedback, so you can not only learn but also apply your skills in meaningful ways.

![Cariur Team](https://your-image-link.com/team.png)

We believe in the power of community and collaboration. That's why we focus on:

- Structured feedback and detailed insights to help you improve.
- Real-world projects that simulate startup environments.
- AI-powered tools that assist in refining your skills and projects.
- A network of mentors and peers to help you grow.

Whether you're interested in web development, UI/UX design, or even launching your own startup, Cariur is here to support you every step of the way.

Join us on this exciting journey of growth and discovery. At Cariur, it's all about building the future, together.

Let's innovate and create!

**Cariur Team**
`;

export async function generateMetadata() {
  return {
    title: "About Cariur",
    description:
      "Learn more about Cariur and our mission to empower developers and creatives",
    openGraph: {
      title: "About Cariur",
      description:
        "Learn more about Cariur and our mission to empower developers and creatives",
      images: [
        signOgImageUrl({
          title: "Cariur",
          label: "About Cariur",
          brand: config.blog.name,
        }),
      ],
    },
  };
}

const Page = async () => {
  return (
    <div className="container mx-auto px-5">
      <Header />
      <div className="prose lg:prose-lg dark:prose-invert m-auto mt-20 mb-10 blog-content">
        <Markdown>{content}</Markdown>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
