"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about">
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black-100/[0.2]
       absolute left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>
      <div className="max-w-4xl mx-auto h-screen justify-center flex flex-col">
        <motion.h1
          className="relative z-5 mb-10 text-lg md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-purple to-neutral-400 text-center font-sans font-bold"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Join the Future of Event Management
        </motion.h1>
        <motion.p
          className="text-neutral-300 max-w-3xl mx-auto my-2 text-sm md:text-xl text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          At EVENTURE, we’re transforming how events are managed. Our
          innovative digital ticketing platform offers seamless, efficient, and
          eco-friendly solutions for all your event needs. Say goodbye to manual
          ticketing hassles and hello to effortless event experiences. With
          EVENTURE, you can easily book, transfer, and manage your tickets
          online, all with a few clicks.
        </motion.p>
        <motion.p
          className="text-neutral-300 max-w-2xl mx-auto my-2 text-sm md:text-xl text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Whether you’re an event organizer, EVENTURE brings
          convenience to your fingertips. Embrace the future of event management
          with us and make every event a memorable one!
        </motion.p>
      </div>
    </section>
  );
};

export default About;