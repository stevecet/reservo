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
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingBookings = [
    {
      id: 1,
      service: "Professional Photography Session",
      provider: "Sarah Johnson",
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
      service: "Personal Training Session",
      provider: "Mike Chen",
      date: "2024-01-18",
      time: "9:00 AM",
      duration: "1 hour",
      location: "FitLife Gym",
      status: "confirmed",
      price: "$80",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const pastBookings = [
    {
      id: 3,
      service: "Hair Cut & Styling",
      provider: "Emma Rodriguez",
      date: "2024-01-10",
      time: "3:00 PM",
      duration: "1.5 hours",
      location: "Bella Salon",
      status: "completed",
      price: "$65",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      service: "Math Tutoring",
      provider: "David Kim",
      date: "2024-01-08",
      time: "4:00 PM",
      duration: "1 hour",
      location: "Online",
      status: "completed",
      price: "$50",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const favoriteProviders = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "Photography",
      rating: 4.9,
      reviews: 127,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      service: "Hair Styling",
      rating: 5.0,
      reviews: 203,
      avatar: "/placeholder.svg?height=40&width=40",
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
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            Manage your bookings and discover new services
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Find Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse and book new services
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">My Bookings</h3>
                  <p className="text-sm text-muted-foreground">
                    View upcoming appointments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Favorites</h3>
                  <p className="text-sm text-muted-foreground">
                    Your saved providers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>
                  Manage your appointments and booking history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past Bookings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4">
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
                                  {booking.provider
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
                                  with {booking.provider}
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
                              Message Provider
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="past" className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage
                                  src={booking.avatar || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                  {booking.provider
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
                                  with {booking.provider}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                                {booking.rating && (
                                  <div className="flex items-center space-x-1 mt-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < booking.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      Your rating
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="mb-2">
                                {booking.status}
                              </Badge>
                              <p className="font-semibold">{booking.price}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                            <Button variant="outline" size="sm">
                              Write Review
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Providers */}
            <Card>
              <CardHeader>
                <CardTitle>Favorite Providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {favoriteProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center space-x-3"
                  >
                    <Avatar>
                      <AvatarImage
                        src={provider.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {provider.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {provider.service}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">
                          {provider.rating} ({provider.reviews})
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Book
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Search */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search services..." className="pl-10" />
                </div>
                <Button className="w-full">Find Services</Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Booking confirmed</p>
                  <p className="text-muted-foreground">
                    Photography session with Sarah
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Review submitted</p>
                  <p className="text-muted-foreground">
                    5-star review for Emma
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Payment processed</p>
                  <p className="text-muted-foreground">$65 for hair styling</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
