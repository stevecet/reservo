"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Check,
  X,
  MoreHorizontal,
  MessageSquare,
  Bell,
  Settings,
  Search,
  CalendarDays,
  DollarSign,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Booking {
  id: number
  service: {
    name: string
    duration: number
    price: number
    category: string
  }
  client: {
    name: string
    email: string
    phone: string
    avatar: string
    notes?: string
  }
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no-show"
  createdAt: string
  paymentStatus: "pending" | "paid" | "refunded"
  cancellationReason?: string
}

export default function ProviderBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      service: {
        name: "Professional Photography Session",
        duration: 120,
        price: 300,
        category: "Photography",
      },
      client: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg?height=40&width=40",
        notes: "Looking for professional headshots for LinkedIn profile",
      },
      date: "2024-01-20",
      time: "14:00",
      status: "pending",
      createdAt: "2024-01-15",
      paymentStatus: "pending",
    },
    {
      id: 2,
      service: {
        name: "Portrait Photography",
        duration: 60,
        price: 150,
        category: "Photography",
      },
      client: {
        name: "Alice Smith",
        email: "alice@example.com",
        phone: "+1 (555) 987-6543",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-18",
      time: "10:00",
      status: "confirmed",
      createdAt: "2024-01-12",
      paymentStatus: "paid",
    },
    {
      id: 3,
      service: {
        name: "Event Photography",
        duration: 240,
        price: 500,
        category: "Photography",
      },
      client: {
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "+1 (555) 456-7890",
        avatar: "/placeholder.svg?height=40&width=40",
        notes: "Wedding photography for outdoor ceremony",
      },
      date: "2024-01-25",
      time: "16:00",
      status: "confirmed",
      createdAt: "2024-01-10",
      paymentStatus: "paid",
    },
    {
      id: 4,
      service: {
        name: "Professional Photography Session",
        duration: 120,
        price: 300,
        category: "Photography",
      },
      client: {
        name: "Emma Wilson",
        email: "emma@example.com",
        phone: "+1 (555) 321-0987",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-05",
      time: "11:00",
      status: "completed",
      createdAt: "2024-01-01",
      paymentStatus: "paid",
    },
    {
      id: 5,
      service: {
        name: "Portrait Photography",
        duration: 60,
        price: 150,
        category: "Photography",
      },
      client: {
        name: "Mike Davis",
        email: "mike@example.com",
        phone: "+1 (555) 654-3210",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-01-03",
      time: "15:00",
      status: "cancelled",
      createdAt: "2023-12-28",
      paymentStatus: "refunded",
      cancellationReason: "Client requested cancellation due to scheduling conflict",
    },
  ])

  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const { toast } = useToast()

  const getFilteredBookings = () => {
    const today = new Date().toISOString().split("T")[0]

    const filtered = bookings.filter((booking) => {
      const matchesSearch =
        booking.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.client.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || booking.status === statusFilter

      const matchesTab = (() => {
        switch (activeTab) {
          case "upcoming":
            return booking.date >= today && ["pending", "confirmed"].includes(booking.status)
          case "past":
            return booking.date < today || ["completed", "cancelled", "no-show"].includes(booking.status)
          case "pending":
            return booking.status === "pending"
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

  const handleBookingAction = (bookingId: number, action: "confirm" | "decline" | "complete" | "no-show") => {
    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id === bookingId) {
          let newStatus: Booking["status"]
          switch (action) {
            case "confirm":
              newStatus = "confirmed"
              break
            case "decline":
              newStatus = "cancelled"
              break
            case "complete":
              newStatus = "completed"
              break
            case "no-show":
              newStatus = "no-show"
              break
            default:
              newStatus = booking.status
          }
          return { ...booking, status: newStatus }
        }
        return booking
      }),
    )

    const actionMessages = {
      confirm: "Booking confirmed successfully",
      decline: "Booking declined",
      complete: "Booking marked as completed",
      "no-show": "Booking marked as no-show",
    }

    toast({
      title: "Booking Updated",
      description: actionMessages[action],
    })
  }

  const getStatusColor = (status: Booking["status"]) => {
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
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    revenue: bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.service.price, 0),
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
              <Badge variant="secondary">Provider</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
          <p className="text-muted-foreground">Manage your appointments and client bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
                </div>
                <Check className="h-8 w-8 text-blue-600" />
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
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-primary">${stats.revenue}</p>
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
                  <SelectItem value="no-show">No Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({stats.pending + stats.confirmed})</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "You don't have any bookings in this category yet"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredBookings.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={booking.client.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {booking.client.name
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
                            <p className="text-muted-foreground mb-2">with {booking.client.name}</p>
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
                                <Mail className="h-4 w-4" />
                                <span>{booking.client.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="h-4 w-4" />
                                <span>{booking.client.phone}</span>
                              </div>
                            </div>
                            {booking.client.notes && (
                              <div className="mt-2 p-2 bg-muted rounded text-sm">
                                <strong>Notes:</strong> {booking.client.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {booking.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleBookingAction(booking.id, "confirm")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, "decline")}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleBookingAction(booking.id, "complete")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, "no-show")}
                              >
                                No Show
                              </Button>
                            </>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>
                                <User className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message Client
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                Reschedule
                              </DropdownMenuItem>
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
                <DialogDescription>Complete information about this booking</DialogDescription>
              </DialogHeader>
              <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Booking Details Modal Component
function BookingDetailsModal({ booking, onClose }: { booking: Booking; onClose: () => void }) {
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

  const getStatusColor = (status: Booking["status"]) => {
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

      {/* Client Information */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Client Information</h3>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={booking.client.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {booking.client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{booking.client.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{booking.client.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{booking.client.phone}</span>
            </div>
          </div>
        </div>
        {booking.client.notes && (
          <div className="mt-4 p-3 bg-muted rounded">
            <h4 className="font-medium mb-1">Client Notes:</h4>
            <p className="text-sm text-muted-foreground">{booking.client.notes}</p>
          </div>
        )}
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

      {/* Cancellation Reason */}
      {booking.cancellationReason && (
        <div className="border rounded-lg p-4 border-red-200 bg-red-50">
          <h3 className="font-semibold mb-2 text-red-800">Cancellation Reason</h3>
          <p className="text-sm text-red-700">{booking.cancellationReason}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Message Client
        </Button>
      </div>
    </div>
  )
}
