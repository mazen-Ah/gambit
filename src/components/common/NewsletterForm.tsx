"use client";

import { useState } from "react";
import { ArrowRightIcon } from "../Icons";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email) {
      setEmail("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full ">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Sign up to newsletter"
        className="w-full h-16 px-8 rounded-full bg-white/15! border border-transparent focus:border-white/30 text-white placeholder:text-white/80 outline-none transition-colors duration-400"
      />
      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default NewsletterForm;
