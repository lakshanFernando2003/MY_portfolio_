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
    review: "Started my journey in web development with HTML, CSS, and JavaScript",
    imgPath: "/images/roadmap1.png",
    logoPath: "/images/logo2.png",
    title: "Web Development Fundamentals",
    date: "January 2020 - June 2020",
    responsibilities: [
      "Learned HTML5 semantic markup",
      "Mastered CSS3 including Flexbox and Grid",
      "Built interactive websites with JavaScript",
    ],
  },
  {
    id: 2,
    review: "Expanded my skills with modern frontend frameworks",
    imgPath: "/images/roadmap2.png",
    logoPath: "/images/logo2.png",
    title: "Frontend Frameworks",
    date: "July 2020 - December 2020",
    responsibilities: [
      "Learned React.js for building dynamic user interfaces",
      "Implemented responsive designs with Tailwind CSS",
      "Created single page applications with client-side routing",
    ],
  },
  {
    id: 3,
    review: "Developed backend skills to become a full-stack developer",
    imgPath: "/images/roadmap3.png",
    logoPath: "/images/logo2.png",
    title: "Backend Development",
    date: "January 2021 - June 2021",
    responsibilities: [
      "Built RESTful APIs with Node.js and Express",
      "Worked with SQL and NoSQL databases",
      "Implemented user authentication and authorization",
    ],
  },
  {
    id: 4,
    review: "Focused on DevOps and deployment strategies",
    imgPath: "/images/roadmap3.png",
    logoPath: "/images/logo2.png",
    title: "DevOps & Deployment",
    date: "July 2021 - December 2021",
    responsibilities: [
      "Set up CI/CD pipelines using GitHub Actions",
      "Deployed applications using Docker containers",
      "Implemented cloud infrastructure on AWS",
    ],
  },
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
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
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
        end: "70% center",
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
          <div className="relative z-50 xl:space-y-32 space-y-10">
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
