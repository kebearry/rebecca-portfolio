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
      className="w-full min-h-screen bg-gradient-to-br from-secondary via-primary to-lightpink flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-secondary">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-accent">Send me a message!</h2>
          <p className="text-accent/70">
            Got a question or proposal, or just want to say hello? Go ahead.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-accent">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-secondary rounded-md focus:ring-2 focus:ring-secondary focus:border-accent transition duration-200 text-accent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-accent">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-secondary rounded-md focus:ring-2 focus:ring-secondary focus:border-accent transition duration-200 text-accent"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1 text-accent">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-secondary rounded-md focus:ring-2 focus:ring-secondary focus:border-accent transition duration-200 resize-none text-accent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white font-semibold py-3 px-4 rounded-lg hover:bg-accent/90 transform transition duration-200 hover:-translate-y-1 shadow-md"
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
            className="w-full inline-flex items-center bg-[#0077b5] text-white py-3 px-6 rounded-lg font-semibold text-md hover:bg-[#005c8e] transition duration-300 shadow-md"
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
