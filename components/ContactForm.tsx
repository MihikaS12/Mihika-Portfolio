"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MessageSquare, Phone } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  company: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    company: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        setStatusMessage("Thank you for your message! I'll get back to you within 24 hours.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          company: "",
        })
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDirectEmail = () => {
    const emailSubject = encodeURIComponent(formData.subject || "Portfolio Contact")
    const emailBody = encodeURIComponent(
      `Hi Mihika,\n\nName: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`,
    )
    window.open(`mailto:sharmamihika76@gmail.com?subject=${emailSubject}&body=${emailBody}`)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi Mihika! I'm ${formData.name}${formData.company ? ` from ${formData.company}` : ""}. ${formData.message || "I would like to discuss a potential opportunity with you."}`,
    )
    window.open(`https://wa.me/919516091954?text=${message}`)
  }

  const handleLinkedIn = () => {
    window.open("https://linkedin.com/in/mihika-sharma-/", "_blank")
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white text-2xl font-bold text-center">Send a Message</CardTitle>
        <p className="text-white/80 text-center">Ready to discuss your next project? I'd love to hear from you!</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-white/20"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-white font-medium">
                Company/Organization
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={handleChange}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white font-medium">
              Subject *
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="What would you like to discuss?"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white font-medium">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project, opportunity, or any questions you have..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-white/20 resize-none"
            />
          </div>

          {/* Status Message */}
          {submitStatus !== "idle" && (
            <div
              className={`flex items-center gap-2 p-4 rounded-lg animate-fade-in ${
                submitStatus === "success"
                  ? "bg-green-500/20 border border-green-500/30 text-green-100"
                  : "bg-red-500/20 border border-red-500/30 text-red-100"
              }`}
            >
              {submitStatus === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="text-sm">{statusMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-primary-600 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 font-semibold py-3 text-lg shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Message...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Message
              </div>
            )}
          </Button>

          {/* Alternative Contact Methods */}
          <div className="space-y-3">
            <div className="text-center text-white/70 text-sm">
              <p>Prefer other ways to connect? Choose your favorite:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleDirectEmail}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleWhatsApp}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleLinkedIn}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="text-center text-white/60 text-xs">
            <p>All contact methods are secure and your information is handled with care.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
