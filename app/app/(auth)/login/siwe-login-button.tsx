"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { injected } from "wagmi/connectors";
import Image from "next/image";
import EthLogo from "@/components/icons/eth";

export default function SiweLoginButton() {
  const { signMessageAsync } = useSignMessage();
  const { chain, address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  const handleLogin = async () => {
    try {
      const callbackUrl = "/";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: true,
        signature,
        callbackUrl: `${window.location.origin}${callbackUrl}`,
      });
    } catch (error) {
      setLoading(false);
      toast.error("Failed to Connect Wallet");
    }
  };
  useEffect(() => {
    if (isConnected && !session) {
      handleLogin();
    }
  }, [isConnected]);

  return (
    <>
      {/* <button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          if (!isConnected) {
            connect({ connector: injected() });
          } else {
            handleLogin();
          }
        }}
        className={`${
          loading
            ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
            : "bg-gray-600 hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
        } group my-2 flex h-10 w-full items-center justify-between space-x-2 rounded-md border border-stone-200 px-2 py-4 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
      >
        {loading ? (
          <LoadingDots color="#A8A29E" />
        ) : (
          <>
            <p className="text-sm font-medium text-white">
              Sign in With Ethereum
            </p>
            <Image
              src="/siwe_icon_gradient.png"
              alt=""
              width={32}
              height={32}
            />
          </>
        )}
      </button> */}
      <div className="flex w-full items-center justify-center">
        <div>
          <button
            aria-label=""
            className="mx-auto flex transform items-center justify-between rounded border-2 border-gray-600 bg-black px-6 py-1 text-xs font-medium normal-case text-white transition-all duration-100 ease-in-out hover:scale-105 sm:text-sm md:text-base"
            data-action="submit"
            title=""
          >
            <EthLogo />
            <p className="font-inter text-button transform font-bold uppercase transition-all duration-100 ease-in-out">
              SIGN-IN WITH ETHEREUM
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
