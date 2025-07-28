"use client";

import type React from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Phone,
  Mail,
  CalendarIcon,
  Bell,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  images: string[];
}

interface Provider {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  location: string;
  verified: boolean;
  services: Service[];
  workingHours: {
    [key: string]: { enabled: boolean; startTime: string; endTime: string };
  };
  blockedTimes: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  bufferTime: number;
}

interface BookingDetails {
  service: Service | null;
  provider: Provider | null;
  date: string;
  time: string;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
  };
}

type BookingStep =
  | "service"
  | "provider"
  | "datetime"
  | "details"
  | "confirmation";

export default function BookingFlowPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    service: null,
    provider: null,
    date: "",
    time: "",
    clientInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const [services] = useState<Service[]>([
    {
      id: 1,
      name: "Professional Photography Session",
      description:
        "Comprehensive photography session including portrait, lifestyle, and creative shots.",
      duration: 120,
      price: 300,
      category: "Photography",
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 2,
      name: "Personal Training Session",
      description:
        "One-on-one fitness training session tailored to your goals.",
      duration: 60,
      price: 80,
      category: "Fitness",
      images: ["/placeholder.svg?height=200&width=300"],
    },
    {
      id: 3,
      name: "Hair Cut & Styling",
      description:
        "Professional hair cutting and styling service with premium products.",
      duration: 90,
      price: 65,
      category: "Beauty",
      images: ["/placeholder.svg?height=200&width=300"],
    },
  ]);

  const [providers] = useState<Provider[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      verified: true,
      services: [services[0]],
      workingHours: {
        Monday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Tuesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Wednesday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Thursday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Friday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Saturday: { enabled: false, startTime: "10:00", endTime: "16:00" },
        Sunday: { enabled: false, startTime: "10:00", endTime: "16:00" },
      },
      blockedTimes: [
        { date: "2024-01-20", startTime: "10:00", endTime: "12:00" },
      ],
      bufferTime: 15,
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviews: 89,
      location: "Los Angeles, CA",
      verified: true,
      services: [services[1]],
      workingHours: {
        Monday: { enabled: true, startTime: "08:00", endTime: "18:00" },
        Tuesday: { enabled: true, startTime: "08:00", endTime: "18:00" },
        Wednesday: { enabled: true, startTime: "08:00", endTime: "18:00" },
        Thursday: { enabled: true, startTime: "08:00", endTime: "18:00" },
        Friday: { enabled: true, startTime: "08:00", endTime: "18:00" },
        Saturday: { enabled: true, startTime: "09:00", endTime: "15:00" },
        Sunday: { enabled: false, startTime: "10:00", endTime: "16:00" },
      },
      blockedTimes: [],
      bufferTime: 30,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
      reviews: 203,
      location: "Miami, FL",
      verified: true,
      services: [services[2]],
      workingHours: {
        Monday: { enabled: true, startTime: "10:00", endTime: "19:00" },
        Tuesday: { enabled: true, startTime: "10:00", endTime: "19:00" },
        Wednesday: { enabled: true, startTime: "10:00", endTime: "19:00" },
        Thursday: { enabled: true, startTime: "10:00", endTime: "19:00" },
        Friday: { enabled: true, startTime: "10:00", endTime: "19:00" },
        Saturday: { enabled: true, startTime: "09:00", endTime: "17:00" },
        Sunday: { enabled: false, startTime: "10:00", endTime: "16:00" },
      },
      blockedTimes: [],
      bufferTime: 15,
    },
  ]);

  const { toast } = useToast();

  const getAvailableProviders = (serviceId: number) => {
    return providers.filter((provider) =>
      provider.services.some((service) => service.id === serviceId)
    );
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const handleServiceSelect = (service: Service) => {
    setBookingDetails((prev) => ({
      ...prev,
      service,
      provider: null,
      date: "",
      time: "",
    }));
    setCurrentStep("provider");
  };

  const handleProviderSelect = (provider: Provider) => {
    setBookingDetails((prev) => ({ ...prev, provider }));
    setCurrentStep("datetime");
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setBookingDetails((prev) => ({ ...prev, date, time }));
    setCurrentStep("details");
  };

  const handleClientDetailsSubmit = (
    clientInfo: BookingDetails["clientInfo"]
  ) => {
    setBookingDetails((prev) => ({ ...prev, clientInfo }));
    setCurrentStep("confirmation");
  };

  const handleBookingSubmit = () => {
    // Simulate booking submission
    toast({
      title: "Booking Confirmed!",
      description:
        "Your appointment has been successfully booked. You'll receive a confirmation email shortly.",
    });

    // Reset booking flow
    setTimeout(() => {
      setCurrentStep("service");
      setBookingDetails({
        service: null,
        provider: null,
        date: "",
        time: "",
        clientInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          notes: "",
        },
      });
    }, 3000);
  };

  const goBack = () => {
    const steps: BookingStep[] = [
      "service",
      "provider",
      "datetime",
      "details",
      "confirmation",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const getStepNumber = (step: BookingStep) => {
    const steps: BookingStep[] = [
      "service",
      "provider",
      "datetime",
      "details",
      "confirmation",
    ];
    return steps.indexOf(step) + 1;
  };

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
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Book an Appointment</h1>
            {currentStep !== "service" && (
              <Button variant="outline" onClick={goBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {["service", "provider", "datetime", "details", "confirmation"].map(
              (step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      getStepNumber(currentStep) > index + 1
                        ? "bg-primary text-primary-foreground"
                        : getStepNumber(currentStep) === index + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {getStepNumber(currentStep) > index + 1 ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 4 && (
                    <div
                      className={`w-12 h-0.5 ${
                        getStepNumber(currentStep) > index + 1
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>

          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Service</span>
            <span>Provider</span>
            <span>Date & Time</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === "service" && (
          <ServiceSelectionStep
            services={services}
            onSelect={handleServiceSelect}
          />
        )}

        {currentStep === "provider" && bookingDetails.service && (
          <ProviderSelectionStep
            service={bookingDetails.service}
            providers={getAvailableProviders(bookingDetails.service.id)}
            onSelect={handleProviderSelect}
          />
        )}

        {currentStep === "datetime" &&
          bookingDetails.service &&
          bookingDetails.provider && (
            <DateTimeSelectionStep
              service={bookingDetails.service}
              provider={bookingDetails.provider}
              onSelect={handleDateTimeSelect}
            />
          )}

        {currentStep === "details" && (
          <ClientDetailsStep
            bookingDetails={bookingDetails}
            onSubmit={handleClientDetailsSubmit}
          />
        )}

        {currentStep === "confirmation" && (
          <BookingConfirmationStep
            bookingDetails={bookingDetails}
            onConfirm={handleBookingSubmit}
          />
        )}
      </div>
    </div>
  );
}

// Service Selection Step
function ServiceSelectionStep({
  services,
  onSelect,
}: {
  services: Service[];
  onSelect: (service: Service) => void;
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose a Service</h2>
        <p className="text-muted-foreground">
          Select the service you'd like to book
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(service)}
          >
            <div className="aspect-video relative">
              <img
                src={
                  service.images[0] || "/placeholder.svg?height=200&width=300"
                }
                alt={service.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <Badge className="absolute top-2 left-2">
                {service.category}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {service.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration} min</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary text-xl">
                    ${service.price}
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">
                Select Service
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Provider Selection Step
function ProviderSelectionStep({
  service,
  providers,
  onSelect,
}: {
  service: Service;
  providers: Provider[];
  onSelect: (provider: Provider) => void;
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose a Provider</h2>
        <p className="text-muted-foreground">
          Select a provider for{" "}
          <span className="font-medium">{service.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <Card
            key={provider.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(provider)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={provider.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {provider.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    {provider.verified && (
                      <Badge variant="outline">Verified</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{provider.rating}</span>
                      <span>({provider.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.location}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Select Provider
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Date & Time Selection Step
function DateTimeSelectionStep({
  service,
  provider,
  onSelect,
}: {
  service: Service;
  provider: Provider;
  onSelect: (date: string, time: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Generate available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
      const workingHours = provider.workingHours[dayName];

      if (workingHours?.enabled) {
        dates.push({
          date: date.toISOString().split("T")[0],
          display: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          dayName,
        });
      }
    }

    return dates;
  };

  // Generate available time slots for selected date
  const getAvailableTimeSlots = (date: string) => {
    if (!date) return [];

    const selectedDateObj = new Date(date);
    const dayName = selectedDateObj.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const workingHours = provider.workingHours[dayName];

    if (!workingHours?.enabled) return [];

    const slots = [];
    const startTime = new Date(`${date}T${workingHours.startTime}:00`);
    const endTime = new Date(`${date}T${workingHours.endTime}:00`);

    // Generate slots based on service duration + buffer time
    const slotDuration = service.duration + provider.bufferTime;

    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
      const slotEndTime = new Date(
        currentTime.getTime() + service.duration * 60000
      );

      if (slotEndTime <= endTime) {
        const timeString = currentTime.toTimeString().slice(0, 5);

        // Check if slot conflicts with blocked times
        const isBlocked = provider.blockedTimes.some((blocked) => {
          if (blocked.date !== date) return false;
          const blockedStart = blocked.startTime;
          const blockedEnd = blocked.endTime;
          return timeString >= blockedStart && timeString < blockedEnd;
        });

        if (!isBlocked) {
          slots.push({
            time: timeString,
            display: currentTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          });
        }
      }

      currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
    }

    return slots;
  };

  const availableDates = getAvailableDates();
  const availableTimeSlots = getAvailableTimeSlots(selectedDate);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Date & Time</h2>
        <p className="text-muted-foreground">
          Choose your preferred appointment time with{" "}
          <span className="font-medium">{provider.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>
              Choose an available date for your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {availableDates.map((dateOption) => (
                <Button
                  key={dateOption.date}
                  variant={
                    selectedDate === dateOption.date ? "default" : "outline"
                  }
                  className="h-auto p-3 flex flex-col items-center"
                  onClick={() => {
                    setSelectedDate(dateOption.date);
                    setSelectedTime(""); // Reset time when date changes
                  }}
                >
                  <span className="text-xs text-muted-foreground">
                    {dateOption.dayName}
                  </span>
                  <span className="font-medium">{dateOption.display}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Time</CardTitle>
            <CardDescription>
              {selectedDate
                ? "Choose your preferred time slot"
                : "Please select a date first"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((timeSlot) => (
                    <Button
                      key={timeSlot.time}
                      variant={
                        selectedTime === timeSlot.time ? "default" : "outline"
                      }
                      className="h-auto p-3"
                      onClick={() => setSelectedTime(timeSlot.time)}
                    >
                      {timeSlot.display}
                    </Button>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No available time slots for this date</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Select a date to see available times</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Summary */}
      {selectedDate && selectedTime && (
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Appointment Summary</h3>
                <p className="text-sm text-muted-foreground">
                  {service.name} with {provider.name} on{" "}
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(
                    `${selectedDate}T${selectedTime}`
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <Button onClick={handleContinue}>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Client Details Step
function ClientDetailsStep({
  bookingDetails,
  onSubmit,
}: {
  bookingDetails: BookingDetails;
  onSubmit: (clientInfo: BookingDetails["clientInfo"]) => void;
}) {
  const [formData, setFormData] = useState(bookingDetails.clientInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Details</h2>
        <p className="text-muted-foreground">
          Please provide your contact information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                We'll use this information to confirm your booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Any special requests or information for the provider..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Continue to Confirmation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">
                  {bookingDetails.service?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {bookingDetails.service?.duration} minutes
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={bookingDetails.provider?.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {bookingDetails.provider?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{bookingDetails.provider?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {bookingDetails.provider?.location}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {bookingDetails.date &&
                      new Date(bookingDetails.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {bookingDetails.time &&
                      new Date(
                        `${bookingDetails.date}T${bookingDetails.time}`
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">
                    ${bookingDetails.service?.price}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Booking Confirmation Step
function BookingConfirmationStep({
  bookingDetails,
  onConfirm,
}: {
  bookingDetails: BookingDetails;
  onConfirm: () => void;
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Confirm Your Booking</h2>
        <p className="text-muted-foreground">
          Please review your appointment details before confirming
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-600" />
              <span>Booking Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Service Details */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Service</h3>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{bookingDetails.service?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Duration: {bookingDetails.service?.duration} minutes
                  </p>
                  <Badge className="mt-1">
                    {bookingDetails.service?.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ${bookingDetails.service?.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Provider Details */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Provider</h3>
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={bookingDetails.provider?.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {bookingDetails.provider?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{bookingDetails.provider?.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{bookingDetails.provider?.rating}</span>
                    <span>({bookingDetails.provider?.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{bookingDetails.provider?.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Appointment Time</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {bookingDetails.date &&
                      new Date(bookingDetails.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {bookingDetails.time &&
                      new Date(
                        `${bookingDetails.date}T${bookingDetails.time}`
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </span>
                </div>
              </div>
            </div>

            {/* Client Details */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Your Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {bookingDetails.clientInfo.firstName}{" "}
                    {bookingDetails.clientInfo.lastName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingDetails.clientInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingDetails.clientInfo.phone}</span>
                </div>
                {bookingDetails.clientInfo.notes && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm text-muted-foreground">
                      {bookingDetails.clientInfo.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary">
                  ${bookingDetails.service?.price}
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <Button onClick={onConfirm} className="w-full" size="lg">
              <Check className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By confirming this booking, you agree to our terms of service and
              cancellation policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
