"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Calendar, Search, Star, MapPin, User, Heart, Share, Bell, Settings } from "lucide-react"
import Link from "next/link"

interface Service {
  id: number
  name: string
  description: string
  duration: number
  price: number
  category: string
  images: string[]
  provider: {
    id: number
    name: string
    avatar: string
    rating: number
    reviews: number
    location: string
    verified: boolean
  }
  rating: number
  reviews: number
  bookings: number
  featured: boolean
}

export default function ServiceDiscoveryPage() {
  const [services] = useState<Service[]>([
    {
      id: 1,
      name: "Professional Photography Session",
      description:
        "Comprehensive photography session including portrait, lifestyle, and creative shots. Perfect for professionals, models, or anyone looking for high-quality photos.",
      duration: 120,
      price: 300,
      category: "Photography",
      images: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
      provider: {
        id: 1,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        reviews: 127,
        location: "New York, NY",
        verified: true,
      },
      rating: 4.9,
      reviews: 38,
      bookings: 45,
      featured: true,
    },
    {
      id: 2,
      name: "Personal Training Session",
      description:
        "One-on-one fitness training session tailored to your goals. Includes workout plan, nutrition guidance, and progress tracking.",
      duration: 60,
      price: 80,
      category: "Fitness",
      images: ["/placeholder.svg?height=200&width=300"],
      provider: {
        id: 2,
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        reviews: 89,
        location: "Los Angeles, CA",
        verified: true,
      },
      rating: 4.8,
      reviews: 23,
      bookings: 67,
      featured: false,
    },
    {
      id: 3,
      name: "Hair Cut & Styling",
      description:
        "Professional hair cutting and styling service. Includes consultation, wash, cut, and styling with premium products.",
      duration: 90,
      price: 65,
      category: "Beauty",
      images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      provider: {
        id: 3,
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
        reviews: 203,
        location: "Miami, FL",
        verified: true,
      },
      rating: 5.0,
      reviews: 156,
      bookings: 234,
      featured: true,
    },
    {
      id: 4,
      name: "Math Tutoring Session",
      description:
        "Personalized math tutoring for students of all levels. Covers algebra, geometry, calculus, and test preparation.",
      duration: 60,
      price: 50,
      category: "Education",
      images: ["/placeholder.svg?height=200&width=300"],
      provider: {
        id: 4,
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
        reviews: 45,
        location: "Online",
        verified: true,
      },
      rating: 4.7,
      reviews: 34,
      bookings: 89,
      featured: false,
    },
    {
      id: 5,
      name: "Business Consultation",
      description:
        "Strategic business consultation for startups and small businesses. Includes market analysis, business planning, and growth strategies.",
      duration: 90,
      price: 150,
      category: "Consulting",
      images: ["/placeholder.svg?height=200&width=300"],
      provider: {
        id: 5,
        name: "Jennifer Walsh",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        reviews: 67,
        location: "San Francisco, CA",
        verified: true,
      },
      rating: 4.9,
      reviews: 23,
      bookings: 45,
      featured: false,
    },
    {
      id: 6,
      name: "Home Cleaning Service",
      description:
        "Professional home cleaning service including all rooms, bathrooms, kitchen, and common areas. Eco-friendly products available.",
      duration: 180,
      price: 120,
      category: "Home Services",
      images: ["/placeholder.svg?height=200&width=300"],
      provider: {
        id: 6,
        name: "Clean Pro Team",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
        reviews: 234,
        location: "Chicago, IL",
        verified: true,
      },
      rating: 4.6,
      reviews: 189,
      bookings: 567,
      featured: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const categories = [
    "Photography",
    "Fitness",
    "Beauty",
    "Education",
    "Consulting",
    "Home Services",
    "Health & Wellness",
    "Technology",
  ]

  const filteredAndSortedServices = services
    .filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.provider.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || service.category === selectedCategory

      const matchesPrice = (() => {
        switch (priceRange) {
          case "under-50":
            return service.price < 50
          case "50-100":
            return service.price >= 50 && service.price <= 100
          case "100-200":
            return service.price > 100 && service.price <= 200
          case "over-200":
            return service.price > 200
          default:
            return true
        }
      })()

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "popular":
          return b.bookings - a.bookings
        case "newest":
          return b.id - a.id
        default: // featured
          return b.featured ? 1 : -1
      }
    })

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

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
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/services" className="text-foreground font-medium">
                Browse Services
              </Link>
              <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Services</h1>
          <p className="text-muted-foreground">Find and book the perfect service for your needs</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services, providers, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-50">Under $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="over-200">Over $200</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedServices.length} of {services.length} services
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              {/* Service Image */}
              <div className="aspect-video relative" onClick={() => setSelectedService(service)}>
                <img
                  src={service.images[0] || "/placeholder.svg?height=200&width=300"}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge variant="secondary">{service.category}</Badge>
                  {service.featured && <Badge>Featured</Badge>}
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="h-8 w-8">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={service.provider.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {service.provider.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{service.provider.name}</span>
                      {service.provider.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">${service.price}</div>
                    <div className="text-xs text-muted-foreground">{formatDuration(service.duration)}</div>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 mt-2">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Service Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{service.provider.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedService(service)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedServices.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No services found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setPriceRange("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Service Detail Modal */}
        {selectedService && (
          <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Service Detail Modal Component
function ServiceDetailModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{service.name}</h2>
          <Badge className="mt-2">{service.category}</Badge>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">${service.price}</div>
          <div className="text-muted-foreground">{formatDuration(service.duration)}</div>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {service.images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg?height=200&width=300"}
            alt={`${service.name} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground">{service.description}</p>
      </div>

      {/* Provider Info */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">About the Provider</h3>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={service.provider.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {service.provider.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-semibold">{service.provider.name}</h4>
              {service.provider.verified && <Badge variant="outline">Verified</Badge>}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{service.provider.rating}</span>
                <span>({service.provider.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{service.provider.location}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Service Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold">{service.bookings}</div>
          <div className="text-sm text-muted-foreground">Bookings</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{service.rating}</div>
          <div className="text-sm text-muted-foreground">Rating</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{service.reviews}</div>
          <div className="text-sm text-muted-foreground">Reviews</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4 border-t">
        <Button className="flex-1">
          <Calendar className="h-4 w-4 mr-2" />
          Book Now
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Heart className="h-4 w-4 mr-2" />
          Save to Favorites
        </Button>
        <Button variant="outline">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
