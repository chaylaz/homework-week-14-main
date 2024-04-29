"use client"

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        window.location.href = "/books";
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      {error && <p className="text-red-700">{error}</p>}
      <h1 className="text-3xl font-bold mb-2 text-blue-600">Login</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button
            type="submit"
            variant="primary"
            className="bg-blue-600 w-full rounded my-3"
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <hr />
      </div>
      <p className="font-medium text-slate-500 mb-8">
        Don't have an account? Sign up{" "}
        <Link href="/auth/register" className="font-medium text-blue-500 mb-8">
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
