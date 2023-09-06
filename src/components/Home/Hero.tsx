import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { heroTextVariants } from "~/motion/homeVariants";
import Typewriter from "../shared/TypeWriter";
import { signIn } from "next-auth/react";

const Hero = () => {
  const { data: session, status } = useSession();

  const handleLogin = () => {
    signIn("discord");
  };
  return (
    <>
      <div className="mx-auto max-w-2xl overflow-y-auto py-32 sm:py-48 lg:py-56">
        <motion.div
          key="hero-top"
          {...heroTextVariants(0.25)}
          className="hidden sm:mb-8 sm:flex sm:justify-center"
        >
          <Link
            href="https://magickml.com/"
            target="_blank"
            className="relative inline-flex items-center rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-secondary-highlight/80 transition-colors duration-150 ease-in-out hover:ring-secondary-highlight"
          >
            Sign up for the MagickML alpha.
            <span className="ml-1">
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
        <div className="text-center">
          <motion.h1
            className="text-2xl font-bold tracking-tight text-white sm:text-4xl"
            {...heroTextVariants(0.25)}
          >
            <Typewriter
              delay={66}
              text="A collection of starter projects powered by MagickML."
              cursor={true}
            />
          </motion.h1>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            {status !== "loading" && !session && (
              <button
                onClick={handleLogin}
                className="magick-button bg-card-main/50"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
