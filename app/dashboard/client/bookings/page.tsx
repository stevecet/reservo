"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  MoreHorizontal,
  MessageSquare,
  Bell,
  Settings,
  Search,
  X,
  CalendarDays,
  DollarSign,
  Edit,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface ClientBooking {
  id: number
  service: {
    name: string
    duration: number
    price: number
    category: string
  }
  provider: {
    name: string
    avatar: string
    rating: number
    reviews: number
    location: string
  }
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no-show"
  createdAt: string
  paymentStatus: "pending" | "paid" | "refunded"
  cancellationDeadline: string
  notes?: string
}

export default function ClientBookingsPage() {
  const [bookings, setBookings] = useState<ClientBooking[]>([
    {
      id: 1,
      service: {
        name: "Professional Photography Session",
        duration: 120,
        price: 300,
        category: "Photography",
      },
      provider: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        reviews: 127,
        location: "New York, NY",
      },
      date: "2024-01-20",
      time: "14:00",
      status: "confirmed",
      createdAt: "2024-01-15",
      paymentStatus: "paid",
      cancellationDeadline: "2024-01-18T14:00:00",
      notes: "Looking for professional headshots for LinkedIn profile",
    },
    {
      id: 2,
      service: {
        name: "Personal Training Session",
        duration: 60,
        price: 80,
        category: "Fitness",
      },
      provider: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        reviews: 89,
        location: "Los Angeles, CA",
      },
      date: "2024-01-25",
      time: "09:00",
      status: "pending",
      createdAt: "2024-01-16",
      paymentStatus: "pending",
      cancellationDeadline: "2024-01-23T09:00:00",
    },
    {
      id: 3,
      service: {
        name: "Hair Cut & Styling",
        duration: 90,
        price: 65,
        category: "Beauty",
      },
      provider: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
        reviews: 203,
        location: "Miami, FL",
      },
      date: "2024-01-10",
      time: "15:00",
      status: "completed",
      createdAt: "2024-01-05",
      paymentStatus: "paid",
      cancellationDeadline: "2024-01-08T15:00:00",
    },
    {
      id: 4,
      service: {
        name: "Math Tutoring Session",
        duration: 60,
        price: 50,
        category: "Education",
      },
      provider: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
        reviews: 45,
        location: "Online",
      },
      date: "2024-01-08",
      time: "16:00",
      status: "cancelled",
      createdAt: "2024-01-03",
      paymentStatus: "refunded",
      cancellationDeadline: "2024-01-06T16:00:00",
    },
  ])

  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<ClientBooking | null>(null)
  const [cancellingBooking, setCancellingBooking] = useState<ClientBooking | null>(null)
  const [cancellationReason, setCancellationReason] = useState("")
  const { toast } = useToast()

  const getFilteredBookings = () => {
    const today = new Date().toISOString().split("T")[0]

    const filtered = bookings.filter((booking) => {
      const matchesSearch =
        booking.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || booking.status === statusFilter

      const matchesTab = (() => {
        switch (activeTab) {
          case "upcoming":
            return booking.date >= today && ["pending", "confirmed"].includes(booking.status)
          case "past":
            return booking.date < today || ["completed", "cancelled", "no-show"].includes(booking.status)
          default:
            return true
        }
      })()

      return matchesSearch && matchesStatus && matchesTab
    })

    return filtered.sort((a, b) => {
      if (activeTab === "upcoming") {
        return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
      }
      return new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime()
    })
  }

  const canCancelBooking = (booking: ClientBooking) => {
    const now = new Date()
    const cancellationDeadline = new Date(booking.cancellationDeadline)
    return now < cancellationDeadline && ["pending", "confirmed"].includes(booking.status)
  }

  const handleCancelBooking = (bookingId: number, reason: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "cancelled" as const, paymentStatus: "refunded" as const }
          : booking,
      ),
    )

    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled and you'll receive a refund within 3-5 business days.",
    })

    setCancellingBooking(null)
    setCancellationReason("")
  }

  const getStatusColor = (status: ClientBooking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`)
    return {
      date: dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  const filteredBookings = getFilteredBookings()

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => ["pending", "confirmed"].includes(b.status)).length,
    completed: bookings.filter((b) => b.status === "completed").length,
    spent: bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.service.price, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">BookingHub</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-foreground">
                Browse Services
              </Link>
              <Link href="/dashboard/client" className="text-foreground font-medium">
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your appointments and booking history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-primary">${stats.spent}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming ({stats.upcoming})</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : activeTab === "upcoming"
                          ? "You don't have any upcoming bookings"
                          : "You don't have any past bookings"}
                    </p>
                    {activeTab === "upcoming" && (
                      <Button asChild>
                        <Link href="/services">Browse Services</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredBookings.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={booking.provider.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {booking.provider.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{booking.service.name}</h3>
                              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-2">with {booking.provider.name}</p>
                            <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDateTime(booking.date, booking.time).date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {formatDateTime(booking.date, booking.time).time} (
                                  {formatDuration(booking.service.duration)})
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>${booking.service.price}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{booking.provider.rating}</span>
                                <span>({booking.provider.reviews} reviews)</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{booking.provider.location}</span>
                              </div>
                            </div>
                            {booking.notes && (
                              <div className="mt-2 p-2 bg-muted rounded text-sm">
                                <strong>Notes:</strong> {booking.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {canCancelBooking(booking) && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 border-red-600 bg-transparent"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this booking? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="my-4">
                                  <Label htmlFor="reason">Reason for cancellation (optional)</Label>
                                  <Textarea
                                    id="reason"
                                    value={cancellationReason}
                                    onChange={(e) => setCancellationReason(e.target.value)}
                                    placeholder="Please let us know why you're cancelling..."
                                    className="mt-2"
                                  />
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCancelBooking(booking.id, cancellationReason)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Cancel Booking
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message Provider
                              </DropdownMenuItem>
                              {booking.status === "completed" && (
                                <DropdownMenuItem>
                                  <Star className="h-4 w-4 mr-2" />
                                  Write Review
                                </DropdownMenuItem>
                              )}
                              {["pending", "confirmed"].includes(booking.status) && (
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Reschedule
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription>Complete information about your booking</DialogDescription>
              </DialogHeader>
              <ClientBookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Client Booking Details Modal Component
function ClientBookingDetailsModal({ booking, onClose }: { booking: ClientBooking; onClose: () => void }) {
  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`)
    return {
      date: dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  const getStatusColor = (status: ClientBooking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Service Information */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Service Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-medium">{booking.service.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category:</span>
            <Badge variant="outline">{booking.service.category}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span>{formatDuration(booking.service.duration)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-semibold">${booking.service.price}</span>
          </div>
        </div>
      </div>

      {/* Provider Information */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Provider Information</h3>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={booking.provider.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {booking.provider.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <h4 className="font-medium text-lg">{booking.provider.name}</h4>
            <div className="flex items-center space-x-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{booking.provider.rating}</span>
              <span className="text-muted-foreground">({booking.provider.reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{booking.provider.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Appointment Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{formatDateTime(booking.date, booking.time).date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span>{formatDateTime(booking.date, booking.time).time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment:</span>
            <Badge variant={booking.paymentStatus === "paid" ? "default" : "outline"}>{booking.paymentStatus}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booked on:</span>
            <span>
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {booking.notes && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Your Notes</h3>
          <p className="text-sm text-muted-foreground">{booking.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message Provider
        </Button>
      </div>
    </div>
  )
}
