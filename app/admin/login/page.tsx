"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate admin authentication
    setTimeout(() => {
      if (credentials.email === "admin@bookinghub.com" && credentials.password === "admin123") {
        // Set admin cookies (in a real app, use proper JWT tokens)
        document.cookie = "admin-token=valid; path=/"
        document.cookie = "user-role=admin; path=/"

        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        })

        router.push("/admin")
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid admin credentials. Please try again.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-8 w-8 text-primary mr-2" />
          <span className="text-2xl font-bold">Admin Portal</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Administrator Login</CardTitle>
            <CardDescription>Access the BookingHub admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@bookinghub.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
                {isLoading ? "Signing in..." : "Sign In as Admin"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
              <p className="text-sm font-mono">Email: admin@bookinghub.com</p>
              <p className="text-sm font-mono">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
