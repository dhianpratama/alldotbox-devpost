import Image from "next/image";
import GithubLoginButton from "./github-login-button";
import GoogleLoginButton from "./google-login-button";
import SiweLoginButton from "./siwe-login-button";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 bg-white py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-stone-700">
      <a href="https://www.namemaxi.com" rel="noreferrer" target="_blank">
        <Image
          alt="Platforms Starter Kit"
          width={100}
          height={100}
          className="relative mx-auto h-12 w-auto rounded-full dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
          src="/nm_logo_400x400.jpg"
        />
      </a>
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        All.box
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Make your For Sale Lander for your Tokenized Domains. <br />
        <a
          className="font-medium text-black hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
          href="https://blog.ensdom.com"
          rel="noreferrer"
          target="_blank"
        >
          Learn More
        </a>
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          {/* <GithubLoginButton /> */}
          {/* <GoogleLoginButton /> */}
          <SiweLoginButton />
        </Suspense>
      </div>
    </div>
  );
}
