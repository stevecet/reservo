"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Edit, Trash2, Bell, Settings, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WorkingHours {
  day: string
  enabled: boolean
  startTime: string
  endTime: string
}

interface BlockedTime {
  id: number
  date: string
  startTime: string
  endTime: string
  reason: string
  type: "vacation" | "appointment" | "break" | "other"
}

interface AvailabilitySettings {
  bufferTime: number
  advanceBooking: number
  maxBookingsPerDay: number
  autoAccept: boolean
}

export default function AvailabilityManagementPage() {
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: "Monday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Thursday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Friday", enabled: true, startTime: "09:00", endTime: "17:00" },
    { day: "Saturday", enabled: false, startTime: "10:00", endTime: "16:00" },
    { day: "Sunday", enabled: false, startTime: "10:00", endTime: "16:00" },
  ])

  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([
    {
      id: 1,
      date: "2024-01-20",
      startTime: "10:00",
      endTime: "12:00",
      reason: "Personal appointment",
      type: "appointment",
    },
    {
      id: 2,
      date: "2024-01-25",
      startTime: "00:00",
      endTime: "23:59",
      reason: "Holiday - Christmas",
      type: "vacation",
    },
  ])

  const [availabilitySettings, setAvailabilitySettings] = useState<AvailabilitySettings>({
    bufferTime: 15,
    advanceBooking: 7,
    maxBookingsPerDay: 8,
    autoAccept: true,
  })

  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false)
  const [editingBlockedTime, setEditingBlockedTime] = useState<BlockedTime | null>(null)
  const { toast } = useToast()

  const updateWorkingHours = (dayIndex: number, field: keyof WorkingHours, value: string | boolean) => {
    const updated = [...workingHours]
    updated[dayIndex] = { ...updated[dayIndex], [field]: value }
    setWorkingHours(updated)
  }

  const saveWorkingHours = () => {
    toast({
      title: "Working Hours Updated",
      description: "Your availability schedule has been saved successfully.",
    })
  }

  const addBlockedTime = (blockedTime: Omit<BlockedTime, "id">) => {
    const newBlockedTime: BlockedTime = {
      ...blockedTime,
      id: Date.now(),
    }
    setBlockedTimes([...blockedTimes, newBlockedTime])
    setIsBlockTimeDialogOpen(false)
    toast({
      title: "Time Blocked",
      description: "The selected time has been marked as unavailable.",
    })
  }

  const updateBlockedTime = (updatedTime: BlockedTime) => {
    setBlockedTimes(blockedTimes.map((time) => (time.id === updatedTime.id ? updatedTime : time)))
    setEditingBlockedTime(null)
    toast({
      title: "Blocked Time Updated",
      description: "The blocked time has been updated successfully.",
    })
  }

  const removeBlockedTime = (id: number) => {
    setBlockedTimes(blockedTimes.filter((time) => time.id !== id))
    toast({
      title: "Time Unblocked",
      description: "The time slot is now available for bookings.",
    })
  }

  const saveAvailabilitySettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your availability preferences have been updated.",
    })
  }

  const getBlockTypeColor = (type: string) => {
    switch (type) {
      case "vacation":
        return "bg-blue-100 text-blue-800"
      case "appointment":
        return "bg-orange-100 text-orange-800"
      case "break":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">BookingHub</span>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Availability Management</h1>
          <p className="text-muted-foreground">Set your working hours and manage your schedule</p>
        </div>

        <Tabs defaultValue="working-hours" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="working-hours">Working Hours</TabsTrigger>
            <TabsTrigger value="blocked-times">Blocked Times</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Working Hours Tab */}
          <TabsContent value="working-hours">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>Set your regular working hours for each day of the week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {workingHours.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-24">
                      <Label className="font-medium">{day.day}</Label>
                    </div>
                    <Switch
                      checked={day.enabled}
                      onCheckedChange={(checked) => updateWorkingHours(index, "enabled", checked)}
                    />
                    {day.enabled ? (
                      <div className="flex items-center space-x-2 flex-1">
                        <Input
                          type="time"
                          value={day.startTime}
                          onChange={(e) => updateWorkingHours(index, "startTime", e.target.value)}
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={day.endTime}
                          onChange={(e) => updateWorkingHours(index, "endTime", e.target.value)}
                          className="w-32"
                        />
                      </div>
                    ) : (
                      <div className="flex-1">
                        <span className="text-muted-foreground">Unavailable</span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-end pt-4">
                  <Button onClick={saveWorkingHours}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Working Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blocked Times Tab */}
          <TabsContent value="blocked-times">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Blocked Times</CardTitle>
                  <CardDescription>Mark specific dates or times as unavailable</CardDescription>
                </div>
                <Dialog open={isBlockTimeDialogOpen} onOpenChange={setIsBlockTimeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Block Time
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Block Time Slot</DialogTitle>
                      <DialogDescription>Mark a specific date and time as unavailable for bookings</DialogDescription>
                    </DialogHeader>
                    <BlockTimeForm onSubmit={addBlockedTime} onCancel={() => setIsBlockTimeDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockedTimes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No blocked times set</p>
                      <p className="text-sm">Block specific dates or times when you're unavailable</p>
                    </div>
                  ) : (
                    blockedTimes.map((blockedTime) => (
                      <div key={blockedTime.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getBlockTypeColor(blockedTime.type)}>{blockedTime.type}</Badge>
                            <span className="font-medium">{blockedTime.date}</span>
                            <span className="text-muted-foreground">
                              {blockedTime.startTime} - {blockedTime.endTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{blockedTime.reason}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingBlockedTime(blockedTime)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeBlockedTime(blockedTime.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Availability Settings</CardTitle>
                <CardDescription>Configure your booking preferences and constraints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="buffer-time">Buffer Time (minutes)</Label>
                    <Input
                      id="buffer-time"
                      type="number"
                      value={availabilitySettings.bufferTime}
                      onChange={(e) =>
                        setAvailabilitySettings({
                          ...availabilitySettings,
                          bufferTime: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      min="0"
                      max="60"
                    />
                    <p className="text-sm text-muted-foreground">
                      Time between appointments for preparation and travel
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advance-booking">Advance Booking (days)</Label>
                    <Input
                      id="advance-booking"
                      type="number"
                      value={availabilitySettings.advanceBooking}
                      onChange={(e) =>
                        setAvailabilitySettings({
                          ...availabilitySettings,
                          advanceBooking: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      min="0"
                      max="365"
                    />
                    <p className="text-sm text-muted-foreground">How far in advance clients can book appointments</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-bookings">Max Bookings Per Day</Label>
                    <Input
                      id="max-bookings"
                      type="number"
                      value={availabilitySettings.maxBookingsPerDay}
                      onChange={(e) =>
                        setAvailabilitySettings({
                          ...availabilitySettings,
                          maxBookingsPerDay: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      min="1"
                      max="20"
                    />
                    <p className="text-sm text-muted-foreground">Maximum number of appointments per day</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-accept">Auto-Accept Bookings</Label>
                      <Switch
                        id="auto-accept"
                        checked={availabilitySettings.autoAccept}
                        onCheckedChange={(checked) =>
                          setAvailabilitySettings({
                            ...availabilitySettings,
                            autoAccept: checked,
                          })
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically accept bookings or require manual approval
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={saveAvailabilitySettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Blocked Time Dialog */}
        {editingBlockedTime && (
          <Dialog open={!!editingBlockedTime} onOpenChange={() => setEditingBlockedTime(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Blocked Time</DialogTitle>
                <DialogDescription>Update the blocked time slot details</DialogDescription>
              </DialogHeader>
              <BlockTimeForm
                blockedTime={editingBlockedTime}
                onSubmit={updateBlockedTime}
                onCancel={() => setEditingBlockedTime(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

// Block Time Form Component
function BlockTimeForm({
  blockedTime,
  onSubmit,
  onCancel,
}: {
  blockedTime?: BlockedTime
  onSubmit: (data: BlockedTime | Omit<BlockedTime, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    date: blockedTime?.date || "",
    startTime: blockedTime?.startTime || "09:00",
    endTime: blockedTime?.endTime || "17:00",
    reason: blockedTime?.reason || "",
    type: (blockedTime?.type as "vacation" | "appointment" | "break" | "other") || "appointment",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (blockedTime) {
      onSubmit({ ...blockedTime, ...formData })
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-time">Start Time</Label>
          <Input
            id="start-time"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-time">End Time</Label>
          <Input
            id="end-time"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vacation">Vacation</SelectItem>
            <SelectItem value="appointment">Personal Appointment</SelectItem>
            <SelectItem value="break">Break</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          placeholder="Optional reason for blocking this time..."
          className="min-h-[80px]"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{blockedTime ? "Update" : "Block Time"}</Button>
      </div>
    </form>
  )
}
