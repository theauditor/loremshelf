import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import {
  Send,
  CheckCircle,
  Clock,
  Award,
  Users,
  AlertCircle,
  FileText
} from 'lucide-react'

export function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    submission: '',
    synopsis: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://fox.lorempress.co/api/resource/Submissions', {
        method: 'POST',
        headers: {
          'Authorization': 'token 37555e836101c2f:84dd7d46d343106',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            full_name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            submission: formData.submission,
            synopsis: formData.synopsis
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit. Please try again.')
      }

      const result = await response.json()
      setSubmissionId(result.data.name)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setSubmissionId('')
    setError('')
    setFormData({
      name: '',
      mobile: '',
      email: '',
      submission: '',
      synopsis: ''
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <section className="section-padding bg-cream-100">
          <div className="container mx-auto px-6 md:px-[67px]">
            <div className="max-w-2xl mx-auto text-center">
              <div className="size-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-8">
                <CheckCircle className="size-10 text-green-600" />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-normal text-black mb-6">
                Submission Received Successfully!
              </h1>

              <p className="font-sans text-lg text-gray-500 mb-6 leading-relaxed">
                Thank you for submitting your work to Lorem. Our editorial team will review your submission
                and get back to you within 10 business days with detailed feedback.
              </p>

              {submissionId && (
                <div className="bg-white border border-green-200 rounded-lg p-6 mb-8">
                  <p className="font-sans text-sm text-gray-600 mb-2">Your Submission ID</p>
                  <p className="font-mono text-xl font-semibold text-green-700">{submissionId}</p>
                  <p className="font-sans text-xs text-gray-500 mt-2">
                    Please save this ID for your records
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <Button size="lg" onClick={resetForm}>
                  Submit Another Work
                </Button>
                <div>
                  <Link to="/" className="font-sans text-brown-600 hover:underline">
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-cream-100 to-cream-50">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="text-center mb-8">
            <Badge className="mb-8 bg-brown-700 text-white hover:bg-brown-800">
              Submission Portal
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6">
              Submit Your Work for{' '}
              <span className="text-brown-700">Review!</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              You can submit your work for us to review through the form below. <strong>Please paste 30%
              or 3 Unit/Chapters/Samples</strong> in the submissions box and write a detailed synopsis.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Clock className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-medium text-black mb-4">
                  10-Day Response
                </h3>
                <p className="font-sans text-gray-500 mb-4">
                  All submissions receive detailed feedback within 10 business days
                </p>
                <div className="font-sans text-sm text-brown-700">
                  Guaranteed response time
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Award className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-medium text-black mb-4">
                  Editorial Review
                </h3>
                <p className="font-sans text-gray-500 mb-4">
                  Every submission receives thorough editorial assessment and constructive feedback
                </p>
                <div className="font-sans text-sm text-brown-700">
                  Professional evaluation
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="size-12 bg-brown-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Users className="size-6 text-white" />
                </div>
                <h3 className="font-serif text-xl font-medium text-black mb-4">
                  Author Support
                </h3>
                <p className="font-sans text-gray-500 mb-4">
                  Dedicated support throughout your publishing journey, from submission to publication
                </p>
                <div className="font-sans text-sm text-brown-700">
                  20-year partnership
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="section-padding bg-cream-100">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl font-normal text-black text-center">
                  Submit Your Work
                </CardTitle>
                <p className="font-sans text-gray-500 text-center">
                  Fill out the form below to submit your work for editorial review. We'll get back to you within 10 business days.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans font-medium text-sm text-black mb-2">
                        Mobile *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block font-sans font-medium text-sm text-black mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Submission Text */}
                  <div className="border-t border-cream-300 pt-6">
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Submission (30% or 3 Unit/Chapters/Samples) *
                    </label>
                    <Textarea
                      required
                      rows={12}
                      value={formData.submission}
                      onChange={(e) => setFormData({ ...formData, submission: e.target.value })}
                      placeholder="Paste your submission here (approximately 30% of your work or 3 units/chapters/samples)..."
                      className="font-mono text-sm"
                    />
                    <p className="font-sans text-xs text-gray-500 mt-2">
                      Please include approximately 30% of your work or 3 complete units, chapters, or samples
                    </p>
                  </div>

                  {/* Synopsis */}
                  <div>
                    <label className="block font-sans font-medium text-sm text-black mb-2">
                      Synopsis *
                    </label>
                    <Textarea
                      required
                      rows={4}
                      value={formData.synopsis}
                      onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                      placeholder="Write a detailed synopsis of your work..."
                    />
                    <p className="font-sans text-xs text-gray-500 mt-2">
                      Provide a comprehensive overview of your work, including themes, plot points, and what makes it unique
                    </p>
                  </div>

                  {/* Submission Guidelines */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans font-medium text-blue-900 mb-1">
                          Before You Submit
                        </h4>
                        <p className="font-sans text-sm text-blue-800">
                          Please ensure your submission includes approximately 30% of your work (or 3 complete units/chapters)
                          and a detailed synopsis. We recommend proofreading your submission before sending.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans font-medium text-red-900 mb-1">
                            Submission Failed
                          </h4>
                          <p className="font-sans text-sm text-red-800">
                            {error}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full md:w-auto" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="size-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="size-4 mr-2" />
                        Submit for Review
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6 md:px-[67px]">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-brown-50 border-brown-200">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <FileText className="size-8 text-brown-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-xl font-medium text-black mb-3">
                      What Happens Next?
                    </h3>
                    <div className="space-y-3 font-sans text-gray-600">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-5 text-brown-700 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <strong>Review Process:</strong> Our editorial team will carefully review your submission
                          within 10 business days
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-5 text-brown-700 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <strong>Detailed Feedback:</strong> You'll receive constructive feedback and editorial
                          assessment of your work
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="size-5 text-brown-700 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          <strong>Next Steps:</strong> If your work is selected, we'll guide you through the
                          publishing process with dedicated support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
