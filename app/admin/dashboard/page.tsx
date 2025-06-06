"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  ArrowLeft,
  Send,
  Clock,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  UserX,
  Heart,
  Star,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateNigerianGuests } from "@/lib/dummy-data"
import { motion } from "framer-motion"
import type React from "react"

// Generate 500 dummy Nigerian guests
const dummyGuests = generateNigerianGuests(500)

// Prepare data for charts
const responseData = [
  { name: "Attending", value: 312 },
  { name: "Not Attending", value: 87 },
  { name: "Pending", value: 101 },
]

const genderData = [
  { name: "Male", value: 238 },
  { name: "Female", value: 262 },
]

const locationData = [
  { name: "Lagos", value: 215 },
  { name: "Abuja", value: 87 },
  { name: "Port Harcourt", value: 53 },
  { name: "Ibadan", value: 42 },
  { name: "Kano", value: 38 },
  { name: "Other", value: 65 },
]

const dailyResponseData = [
  { date: "Apr 1", responses: 25 },
  { date: "Apr 2", responses: 38 },
  { date: "Apr 3", responses: 52 },
  { date: "Apr 4", responses: 47 },
  { date: "Apr 5", responses: 60 },
  { date: "Apr 6", responses: 75 },
  { date: "Apr 7", responses: 89 },
  { date: "Apr 8", responses: 65 },
  { date: "Apr 9", responses: 49 },
]

const weeklyResponseData = [
  { week: "Week 1", responses: 120 },
  { week: "Week 2", responses: 180 },
  { week: "Week 3", responses: 95 },
  { week: "Week 4", responses: 105 },
]

const COLORS = ["#E8C7C8", "#8E4585", "#4A7C59", "#C45BAA", "#5B7DB1", "#D67236", "#FAEEC8"]

