import {
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconEdit,
  IconKey,
  IconTerminal2,
  IconTrash,
} from "@tabler/icons-react";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconInfoSquareRounded,
  IconMessageCircle,
  IconUsers,
} from "@tabler/icons-react";

// filters
export const filters: TFilters[] = ["all", "owned", "contributions"];

// users
export const users = [
  {
    name: "Takuya Matsumaya",
    username: "craftzdog",
    bio: "Hello, I'm an indie app developer based in Japan! Hello, I'm an indie app developer based in Japan!",
    createdAt: "June, 13",
    location: "Osaka, Japan",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Hiroshi Tanaka",
    username: "hiro_dev",
    bio: "Passionate about coding and open source.",
    createdAt: "May, 22",
    location: "Tokyo, Japan",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Aiko Nakamura",
    username: "aiko_n",
    bio: "Full-stack developer and tech enthusiast.",
    createdAt: "April, 10",
    location: "Kyoto, Japan",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Kenji Watanabe",
    username: "kenji_w",
    bio: "Mobile app developer with a love for design.",
    createdAt: "March, 5",
    location: "Sapporo, Japan",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Yuki Takahashi",
    username: "yuki_t",
    bio: "Freelance developer and digital nomad.",
    createdAt: "February, 18",
    location: "Fukuoka, Japan",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

// projects
export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
];

// dummyMdx
export const mdx = `<div class="votecell post-layout--left">
<div class="js-voting-container d-flex jc-center fd-column ai-center gs4 fc-black-300" data-post-id="54191488" data-referrer="RelatedQuestions_Inline">&nbsp;</div>
</div>
<div class="answercell post-layout--right">
<div class="s-prose js-post-body" itemprop="text">
<p>TS/TSX files work <a href="https://github.com/expo/expo/blob/master/CHANGELOG.md#-breaking-changes-2" rel="noreferrer">out of the box with expo v31</a>&nbsp;but you'll probably want to include</p>
<p><strong>Package TypeScript types</strong></p>
<p><code>yarn add @types/expo @types/react @types/react-native -D</code></p>
<p><strong>Custom tsconfig.json</strong></p>
<p>Create&nbsp;<code>tsconfig.json</code>&nbsp;in the root directory next to&nbsp;<code>package.json</code>. It enforces strict mode and includes&nbsp;<code>App.tsx</code>&nbsp;(to replace&nbsp;<code>App.js</code>) and "custom_types" directory to add types for npm packages that don't include them.</p>
<pre class="language-javascript"><code>// Defaults from https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/
// Added "jsx": "react-native".
// Added ["App.tsx", "custom_types"] to "include".
{
  "compilerOptions": {
    // Target latest version of ECMAScript.
    "target": "esnext",
    // Search under node_modules for non-relative imports.
    "moduleResolution": "node",
    // Output react-native code.
    "jsx": "react-native",
    // Don't emit; allow Babel to transform files.
    "noEmit": true,
    // Enable strictest settings like strictNullChecks &amp; noImplicitAny.
    "strict": true,
    // Disallow features that require cross-file information for emit.
    "isolatedModules": true,
    // Import non-ES modules as default imports.
    "esModuleInterop": true
  },
  "include": ["src", "App.tsx", "custom_types"]
}</code></pre>
</div>
</div>`;

// dummy chat
export const dummyChat = [
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Manish Suthar",
    admin: true,
    message: "Hii Guys...",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Nitesh Suthar",
    admin: false,
    message: "Hii Little Brother.\nHow have you been doing?",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Manish Suthar",
    admin: true,
    message:
      "Yess... big brother Im totally fine.\nCongratulations on getting into google.",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Nitesh Suthar",
    admin: false,
    message: "Thank you.",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "John Doe",
    admin: false,
    message: "We didn't know. We have google employee here.",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Nitesh Suthar",
    admin: false,
    message: "Ahhh man... stop fucking around.",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Tsumiyoki",
    admin: false,
    message:
      "Woah Woah Woah! can someone tell me whats going on here!? I also want to join the thing giving me fomo. Please :<",
  },
  {
    name: "Takuya",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
    message:
      "Hi Guys don't forget to buy my new wallpapers. They really help me as an indie developer.",
  },
  {
    name: "John Doe",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
    message: "Why does everyone ask me If I'm some kinda programmer.",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "John Doe",
    admin: false,
    message: "We didn't know. We have google employee here.",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Nitesh Suthar",
    admin: false,
    message: "Ahhh man...I say stop fucking around!",
  },
  {
    avatar: "https://assets.aceternity.com/manu.png",
    name: "Manish Suthar",
    admin: true,
    message: "What the big plan, tell me already.",
  },
  {
    name: "Takuya",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
    message:
      "Hi Guys don't forget to buy my new wallpapers. They really help me as an indie developer.",
  },
  {
    name: "John Doe",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
    message: "Why does everyone ask me If I'm some kinda programmer.",
  },
];

