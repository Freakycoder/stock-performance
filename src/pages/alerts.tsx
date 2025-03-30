// src/pages/alerts.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Bell, Droplet, MapPin, Clock, Settings, CircleAlert, ChevronRight, Plus, AlertTriangle, Check, X } from "lucide-react";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: "urgent", 
      title: "Urgent Need: O Negative Blood", 
      message: "City General Hospital has an urgent need for O- blood type donors. Can you help?", 
      time: "10 minutes ago", 
      read: false 
    },
    { 
      id: 2, 
      type: "request", 
      title: "New Donation Request", 
      message: "County Medical Center has requested blood type A+ for scheduled surgeries.", 
      time: "2 hours ago", 
      read: false 
    },
    { 
      id: 3, 
      type: "info", 
      title: "Donation Drive This Weekend", 
      message: "Join us for a community blood donation drive at Central Plaza on Saturday.", 
      time: "Yesterday", 
      read: true 
    },
    { 
      id: 4, 
      type: "success", 
      title: "Thank You for Your Donation", 
      message: "Your recent donation helped save three lives. Thank you for your generosity!", 
      time: "3 days ago", 
      read: true 
    },
  ]);

  const alertSettings = [
    { id: "urgent_alerts", label: "Urgent Blood Requests", description: "Notifications for critical blood needs", enabled: true },
    { id: "donation_requests", label: "New Donation Requests", description: "Alerts when hospitals request blood", enabled: true },
    { id: "nearby_drives", label: "Nearby Donation Drives", description: "Information about donation opportunities", enabled: true },
    { id: "thank_you", label: "Thank You Messages", description: "Updates on how your donations helped", enabled: true },
    { id: "push_notifications", label: "Push Notifications", description: "Receive alerts on your device", enabled: false },
    { id: "email_alerts", label: "Email Notifications", description: "Get alerts delivered to your inbox", enabled: true },
    { id: "sms_alerts", label: "SMS Notifications", description: "Receive text message alerts", enabled: false },
  ];

  const [settings, setSettings] = useState(alertSettings);

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const filteredNotifications = 
    activeTab === "all" 
      ? notifications 
      : activeTab === "unread" 
        ? notifications.filter((n) => !n.read) 
        : notifications.filter((n) => n.type === activeTab);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <CircleAlert className="h-5 w-5 text-red-600" />;
      case "request":
        return <Droplet className="h-5 w-5 text-blue-600" />;
      case "info":
        return <Bell className="h-5 w-5 text-indigo-600" />;
      case "success":
        return <Check className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout title="Alerts">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Alerts & Notifications</h1>
          <p className="text-gray-600 mt-2">
            Stay informed about urgent blood needs, donation requests, and other important updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <CardTitle>Notifications</CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge variant={notifications.some(n => !n.read) ? "info" : "outline"}>
                      {notifications.filter(n => !n.read).length} Unread
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <div className="border-b border-gray-200">
                <Tabs defaultValue="all" onValueChange={setActiveTab} className="px-6 pt-2">
                  <TabsList className="h-10 bg-transparent mb-2">
                    <TabsTrigger value="all" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="urgent" className="rounded-md px-4 py-2 data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-700 hover:text-red-600">
                      Urgent
                    </TabsTrigger>
                    <TabsTrigger value="request" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">
                      Requests
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">
                      Unread
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 transition-colors ${notification.read ? 'bg-white/80' : 'bg-blue-50/50'}`}
                      >
                        <div className="flex gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full 
                            ${notification.type === 'urgent' ? 'bg-red-100' : 
                              notification.type === 'request' ? 'bg-blue-100' : 
                                notification.type === 'info' ? 'bg-indigo-100' : 'bg-green-100'}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-gray-800">{notification.title}</h3>
                                <p className="text-gray-600 mt-1">{notification.message}</p>
                              </div>
                              <div className="flex gap-1 ml-4 shrink-0">
                                {!notification.read && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{notification.time}</span>
                              {notification.type === 'urgent' && (
                                <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700">
                                  Respond Now
                                </Button>
                              )}
                              {notification.type === 'request' && (
                                <Button size="sm" variant="outline" className="h-8 text-blue-600 border-blue-200">
                                  View Request
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Bell className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-gray-700 font-medium">No notifications</h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {activeTab === "all"
                          ? "You don't have any notifications yet."
                          : `You don't have any ${activeTab} notifications.`}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="text-blue-600 w-full">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Alert Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <CardTitle>Alert Settings</CardTitle>
                  <Settings className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {settings.map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{setting.label}</h4>
                        <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => toggleSetting(setting.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Priority Alerts</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-800">Urgent Blood Needs</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        You will always receive urgent blood type alerts that match your blood type (O-) regardless of your notification settings.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Your Priority Types</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["O-", "O+", "AB-", "AB+"].map((bloodType, i) => (
                      <div 
                        key={i} 
                        className={`border rounded-lg p-3 text-center ${
                          i === 0 ? "border-red-200 bg-red-50 text-red-700" : "border-gray-200"
                        }`}
                      >
                        <span className="font-medium">{bloodType}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    Manage Blood Types
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}