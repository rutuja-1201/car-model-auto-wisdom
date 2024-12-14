'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ConsultationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Consultation request submitted!');
    router.push('/');
  };

  return (
    <div className=" text-white min-h-screen flex flex-col justify-center items-center p-6">
      <h2 className="text-3xl font-semibold text-teal-500 mb-6">Book a Consultation</h2>

      <div className="max-w-lg w-full bg-white text-black p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-teal-500 mb-4">We are here to assist you with all the details about the car!</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Submit Consultation Request
          </button>
        </form>
      </div>

      <p className="mt-4 text-gray-400 text-sm">
        We will get back to you as soon as possible. Thank you for your interest!
      </p>
    </div>
  );
};

export default ConsultationPage;