// participents
export const dummyUsers = [
  {
    name: "Manish Suthar",
    admin: true,
    avatar: "https://assets.aceternity.com/manu.png",
  },
  {
    name: "Nitesh Suthar",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
  },
  {
    name: "John Doe",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
  },
  {
    name: "Manu Arora",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
  },
  {
    name: "Tsumiyoki",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
  },
  {
    name: "Takuya",
    admin: false,
    avatar: "https://assets.aceternity.com/manu.png",
  },
];
// supported languages - DashboardHeader
// INFO: get id from https://rapidapi.com/judge0-official/api/judge0-ce/playground/apiendpoint_67698706-b2a3-4cfc-8ef6-e9aa9eee85c6
export const langs: ILang[] = [
  {
    label: "C language",
    value: "c",
    color: "brown",
    id: 48,
    mode: "c_cpp",
    defaultCode: `
/* Default code hence not saved */
#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}`,
  },
  {
    label: "C++",
    value: "cpp",
    color: "pink",
    id: 53,
    mode: "c_cpp",
    defaultCode: `
/* Default code hence not saved */
#include <iostream>
using namespace std;

int main() {
  cout<<"Hello World!";
  return 0;
}`,
  },
  {
    label: "PHP",
    value: "php",
    color: "red",
    id: 68,
    mode: "php_laravel_blade",
    defaultCode: `
<?php
  /* Default code hence not saved */
  echo "Hello World!";
?>`,
  },
  {
    label: "Java",
    value: "java",
    color: "gray",
    id: 91,
    mode: "java",
    defaultCode: `
/* Default code hence not saved */
class Main
{
    public static void main(String []args)
    {
        System.out.println("Hello World!");
    }
};`,
  },
  {
    label: "Python",
    value: "py",
    color: "yellowgreen",
    id: 92,
    mode: "python",
    defaultCode: `
# Default code hence not saved
print("Hello World!");`,
  },
  {
    label: "Javascript",
    value: "js",
    color: "yellow",
    id: 93,
    mode: "javascript",
    defaultCode: `
/* Default code hence not saved */
console.log("Hello World!");`,
  },
];
// user setting links
export const userSettingsLinks = [
  {
    label: "Edit Profile",
    href: "edit",
    icon: (
      <IconEdit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Change Password",
    href: "/password/change",
    icon: (
      <IconKey className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Danger Zone",
    href: "delete",
    icon: (
      <IconTrash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];
// links - RoomSidebar
export const links = [
  {
    label: "Describe your project",
    href: "about",
    icon: (
      <IconInfoSquareRounded className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Dashboard",
    href: "#playground",
    icon: (
      <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Discussion",
    icon: (
      <IconMessageCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Users",
    icon: (
      <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Go Home",
    href: "/#hero",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

// Meet our team - Team
export const team = [
  {
    title: "Manish Suthar",
    subtitle: "Founder",
    description:
      "Manish is a visionary leader with a passion for innovation and technology. He has over 15 years of experience in the tech industry and has successfully launched multiple startups.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src="/assets/team/manish.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Manish Suthar"
        />
      </div>
    ),
  },
  {
    title: "Emily Davis",
    subtitle: "UX Designer",
    description:
      "Emily is a talented UX designer who focuses on creating intuitive and user-friendly designs. She believes in the power of user-centered design to solve real-world problems.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src="/assets/team/emily.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Emily Davis"
        />
      </div>
    ),
  },
  {
    title: "Robert Johnson",
    subtitle: "Project Manager",
    description:
      "Robert is an experienced project manager who excels in coordinating teams and ensuring projects are completed on time and within budget. His organizational skills are second to none.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src="/assets/team/robert.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Robert Johnson"
        />
      </div>
    ),
  },
  {
    title: "Jane Smith",
    subtitle: "Data Scientist",
    description:
      "Jane is a data scientist with a deep understanding of machine learning algorithms and data analytics. She has a knack for turning complex data into actionable insights.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src="/assets/team/jane.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Jane Smith"
        />
      </div>
    ),
  },
];

// testimonials data - Testimonials
export const testimonials = [
  {
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    username: "john_doe01",
    name: "John Doe",
    feedback: "Fantastic platform for collaboration.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/2.jpg",
    username: "jane_smith",
    name: "Jane Smith",
    feedback: "Absolutely love using Collaborite!",
  },
  {
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "mike_johnson",
    name: "Mike Johnson",
    feedback: "Great tool for remote team work.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/4.jpg",
    username: "emily_davis",
    name: "Emily Davis",
    feedback: "Makes editing together seamless.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    username: "sarah_brown",
    name: "Sarah Brown",
    feedback: "A must-have for any team.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/6.jpg",
    username: "chris_wilson",
    name: "Chris Wilson",
    feedback: "Incredible user experience.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/7.jpg",
    username: "jessica_taylor",
    name: "Jessica Taylor",
    feedback: "Highly recommend it!",
  },
  {
    img: "https://randomuser.me/api/portraits/men/8.jpg",
    username: "david_anderson",
    name: "David Anderson",
    feedback: "Very user-friendly and effective.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/9.jpg",
    username: "megan_thompson",
    name: "Megan Thompson",
    feedback: "Perfect for our needs.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/10.jpg",
    username: "james_white",
    name: "James White",
    feedback: "Love the real-time editing features.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/11.jpg",
    username: "laura_martinez",
    name: "Laura Martinez",
    feedback: "Super efficient and easy to use.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    username: "robert_lee",
    name: "Robert Lee",
    feedback: "Great tool for productivity.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/13.jpg",
    username: "anna_harris",
    name: "Anna Harris",
    feedback: "Collaborite is a game-changer.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    username: "brian_clark",
    name: "Brian Clark",
    feedback: "Can't imagine working without it.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/15.jpg",
    username: "linda_lewis",
    name: "Linda Lewis",
    feedback: "Our team loves it.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/16.jpg",
    username: "kevin_robinson",
    name: "Kevin Robinson",
    feedback: "Simply amazing!",
  },
  {
    img: "https://randomuser.me/api/portraits/women/17.jpg",
    username: "olivia_walker",
    name: "Olivia Walker",
    feedback: "Exceptional tool for collaboration.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    username: "matthew_hall",
    name: "Matthew Hall",
    feedback: "Great features and easy to use.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/19.jpg",
    username: "sophia_young",
    name: "Sophia Young",
    feedback: "Very helpful for team projects.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/20.jpg",
    username: "daniel_allen",
    name: "Daniel Allen",
    feedback: "Effortless and intuitive.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "chloe_king",
    name: "Chloe King",
    feedback: "An indispensable tool for us.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    username: "jason_wright",
    name: "Jason Wright",
    feedback: "Outstanding performance.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/23.jpg",
    username: "victoria_scott",
    name: "Victoria Scott",
    feedback: "Makes teamwork a breeze.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/24.jpg",
    username: "nathan_green",
    name: "Nathan Green",
    feedback: "Absolutely fantastic!",
  },
  {
    img: "https://randomuser.me/api/portraits/women/25.jpg",
    username: "ella_adams",
    name: "Ella Adams",
    feedback: "Our go-to tool for editing.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/26.jpg",
    username: "andrew_baker",
    name: "Andrew Baker",
    feedback: "Highly efficient and reliable.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/27.jpg",
    username: "zoe_gonzalez",
    name: "Zoe Gonzalez",
    feedback: "Great support and features.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/28.jpg",
    username: "joseph_perez",
    name: "Joseph Perez",
    feedback: "A revolutionary tool for us.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/29.jpg",
    username: "grace_nelson",
    name: "Grace Nelson",
    feedback: "Smooth and easy to navigate.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/30.jpg",
    username: "anthony_carter",
    name: "Anthony Carter",
    feedback: "Makes collaboration effortless.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/31.jpg",
    username: "lily_mitchell",
    name: "Lily Mitchell",
    feedback: "Simply the best collaboration tool.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "thomas_roberts",
    name: "Thomas Roberts",
    feedback: "Easy to set up and use.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/33.jpg",
    username: "sophie_turner",
    name: "Sophie Turner",
    feedback: "Love the user-friendly interface.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/34.jpg",
    username: "christopher_phillips",
    name: "Christopher Phillips",
    feedback: "Perfect for our workflow.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/35.jpg",
    username: "mia_campbell",
    name: "Mia Campbell",
    feedback: "The best tool for editing together.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/36.jpg",
    username: "joshua_evans",
    name: "Joshua Evans",
    feedback: "Highly recommend to everyone.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    username: "isabella_parker",
    name: "Isabella Parker",
    feedback: "Fantastic features and support.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/38.jpg",
    username: "ethan_edwards",
    name: "Ethan Edwards",
    feedback: "Great for remote collaboration.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/39.jpg",
    username: "ava_collins",
    name: "Ava Collins",
    feedback: "Our team loves using it.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/40.jpg",
    username: "alexander_stewart",
    name: "Alexander Stewart",
    feedback: "A must-have for any team.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/41.jpg",
    username: "maya_sanchez",
    name: "Maya Sanchez",
    feedback: "Simply incredible!",
  },
  {
    img: "https://randomuser.me/api/portraits/men/42.jpg",
    username: "jack_morris",
    name: "Jack Morris",
    feedback: "Boosts our productivity.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/43.jpg",
    username: "natalie_rogers",
    name: "Natalie Rogers",
    feedback: "Love the collaborative features.",
  },
  {
    img: "https://randomuser.me/api/portraits/men/44.jpg",
    username: "ryan_cook",
    name: "Ryan Cook",
    feedback: "Efficient and user-friendly.",
  },
  {
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    username: "hannah_morgan",
    name: "Hannah Morgan",
    feedback: "Highly effective for teamwork.",
  },
];

// RoomPromo
export const words = [
  {
    text: "Utilize",
  },
  {
    text: "the",
  },
  {
    text: "Power",
  },
  {
    text: "of",
  },
  {
    text: "DevUnity.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

// Features
export const features = [
  {
    title: "Built for developers",
    description:
      "Built for engineers, developers, dreamers, thinkers and doers.",
    icon: <IconTerminal2 />,
  },
  {
    title: "Ease of use",
    description:
      "It's as easy as using an Apple, and as expensive as buying one.",
    icon: <IconEaseInOut />,
  },
  {
    title: "Free to use",
    description:
      "It's totally free to use. No cap, no lock, no credit card required.",
    icon: <IconCurrencyDollar />,
  },
  {
    title: "100% Uptime guarantee",
    description: "We just cannot be taken down by anyone.",
    icon: <IconCloud />,
  },
];

// Brands
export const brands = [
  {
    label: "Github",
    img: "/assets/brands/github.svg",
  },
  {
    label: "Samsung",
    img: "/assets/brands/samsung.svg",
    pure: true,
  },
  {
    label: "Amazon",
    img: "/assets/brands/amazon.svg",
  },
  {
    label: "Louis Vitton",
    img: "/assets/brands/lv.svg",
  },
  { label: "Google", img: "/assets/brands/google.svg", pure: true },
  {
    label: "Tesla",
    img: "/assets/brands/tesla.svg",
  },
  {
    label: "Apple",
    img: "/assets/brands/apple.svg",
  },
  {
    label: "Linkedin",
    img: "/assets/brands/linkedin.svg",
  },
  {
    label: "Microsoft",
    img: "/assets/brands/microsoft.svg",
    pure: true,
  },
];

// globe configuration - HeroGlobe
export const globeConfig = {
  pointSize: 4,
  globeColor: "#7F57C0",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#4F2F94",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

// Arc string colors - HeroGlobe
export const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

// Arc Positions - HeroGlobe
export const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: 41.9028,
    startLng: 12.4964,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 11,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 12,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 13,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 14,
    startLat: -33.936138,
    startLng: 18.436529,
    endLat: 21.395643,
    endLng: 39.883798,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
];
