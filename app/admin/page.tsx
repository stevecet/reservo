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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ModeToggle } from "@/components/mode-toggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Users,
  DollarSign,
  Shield,
  Settings,
  Search,
  Edit,
  Eye,
  UserCheck,
  UserX,
  Bell,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const { toast } = useToast();

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: "$284,590",
      change: "+18%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Bookings",
      value: "1,429",
      change: "+8%",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Platform Rating",
      value: "4.9",
      change: "+0.1",
      icon: Star,
      color: "text-yellow-600",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "provider",
      status: "active",
      joinDate: "2024-01-15",
      totalBookings: 127,
      revenue: "$15,240",
      rating: 4.9,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      services: ["Photography", "Event Planning"],
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "client",
      status: "active",
      joinDate: "2024-01-20",
      totalBookings: 23,
      spent: "$2,340",
      rating: null,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Los Angeles, CA",
      services: null,
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      role: "provider",
      status: "pending",
      joinDate: "2024-01-25",
      totalBookings: 0,
      revenue: "$0",
      rating: null,
      verified: false,
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Chicago, IL",
      services: ["Fitness Training"],
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      email: "emma@example.com",
      role: "provider",
      status: "suspended",
      joinDate: "2024-01-10",
      totalBookings: 89,
      revenue: "$8,920",
      rating: 4.2,
      verified: true,
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Miami, FL",
      services: ["Beauty", "Wellness"],
    },
  ];

  const bookings = [
    {
      id: 1,
      client: "John Doe",
      provider: "Sarah Johnson",
      service: "Professional Photography",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "completed",
      amount: "$300",
      commission: "$30",
    },
    {
      id: 2,
      client: "Alice Smith",
      provider: "Mike Chen",
      service: "Personal Training",
      date: "2024-01-16",
      time: "9:00 AM",
      status: "confirmed",
      amount: "$80",
      commission: "$8",
    },
    {
      id: 3,
      client: "Bob Wilson",
      provider: "Emma Rodriguez",
      service: "Hair Styling",
      date: "2024-01-17",
      time: "3:00 PM",
      status: "cancelled",
      amount: "$65",
      commission: "$0",
    },
  ];

  const reports = [
    {
      id: 1,
      type: "inappropriate_content",
      reporter: "John Doe",
      reported: "Mike Chen",
      reason: "Inappropriate service description",
      date: "2024-01-14",
      status: "pending",
      priority: "medium",
    },
    {
      id: 2,
      type: "payment_dispute",
      reporter: "Alice Smith",
      reported: "Sarah Johnson",
      reason: "Service not delivered as promised",
      date: "2024-01-13",
      status: "resolved",
      priority: "high",
    },
  ];

  const handleUserAction = (action: string, userId: number) => {
    const user = users.find((u) => u.id === userId);
    toast({
      title: `User ${action}`,
      description: `${user?.name} has been ${action.toLowerCase()}.`,
    });
  };

  const handleReportAction = (action: string, reportId: number) => {
    toast({
      title: `Report ${action}`,
      description: `Report #${reportId} has been ${action.toLowerCase()}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      pending: "secondary",
      suspended: "destructive",
      completed: "default",
      confirmed: "secondary",
      cancelled: "destructive",
      resolved: "default",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline",
    };
    return (
      <Badge variant={variants[priority] || "secondary"}>{priority}</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Reservo Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, bookings, and platform operations
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
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        New provider registered
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Mike Chen joined as fitness trainer
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      2 min ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Booking completed</p>
                      <p className="text-xs text-muted-foreground">
                        Photography session by Sarah Johnson
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      15 min ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Report submitted</p>
                      <p className="text-xs text-muted-foreground">
                        Payment dispute reported
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      1 hour ago
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Approve Pending Providers
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Review Reports
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Analytics Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export User Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage clients and service providers
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="providers">Providers</SelectItem>
                      <SelectItem value="clients">Clients</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{user.name}</h3>
                                {user.verified && (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                )}
                                <Badge
                                  variant={
                                    user.role === "provider"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {user.role}
                                </Badge>
                                {getStatusBadge(user.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                                <span>Joined: {user.joinDate}</span>
                                <span>Bookings: {user.totalBookings}</span>
                                {user.role === "provider" ? (
                                  <>
                                    <span>Revenue: {user.revenue}</span>
                                    {user.rating && (
                                      <div className="flex items-center space-x-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span>{user.rating}</span>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <span>Spent: {user.spent}</span>
                                )}
                              </div>
                              {user.services && (
                                <div className="flex items-center space-x-1 mt-1">
                                  {user.services.map((service, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    User Details: {user.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Complete user information and activity
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Name</Label>
                                    <p className="text-sm">{user.name}</p>
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <p className="text-sm">{user.email}</p>
                                  </div>
                                  <div>
                                    <Label>Role</Label>
                                    <p className="text-sm capitalize">
                                      {user.role}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <p className="text-sm capitalize">
                                      {user.status}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Location</Label>
                                    <p className="text-sm">{user.location}</p>
                                  </div>
                                  <div>
                                    <Label>Join Date</Label>
                                    <p className="text-sm">{user.joinDate}</p>
                                  </div>
                                  <div>
                                    <Label>Total Bookings</Label>
                                    <p className="text-sm">
                                      {user.totalBookings}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>
                                      {user.role === "provider"
                                        ? "Revenue"
                                        : "Spent"}
                                    </Label>
                                    <p className="text-sm">
                                      {user.role === "provider"
                                        ? user.revenue
                                        : user.spent}
                                    </p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {user.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleUserAction("Approved", user.id)
                                }
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            )}
                            {user.status === "active" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <UserX className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Suspend User
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to suspend{" "}
                                      {user.name}? This will prevent them from
                                      using the platform.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleUserAction("Suspended", user.id)
                                      }
                                    >
                                      Suspend
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
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
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>
                  Monitor and manage all platform bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">
                                {booking.service}
                              </h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">Client:</span>{" "}
                                {booking.client}
                              </div>
                              <div>
                                <span className="font-medium">Provider:</span>{" "}
                                {booking.provider}
                              </div>
                              <div>
                                <span className="font-medium">Date:</span>{" "}
                                {booking.date} at {booking.time}
                              </div>
                              <div>
                                <span className="font-medium">Amount:</span>{" "}
                                {booking.amount}
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="font-medium text-green-600">
                                Commission: {booking.commission}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Issues</CardTitle>
                <CardDescription>
                  Handle user reports and platform issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold capitalize">
                                {report.type.replace("_", " ")}
                              </h3>
                              {getStatusBadge(report.status)}
                              {getPriorityBadge(report.priority)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {report.reason}
                            </p>
                            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                              <div>
                                <span className="font-medium">Reporter:</span>{" "}
                                {report.reporter}
                              </div>
                              <div>
                                <span className="font-medium">Reported:</span>{" "}
                                {report.reported}
                              </div>
                              <div>
                                <span className="font-medium">Date:</span>{" "}
                                {report.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {report.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleReportAction("Resolved", report.id)
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Resolve
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleReportAction("Dismissed", report.id)
                                  }
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Dismiss
                                </Button>
                              </>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>
                    Configure platform-wide settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-approve providers</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically approve new provider registrations
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notifications for bookings
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Put the platform in maintenance mode
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Commission Settings</CardTitle>
                  <CardDescription>
                    Configure platform commission rates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                    <Input
                      id="commission-rate"
                      type="number"
                      defaultValue="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="min-commission">
                      Minimum Commission ($)
                    </Label>
                    <Input id="min-commission" type="number" defaultValue="5" />
                  </div>
                  <div>
                    <Label htmlFor="max-commission">
                      Maximum Commission ($)
                    </Label>
                    <Input
                      id="max-commission"
                      type="number"
                      defaultValue="100"
                    />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
