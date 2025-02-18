import Image from "next/image";

import { Suspense } from "react";
import SiweLoginButton from "../app/(auth)/login/siwe-login-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-black py-12 sm:px-6 lg:px-8">
      <div className="mx-5 border-2 border-gray-400 bg-white px-2 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-stone-700">
        <a href="https://www.namemaxi.com" rel="noreferrer" target="_blank">
          <Image
            alt="Platforms Starter Kit"
            width={100}
            height={100}
            className="relative mx-auto h-12 w-auto dark:scale-110 dark:border dark:border-stone-400"
            src="/logo.png"
          />
        </a>
        <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
          All.box
        </h1>
        <p className="mt-3 text-center text-stone-600 dark:text-stone-400">
        Craft an unforgettable impression with your For Sale Page{" "}
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
        <a
          className="mt-6 inline-block w-full text-center font-medium text-gray-600 hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
          href="https://blog.ensdom.com/blog/a-simple-for-sale-lander-for-box-domains"
          rel="noreferrer"
          target="_blank"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
