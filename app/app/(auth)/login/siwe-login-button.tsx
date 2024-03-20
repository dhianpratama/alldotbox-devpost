"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { injected } from "wagmi/connectors";
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
    <button
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
          ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800 "
          : "bg-black"
      }   group my-2 flex h-10 w-full transform items-center justify-center space-x-2 rounded-md border-2 border-gray-600 transition-all duration-100 ease-in-out hover:scale-105 focus:outline-none dark:border-stone-700`}
    >
      {loading ? (
        <LoadingDots theme="dark" />
      ) : (
        <>
          <EthLogo />
          <p className="dark:text-stone text-sm font-medium text-white">
            Sign in With Ethereum
          </p>
        </>
      )}
    </button>
  );
}
