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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  Clock,
  DollarSign,
  Eye,
  EyeOff,
  Calendar,
  Bell,
  Settings,
  Search,
  MoreHorizontal,
  Copy,
  Share,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  images: string[];
  status: "active" | "inactive" | "draft";
  bookings: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export default function ServiceManagementPage() {
  const [services, setServices] = useState<Service[]>([
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
      status: "active",
      bookings: 45,
      rating: 4.9,
      reviews: 38,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-10",
    },
    {
      id: 2,
      name: "30-Minute Consultation",
      description:
        "Quick consultation session to discuss your photography needs, style preferences, and project requirements.",
      duration: 30,
      price: 50,
      category: "Photography",
      images: ["/placeholder.svg?height=200&width=300"],
      status: "active",
      bookings: 23,
      rating: 4.8,
      reviews: 19,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-12",
    },
    {
      id: 3,
      name: "Event Photography Package",
      description:
        "Complete event coverage including pre-event preparation, full event photography, and post-processing of all images.",
      duration: 480,
      price: 800,
      category: "Photography",
      images: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
      status: "draft",
      bookings: 0,
      rating: 0,
      reviews: 0,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const categories = [
    "Photography",
    "Beauty",
    "Fitness",
    "Education",
    "Consulting",
    "Home Services",
    "Health & Wellness",
    "Technology",
    "Creative Services",
  ];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || service.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || service.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateService = (serviceData: Partial<Service>) => {
    const newService: Service = {
      id: Date.now(),
      name: serviceData.name || "",
      description: serviceData.description || "",
      duration: serviceData.duration || 60,
      price: serviceData.price || 0,
      category: serviceData.category || "",
      images: serviceData.images || [],
      status: "draft",
      bookings: 0,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setServices([...services, newService]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Service Created",
      description: "Your new service has been created successfully.",
    });
  };

  const handleEditService = (serviceData: Partial<Service>) => {
    if (!editingService) return;

    const updatedServices = services.map((service) =>
      service.id === editingService.id
        ? {
            ...service,
            ...serviceData,
            updatedAt: new Date().toISOString().split("T")[0],
          }
        : service
    );

    setServices(updatedServices);
    setEditingService(null);
    toast({
      title: "Service Updated",
      description: "Your service has been updated successfully.",
    });
  };

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter((service) => service.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "The service has been removed from your listings.",
    });
  };

  const handleToggleStatus = (serviceId: number) => {
    const updatedServices = services.map((service) =>
      service.id === serviceId
        ? {
            ...service,
            status: service.status === "active" ? "inactive" : "active",
            updatedAt: new Date().toISOString().split("T")[0],
          }
        : service
    );

    setServices(updatedServices);
    toast({
      title: "Status Updated",
      description: "Service status has been changed.",
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
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
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Service Management</h1>
            <p className="text-muted-foreground">
              Create and manage your service offerings
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Service</DialogTitle>
                <DialogDescription>
                  Add a new service to your offerings. Fill in all the details
                  to attract more clients.
                </DialogDescription>
              </DialogHeader>
              <ServiceForm
                onSubmit={handleCreateService}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
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
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Service Image */}
              <div className="aspect-video relative">
                <img
                  src={
                    service.images[0] || "/placeholder.svg?height=200&width=300"
                  }
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    variant={
                      service.status === "active"
                        ? "default"
                        : service.status === "inactive"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setEditingService(service)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleStatus(service.id)}
                      >
                        {service.status === "active" ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">
                      {service.name}
                    </CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {service.category}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Service Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold text-foreground">
                      ${service.price}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-muted-foreground">Bookings:</span>
                    <span className="font-medium">{service.bookings}</span>
                  </div>
                  {service.rating > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="text-muted-foreground">
                        ({service.reviews})
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setEditingService(service)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={
                      service.status === "active" ? "secondary" : "default"
                    }
                    size="sm"
                    className="flex-1"
                    onClick={() => handleToggleStatus(service.id)}
                  >
                    {service.status === "active" ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        Show
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">
                  No services found
                </h3>
                <p>
                  {searchTerm ||
                  filterCategory !== "all" ||
                  filterStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "Create your first service to start accepting bookings"}
                </p>
              </div>
              {!searchTerm &&
                filterCategory === "all" &&
                filterStatus === "all" && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Service
                  </Button>
                )}
            </CardContent>
          </Card>
        )}

        {/* Edit Service Dialog */}
        {editingService && (
          <Dialog
            open={!!editingService}
            onOpenChange={() => setEditingService(null)}
          >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Service</DialogTitle>
                <DialogDescription>
                  Update your service details to keep your offerings current.
                </DialogDescription>
              </DialogHeader>
              <ServiceForm
                service={editingService}
                onSubmit={handleEditService}
                onCancel={() => setEditingService(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

// Service Form Component
function ServiceForm({
  service,
  onSubmit,
  onCancel,
}: {
  service?: Service;
  onSubmit: (data: Partial<Service>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    duration: service?.duration || 60,
    price: service?.price || 0,
    category: service?.category || "",
    images: service?.images || [],
  });

  const [imageUrls, setImageUrls] = useState<string[]>(service?.images || []);
  const [newImageUrl, setNewImageUrl] = useState("");

  const categories = [
    "Photography",
    "Beauty",
    "Fitness",
    "Education",
    "Consulting",
    "Home Services",
    "Health & Wellness",
    "Technology",
    "Creative Services",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      images: imageUrls,
    });
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Service Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Professional Photography Session"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Detailed explanation of your service..."
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="duration">Duration (minutes) *</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: Number.parseInt(e.target.value) || 0,
                })
              }
              min="15"
              step="15"
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number.parseFloat(e.target.value) || 0,
                })
              }
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <Label>Service Images</Label>

        {/* Add Image */}
        <div className="flex space-x-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL or upload image"
            className="flex-1"
          />
          <Button type="button" onClick={addImage} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Image Preview */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url || "/placeholder.svg?height=120&width=180"}
                  alt={`Service image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          Add images to showcase your service. The first image will be used as
          the main thumbnail.
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {service ? "Update Service" : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
