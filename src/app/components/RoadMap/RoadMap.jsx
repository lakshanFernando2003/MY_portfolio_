import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './RoadMap.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


// Sample roadmap data
const roadmapData = [
  {
    id: 1,
    review: "Developed interest in programming through school projects and self-learning. Started with basic web development and discovered my passion for creating with code.",
    imgPath: "/images/roadmap1.png",
    logoPath: "/images/logo2.png",
    title: "High School",
    date: "2016 - 2020",
    responsibilities: [
      "Created first HTML/CSS websites",
      "Learned basic programming concepts",
      "Participated in school tech competitions",
      "Explored different areas of computer science"
    ],
  },
  {
    id: 2,
    review: "Embarked on my journey in computer science at university. Taking courses in programming fundamentals, algorithms, data structures, and exploring different areas of software development.",
    imgPath: "/images/roadmap2.png",
    logoPath: "/images/logo2.png",
    title: "University Begins",
    date: "2023 - 2024",
    responsibilities: [
      "Completed core CS coursework",
      "Learned object-oriented programming principles",
      "Built small applications as course projects",
      "Collaborated with peers on group assignments"
    ],
  },
  {
    id: 3,
    review: "Expanding my knowledge through personal projects and coursework. Focusing on web development with React and Next.js while developing a strong foundation in software engineering principles.",
    imgPath: "/images/roadmap3.png",
    logoPath: "/images/logo2.png",
    title: "Learning",
    date: "2023 - 2024",
    responsibilities: [
      "Mastered React.js fundamentals",
      "Developed fullstack applications with Next.js",
      "Created responsive user interfaces with modern CSS",
      "Implemented backend functionality with Node.js"
    ],
  },
  {
    id: 4,
    review: "Currently looking for internship opportunities to gain real-world experience in software development. Polishing my portfolio and enhancing my skills to prepare for the professional world.",
    imgPath: "/images/roadmap3.png",
    logoPath: "/images/logo2.png",
    title: "Present",
    date: "2025 - Present",
    responsibilities: [
      "Building comprehensive portfolio projects",
      "Contributing to open-source repositories",
      "Networking with industry professionals",
      "Learning industry-standard development practices"
    ],
  },
  {
    id: 5,
    review: "Aiming to secure an internship or junior role where I can apply my skills, learn from experienced professionals, and contribute to meaningful projects in a team environment.",
    imgPath: "/images/roadmap2.png",
    logoPath: "/images/logo2.png",
    title: "Near Future",
    date: "2025 - Present",
    responsibilities: [
      "Apply theoretical knowledge in practical settings",
      "Learn industry workflows and collaboration tools",
      "Contribute to production-level applications",
      "Receive mentorship from senior developers"
    ],
  },
  // {
  //   id: 6,
  //   review: "After graduation, my goal is to become a professional software engineer, specializing in modern web technologies and contributing to innovative projects that make a positive impact.",
  //   imgPath: "/images/roadmap1.png",
  //   logoPath: "/images/logo2.png",
  //   title: "Future Plans",
  //   date: "2024 and Beyond",
  //   responsibilities: [
  //     "Work as a professional software engineer",
  //     "Specialize in modern web development",
  //     "Contribute to innovative tech solutions",
  //     "Eventually mentor new developers and give back to the community"
  //   ],
  // }
];

// GlowCard component for roadmap items
const GlowCard = ({ card, index, children }) => {
  // refs for all the cards
  const cardRefs = useRef([]);

  // when mouse moves over a card, rotate the glow effect
  const handleMouseMove = (index) => (e) => {
    // get the current card
    const card = cardRefs.current[index];
    if (!card) return;

    // get the mouse position relative to the card
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // calculate the angle from the center of the card to the mouse
    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

    // adjust the angle so that it's between 0 and 360
    angle = (angle + 360) % 360;

    // set the angle as a CSS variable
    card.style.setProperty("--start", angle + 60);
  };

  // return the card component with the mouse move event
  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove(index)}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column -z-10"
    >
      <div className="glow"></div>
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src="/images/star.png" alt="star" className="size-5" />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default function RoadMap() {
  useGSAP(() => {
    // Loop through each timeline card and animate them in
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    // Animate the timeline height as the user scrolls
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "90% center",
        markers: false,
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    // Animate the text elements
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    }, "<");

    // Add animation for Roadmap-card elements
    gsap.utils.toArray(".Roadmap-card").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
        }
      });
    });
  }, []);

  return (
    <section id="roadmap" className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-5">
        <div className="mb-10 text-center mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold mb-2">My Development Journey</h2>
          <p className="text-white-50">🗺️ Career Roadmap and Milestones</p>
        </div>

        <div className="mt-32 relative mx-auto max-w-8xl">
          {/* Combined structure with conditional rendering based on ID */}
          <div className="relative z-40 xl:space-y-32 space-y-10">
            {roadmapData.map((card) => (
              <div key={card.title + card.id} className="exp-card-wrapper">
                {card.id % 2 === 1 ? (
                  // First structure (odd IDs): GlowCard on left and Roadmap-card on right
                  <>
                    <div className="xl:w-2/6">
                      <GlowCard card={card} index={card.id - 1}>
                        <div>
                          <img src={card.imgPath} alt="roadmap-img" />
                        </div>
                      </GlowCard>
                    </div>
                    <div className="xl:w-4/6">
                      <div className="flex items-start">
                        <div className="timeline-wrapper absolute top-0 h-full flex justify-center">
                          <div className="timeline -top-10 w-14 md:w-28 bg-black" />
                          <div className="gradient-line w-1 h-full" />
                        </div>
                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                          <div className="timeline-logo size-10 md:size-14 flex flex-none rounded-full justify-center items-center border border-black-50 bg-black-100">
                            <img src={card.logoPath} alt="logo" />
                          </div>
                          <div className='Roadmap-card'>
                            <h1 className="font-semibold text-3xl">{card.title}</h1>
                            <p className="my-5 text-white-50">
                              🗓️&nbsp;{card.date}
                            </p>
                            <p className="text-[#839CB5] italic">
                              Key Achievements
                            </p>
                            <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                              {card.responsibilities.map(
                                (responsibility, idx) => (
                                  <li key={idx} className="text-lg">
                                    {responsibility}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Second structure (even IDs): Roadmap-card on left and GlowCard on right
                  <>
                    <div className="xl:w-2/6">
                      <div className='Roadmap-card bg-black-100 p-6'>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        <p className="my-5 text-white-50">
                          🗓️&nbsp;{card.date}
                        </p>
                        <p className="text-[#839CB5] italic">
                          Key Achievements
                        </p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map(
                            (responsibility, idx) => (
                              <li key={idx} className="text-lg">
                                {responsibility}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="xl:w-4/6">
                      <div className="flex items-start">
                        <div className="timeline-wrapper absolute top-0 h-full flex justify-center">
                          <div className="timeline -top-10 w-14 md:w-28 bg-black" />
                          <div className="gradient-line w-1 h-full" />
                        </div>
                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                          <div className="timeline-logo size-10 md:size-14 flex flex-none rounded-full justify-center items-center border border-black-50 bg-black-100">
                            <img src={card.logoPath} alt="logo" />
                          </div>
                          <GlowCard card={card} index={card.id - 1}>
                            <div>
                              <img src={card.imgPath} alt="roadmap-img" className="w-full h-auto" />
                            </div>
                          </GlowCard>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
