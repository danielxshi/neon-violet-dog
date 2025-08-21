'use client'

import { useState } from 'react'
import { Mail, Instagram } from 'lucide-react'

type FormState = {
  firstName: string
  lastName: string
  email: string
  message: string
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validateEmail = (email: string) => {
    // simple regex for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email.toLowerCase())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // email validation
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }

    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        message: form.message,
      }

      const res = await fetch('https://formcarry.com/s/yK1ZYHdPk_u', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.code === 200) {
        setSuccess(true)
        setForm({ firstName: '', lastName: '', email: '', message: '' })
      } else {
        setError(typeof data.message === 'string' ? data.message : 'Something went wrong.')
      }
    } catch (err: any) {
      setError(err?.message ?? 'Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen flex bg-black text-white px-6 md:px-16 py-16">
      <div className="max-w-7xl my-auto mx-auto grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* success / error banners */}
          {success && (
            <div
              className="rounded border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
              role="status"
              aria-live="polite"
            >
              We received your submission. Thank you!
            </div>
          )}
          {error && (
            <div
              className="rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                className="w-full bg-transparent border-b border-white/50 py-2 outline-none placeholder-white/60"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                className="w-full bg-transparent border-b border-white/50 py-2 outline-none placeholder-white/60"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@doe.com"
              className="w-full bg-transparent border-b border-white/50 py-2 outline-none placeholder-white/60"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project…"
              rows={4}
              className="w-full bg-transparent border-b border-white/50 py-2 outline-none placeholder-white/60"
              required
            />
          </div>

          {/* honeypot (spam trap) */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-900/60 disabled:cursor-not-allowed text-white text-sm uppercase px-6 py-2 font-semibold tracking-wider transition"
          >
            {loading ? 'Sending…' : 'Submit'}
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
              <Mail size={20} /> info@beclearmedia.com
            </p>
            <a
              href="https://instagram.com/beclearmedia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 hover:opacity-80 transition"
              aria-label="Open Instagram in a new tab"
            >
              <Instagram size={20} /> Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
