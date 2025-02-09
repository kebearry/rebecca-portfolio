"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaLinkedin } from "react-icons/fa"; // LinkedIn Icon

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ message: "Sending...", type: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ message: "Message sent successfully!", type: "success" });
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus({
          message: "Failed to send message. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setStatus({
        message: "An error occurred. Please try again.",
        type: "error",
      });
      console.error(error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-gradient-to-br from-hotpink via-primary/30 to-primary flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-primary/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Send me a message!</h2>
          <p className="text-primary">
            Got a question or proposal, or just want to say hello? Go ahead.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-primary/20 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-primary/20 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-primary/20 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-transparent transition duration-200 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-hotpink text-white font-medium py-2 px-4 rounded-md hover:bg-hotpink transform transition duration-200 hover:-translate-y-1"
          >
            Shoot
          </button>
        </form>
        {status.message && (
          <p
            className={`mt-4 text-center text-sm ${
              status.type === "success"
                ? "text-green-600" // Success -> Green
                : status.type === "error"
                ? "text-red-600" // Error -> Red
                : "text-gray-600" // Sending -> Neutral Gray
            }`}
          >
            {status.message}
          </p>
        )}

        {/* LinkedIn Section */}
        <div className="mt-8 text-center">
          <a
            href="https://www.linkedin.com/in/rebecca965"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center bg-[#0077b5] text-white py-2 px-6 rounded-full font-semibold text-md hover:bg-[#005c8e] transition duration-300"
          >
            <FaLinkedin className="mr-2 text-2xl" />
            Feel free to connect on LinkedIn!
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
