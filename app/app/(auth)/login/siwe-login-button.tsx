"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { SiweMessage } from "siwe"
import { getCsrfToken, signIn, useSession } from "next-auth/react"

export default function SiweLoginButton() {
  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession()
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
      const callbackUrl = "/site"
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      })
    } catch (error) {
      window.alert(error)
    }
  }
  useEffect(() => {
    console.log(isConnected);
    if (isConnected && !session) {
      handleLogin()
    }
  }, [isConnected])

  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        if (!isConnected) {
          connect()
        } else {
          handleLogin()
        }
      }}
      className={`${
        loading
          ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
          : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
    >
      {loading ? (
        <LoadingDots color="#A8A29E" />
      ) : (
        <>
          <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
            Sign In with Etherium
          </p>
        </>
      )}
    </button>
  );
}
