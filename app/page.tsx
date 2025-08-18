"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Search, Moon, Sun, Github, Youtube, Mail, ExternalLink, Download, Phone, MapPin, Camera, Link2, FileText, X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Personal data - edit these to customize your site
const YOU = {
  name: "Ayush Karkare",
  tagline: "Aerospace Engineer • Tech Enthusiast • Entrepreneur • Photo/Videographer",
  bio: "Hi, I'm Ayush. I am a student at Purdue University passionate about emerging aerospace technologies and innovative ideas that push boundaries. I especially love exploring how creativity and engineering intersect. You can often find me working on UAV's, experimenting with my 3D printer, or capturing a moment on my camera.",
  email: "akarkare@purdue.edu",
  phone: "+1 (484) 319 7085",
  location: "West Lafayette, IN",
  socials: {
    github: "https://github.com/ayushkarkare",
    youtube: "https://youtube.com/@ayushkarkare3049",
    linkedin: "https://www.linkedin.com/in/ayushkarkare/",
  },
  resumeUrl: "/Karkare_Ayush.pdf",
  skills: ["Python", "React", "TypeScript", "Aero", "CAD"],
  social: [
    { platform: "GitHub", url: "https://github.com/ayushkarkare" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/ayushkarkare/" },
    { platform: "YouTube", url: "https://youtube.com/@ayushkarkare3049" },
  ],
}

type Media =
  | { type: "video"; id: string; title?: string; tags?: string[] }
  | { type: "photo"; src: string; title?: string; tags?: string[] }

type ProjectVideo = {
  title: string
  youtubeId: string
}

type ProjectPDF = {
  title: string
  url: string
}

type ProjectMedia = {
  images?: string[]
  videos?: ProjectVideo[]
  pdfs?: ProjectPDF[]
}

type WorkStatus = {
  title: string
  currentPhase: string
  progress: number
  updates: string[]
  nextMilestones: string[]
}

type Project = {
  title: string
  year: number
  description: string
  tags: string[]
  link?: string | string[]
  github?: string
  demo?: string
  overview?: string
  features?: string[]
  technical?: string
  media?: ProjectMedia
  inProgress?: boolean
  workStatus?: WorkStatus
}

const CREATIVE_MEDIA: Media[] = [
  { type: "video", id: "dQw4w9WgXcQ", title: "Sample Video", tags: ["travel"] },
  { type: "photo", src: "/majestic-mountain-vista.png", title: "Mountains", tags: ["outdoors"] },
  { type: "photo", src: "/sunset-cityscape.png", title: "City Lights", tags: ["urban"] },
  { type: "video", id: "jNQXAC9IVRw", title: "Another Video", tags: ["tech"] },
  { type: "photo", src: "/forest-path.png", title: "Forest Path", tags: ["nature", "outdoors"] },
  { type: "photo", src: "/placeholder-bhxyx.png", title: "Architecture", tags: ["urban"] },
]

const PROJECTS: Project[] = [
  {title: "BrewTrack",
    year: 2025,
    description: "A smart café management tool that tracks sales and inventory in real time, forecasts needs, and provides actionable insights through a conversational AI assistant.",
    tags: ["Python", "AI/LLM", "Software"],
    github: "https://github.com/ayushkarkare/brewtrack/",
    demo: "https://youtu.be/vvRNs-Nehe4",
    overview: "Brewtrack is a business analytics platform designed to help independent coffee shops make data-driven decisions without needing analytics expertise. It solves the common problem of limited time and resources to track inventory, forecast demand, and analyze sales trends. By connecting to point-of-sale systems, Brewtrack translates raw sales data into clear insights about top-performing items, ingredient usage, and future needs. The platform provides shop owners with a conversational AI tool, allowing them to focus on running their business while benefiting from predictive analytics.",
    features: [
      "Square POS data integration from Excel sheets for seamless setup",
      "AI chatbot using NLP to answer sales and inventory questions",
      "Interactive dashboard with data-backed actionable insights",
      "Facebook Prophet time series forecasting for demand prediction",
      "Flask backend API for efficient data management",
      "React frontend with intuitive user interface",
      "Automated sales trend analysis and reporting",
      "Real-time inventory tracking and alerts"
    ],
    technical: "Brewtrack's backend is built in Python with Flask for API management and data processing. The frontend uses React for an intuitive user interface with interactive dashboards. Data analysis is handled with Pandas to process sales and inventory information from Square POS systems. Facebook Prophet provides time series forecasting to predict future demand patterns. The AI chatbot uses natural language processing to provide conversational insights about sales trends, inventory levels, and business performance. The system architecture allows for real-time data processing and automated report generation.",
    media: {
      images: [],
      videos: [
        { title: "BrewTrack Demo", youtubeId: "vvRNs-Nehe4?si=plcZwg0OHCiNFKL2" }
      ],
      pdfs: []
    }
  },
  {title: "Durden's Burden Glider",
    year: 2025,
    description: "Designing and building a fixed wing Red Bull Flugtag glider inspired by the movie Fight Club, engineered for glide distance in a flight competition.",
    tags: ["Aero", "CAD", "Hardware"],
    link: "https://www.redbull.com/us-en/events/red-bull-flugtag-dfw-usa-2025",
    inProgress: true,
    workStatus: {
      title: "🚧 Project in Development",
      currentPhase: "Design & Prototyping Phase",
      progress: 25,
      updates: [
        "General aircraft brainstorming and sketch complete",
        "Wing sizing and rough bill of materials (BOM) complete", 
        "Currently working on CAD design and manufacturing plan",
        "Upcoming: Component manufacturing (CNC & foam cutting), assembly, and ground testing",
        "Final: Final assembly and the competition flight"
      ],
      nextMilestones: [
        "Complete CAD design and manufacturing plan - Target: August 21st, 2025",
        "Manufacture components and preliminary assembly - Target: September 7th, 2025", 
        "Red Bull Flugtag competition - Hard Deadline: September 13th, 2025"
      ]
    },
          media: {
        images: ["/flugtag1.jpg"],
        videos: [],
        pdfs: []
      }
  },
  {title: "Electric Bike Conversion Project",
    year: 2024,
    description: "An electric bike conversion designed for faster, easier campus commuting with custom 3D-printed parts and a multi-stage belt drive system.",
    tags: ["CAD", "3D Printing", "Electronics", "Hardware"],
    overview: "The project began with the goal of addressing the transportation difficulties faced by students on large campuses like Purdue University, where long walks and challenging weather can make commuting inefficient. To solve this, I started converting a standard bike into an electric one, focusing on creating a balance between speed, torque, and practicality. The design utilizes a multi-stage belt drive system, powered by a Flipsky 190kV motor and a Ryobi battery, selected for its ease of swapping during use. Siemens NX was instrumental in the 3D modeling of the custom components, allowing for precise design and efficient integration of off-the-shelf parts from standard part libraries.",
    features: [
      "Multi-stage belt drive system for optimal speed and torque balance",
      "PID motion control algorithm for smooth acceleration and speed regulation",
      "Custom 3D-printed motor mount and belt system prototypes",
      "VESC (Vedders Electronic Speed Controller) for real-time motor feedback",
      "Ryobi battery system with easy swapping capability",
      "Custom rear wheel assembly with segmented gear system"
    ],
    technical: "The electrical system required careful tuning for optimal performance using a PID motion control algorithm to fine-tune the Flipsky 190kV motor, ensuring smooth acceleration and speed regulation. The motor was paired with a VESC (Vedders Electronic Speed Controller), which provided real-time feedback for precise control. The mechanical design was modeled in Siemens NX to ensure accurate fitting of the motor mount and belt drive system. Rapid prototyping using 3D printing played a crucial role in testing and refining components. Future enhancements include waterproof housings, gyroscope sensors, regenerative braking, and variable belt ratios.",
    media: {
      images: ["/bike1.jpg", "/bike2.png", "/bike3.jpg", "/bike4.jpg", "/bike5.jpg"],
      videos: [],
      pdfs: []
    }
  },
  {title: "Biovolt",
    year: 2024,
    description: "A modular biophotovoltaic system that generates electricity from plants and soil microbes, allowing farmers to produce renewable energy without sacrificing crop growth.",
    tags: ["CAD", "Electronics", "Hardware"],
    link: "https://www.purdue.edu/newsroom/2023/Q4/purdue-students-win-monetary-prizes-for-innovative-solutions-to-global-problems-during-moonshot-pitch-challenge/",
    overview: "Biovolt is an innovative energy solution that harnesses photosynthesis to generate electricity while allowing farmers to grow crops. It addresses the land-use dilemma farmers face between growing crops or installing solar farms. By using biophotovoltaic technology, Biovolt captures electrons from plants and soil microbes, converting them into usable electricity. With its modular and customizable design, Biovolt optimizes land use for energy generation without sacrificing agricultural production. For the past four years, I've worked with my team to develop Biovolt, and we are now collaborating with Purdue Innovates to bring the product to market.",
    features: [
      "Biophotovoltaic technology that captures electrons from plants and soil microbes",
      "Modular panel design with independent cell operation for system reliability",
      "Optimized series and parallel circuit configurations for voltage and current",
      "Coiled copper wire cathodes and zinc anodes for maximum energy capture",
      "Laser-cut plywood frames with waterproof epoxy coating",
      "Generated 1.56 volts across 19 cells in prototype testing",
      "Secured $8,500 funding through Purdue competitions"
    ],
    technical: "The electrical design utilizes a combination of series and parallel circuits to optimize both voltage and current output. The system captures electrons through coiled copper wire cathodes and strategically placed zinc anodes to maximize energy capture from soil microbes. Key engineering challenges included reducing internal resistance through experimentation with different wiring configurations and materials. The modular panels were designed in Fusion 360 and manufactured using laser-cut plywood frames, landscaping fabric, and soil substrates. Each panel functions independently with waterproof epoxy coating for durability. The final prototype achieved 1.56 volts across 19 cells using moss and soil substrates.",
    media: {
      images: ["/biovolt1.jpg", "/biovolt2.jpg", "/biovolt3.jpg", "/biovolt4.jpg", "/biovolt5.jpg", "/biovolt6.jpg", "/biovolt7.jpg", "/biovolt8.jpg"],
      videos: [
        { title: "Biovolt Demo Video 1", youtubeId: "dv-TlFil3mI?si=QztFZrG70e3_jH7T" },
        { title: "Biovolt Demo Video 2", youtubeId: "A19ljB20jMQ?si=t4oOD6gfw4Xq4iA3" }
      ],
      pdfs: []
    }
  },
  {title: "81Y Spin Up Robot",
    year: 2024,
    description: "An award-winning VEX Robotics competition robot with optimized flywheel shooting, precision CAD-designed subsystems, and a documented iterative engineering process.",
    tags: ["CAD", "Robotics", "Hardware"],
    link: "https://www.robotevents.com/teams/V5RC/81Y",
    overview: "As part of Team 81Y VEXMEN Cypher, my team and I engineered a robot for the VEX Robotics Spin Up competition, focusing on shooting discs into goals and controlling field elements. Over the course of the project, we rigorously applied the engineering design process in iterative sprints, documented in detail in our engineering design notebook. This allowed us to manage the project effectively while ensuring that each subsystem was designed, built, and tested to meet specific performance criteria.",
    features: [
      "Iterative engineering design process with detailed documentation",
      "Precision CAD modeling using Fusion 360 for all subsystems",
      "Optimized flywheel mechanism with projectile motion analysis",
      "Physics-based trajectory modeling for consistent high-precision shooting",
      "Pneumatic systems integration for improved component reliability",
      "Design Award winner at VEX Worlds Championship",
      "National Championship title and multiple signature event awards"
    ],
    technical: "The robot was meticulously designed using Fusion 360 for CAD modeling, allowing us to visualize complex components including the drivetrain, flywheel, and intake system. A significant focus was placed on the flywheel mechanism, where we performed detailed projectile motion analysis to optimize disc trajectories by adjusting motor speed and release angles. The iterative design process included continuous improvements to shooting mechanisms and pneumatic systems, ensuring both performance optimization and component reliability. Our disciplined approach to documentation and testing ultimately led to recognition with the Design Award at VEX Worlds Championship.",
    media: {
      images: ["/vex1.jpg", "/vex2.jpg", "/vex3.jpg", "/vex4.jpg", "/vex5.jpg", "/vex6.jpg", "/vex7.jpg", "/vex8.jpg", "/vex9.jpg", "/vex10.jpg", "/vex11.jpg"],
      videos: [
        { title: "81Y Robot Competition Performance", youtubeId: "Pn8gyKEJnH8?si=Vr1msf8KGuwePCcY" },
        { title: "81Y Robot Technical Showcase", youtubeId: "g3mWVeP3xBc?si=qqi2rIjv7Xpkx226" }
      ],
      pdfs: []
    }
  },
  {title: "Thermodynamics Property Calculator",
    year: 2024,
    description: "Developed a Thermodynamic Properties Calculator in MATLAB and as a React–Flask web app, enabling precise property lookups and interpolation with intuitive, user-friendly interfaces.",
    tags: ["Python", "MATLAB", "React", "Flask", "Software"],
    github: "https://github.com/ayushkarkare/thermo_calculator",
    overview: "I developed the Thermodynamic Properties Calculator as both a MATLAB desktop application and a web app using React and Flask, combining my skills in scientific computing and web development to handle complex thermodynamic tabulations. This dual approach showcases my versatility in scientific and web platforms, making complex calculations accessible through easy-to-use applications while maintaining consistent functionality for a broad range of users.",
    features: [
      "Intuitive MATLAB App Designer interface for desktop calculations",
      "Property calculations for water, refrigerants, and ideal gases",
      "Advanced interpolation algorithms for property lookups",
      "Responsive React frontend with modern UI/UX design",
      "Flask backend with Pandas for efficient data processing",
      "Robust error handling and validation systems",
      "Modular design with separate functions for each calculation type",
      "High-precision calculations with reliable results"
    ],
    technical: "In the MATLAB version, I used MATLAB App Designer to create an intuitive interface, allowing users to calculate properties for substances like water, refrigerants, and ideal gases. I implemented interpolation for property lookups, managed various thermodynamic states, and ensured high-precision calculations. The program's design is modular, with separate functions for each calculation type and robust error handling for reliability. For the web version, I used React for the frontend and Flask with Pandas for the backend to bring the tool online. The frontend follows responsive design principles for a user-friendly experience, while the backend uses Pandas for fast data processing and calculations. This architecture allows for quick property lookups and efficient interpolation. Both versions demonstrate my expertise in software design and UI development.",
    media: {
      images: ["/thermo1.png", "/thermo2.png", "/thermo3.png", "/thermo4.png", "/thermo5.jpeg", "/thermo6.jpeg"],
      videos: [
        { title: "Thermodynamic Properties Calculator Demo", youtubeId: "7WOmO2sJrZM?si=eRfQLeeRXIRYtAKK" }
      ],
      pdfs: []
    }
  },
  {title: "Mei Cha/The Lemon Scholars",
    year: 2024,
    description: "Built and scaled two beverage ventures to a brick-and-mortar location, generating $50,000+ through strategic marketing and operations.",
    tags: ["Business/Startup"],
    overview: "During my junior year of high school, I founded Mei Cha, a bubble tea business that quickly gained popularity by offering refreshing and culturally enriching beverages at various community events in the Greater Chester County area. As the CEO and founder, I oversaw every aspect of the business, from financial management and HR to marketing, public relations, and operations. My team and I successfully managed the company, bringing Mei Cha from a pop-up operation at local events to opening a brick-and-mortar location during my senior year. This transition allowed us to maintain consistent operations while expanding our reach and creating deeper connections with our customers.",
    features: [
      "Founded and led Mei Cha bubble tea business as CEO from concept to brick-and-mortar",
      "Managed all business operations: financial management, HR, marketing, and PR",
      "Transitioned from pop-up events to permanent brick-and-mortar location",
      "Developed high-quality, customizable drink offerings for competitive differentiation",
      "Leveraged social media marketing and guerilla campaigns for brand growth",
      "Co-founded Lemon Scholars lemonade business for college fundraising",
      "Generated over $50,000 in combined revenue across both ventures"
    ],
    technical: "As CEO, I developed comprehensive business strategies including timeline management, marketing initiatives, and customer service protocols. The business model targeted young adults aged 13-26 through social media marketing and guerilla campaigns. The evolution from Mei Cha to Lemon Scholars demonstrated adaptability, transitioning from bubble tea at community events to lemonade sales at large fairs. This provided experience in strategic planning, financial projections, team management, and business development while maintaining agile operations.",
    media: {
      images: ["/mcbt1.jpg", "/mcbt2.jpg", "/mcbt3.jpg", "/mcbt4.jpg", "/mcbt5.jpg", "/mcbt6.jpg"],
      videos: [],
      pdfs: []
    }
  },
  {title: "Trippian",
    year: 2025,
    description: "An AI-powered travel companion that uses autonomous agents to plan, monitor, and automate your entire journey, from booking flights and tracking delays to scheduling Ubers and suggesting food and lodging.",
    tags: ["AI/LLM", "Python", "React", "Flask", "Hackathon/Competition", "Software"],
    link: ["https://devpost.com/software/trippian", "https://www.youtube.com/watch?v=a6xSKq2aFh4"],
    github: "https://github.com/LeoSesuraj/catapult",
    overview: "Planning a trip should be exciting, not overwhelming. But between booking flights, finding hotels, scheduling Ubers, managing food stops, and handling delays, the details can quickly become a burden. That's why we created Trippian, your personal AI travel assistant. It anticipates and automates every step of your journey so you can stop stressing over logistics and start enjoying the experience. Trippian communicates with you conversationally and acts on your behalf in real time.",
    features: [
      "Multi-agent AI system with Calendar, Flights, Hotels, and Travel Assistant agents",
      "Autonomous agents that collaborate intelligently with shared memory",
      "Google Calendar integration for availability checks",
      "Amadeus API integration for flight and hotel searches",
      "OpenAI API for natural language understanding and agent automation",
      "Real-time flight delay monitoring and automatic rebooking",
      "Conversational interface for seamless trip planning",
      "Clean, intuitive React Native frontend with TypeScript"
    ],
    technical: "Trippian is an intelligent travel-planning app powered by a Python backend (Flask) and a React Native frontend (Expo, TypeScript). It uses a multi-agent AI system with Calendar, Flights, Hotels, and Travel Assistant agents that work together via structured handoffs and a shared ItineraryState. We integrated Google Calendar for availability checks, Amadeus API for flight & hotel searches, and OpenAI API for natural language understanding and agent automation. Other technologies include Passlib and Google OAuth for authentication, AsyncStorage, React Navigation, and Moti for mobile UX. The biggest challenge was building truly autonomous AI agents that could collaborate intelligently, not just chained workflows disguised as agents. Each agent has memory, reasons within its domain, and operates independently while maintaining a shared state.",
    media: {
      images: ["/trippian1.jpg", "/trippian2.jpg", "/trippian3.jpg"],
      videos: [
        { title: "Trippian - AI Travel Assistant Demo", youtubeId: "a6xSKq2aFh4?si=38UrTGS-1XcsFy4V" }
      ],
      pdfs: []
    }
  },
  {title: "LocalLens",
    year: 2024,
    description: "Hands-free campus tours with Meta Glasses. Real-time, location-based audio guides trigger automatically as you explore, delivering the right info at the right place.",
    tags: ["React", "Selenium", "Meta Glasses", "Hackathon/Competition", "AI/LLM", "Software"],
    link: ["https://devpost.com/software/locallens-b3xhu5", "https://www.youtube.com/watch?v=FITI1bCMvkQ"],
    github: "https://github.com/joeykokinda/MLH",
    overview: "Traditional campus tours often rely on you needing to schedule beforehand and other alternatives like virtual phone tours are annoying. So we wanted to create a hands-free experience that allows users to explore freely while still receiving location-based insights. With Meta Glasses, we saw an opportunity to leverage cutting-edge wearable technology to deliver real-time, geofenced audio narration, ensuring that users stay fully immersed in their surroundings while effortlessly accessing relevant information with no screens, no interruptions, just a natural, guided exploration.",
    features: [
      "Hands-free campus tour experience using Meta Glasses",
      "Real-time location tracking with geofencing technology",
      "Automatic audio narration triggered by location",
      "Instagram Live integration for audio delivery",
      "Express.js server for location processing",
      "Selenium automation for livestream interaction",
      "React Native mobile app with Expo Router",
      "Text-to-speech integration via Meta's built-in features"
    ],
    technical: "Built with React Native and Expo, using Expo Router for navigation and the Expo Location API for geofencing. We utilize Selenium to automate Instagram livestream interactions for audio delivery. The system works by initiating a livestream on Meta Glasses while sending positional data from the phone to an Express.js server. When users enter predefined geofenced points, the server retrieves location facts and posts them as livestream comments. Meta's text-to-speech feature reads comments aloud for hands-free audio tours. Due to Meta Glasses' closed-source nature, we reverse-engineered a creative solution using the livestream feature to deliver location-based audio information.",
    media: {
      images: ["/locallens1.jpg", "/locallens2.jpg"],
      videos: [
        { title: "LocalLens - Meta Glasses Campus Tour Demo", youtubeId: "FITI1bCMvkQ?si=8KFv8s8X1-fVYJAE" }
      ],
      pdfs: []
    }
  },
  {title: "Pyras",
    year: 2024,
    description: "A distributed GPU rental marketplace connecting idle GPU owners with developers, researchers, and creators who need affordable high-performance computing power. Think Airbnb for GPUs.",
    tags: ["Business/Startup"],
    link: "https://www.youtube.com/watch?v=45Xyndj4ppQ",
    overview: "After the cryptocurrency mining boom, an estimated 10 million GPUs are sitting idle, representing a significant underutilized resource. Meanwhile, industries such as AI, 3D modeling, and multimedia production are experiencing a 30% annual growth in demand for high-performance GPU power. Current enterprise solutions, such as AWS and Google Cloud, charge upwards of $3 per GPU hour, making them prohibitively expensive and complex for hobbyists, independent researchers, and small-scale developers. Pyras bridges this gap by connecting people who own idle GPUs with those who need high-performance computing power, like developers, researchers, and creators. Our platform handles everything from matching renters with the right GPUs to securing transactions, using a dynamic pricing algorithm that ensures fair rates for both parties.",
    features: [
      "Distributed GPU rental marketplace platform",
      "Dynamic pricing algorithm ensuring fair rates for hosts and renters",
      "User-friendly interface requiring no cloud computing expertise",
      "Secure transaction processing and workload isolation",
      "Automatic GPU management and flexible setup",
      "Cost savings up to 70% compared to traditional cloud providers",
      "Support for AI training, 3D modeling, and multimedia production",
      "Seamless onboarding for both hosts and renters"
    ],
    technical: "Pyras operates as a distributed marketplace where GPU owners list hardware and earn passive income by renting to users needing compute power for AI training, 3D rendering, or video production. The platform features a dynamic pricing algorithm factoring in GPU specifications, market demand, and supply for competitive rates. The system includes encrypted connections, secure workload isolation, and easy VM/container deployment. Unlike competitors targeting tech-savvy users, Pyras is designed for hobbyists, indie developers, and small businesses. The revenue model takes a 20% platform fee from transactions, allowing hosts to earn fair income while renters save significantly compared to traditional cloud providers.",
    media: {
      images: [],
      videos: [
        { title: "Pyras - GPU Rental Marketplace Pitch", youtubeId: "45Xyndj4ppQ?si=gJQK8CvuIwLGWcuP" }
      ],
      pdfs: [
        { title: "Pyras Business Plan & Technical Overview", url: "/pyras.pdf" }
      ]
    }
  },
  
]
const EXPERIENCE = [
  {
    role: "Flight Test Engineering Intern",
    company: "Boeing @ Edwards AFB",
    period: "Summer 2025",
    bullets: ["Collaborated with the B-1B instrumentation team to design avionics components for flight tests and supported the B-52 radar modernization project through system development and integration.", "Analyzed electrical and mechanical drawings, using redlined documents to create Test and Evaluation Work Sheets (TEWS) and document work orders for subassemblies in larger projects.", "Proactively sought learning opportunities by touring various platforms, including the C-17, to understand cross-team procedures and build valuable professional connections."],
    photos: ["/fte2.jpg", "/fte1.jpg"],
    links: [
      { title: "Edwards AFB Website", url: "https://www.edwards.af.mil/"}
    ]
  },
  {
    role: "Competition Airframe Lead",
    company: "Purdue Aerial Robotics Team",
    period: "August 2024 - Present",
    bullets: ["Spearheaded the design and optimization of UAV components using Siemens NX, to ensure aerodynamic efficiency and structural integrity for competition readiness.", "Manufactured and assembled UAV structures using carbon fiber layups for fuselage, wings, and ailerons, maintaining precision within tolerance for proper load distribution.", "Improved manufacturing processes by 3D printing UAV ribs with aerospace-grade filaments instead of carbon fiber layups, reducing complexity and weight while preserving structural integrity."],
    photos: ["/part1.jpg", "/part2.jpg"],
    links: [
      { title: "Team Website", url: "https://www.purdueaerial.com/" },
      { title: "SUAS Competition", url: "https://suas-competition.org/" }
    ]
  },
  {
    role: "Co-Founder",
    company: "voya.",
    period: "July 2025 - Present",
    bullets: ["Co-founded voya, an AI-powered travel planning platform, leading customer discovery, product development, and early-stage funding efforts."],
    links: [
      { title: "voya", url: "https://voyatrips.com/" },
    ]
  },
  {
    role: "Technical Consultant",
    company: "Scope Consulting",
    period: "December 2024 - Present",
    bullets: ["Developed a multi-input neural network for an internal applicant tracking system, achieving 86% accuracy in candidate classification through structured data preprocessing (normalization, encoding) and unstructured text processing (tokenization, TF-IDF), streamlining recruiting cycles.", "Engineered a data integration pipeline combining structured and unstructured data, optimizing model validation with gradient descent and reducing overfitting for a more efficient, scalable system."],
    photos: ["/scope1.jpg"],
    links: [
      { title: "Scope Consulting", url: "https://www.scopeje-consulting.com/" },
    ]
  },
  {
    role: "Relations Team Lead",
    company: "Boilerexams",
    period: "December 2024 - Present",
    bullets: ["Lead outreach and partnership efforts to expand Boilerexams, a student-run academic prep platform, across new universities and student organizations.", "Coordinate recruitment, brand strategy, and communication initiatives to grow impact and ensure equitable access to high-quality exam prep resources.", "Drive the expansion of Boilerexams into a chapter-based organization, laying the foundation for future chapters at other universities."],
    photos: ["/bexams1.jpg", "/bexams2.jpg"],
    links: [
      { title: "Boilerexams", url: "https://boilerexams.com/" },
    ]
  },
]

type SearchItem = {
  id: string
  type: "section" | "project" | "experience" | "creative" | "command"
  title: string
  description?: string
  keywords: string[]
  action: () => void
}

function GradientFX() {
  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
      {/* Subtle background gradient similar to ChatGPT */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[600px] opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, #4f46e5 0%, #7c3aed 25%, #ec4899 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Secondary gradient orb */}
      <div 
        className="absolute top-1/3 right-1/8 w-[400px] h-[400px] opacity-50"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, #3b82f6 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      
              {/* Accent gradient for depth */}
        <div 
          className="absolute bottom-1 left-1 w-[300px] h-[300px] opacity-30"
          style={{
            background: "radial-gradient(circle, #f59e0b 0%, #ef4444 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Cohesive gradient bubbles - Purple/Blue family */}
        <div className="absolute top-[10%] left-[5%] w-32 h-32 opacity-20 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[8%] w-24 h-24 opacity-15 bg-violet-500 rounded-full blur-2xl" />
        <div className="absolute top-[40%] left-[3%] w-28 h-28 opacity-18 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute top-[60%] right-[5%] w-20 h-20 opacity-12 bg-blue-500 rounded-full blur-2xl" />
        <div className="absolute bottom-[15%] right-[3%] w-26 h-26 opacity-16 bg-indigo-600 rounded-full blur-3xl" />
        
        {/* Blue/Cyan family */}
        <div className="absolute top-[35%] right-[20%] w-22 h-22 opacity-14 bg-cyan-500 rounded-full blur-2xl" />
        <div className="absolute top-[70%] left-[20%] w-18 h-18 opacity-10 bg-sky-500 rounded-full blur-xl" />
        <div className="absolute bottom-[30%] right-[25%] w-24 h-24 opacity-13 bg-blue-600 rounded-full blur-2xl" />
        <div className="absolute top-[50%] left-[25%] w-16 h-16 opacity-11 bg-cyan-600 rounded-full blur-xl" />
        
        {/* Pink/Rose accents */}
        <div className="absolute top-[25%] left-[40%] w-20 h-20 opacity-12 bg-pink-500 rounded-full blur-2xl" />
        <div className="absolute bottom-[40%] left-[35%] w-14 h-14 opacity-9 bg-rose-500 rounded-full blur-xl" />
        <div className="absolute top-[65%] right-[30%] w-18 h-18 opacity-11 bg-pink-600 rounded-full blur-xl" />
        
        {/* Subtle orange/amber accents */}
        <div className="absolute bottom-[25%] left-[45%] w-16 h-16 opacity-8 bg-orange-500 rounded-full blur-xl" />
        <div className="absolute top-[45%] right-[40%] w-12 h-12 opacity-7 bg-amber-500 rounded-full blur-lg" />
        
        {/* Additional depth bubbles */}
        <div className="absolute top-[80%] left-[10%] w-22 h-22 opacity-10 bg-violet-600 rounded-full blur-2xl" />
        <div className="absolute top-[15%] right-[35%] w-14 h-14 opacity-8 bg-indigo-700 rounded-full blur-xl" />
        <div className="absolute bottom-[10%] right-[15%] w-20 h-20 opacity-12 bg-purple-600 rounded-full blur-2xl" />
        <div className="absolute top-[55%] left-[45%] w-10 h-10 opacity-6 bg-blue-700 rounded-full blur-lg" />
    </div>
  )
}

function BlurVeil() {
  return <div className="fixed inset-0 -z-5 bg-white/80 dark:bg-black/60 pointer-events-none" />
}

function CommandPalette({
  open,
  onClose,
  onToggleTheme,
  items,
  onProjectFilter,
}: {
  open: boolean
  onClose: () => void
  onToggleTheme: () => void
  items: SearchItem[]
  onProjectFilter: (tag: string) => void
}) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recents, setRecents] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("command-palette-recents")
    if (stored) {
      setRecents(JSON.parse(stored))
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (!query) return items.slice(0, 6)

    return items
      .filter((item) => {
        const searchText = `${item.title} ${item.description || ""} ${item.keywords.join(" ")}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
      })
      .slice(0, 6)
  }, [query, items])

  const executeItem = (item: SearchItem) => {
    item.action()
    const newRecents = [item.id, ...recents.filter((id) => id !== item.id)].slice(0, 4)
    setRecents(newRecents)
    localStorage.setItem("command-palette-recents", JSON.stringify(newRecents))
    onClose()
  }

  useEffect(() => {
    if (!open) {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          executeItem(filteredItems[selectedIndex])
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, filteredItems, selectedIndex, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[20vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md mx-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
      >
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
          <Input
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-sm bg-transparent"
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              className={`w-full text-left px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 transition-colors ${
                index === selectedIndex ? "bg-zinc-100 dark:bg-zinc-800" : ""
              }`}
              onClick={() => executeItem(item)}
            >
              <div className="font-medium text-sm">{item.title}</div>
              {item.description && (
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{item.description}</div>
              )}
            </button>
          ))}
          {filteredItems.length === 0 && (
            <div className="px-3 py-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">No results found</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function ProjectFilters({
  tags,
  active,
  onPick,
}: {
  tags: string[]
  active: string
  onPick: (tag: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={active === tag ? "default" : "outline"}
          size="sm"
          onClick={() => onPick(tag)}
          className={`rounded-xl ${
            active === tag
              ? "bg-blue-600 text-white border-0"
              : "border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
          }`}
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="py-16 first:pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">{title}</h2>
        {children}
      </div>
    </section>
  )
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onImageSelect,
}: {
  project: typeof PROJECTS[0] | null
  isOpen: boolean
  onClose: () => void
  onImageSelect: (image: string) => void
}) {
  const [showAllImages, setShowAllImages] = useState(false)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      setShowAllImages(false) // Reset image gallery when modal opens
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 p-6 relative z-40">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {project.title}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-xl border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-950/50"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          {/* Project Media - Images, Videos, and PDFs */}
          {project.media && ((project.media.images?.length ?? 0) > 0 || (project.media.videos?.length ?? 0) > 0 || (project.media.pdfs?.length ?? 0) > 0) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Project Media</h3>
              
              {/* Videos */}
              {project.media.videos && project.media.videos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    <Play className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Videos ({project.media.videos.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.media.videos.map((video, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 z-0">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?wmode=opaque`}
                          title={video.title || `${project.title} Video ${index + 1}`}
                          className="w-full aspect-video"
                          style={{ position: 'relative', zIndex: 1 }}
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                        {video.title && (
                          <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{video.title}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Images */}
              {project.media.images && project.media.images.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Images ({project.media.images.length})
                    </h4>
                    {project.media.images.length > 3 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAllImages(!showAllImages)}
                        className="rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                      >
                        {showAllImages ? 'Show Less' : `Show All (${project.media.images.length})`}
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(showAllImages ? project.media.images : project.media.images.slice(0, 3)).map((image, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                        onClick={() => onImageSelect(image)}
                      >
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 dark:bg-black/90 rounded-full p-2">
                              <ExternalLink className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PDFs */}
              {project.media?.pdfs && project.media.pdfs.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Documents ({project.media.pdfs.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.media.pdfs.map((pdf, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        asChild
                        className="h-auto p-4 justify-start border-zinc-200 hover:border-blue-400 hover:bg-blue-50 dark:border-zinc-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                      >
                        <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <div className="text-left">
                            <div className="font-medium">{pdf.title}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">PDF Document</div>
                          </div>
                          <ExternalLink className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Show Project in Work OR Regular Project Details */}
          {project.inProgress && project.workStatus ? (
            /* Project in Work Section - Replaces all other content */
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{project.workStatus.title}</h3>
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                
                {/* Current Phase & Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {project.workStatus.currentPhase}
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {project.workStatus.progress}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.workStatus.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Updates */}
                <div className="mb-6">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Recent Updates</h4>
                  <ul className="space-y-2">
                    {project.workStatus.updates.map((update, index) => (
                      <li key={index} className="text-sm text-blue-700 dark:text-blue-300">
                        {update}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Milestones */}
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Upcoming Milestones</h4>
                  <ul className="space-y-2">
                    {project.workStatus.nextMilestones.map((milestone, index) => (
                      <li key={index} className="text-sm text-blue-700 dark:text-blue-300">
                         {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Project Details */
            <>
              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-20">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {project.overview || `${project.title} is an innovative project that showcases modern development practices and cutting-edge technology. This project demonstrates expertise in ${project.tags.join(", ")} and represents a significant contribution to the field.`}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                    {project.features ? project.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    )) : (
                      <>
                        <li>• Built with {project.tags[0]} technology</li>
                        <li>• User-friendly and intuitive design</li>
                        <li>• Scalable and maintainable architecture</li>
                        <li>• Modern development practices</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Technical Details */}
              <div className="mb-8 relative z-20">
                <h3 className="text-xl font-semibold mb-4">Technical Implementation</h3>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-zinc-700 dark:text-zinc-300">
                    {project.technical || `This project was built using ${project.tags.join(", ")} with a focus on clean architecture and best practices. The implementation follows modern development standards and includes comprehensive testing and documentation.`}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 relative z-20">
            {project.github && (
              <Button asChild className="rounded-xl">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.link && typeof project.link === 'string' && (
              <Button variant="outline" asChild className="rounded-xl bg-transparent">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {project.link.includes('newsroom') || project.link.includes('news') ? 'News Article' : 
                   project.link.includes('robotevents.com') ? 'Awards & Accomplishments' :
                   project.link.includes('redbull.com') ? 'Event Page' :
                   (project.link.includes('youtube.com') || project.link.includes('youtu.be')) && project.title === 'Pyras' ? 'Concept Overview' : 'Demo Video'}
                </a>
              </Button>
            )}
            {project.link && Array.isArray(project.link) && project.link.map((link, index) => (
              <Button key={index} variant="outline" asChild className="rounded-xl bg-transparent">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.includes('devpost.com') ? 'Devpost' :
                   (link.includes('youtube.com') || link.includes('youtu.be')) && project.title === 'Pyras' ? 'Concept Overview' :
                   link.includes('youtube.com') || link.includes('youtu.be') ? 'Demo Video' :
                   link.includes('newsroom') || link.includes('news') ? 'News Article' : 
                   link.includes('robotevents.com') ? 'Awards & Accomplishments' :
                   link.includes('redbull.com') ? 'Event Page' : 'Demo Video'}
                </a>
              </Button>
            ))}
            {project.demo && (
              <Button variant="outline" asChild className="rounded-xl bg-transparent">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activeProjectTag, setActiveProjectTag] = useState("All")
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const projectTags = ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))]
  const filteredProjects =
    activeProjectTag === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeProjectTag))

  const searchItems: SearchItem[] = [
    {
      id: "about",
      type: "section",
      title: "Go to About",
      keywords: ["about", "bio", "intro"],
      action: () => scrollToSection("about"),
    },
    {
      id: "creative",
      type: "section",
      title: "Go to Creative",
      keywords: ["creative", "photos", "videos", "gallery"],
      action: () => scrollToSection("creative"),
    },
    {
      id: "projects",
      type: "section",
      title: "Go to Projects",
      keywords: ["projects", "work", "code"],
      action: () => scrollToSection("projects"),
    },
    {
      id: "experience",
      type: "section",
      title: "Go to Experience",
      keywords: ["experience", "work", "jobs", "career"],
      action: () => scrollToSection("experience"),
    },
    {
      id: "contact",
      type: "section",
      title: "Go to Contact",
      keywords: ["contact", "email", "phone", "reach"],
      action: () => scrollToSection("contact"),
    },
    {
      id: "resume",
      type: "section",
      title: "Go to Resume",
      keywords: ["resume", "cv", "download"],
      action: () => scrollToSection("resume"),
    },
    {
      id: "toggle-theme",
      type: "command",
      title: "Toggle Theme",
      keywords: ["theme", "dark", "light", "mode"],
      action: toggleTheme,
    },
    ...PROJECTS.map((project) => ({
      id: `project-${project.title}`,
      type: "project" as const,
      title: project.title,
      description: project.description,
      keywords: [...project.tags, project.title.toLowerCase()],
      action: () => scrollToSection("projects"),
    })),
    ...EXPERIENCE.map((exp, i) => ({
      id: `experience-${i}`,
      type: "experience" as const,
      title: exp.role,
      description: `${exp.company} • ${exp.period}`,
      keywords: [exp.role.toLowerCase(), exp.company.toLowerCase()],
      action: () => scrollToSection("experience"),
    })),
    
    // Easter Eggs 🥚
    {
      id: "konami",
      type: "command",
      title: "🎮 Konami Code Activated!",
      description: "Up Up Down Down Left Right Left Right B A",
      keywords: ["konami", "code", "cheat", "game", "secret", "up", "down", "left", "right"],
      action: () => {
        document.body.style.transform = "rotate(360deg)"
        document.body.style.transition = "transform 2s ease-in-out"
        setTimeout(() => {
          document.body.style.transform = ""
          document.body.style.transition = ""
        }, 2000)
        alert("🎉 You found the Konami code! The page did a barrel roll!")
      },
    },
    {
      id: "coffee",
      type: "command",
      title: "☕ Need Coffee?",
      description: "Every developer's fuel",
      keywords: ["coffee", "caffeine", "java", "brew", "espresso", "latte"],
      action: () => {
        const coffeeEmojis = ["☕", "🍵", "🥤", "🧋"]
        const randomCoffee = coffeeEmojis[Math.floor(Math.random() * coffeeEmojis.length)]
        alert(`${randomCoffee} Here's your virtual coffee! Time to code!`)
      },
    },
    {
      id: "matrix",
      type: "command", 
      title: "🕶️ Enter the Matrix",
      description: "Follow the white rabbit...",
      keywords: ["matrix", "neo", "red", "blue", "pill", "rabbit", "morpheus"],
      action: () => {
        const originalBg = document.body.style.background
        document.body.style.background = "linear-gradient(to bottom, #0f0f0f 0%, #003300 100%)"
        document.body.style.color = "#00ff00"
        document.body.style.fontFamily = "monospace"
        setTimeout(() => {
          document.body.style.background = originalBg
          document.body.style.color = ""
          document.body.style.fontFamily = ""
        }, 3000)
        alert("🔴🔵 You took the red pill! Welcome to the Matrix...")
      },
    },
    {
      id: "rickroll",
      type: "command",
      title: "🎵 Never Gonna Give You Up",
      description: "You know the rules, and so do I",
      keywords: ["rick", "roll", "rickroll", "never", "gonna", "give", "you", "up", "astley"],
      action: () => {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
        alert("🎤 You just got Rick Roll'd! 🕺")
      },
    },
    {
      id: "developer",
      type: "command",
      title: "👨‍💻 About the Developer",
      description: "Secret developer info",
      keywords: ["developer", "ayush", "secret", "about", "hidden", "info"],
      action: () => {
        alert(`🚀 Secret Developer Stats:\n\n☕ Coffee consumed: ∞\n🐛 Bugs created: 42\n🔧 Bugs fixed: 41\n🌙 Late nights coding: Too many to count\n🎯 Favorite language: "It depends..."\n\n💡 Fun fact: This easter egg was added at 2 AM!`)
      },
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <GradientFX />
      <BlurVeil />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl text-blue-600 dark:text-blue-400">{getInitials(YOU.name)}</div>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("creative")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Creative
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("resume")}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Resume
              </button>
            </nav>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaletteOpen(true)}
                className="rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50"
              >
                <Search className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline ml-2 px-1.5 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">
                  ⌘K
                </kbd>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
              >
                {mounted ? (
                  theme === "light" ? (
                  <Moon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )
                ) : (
                  <Sun className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <Section id="about" title="About">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="prose prose-zinc dark:prose-invert max-w-none lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{YOU.name}</h2>
            <p className="text-lg leading-relaxed">{YOU.bio}</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/professional-headshot.png"
                alt={`${YOU.name} headshot`}
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover border-4 border-blue-200 dark:border-blue-800 shadow-lg"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Projects">
        <ProjectFilters tags={projectTags} active={activeProjectTag} onPick={setActiveProjectTag} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-950/20 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div className="flex space-x-2">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Click to view details →
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Experience">
        <div className="space-y-8">
          {EXPERIENCE.map((exp, index) => (
            <div key={index} className="flex">
              <div className="flex flex-col items-center mr-6">
                <div className="w-3 h-3 bg-zinc-400 dark:bg-zinc-600 rounded-full"></div>
                {index < EXPERIENCE.length - 1 && <div className="w-px h-16 bg-zinc-200 dark:bg-zinc-800 mt-2"></div>}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <div className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 mb-3">
                  <span>{exp.company}</span>
                  <span>•</span>
                  <span>{exp.period}</span>
                </div>
                <ul className="space-y-1 mb-4">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="text-zinc-700 dark:text-zinc-300">
                      • {bullet}
                    </li>
                  ))}
                </ul>
                
                {/* Photos and Links */}
                <div className="flex flex-wrap gap-3">
                  {exp.photos && exp.photos.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div className="flex gap-2">
                        {exp.photos.map((photo, i) => (
                          <img
                            key={i}
                            src={photo}
                            alt={`${exp.role} photo ${i + 1}`}
                            className="w-12 h-12 rounded-lg object-cover border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => setSelectedImage(photo)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {exp.links && exp.links.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <div className="flex gap-2">
                        {exp.links.map((link, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 px-3 text-xs border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              {link.title}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Creative Section */}
      <Section id="creative" title="Creative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATIVE_MEDIA.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
            >
              {item.type === "video" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${item.id}`}
                  title={item.title || "Video"}
                  className="w-full aspect-video"
                  allowFullScreen
                />
              ) : (
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.title || "Photo"}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              {item.title && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="font-medium text-white">{item.title}</h3>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-white/20 text-white border-white/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a href={`mailto:${YOU.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {YOU.email}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <a href={`tel:${YOU.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {YOU.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400">{YOU.location}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="flex space-x-4">
              {YOU.social.map((link) => (
                <Button
                  key={link.platform}
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 bg-transparent"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                    {link.platform}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="resume" title="Resume">
        <div className="max-w-3xl">
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Download my resume to learn more about my background, skills, and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-xl">
              <a href={YOU.resumeUrl} download className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-xl bg-transparent">
              <a href={YOU.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span>View Online</span>
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-zinc-600 dark:text-zinc-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} {YOU.name}
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={YOU.socials.github}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={YOU.socials.youtube}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${YOU.email}`}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            open={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            onToggleTheme={toggleTheme}
            items={searchItems}
            onProjectFilter={setActiveProjectTag}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            onImageSelect={setSelectedImage}
          />
        )}
      </AnimatePresence>

      {/* Image Enlargement Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            src={selectedImage}
            alt="Enlarged photo"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