// Beautiful CSS-based visualization component
function ResponsesVisualization() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#8E4585] to-[#A855A7] rounded-lg overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FAEEC8' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 400,
              opacity: 0,
            }}
            animate={{
              y: [null, -50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="text-[#FAEEC8]" size={12 + Math.random() * 8} fill="currentColor" />
            ) : i % 3 === 1 ? (
              <Star className="text-[#E8C7C8]" size={12 + Math.random() * 8} />
            ) : (
              <Sparkles className="text-white" size={12 + Math.random() * 8} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center text-white">
        <h3 className="text-2xl font-bold mb-8 font-serif">RSVP Analytics</h3>

        <div className="grid grid-cols-3 gap-8 mb-8">
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-20 h-20 bg-[#E8C7C8] rounded-full mx-auto mb-4 flex items-center justify-center text-[#8E4585] font-bold text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              312
            </motion.div>
            <p className="text-sm font-medium">Attending</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="w-16 h-16 bg-[#8E4585] rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl border-4 border-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              87
            </motion.div>
            <p className="text-sm font-medium">Not Attending</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="w-18 h-18 bg-[#FAEEC8] rounded-full mx-auto mb-4 flex items-center justify-center text-[#8E4585] font-bold text-xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              101
            </motion.div>
            <p className="text-sm font-medium">Pending</p>
          </motion.div>
        </div>

        <motion.div
          className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm">
            <strong>62.4%</strong> acceptance rate
          </p>
          <p className="text-xs opacity-80 mt-1">Total responses: 500 guests</p>
        </motion.div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [emailForm, setEmailForm] = useState({
    to: "",
    subject: "Wedding Invitation - Adeola & Abiola",
    message:
      "Dear [Guest Name],\n\nWe are delighted to invite you to celebrate our wedding on August 8th, 2025 in Lagos, Nigeria.\n\nPlease RSVP by clicking the link below:\n[RSVP Link]\n\nWe look forward to sharing our special day with you.\n\nWarm regards,\nAdeola & Abiola",
  })

  const [isSending, setIsSending] = useState(false)
  const [previewName, setPreviewName] = useState("Guest Name")
  const [invitationUrl, setInvitationUrl] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [guestsPerPage, setGuestsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Calculate pagination
  const indexOfLastGuest = currentPage * guestsPerPage
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage

  // Filter guests based on search and status
  const filteredGuests = dummyGuests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || guest.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest)
  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage)

  useEffect(() => {
    // Set the invitation URL to the current page URL
    if (typeof window !== "undefined") {
      setInvitationUrl(window.location.origin + "/invitation/" + encodeURIComponent(previewName))
    }
  }, [previewName])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      // This would be replaced with an actual email sending API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Invitation Sent",
        description: "The wedding invitation has been sent successfully.",
      })

      setEmailForm((prev) => ({
        ...prev,
        to: "",
      }))
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending the invitation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleRowsPerPageChange = (value: string) => {
    setGuestsPerPage(Number.parseInt(value))
    setCurrentPage(1) // Reset to first page when changing rows per page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAEEC8] to-[#F5E6B8]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center text-[#8E4585] hover:underline">
            <ArrowLeft className="mr-2" size={16} />
            Back to Website
          </Link>

          <h1 className="text-3xl font-bold text-[#8E4585] font-serif">Admin Dashboard</h1>

          <Button variant="outline" className="border-[#8E4585] text-[#8E4585] hover:bg-[#8E4585] hover:text-white">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Users, title: "Total RSVPs", value: "500", subtitle: "Invited guests", color: "bg-[#E8C7C8]" },
            {
              icon: UserCheck,
              title: "Attending",
              value: "312",
              subtitle: "62.4% acceptance rate",
              color: "bg-green-100",
            },
            { icon: UserX, title: "Not Attending", value: "87", subtitle: "17.4% decline rate", color: "bg-red-100" },
            {
              icon: Clock,
              title: "Days Remaining",
              value: "375",
              subtitle: "Until August 8th, 2025",
              color: "bg-blue-100",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border border-[#8E4585]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${stat.color}`}>
                      <stat.icon className="text-[#8E4585]" size={20} />
                    </div>
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-[#8E4585]">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="analytics">
          <TabsList className="mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="invitations">Send Invitations</TabsTrigger>
            <TabsTrigger value="guests">Guest List</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>RSVP Status</CardTitle>
                  <CardDescription>Overview of guest responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={responseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {responseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guest Demographics</CardTitle>
                  <CardDescription>Gender distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Guest Locations</CardTitle>
                  <CardDescription>Where guests are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Responses</CardTitle>
                  <CardDescription>RSVP responses by week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyResponseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="responses" fill="#E8C7C8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Daily Responses</CardTitle>
                  <CardDescription>RSVP responses over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailyResponseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="responses" stroke="#8E4585" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Beautiful Visualization</CardTitle>
                  <CardDescription>Interactive view of RSVP status with Nigerian wedding theme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsesVisualization />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invitations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Wedding Invitations</CardTitle>
                  <CardDescription>Send personalized email invitations to your guests</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendEmail} className="space-y-6">
                    <div className="grid gap-2">
                      <Label htmlFor="to">Recipient Email</Label>
                      <Input
                        id="to"
                        name="to"
                        type="email"
                        value={emailForm.to}
                        onChange={handleEmailChange}
                        required
                        placeholder="guest@example.com"
                        className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="guestName">Guest Name</Label>
                      <Input
                        id="guestName"
                        name="guestName"
                        value={previewName}
                        onChange={(e) => setPreviewName(e.target.value)}
                        required
                        placeholder="Guest Name"
                        className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={emailForm.subject}
                        onChange={handleEmailChange}
                        required
                        className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={emailForm.message}
                        onChange={handleEmailChange}
                        required
                        rows={10}
                        className="border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                      />
                    </div>

                    <Button type="submit" disabled={isSending} className="bg-[#8E4585] hover:bg-[#7A3B75] text-white">
                      {isSending ? "Sending..." : "Send Invitation"}
                      <Send className="ml-2" size={16} />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invitation Preview</CardTitle>
                  <CardDescription>Preview the invitation with QR code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="invitation-preview" className="bg-white p-6 rounded-lg border-4 border-[#E8C7C8] mb-4">
                    <h2 className="text-2xl font-bold mb-2 text-[#8E4585] font-serif">Wedding Invitation</h2>
                    <p className="text-lg font-medium mb-4">Adeola & Abiola</p>

                    <div className="mb-4">
                      <p className="text-sm mb-1">Date: August 8th, 2025</p>
                      <p className="text-sm mb-1">Time: 2:00 PM</p>
                      <p className="text-sm mb-1">Venue: Eko Hotels & Suites, Lagos</p>
                    </div>

                    <p className="text-sm mb-4">
                      Dear {previewName}, we are honored to have you join us on our special day.
                    </p>

                    <div className="flex justify-center mb-2">
                      <QRCodeSVG value={invitationUrl} size={120} level="H" includeMargin={true} fgColor="#8E4585" />
                    </div>
                    <p className="text-xs text-[#8E4585]/70">Scan to view digital invitation</p>
                  </div>

                  <Button className="w-full bg-[#8E4585] hover:bg-[#7A3B75] text-white">
                    <Download className="mr-2" size={16} />
                    Download Invitation Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guests">
            <Card>
              <CardHeader>
                <CardTitle>Guest List</CardTitle>
                <CardDescription>Manage your wedding guests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search guests..."
                      className="pl-8 border-[#E8C7C8] focus-visible:ring-[#8E4585]"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="status-filter" className="whitespace-nowrap">
                        Status:
                      </Label>
                      <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                        <SelectTrigger id="status-filter" className="w-[180px]">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Attending">Attending</SelectItem>
                          <SelectItem value="Not Attending">Not Attending</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor="rows-per-page" className="whitespace-nowrap">
                        Show:
                      </Label>
                      <Select value={guestsPerPage.toString()} onValueChange={handleRowsPerPageChange}>
                        <SelectTrigger id="rows-per-page" className="w-[80px]">
                          <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Guests
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentGuests.map((guest, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {guest.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  guest.status === "Attending"
                                    ? "bg-green-100 text-green-800"
                                    : guest.status === "Not Attending"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {guest.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {guest.additionalGuests}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button variant="ghost" size="sm" className="text-[#8E4585]">
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {indexOfFirstGuest + 1} to {Math.min(indexOfLastGuest, filteredGuests.length)} of{" "}
                    {filteredGuests.length} guests
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pages around current page
                      let pageNum = i + 1
                      if (totalPages > 5) {
                        if (currentPage > 3) {
                          pageNum = currentPage - 3 + i
                        }
                        if (pageNum > totalPages - 4 && currentPage > totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        }
                      }

                      if (pageNum <= totalPages) {
                        return (
                          <Button
                            key={i}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className={currentPage === pageNum ? "bg-[#8E4585]" : ""}
                          >
                            {pageNum}
                          </Button>
                        )
                      }
                      return null
                    })}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
