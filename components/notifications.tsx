"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X, Calendar, Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: number
  type: "booking_confirmed" | "booking_cancelled" | "booking_reminder" | "payment_received" | "review_received"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  metadata?: {
    bookingId?: number
    clientName?: string
    providerName?: string
    serviceName?: string
    amount?: number
    refundAmount?: number
    duration?: string
    location?: string
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      message: "Your photography session with Sarah Johnson has been confirmed for Jan 20, 2024 at 2:00 PM",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      actionUrl: "/dashboard/client/bookings",
      metadata: {
        bookingId: 1,
        providerName: "Sarah Johnson",
        serviceName: "Professional Photography Session",
        amount: 300,
        duration: "2 hours",
        location: "Central Park",
      },
    },
    {
      id: 2,
      type: "booking_reminder",
      title: "Appointment Reminder",
      message: "You have a personal training session with Mike Chen tomorrow at 9:00 AM",
      timestamp: "2024-01-24T18:00:00Z",
      read: false,
      actionUrl: "/dashboard/client/bookings",
      metadata: {
        bookingId: 2,
        providerName: "Mike Chen",
        serviceName: "Personal Training Session",
        location: "Gym",
      },
    },
    {
      id: 3,
      type: "payment_received",
      title: "Payment Received",
      message: "Payment of $300 received for photography session with John Doe",
      timestamp: "2024-01-15T14:20:00Z",
      read: true,
      actionUrl: "/dashboard/provider/bookings",
      metadata: {
        bookingId: 1,
        clientName: "John Doe",
        amount: 300,
      },
    },
    {
      id: 4,
      type: "review_received",
      title: "New Review",
      message: "Alice Smith left a 5-star review for your portrait photography service",
      timestamp: "2024-01-12T16:45:00Z",
      read: true,
      actionUrl: "/dashboard/provider/reviews",
      metadata: {
        clientName: "Alice Smith",
        serviceName: "Portrait Photography",
      },
    },
    {
      id: 5,
      type: "booking_cancelled",
      title: "Booking Cancelled",
      message: "Your booking with Mike Chen has been cancelled",
      timestamp: "2024-01-25T10:00:00Z",
      read: false,
      actionUrl: "/dashboard/client/bookings",
      metadata: {
        bookingId: 2,
        providerName: "Mike Chen",
        serviceName: "Personal Training Session",
        refundAmount: 150,
      },
    },
  ])

  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (notificationId: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking_confirmed":
        return <Check className="h-4 w-4 text-green-600" />
      case "booking_cancelled":
        return <X className="h-4 w-4 text-red-600" />
      case "booking_reminder":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "payment_received":
        return <Calendar className="h-4 w-4 text-green-600" />
      case "review_received":
        return <User className="h-4 w-4 text-purple-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      })
    }
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving a new notification occasionally
      if (Math.random() < 0.1) {
        const newNotification: Notification = {
          id: Date.now(),
          type: "booking_reminder",
          title: "Appointment Reminder",
          message: "You have an upcoming appointment in 1 hour",
          timestamp: new Date().toISOString(),
          read: false,
        }

        setNotifications((prev) => [newNotification, ...prev])
        toast({
          title: newNotification.title,
          description: newNotification.message,
        })
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [toast])

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <CardTitle className="text-lg">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
                  !notification.read ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Email notification templates (for backend implementation)
export const emailTemplates = {
  bookingConfirmation: {
    subject: "Booking Confirmed - {{serviceName}}",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Booking Confirmed!</h2>
        <p>Hi {{clientName}},</p>
        <p>Your booking has been confirmed. Here are the details:</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Appointment Details</h3>
          <p><strong>Service:</strong> {{serviceName}}</p>
          <p><strong>Provider:</strong> {{providerName}}</p>
          <p><strong>Date:</strong> {{date}}</p>
          <p><strong>Time:</strong> {{time}}</p>
          <p><strong>Duration:</strong> {{duration}}</p>
          <p><strong>Price:</strong> ${{ amount }}</p>
        </div>
        <p>If you need to make any changes, please contact us at least 24 hours before your appointment.</p>
        <p>Best regards,<br>BookingHub Team</p>
      </div>
    `,
  },
  bookingReminder: {
    subject: "Appointment Reminder - Tomorrow at {{time}}",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Appointment Reminder</h2>
        <p>Hi {{clientName}},</p>
        <p>This is a friendly reminder about your upcoming appointment:</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Service:</strong> {{serviceName}}</p>
          <p><strong>Provider:</strong> {{providerName}}</p>
          <p><strong>Date:</strong> {{date}}</p>
          <p><strong>Time:</strong> {{time}}</p>
          <p><strong>Location:</strong> {{location}}</p>
        </div>
        <p>Please arrive 5-10 minutes early for your appointment.</p>
        <p>Looking forward to seeing you!</p>
        <p>Best regards,<br>BookingHub Team</p>
      </div>
    `,
  },
  bookingCancellation: {
    subject: "Booking Cancelled - {{serviceName}}",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Booking Cancelled</h2>
        <p>Hi {{clientName}},</p>
        <p>Your booking has been cancelled as requested:</p>
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <p><strong>Service:</strong> {{serviceName}}</p>
          <p><strong>Provider:</strong> {{providerName}}</p>
          <p><strong>Original Date:</strong> {{date}}</p>
          <p><strong>Original Time:</strong> {{time}}</p>
        </div>
        <p>{{#if refundAmount}}A refund of ${{ refundAmount }} will be processed within 3-5 business days.{{/if}}</p>
        <p>We're sorry to see you go. Feel free to book again anytime!</p>
        <p>Best regards,<br>BookingHub Team</p>
      </div>
    `,
  },
}
