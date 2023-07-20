import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";

// EFFECTS
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

// PAGE ELEMENTS
import Annotation from "./3dElements/Annotation";
import Wolf from "./3dElements/Wolf";
import HangarModel from "./3dElements/Hangar";
import GlowingEyes from "./3dElements/GlowingEyes";
import Camera from "./Camera/Camera";

// STYLES
import styles from "./Home.module.css";

const HomePage = () => {
  const [activeAnnotation, setActiveAnnotation] = useState("default");
  const [showAnnotation, setShowAnnotation] = useState(false);

  // Function to handle clicking an annotation
  const handleAnnotationClick = (annotationName) => {
    setActiveAnnotation(annotationName);
    setShowAnnotation(false);
  };

  // Function to handle clicking the close button
  const handleAnnotationClose = () => {
    setActiveAnnotation("default");
  };

  const handleAnimationComplete = () => {
    setShowAnnotation(true);
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Canvas shadows gl={{ alpha: false }} style={{ background: "black" }}>
          <EffectComposer>
            <DepthOfField
              focusDistance={0.04}
              focalLength={0.01}
              bokehScale={1}
              height={1080}
            />
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
            />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1} />
          </EffectComposer>

          {/* Default Camera */}
          <Camera
            fov={32}
            target={[-35, 2, 50]} // Setting the target position for about-the-project annotation
            rotation={[0.3, -0.75, 0.2]} // Setting the target rotation for about-the-project annotation
            active={activeAnnotation === "default"}
            onAnimationComplete={handleAnimationComplete}
            onAnnotationClick={handleAnnotationClick}
          />
          {/* Models */}
          <Wolf castShadow receiveShadow />
          <GlowingEyes />
          <HangarModel castShadow receiveShadow />

          {/* Annotations */}
          <Camera
            fov={32}
            target={[-2, 13, 36]} // Setting the target position for about-me annotation
            rotation={[0.11, -0.19, 0]} // Setting the target rotation for about-me annotation
            active={activeAnnotation === "about-me"}
            onAnimationComplete={handleAnimationComplete}
            onAnnotationClick={handleAnnotationClick}
          />
          {showAnnotation && activeAnnotation === "about-me" && (
            <Annotation
              position={[5, 14.5, 22]}
              rotation={[0.11, -0.19, 0]}
              onClose={handleAnnotationClose}
            >
              <p className={styles.annotationContents}>
                Hello Visitor, My name is Angelo,
                <br />
                <br />
                A little bit about myself: I am on a quest for knowledge and
                what I can do to improve peoples lives through tech. Currently
                at this stage in my quest I am studying software development at
                Developers Institute.
                <br />
                <br />
                To hone my skills I am currently working on a community forum
                website for geeks, my vision extends beyond just a website. I
                aspire to make a positive impact on the New Zealand tech
                industry. If I do not know something then I don't let that hold
                me back, I find solutions to problems and practice until the
                problem is solved.
                <br />
                <br />
                The journey of an student programmer with large visions may be
                challenging, but with my passion, dedication, and drive, I'm
                confident that I can positively impact the tech industry and the
                people around me. If you have any advice or guidance, I'd be
                grateful to hear it.
              </p>
            </Annotation>
          )}

          <Camera
            fov={32}
            target={[-2.5, 7.2, 29]} // Setting the target position for my-interests annotation
            rotation={[0, 0, 0]} // Setting the target rotation for my-interests annotation
            active={activeAnnotation === "my-interests"}
            onAnimationComplete={handleAnimationComplete}
            onAnnotationClick={handleAnnotationClick}
          />
          {showAnnotation && activeAnnotation === "my-interests" && (
            <Annotation position={[-1.6, 7, 9]} onClose={handleAnnotationClose}>
              <p className={styles.annotationContents}>
                <h3>AI</h3>
                One of my interests is artificial intelligence (AI). I am
                captivated by its dynamic nature and boundless potential to
                tackle real-world challenges. Specifically, I am deeply
                fascinated by AI's capacity to enhance internet safety for
                younger children, envisioning powerful content filtering
                systems, parental control tools, and real-time monitoring
                mechanisms to safeguard them from harmful online content
                Providing parents with the control and tools they need to
                protect their children is my driving force.
                <br />
                <h3>Image analysis</h3>
                Another inspiring realm that fascinates me is image analysis,
                where machine learning algorithms can revolutionize web
                development and 3D model design processes. I dream of creating a
                system that optimizes and creates 3D designs and assets for the
                gaming industry, empowering artists to unleash their creativity
                on the finer details.
                <br />
                {/* <h3>3D Printing</h3>
                Through thousands of hours in 3D applications, I wanted to see
                my designs come to life this led me design props from scratch,
                ideas, beloved movies and games, fueling my problem solving
                ability, enhancing my creativity and joy.
                <br /> */}
                <h3>Open source</h3>
                For me, this journey is more than mere business or project
                aspirations. I am driven by a strong belief in morally correct
                practices and building a community of like-minded enthusiasts
                and collaborators. Embracing open-source software and content is
                a vital part of my vision, as I firmly believe that sharing
                knowledge with a roots in an open-source mindset fuels
                innovation and progress.
                <br />
                <h3>Vision</h3>I see technology as a powerful means to foster
                human connections and enhance lives. By prioritizing community
                and responsible AI usage, my ultimate goal is to revolutionize
                internet safety and create an enjoyable and secure digital world
                for all. My journey as a tech enthusiast is fueled by a deep
                desire to make a difference, one idea and project at a time. I'm
                eager to explore new frontiers, push boundaries, and above all,
                learn
              </p>
            </Annotation>
          )}
          <Camera
            fov={32}
            target={[-6.5, 4.2, 9]} // Setting the target position for about-the-project annotation
            rotation={[0, -2.7, 0]} // Setting the targe5 rotation for about-the-project annotation
            active={activeAnnotation === "about-the-project"}
            onAnimationComplete={handleAnimationComplete}
            onAnnotationClick={handleAnnotationClick}
          />
          {showAnnotation && activeAnnotation === "about-the-project" && (
            <Annotation
              position={[1.5, 4.9, 27]}
              rotation={[0, -2.7, 0]}
              onClose={handleAnnotationClose}
            >
              <p className={styles.annotationContents}>
                DISCLAIMER: This 3D Hompage serves as a gateway and intorduction
                to the real project, just while it is being built.
                <br />
                <br />
                Geeks and Dungeons is a passion project that aims to unite geeks
                worldwide to share thoughts and resources. The goal is to create
                a digital forum that fosters genuine connections among geeks and
                celebrates their unique interests, and passions.
                <br />
                <br />
                The project incorporates security middleware built around the
                Auth0 service, ensuring robust authorization and authentication,
                allowing users to interact with confidence. Leveraging my web
                development studies in React and PostgreSQL, along with
                familiarity with full-stack software development, I have built
                this website to securely store and display user input.
                <br />
                <br />
                With a personal passion for unique user experiences and geek
                culture, this project aims to bring people together and foster
                meaningful interactions with an equally unique visual interface.
                One day this website will enable users to express themselves
                through their profile and personality deck (Upcoming feature).
                <br />
                <br />
                Driven by a strong belief in open-source collaboration, this
                project aims to keep all the code direct code written for Geeks
                and dungeons as opensource and available to anyone, (This doesnt
                extend to the libraries used as they have thier own indevidual
                licensing).
              </p>
            </Annotation>
          )}
          {/* Lights */}
          <group>
            <pointLight
              color="orange"
              position={[0, 0, 20]}
              intensity={1}
              distance={20}
              decay={1}
              castShadow
            />
            <spotLight
              position={[-2, 20, 40]}
              angle={1}
              penumbra={1}
              intensity={0.1}
              distance={77}
              castShadow
            />
            <pointLight
              position={[-57, 50, -55]}
              intensity={0.5}
              distance={77}
              decay={1}
              color="orange"
            />
            <pointLight
              position={[-48, 2, -68]}
              intensity={0.5}
              distance={15}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[57, 50, -55]}
              intensity={0.5}
              distance={77}
              decay={1}
              color="orange"
            />
          </group>

          {/* Elevator Lights */}
          <group>
            <pointLight
              position={[48, 2, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[53, 7, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[58, 12, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />

            <pointLight
              position={[63, 17, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[68, 22, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[73, 27, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
            <pointLight
              position={[78, 32, -57]}
              intensity={0.5}
              distance={5}
              decay={1}
              color="#7395C8"
            />
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default HomePage;
