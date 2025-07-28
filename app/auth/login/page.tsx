"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent, userType: "client" | "provider") => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Login Successful",
        description: `Welcome back! Redirecting to your ${userType} dashboard...`,
      })
      // In a real app, you would redirect to the appropriate dashboard
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Calendar className="h-8 w-8 text-primary mr-2" />
          <span className="text-2xl font-bold">BookingHub</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="provider">Service Provider</TabsTrigger>
              </TabsList>

              <TabsContent value="client">
                <form onSubmit={(e) => handleLogin(e, "client")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="client-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  <div className="flex items-center justify-between">
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Client"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="provider">
                <form onSubmit={(e) => handleLogin(e, "provider")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider-email">Email</Label>
                    <Input id="provider-email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="provider-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  <div className="flex items-center justify-between">
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In as Provider"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
