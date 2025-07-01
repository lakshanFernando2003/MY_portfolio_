import React from 'react';
import Image from 'next/image';
import styles from './maintenance.module.css';

export default function Maintenance() {
  return (
    <div className={styles.maintenanceContainer}>
      <div className={styles.maintenanceContent}>
        <h1 className={styles.title}>Website Under Development</h1>
        <div className={styles.divider}></div>

        <p className={styles.subtitle}>We're working on something awesome!</p>

        <div className={styles.featuresSection}>
          <h2>Coming Features:</h2>
          <ul>
            <li>✨ Advanced Web Animations</li>
            <li>🔄 Smooth Scrolling Experience</li>
            <li>↔️ Horizontal Scrolling Sections</li>
            <li>🖱️ Custom Cursor Effects</li>
            <li>⚡ Interactive UI Elements</li>
          </ul>
        </div>

        <div className={styles.projectInfo}>
          <h2>About This Portfolio</h2>
          <p>
            This project is being developed using Next.js and modern web technologies.
            It showcases my skills in creating interactive and visually appealing web experiences
            through custom animations, responsive design, and unique UI elements.
          </p>
          <p>
            The portfolio emphasizes smooth transitions and an intuitive user experience
            while maintaining optimal performance across all devices.
          </p>
        </div>

        <div className={styles.previewSection}>
          <h2>Website Preview</h2>
          <div className={styles.imageContainer}>
            {/* Replace with actual screenshot path in the public folder */}
            <Image
              src="/images/hero_screenshot.png"
              alt="Website Preview"
              width={800}
              height={450}
              className={styles.previewImage}
            />
          </div>
          <p className={styles.imageCaption}>Preview of the completed portfolio design</p>
        </div>

        <div className={styles.contactInfo}>
          <p>Check back soon to see the completed website!</p>
          <p>Contact: <a href="mailto:lakshanchanaka34@gmail.com">lakshanchanaka34@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
}
