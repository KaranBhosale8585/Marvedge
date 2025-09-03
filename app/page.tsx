"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Upload,
  Edit3,
  Share2,
  ShieldCheck,
  Video,
  Sparkles,
  Gauge,
  Users,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight text-xl">
            Marvedge
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#features" className="hover:underline">
              Features
            </Link>
            <Link href="#how" className="hover:underline">
              How it works
            </Link>
            <Link href="#submission" className="hover:underline">
              Submission
            </Link>
            <Link
              href="/login"
              className="px-3 py-1.5 border rounded-md hover:bg-gray-100"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 rounded-md bg-black text-white hover:bg-gray-800"
            >
              Get started
            </Link>
          </nav>
          <Link
            href="/signup"
            className="md:hidden px-3 py-1.5 rounded-md bg-black text-white"
          >
            Start
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeUp}>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Build & Share{" "}
                <span className="underline decoration-gray-300">
                  Interactive Product Tours
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                A collaborative demo platform inspired by Arcade. Record your
                screen, annotate steps, and publish a shareable tour — all in
                your browser.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/signup"
                  className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" /> Get Started Free
                </Link>
                <Link
                  href="/demo/public"
                  className="px-5 py-3 border rounded-lg hover:bg-gray-100 flex items-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" /> View Demo
                </Link>
                <span className="text-sm text-gray-500">
                  No credit card required
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative border rounded-2xl p-6"
            >
              {/* Mock preview frame */}
              <div className="aspect-video w-full border rounded-xl overflow-hidden">
                <div className="h-10 border-b flex items-center gap-1 px-3">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="w-full h-24 border rounded-md" />
                    <div className="w-4/5 h-3 bg-gray-100 rounded" />
                    <div className="w-3/5 h-3 bg-gray-100 rounded" />
                    <div className="w-2/5 h-3 bg-gray-100 rounded" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-24 border rounded-md" />
                    <div className="w-4/5 h-3 bg-gray-100 rounded" />
                    <div className="w-3/5 h-3 bg-gray-100 rounded" />
                    <div className="w-2/5 h-3 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Preview of an interactive tour with annotated steps &
                transitions
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Core Features</h2>
          <p className="mt-2 text-gray-600">
            Everything you need to create and share product stories.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Upload,
                title: "Upload Screenshots",
                desc: "Add images or use placeholders to scaffold your tour.",
              },
              {
                icon: Edit3,
                title: "Step Annotations",
                desc: "Add, edit, and delete steps with rich text highlights.",
              },
              {
                icon: Video,
                title: "Screen Recorder",
                desc: "Capture your workflow directly in the browser.",
              },
              {
                icon: PlayCircle,
                title: "Preview & Transitions",
                desc: "Smooth, animated step-by-step playback.",
              },
              {
                icon: Share2,
                title: "Publish Links",
                desc: "Public or private URLs with role-based access.",
              },
              {
                icon: Gauge,
                title: "Dashboard & Analytics",
                desc: "Browse all tours and view mocked metrics.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="border rounded-xl p-5 hover:shadow-sm"
              >
                <Icon className="w-6 h-6" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Sign up & create",
                desc: "Start a new tour from your dashboard.",
                icon: Users,
              },
              {
                step: "2",
                title: "Record or upload",
                desc: "Use the in-browser recorder or add screenshots.",
                icon: Video,
              },
              {
                step: "3",
                title: "Annotate & publish",
                desc: "Add steps, preview transitions, and share a link.",
                icon: Share2,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="border rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border grid place-items-center font-semibold">
                    {step}
                  </div>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Create your first tour
            </Link>
            <Link
              href="/docs"
              className="px-5 py-3 border rounded-lg hover:bg-gray-100"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Security */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Secure by design
              </h2>
              <p className="mt-2 text-gray-600">
                Authentication with JWT/OAuth, role-based access (user vs
                viewer), and private demo links. Built with a modern, type-safe
                stack.
              </p>
            </div>
            <div className="border rounded-xl p-6 flex items-center gap-4">
              <ShieldCheck className="w-10 h-10" />
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Auth & session management</li>
                <li>• Public / private publishing</li>
                <li>• REST or GraphQL API</li>
                <li>• PostgreSQL persistence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Submission block (for the internship task) */}
      <section id="submission" className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Submission</h2>
          <p className="mt-2 text-gray-600">
            Deadline – within 48 hours of receiving.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6">
              <h3 className="font-semibold">What to share</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li>• Deployed URL of the App</li>
                <li>• Backend deployed URL (if separate)</li>
                <li>• Demo video of the app</li>
                <li>• GitHub repo link</li>
              </ul>
            </div>
            <div className="border rounded-xl p-6">
              <h3 className="font-semibold">Quick links</h3>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <Link
                  href="/demo/public"
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" /> Live Demo
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <Gauge className="w-4 h-4" /> Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Upload Tour
                </Link>
                <Link
                  href="/editor"
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" /> Open Editor
                </Link>
              </div>
            </div>
          </div>

          {/* Placeholder row to paste real links once deployed */}
          <div className="mt-8 border rounded-xl p-6">
            <h3 className="font-semibold">Your Links</h3>
            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-gray-500">Deployed App URL</div>
                <div className="font-mono break-all">
                  https://your-frontend.vercel.app
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500">Backend URL</div>
                <div className="font-mono break-all">
                  https://your-backend.onrender.com
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500">Demo Video</div>
                <div className="font-mono break-all">
                  https://drive.google.com/your-demo-link
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-gray-500">GitHub Repo</div>
                <div className="font-mono break-all">
                  https://github.com/your-username/marvedge
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Marvedge. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
