'use client'

import { useState } from 'react'
import { Mail, Instagram } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ firstName: '', lastName: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
    // Add form submission logic here
  }

  return (
    <section className="h-screen  flex bg-black text-white px-6 md:px-16 py-16">
      <div className="max-w-7xl my-auto mx-auto grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Your first name here"
              className="w-full bg-transparent border-b border-white py-2 outline-none placeholder-white/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Your last name here"
              className="w-full bg-transparent border-b border-white py-2 outline-none placeholder-white/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Insert Message"
              rows={4}
              className="w-full bg-transparent border-b border-white py-2 outline-none placeholder-white/60"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white text-sm uppercase px-6 py-2 font-semibold tracking-wider transition"
          >
            Submit
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">BE CLEAR MEDIA</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Looking to discuss a project? Please get in touch using the form on this page or give us
            a call.
          </p>
          <p className="text-sm text-white/80">
            Generally, we are able to reply to all inquiries within 24 hours.
          </p>
          <div className="text-sm space-y-1">
            <p>(604) 618 - 8641</p>
            <p className="flex items-center gap-1">
              <Mail size={16} /> info@beclearmedia.com
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
