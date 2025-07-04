import user_image from "./user-image.jpg";
import work_2 from "./work-2.png";
import code_icon from "./code-icon.png";
import work_1 from "./work-1.png";
import code_icon_dark from "./code-icon-dark.png";
import edu_icon from "./edu-icon.png";
import edu_icon_dark from "./edu-icon-dark.png";
import project_icon from "./project-icon.png";
import project_icon_dark from "./project-icon-dark.png";
import vscode from "./vscode.png";
import firebase from "./firebase.png";
import figma from "./figma.png";
import git from "./git.png";
import mongodb from "./mongodb.png";
import right_arrow_white from "./right-arrow-white.png";
import logo from "./logo.png";
import logo_dark from "./logo_dark.png";
import mail_icon from "./mail_icon.png";
import mail_icon_dark from "./mail_icon_dark.png";
import profile_img from "./profile-img.png";
import download_icon from "./download-icon.png";
import hand_icon from "./hand-icon.png";
import header_bg_color from "./header-bg-color.png";
import moon_icon from "./moon_icon.png";
import sun_icon from "./sun_icon.png";
import arrow_icon from "./arrow-icon.png";
import arrow_icon_dark from "./arrow-icon-dark.png";
import menu_black from "./menu-black.png";
import menu_white from "./menu-white.png";
import close_black from "./close-black.png";
import close_white from "./close-white.png";
import web_icon from "./web-icon.png";
import mobile_icon from "./mobile-icon.png";
import ui_icon from "./ui-icon.png";
import graphics_icon from "./graphics-icon.png";
import right_arrow from "./right-arrow.png";
import send_icon from "./send-icon.png";
import right_arrow_bold from "./right-arrow-bold.png";
import right_arrow_bold_dark from "./right-arrow-bold-dark.png";

export const assets = {
  user_image,
  code_icon,
  code_icon_dark,
  edu_icon,
  edu_icon_dark,
  project_icon,
  project_icon_dark,
  vscode,
  firebase,
  figma,
  git,
  mongodb,
  right_arrow_white,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  profile_img,
  download_icon,
  hand_icon,
  header_bg_color,
  moon_icon,
  sun_icon,
  arrow_icon,
  arrow_icon_dark,
  menu_black,
  menu_white,
  close_black,
  close_white,
  web_icon,
  mobile_icon,
  ui_icon,
  graphics_icon,
  right_arrow,
  send_icon,
  right_arrow_bold,
  right_arrow_bold_dark,
  work_1,
  work_2,
};

export const Projects = [
  {
    num: "01",
    category: "Full-stack",
    title: "Gifting Website ",
    description:
      "The Gifting Website is a full-stack e-commerce platform designed to offer personalized gifts, curated hampers, and a variety of other products for special occasions. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the application features a dynamic and responsive frontend that includes category-based product filtering, search functionality, and detailed product pages to enhance user experience. The backend supports robust functionalities such as user authentication, cart management, order placement, and a secure checkout process. An integrated admin dashboard allows real-time inventory management, product updates, and order tracking. The architecture is modular and API-optimized to ensure scalability and smooth performance across devices.",
    stack: [{ name: "ReactJs" }, { name: "MongoDB" }, { name: "NodeJs" }],
    image: assets.work_1,
    live: "https://gifting-site-frontend.onrender.com/",
    github: "https://github.com/Altamashkhan9315/Gifting-site",
  },
  {
    num: "02",
    category: "Full-stack",
    title: "Wanderlust",
    description:
      "Wanderlust is a full-stack travel platform built to help users discover, list, and review unique destinations from around the world. Developed using JavaScript, Node.js, Express.js, and MongoDB, the platform offers a seamless experience for travelers looking to explore offbeat locations or share their own travel experiences. It features secure user authentication, allowing individuals to create personalized accounts and manage their listings with full CRUD functionality. The backend is structured for scalability and performance, while the frontend ensures a smooth and intuitive user experience. Wanderlust is hosted on Render, making it easily accessible and deployable for real-world use.",
    stack: [{ name: "JavaScript" }, { name: "MongoDB" }, { name: "NodeJs" }],
    image: assets.work_2,
    live: "https://wanderlust-0mm6.onrender.com/listings",
    github: "https://github.com/Altamashkhan9315/wanderlust",
  },
];

export const serviceData = [
  {
    icon: assets.web_icon,
    title: "Full-stack web development",
    description:
      "Web development using MERN stack — building scalable and performant web applications with clean UI and powerful backend.",
    link: "",
  },
  {
    icon: assets.mobile_icon,
    title: "Data Structures & Algorithms",
    description:
      "Strong problem-solving skills using DSA in Java. Solved 200+ problems on platforms like Leetcode & GeeksforGeeks.",
    link: "",
  },
  {
    icon: assets.ui_icon,
    title: "CS Core Fundamentals",
    description:
      "Solid understanding of Operating Systems, DBMS, CN, and OOPs concepts — essential for software development and interviews.",
    link: "",
  },
  {
    icon: assets.graphics_icon,
    title: "Git, GitHub & Deployment",
    description:
      "Hands-on experience with Git, GitHub. Skilled in deploying full-stack apps on Vercel and Render.",
    link: "",
  },
];

export const infoList = [
  {
    icon: assets.code_icon,
    iconDark: assets.code_icon_dark,
    title: "Languages",
    description: "HTML, CSS, Java, JavaScript React Js, Next Js",
  },
  {
    icon: assets.edu_icon,
    iconDark: assets.edu_icon_dark,
    title: "Education",
    description: "B.Tech in Computer Science",
  },
  {
    icon: assets.project_icon,
    iconDark: assets.project_icon_dark,
    title: "Projects",
    description: "Built more than 5 projects",
  },
];

export const toolsData = [
  assets.vscode,
  assets.firebase,
  assets.mongodb,
  assets.figma,
  assets.git,
];
