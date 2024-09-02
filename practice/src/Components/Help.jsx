import React, { useState } from "react";
import emailjs from "emailjs-com";

const Help = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "your_service_id",
        "your_template_id",
        e.target,
        "your_user_id"
      )
      .then(
        (result) => {
          console.log("Message sent:", result.text);
          alert("Your message has been sent!");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          alert(
            "There was an error sending your message. Please try again later."
          );
        }
      );
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl mt-12 mx-auto max-w-4xl transform transition-all duration-300 hover:scale-105">
      <h2 className="text-4xl font-bold text-cyan-400 mb-6">Help & Support</h2>
      <p className="text-gray-300 text-lg mb-6 text-center leading-relaxed">
        If you have any questions or need assistance, please fill out the form
        below or contact us at{" "}
        <a
          href="mailto:baralamit881@gmail.com"
          className="text-cyan-400 hover:underline"
        >
          baralamit881@gmail.com
        </a>
        .
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-700 p-8 rounded-xl shadow-lg"
      >
        <div className="mb-6">
          <label
            className="block text-cyan-400 text-lg font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-cyan-400 text-lg font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-cyan-400 text-lg font-semibold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-4 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Your Message or Inquiry"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Help;
