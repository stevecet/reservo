"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent, userType: "client" | "provider") => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Registration Successful",
        description: `Welcome to BookingHub! Your ${userType} account has been created.`,
      })
      // In a real app, you would redirect to the appropriate dashboard
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Calendar className="h-8 w-8 text-primary mr-2" />
          <span className="text-2xl font-bold">BookingHub</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Join BookingHub and start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="provider">Service Provider</TabsTrigger>
              </TabsList>

              <TabsContent value="client">
                <form onSubmit={(e) => handleRegister(e, "client")} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-first-name">First Name</Label>
                      <Input id="client-first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-last-name">Last Name</Label>
                      <Input id="client-last-name" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone Number</Label>
                    <Input id="client-phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="client-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Client Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="provider">
                <form onSubmit={(e) => handleRegister(e, "provider")} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="provider-first-name">First Name</Label>
                      <Input id="provider-first-name" placeholder="Jane" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider-last-name">Last Name</Label>
                      <Input id="provider-last-name" placeholder="Smith" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-email">Email</Label>
                    <Input id="provider-email" type="email" placeholder="jane@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-phone">Phone Number</Label>
                    <Input id="provider-phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-business">Business Name</Label>
                    <Input id="provider-business" placeholder="Your Business Name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-category">Service Category</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your service category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="fitness">Fitness & Training</SelectItem>
                        <SelectItem value="beauty">Beauty & Wellness</SelectItem>
                        <SelectItem value="tutoring">Tutoring & Education</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="home-services">Home Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-description">Service Description</Label>
                    <Textarea
                      id="provider-description"
                      placeholder="Briefly describe your services..."
                      className="min-h-[80px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="provider-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Provider Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
