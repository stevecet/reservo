"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  DollarSign,
  Users,
  Bell,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProviderBookingsPage from "./bookings/page";
import ServiceManagementPage from "./services/page";
import AvailabilityManagementPage from "./availability/page";

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const stats = [
    {
      title: "Total Bookings",
      value: "127",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Revenue This Month",
      value: "$3,240",
      change: "+8%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Clients",
      value: "89",
      change: "+5%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "+0.1",
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  const upcomingBookings = [
    {
      id: 1,
      client: "John Doe",
      service: "Professional Photography Session",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "2 hours",
      location: "Central Park, NYC",
      status: "confirmed",
      price: "$300",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      client: "Alice Smith",
      service: "Portrait Photography",
      date: "2024-01-16",
      time: "10:00 AM",
      duration: "1 hour",
      location: "Studio",
      status: "confirmed",
      price: "$150",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const recentReviews = [
    {
      id: 1,
      client: "John Doe",
      rating: 5,
      comment: "Amazing photography session! Sarah captured beautiful moments.",
      date: "2024-01-10",
      service: "Professional Photography",
    },
    {
      id: 2,
      client: "Alice Smith",
      rating: 5,
      comment: "Professional and creative. Highly recommend!",
      date: "2024-01-08",
      service: "Portrait Photography",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Reservo</span>
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
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 ">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="my-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
              <p className="text-muted-foreground">
                Manage your services and bookings
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-green-600">
                          {stat.change} from last month
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center`}
                      >
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Bookings */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Bookings</CardTitle>
                      <CardDescription>Your next appointments</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={booking.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {booking.client
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold">
                                  {booking.service}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  with {booking.client}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                      {booking.time} ({booking.duration})
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-4 w-4" />
                                    <span>{booking.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="mb-2">
                                {booking.status}
                              </Badge>
                              <p className="font-semibold">{booking.price}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                            <Button variant="outline" size="sm">
                              Message Client
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">New booking received</p>
                      <p className="text-muted-foreground">
                        John Doe - Photography
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">5-star review received</p>
                      <p className="text-muted-foreground">From Alice Smith</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Payment received</p>
                      <p className="text-muted-foreground">
                        $150 for portrait session
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 days ago
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServiceManagementPage />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                <CardDescription>
                  See what your clients are saying
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&query=${review.client
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            />
                            <AvatarFallback>
                              {review.client
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{review.client}</h3>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge variant="outline">{review.service}</Badge>
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <ProviderBookingsPage />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <AvailabilityManagementPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
