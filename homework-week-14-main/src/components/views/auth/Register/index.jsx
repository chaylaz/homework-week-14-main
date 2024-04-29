"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        window.location.href = "/auth/login";
      } else {
        setIsLoading(false);
        setError("Email is already registered");
        console.log("error");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Failed to register. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      {error && <p className="text-red-700">{error}</p>}
      <h1 className=" text-3xl font-bold mb-2 text-blue-600">Register</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <Input label="Name" name="name" type="text" />
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />

          <Button type="submit" className="bg-blue-600 w-full rounded my-3">
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <p className="font-medium text-slate-500 mb-8">
        Have an account? Sign in{" "}
        <Link href="/auth/login" className="font-medium text-blue-500 mb-8">
          here
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
