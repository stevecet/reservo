"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Calendar,
  Search,
  Star,
  MapPin,
  Users,
  Shield,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle,
  Camera,
  Dumbbell,
  Scissors,
  BookOpen,
  Briefcase,
  Home,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featuredServices = [
    {
      id: 1,
      name: "Professional Photography",
      provider: "Sarah Johnson",
      rating: 4.9,
      reviews: 127,
      price: "$150/hour",
      image: "/placeholder.svg?height=200&width=300",
      category: "Photography",
      location: "New York, NY",
      verified: true,
    },
    {
      id: 2,
      name: "Personal Training",
      provider: "Mike Chen",
      rating: 4.8,
      reviews: 89,
      price: "$80/hour",
      image: "/placeholder.svg?height=200&width=300",
      category: "Fitness",
      location: "Los Angeles, CA",
      verified: true,
    },
    {
      id: 3,
      name: "Hair Styling",
      provider: "Emma Rodriguez",
      rating: 5.0,
      reviews: 203,
      price: "$65/session",
      image: "/placeholder.svg?height=200&width=300",
      category: "Beauty",
      location: "Miami, FL",
      verified: true,
    },
    {
      id: 4,
      name: "Math Tutoring",
      provider: "David Kim",
      rating: 4.9,
      reviews: 156,
      price: "$50/hour",
      image: "/placeholder.svg?height=200&width=300",
      category: "Education",
      location: "Chicago, IL",
      verified: true,
    },
  ];

  const categories = [
    { name: "Photography", icon: Camera, count: "1,234 services" },
    { name: "Fitness", icon: Dumbbell, count: "856 services" },
    { name: "Beauty", icon: Scissors, count: "2,103 services" },
    { name: "Education", icon: BookOpen, count: "743 services" },
    { name: "Consulting", icon: Briefcase, count: "567 services" },
    { name: "Home Services", icon: Home, count: "1,890 services" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Providers",
      description:
        "All service providers are background-checked and verified for your safety and peace of mind.",
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description:
        "Book appointments instantly with real-time availability and automated confirmations.",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description:
        "Skip the back-and-forth. Book services instantly with our streamlined booking process.",
    },
    {
      icon: Heart,
      title: "Satisfaction Guaranteed",
      description:
        "We stand behind every booking with our satisfaction guarantee and review system.",
    },
  ];

  const testimonials = [
    {
      name: "Jessica Chen",
      role: "Small Business Owner",
      content:
        "Reservo has transformed how I manage my photography business. The booking system is seamless!",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Fitness Enthusiast",
      content:
        "Finding and booking personal trainers has never been easier. Great platform with verified professionals.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
    },
    {
      name: "Sarah Thompson",
      role: "Busy Parent",
      content:
        "As a working mom, Reservo saves me so much time. I can book services for the whole family in minutes.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
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
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/services"
                className="text-muted-foreground hover:text-foreground"
              >
                Browse Services
              </Link>
              <Link
                href="/how-it-works"
                className="text-muted-foreground hover:text-foreground"
              >
                How It Works
              </Link>
              <Link
                href="/become-provider"
                className="text-muted-foreground hover:text-foreground"
              >
                Become a Provider
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Services from
            <span className="text-primary"> Trusted Professionals</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified service providers in your area. From
            photography to fitness, tutoring to home services - find and book
            the perfect professional for your needs.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="What service are you looking for?"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Location" className="pl-10" />
                    </div>
                  </div>
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Service Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100K+</div>
              <div className="text-muted-foreground">Bookings Made</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Popular Service Categories
            </h2>
            <p className="text-muted-foreground">
              Discover services across various categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
            <p className="text-muted-foreground">
              Top-rated services from verified professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Card
                key={service.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    className="object-cover w-full h-full"
                  />
                  {service.verified && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        {service.price}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    by {service.provider}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {service.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({service.reviews})
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services">
              <Button size="lg">
                View All Services
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Reservo?</h2>
            <p className="text-muted-foreground">
              We make booking services simple, safe, and reliable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied clients and providers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join Reservo today and connect with trusted professionals in your
            area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">
                <Users className="h-4 w-4 mr-2" />
                Find Services
              </Button>
            </Link>
            <Link href="/become-provider">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Reservo</span>
              </div>
              <p className="text-muted-foreground">
                Connecting clients with trusted service providers for seamless
                booking experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Clients</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/services" className="hover:text-foreground">
                    Browse Services
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Providers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/become-provider"
                    className="hover:text-foreground"
                  >
                    Become a Provider
                  </Link>
                </li>
                <li>
                  <Link
                    href="/provider-resources"
                    className="hover:text-foreground"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/provider-support"
                    className="hover:text-foreground"
                  >
                    Provider Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Reservo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
