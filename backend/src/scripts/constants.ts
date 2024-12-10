import { Types } from "mongoose";

export const users = [
  {
    email: "john.doe@example.com",
    username: "johndoe",
    name: "John Doe",
    password: "password",
    portfolio: "https://johndoe.com",
    location: "New York, USA",
    bio: "A software developer passionate about coding.",
    verification: {
      verified: true,
    },
    rooms: [],
  },
  {
    email: "jane.smith@example.com",
    username: "janesmith",
    name: "Jane Smith",
    password: "password",
    portfolio: "https://janesmith.com",
    location: "London, UK",
    bio: "Full-stack developer with a love for design.",
    verification: {
      verified: false,
    },
    rooms: [],
  },
  {
    email: "alex.jones@example.com",
    username: "alexjones",
    name: "Alex Jones",
    password: "password",
    portfolio: "https://alexjones.dev",
    location: "Toronto, Canada",
    bio: "Back-end engineer and open-source contributor.",
    verification: {
      verified: true,
    },
    rooms: [],
  },
  {
    email: "emma.wilson@example.com",
    username: "emmawilson",
    name: "Emma Wilson",
    password: "password",
    portfolio: "https://emmawilson.dev",
    location: "Sydney, Australia",
    bio: "DevOps engineer and cloud enthusiast.",
    verification: {
      verified: true,
    },
    rooms: [],
  },
  {
    email: "michael.brown@example.com",
    username: "michaelbrown",
    name: "Michael Brown",
    password: "password",
    portfolio: "https://michaelbrown.dev",
    location: "San Francisco, USA",
    bio: "Front-end developer with a passion for UX.",
    verification: {
      verified: true,
    },
    rooms: [],
  },
];

export const rooms = [
  {
    project: {
      title: "Collaborative Coding Platform",
      explanation: "A real-time collaborative coding application.",
      description:
        "A platform for developers to code together in real-time with live previews and integrated chat.",
      lang: "js",
      code: "console.log('Hello World!');",
    },
    roomId: "collab123",
    admin: new Types.ObjectId(),
    participents: [],
    activeUsers: [],
    discussion: new Types.ObjectId(),
    password: "password",
  },
  {
    project: {
      title: "Python ML Sandbox",
      explanation: "A room for experimenting with machine learning algorithms.",
      description:
        "A coding sandbox for testing out Python-based machine learning models.",
      lang: "py",
      code: 'print("Hello, Machine Learning!")',
    },
    roomId: "mlsandbox",
    admin: new Types.ObjectId(),
    participents: [],
    activeUsers: [],
    discussion: new Types.ObjectId(),
    password: "password",
  },
  {
    project: {
      title: "C++ Data Structures",
      explanation:
        "A room for learning and implementing data structures in C++.",
      description:
        "Practice sessions focused on trees, graphs, and advanced algorithms in C++.",
      lang: "cpp",
      code: `#include<iostream>\nint main() { std::cout << "Hello, Data Structures!"; return 0; }`,
    },
    roomId: "cppds101",
    admin: new Types.ObjectId(),
    participents: [],
    activeUsers: [],
    discussion: new Types.ObjectId(),
    password: "password",
  },
];

export const discussions = [
  {
    room: new Types.ObjectId(),
    admin: new Types.ObjectId(),
    chat: [
      {
        message: "Welcome to the room!",
        sender: new Types.ObjectId(),
      },
      {
        message: "Excited to collaborate on this project.",
        sender: new Types.ObjectId(),
      },
    ],
  },
  {
    room: new Types.ObjectId(),
    admin: new Types.ObjectId(),
    chat: [
      {
        message: "Let's discuss the ML model architecture.",
        sender: new Types.ObjectId(),
      },
      {
        message: "Can we try using a different optimizer?",
        sender: new Types.ObjectId(),
      },
    ],
  },
  {
    room: new Types.ObjectId(),
    admin: new Types.ObjectId(),
    chat: [
      {
        message: "Starting with binary trees today!",
        sender: new Types.ObjectId(),
      },
    ],
  },
];
