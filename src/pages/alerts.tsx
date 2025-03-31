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
import { 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Settings, 
  AlertTriangle,
  ChevronRight, 
  Plus, 
  Check, 
  X, 
  Info,
  DollarSign,
  BarChart,
  Target,
  Percent
} from "lucide-react";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: "urgent", 
      title: "Price Alert: NVDA Exceeded $850", 
      message: "NVIDIA stock has exceeded your target price of $850. Consider reviewing your position.", 
      time: "10 minutes ago", 
      read: false 
    },
    { 
      id: 2, 
      type: "request", 
      title: "Volatility Alert: TSLA", 
      message: "Tesla has shown unusual volatility with a 5% intraday swing. Monitor the position closely.", 
      time: "2 hours ago", 
      read: false 
    },
    { 
      id: 3, 
      type: "info", 
      title: "Portfolio Rebalance Reminder", 
      message: "Your quarterly portfolio rebalance is due. Technology sector is currently 8% overweight.", 
      time: "Yesterday", 
      read: true 
    },
    { 
      id: 4, 
      type: "success", 
      title: "Buy Order Executed: AAPL", 
      message: "Your limit order to buy 15 shares of Apple at $190.45 has been successfully executed.", 
      time: "3 days ago", 
      read: true 
    },
  ]);

  const alertSettings = [
    { id: "price_alerts", label: "Price Alerts", description: "Notifications when stocks hit target prices", enabled: true },
    { id: "volatility_alerts", label: "Volatility Alerts", description: "Alerts for unusual market movements", enabled: true },
    { id: "earnings_alerts", label: "Earnings Announcements", description: "Notifications for upcoming earnings releases", enabled: true },
    { id: "portfolio_alerts", label: "Portfolio Threshold Alerts", description: "Alerts when portfolio metrics cross thresholds", enabled: true },
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
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "request":
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case "info":
        return <Info className="h-5 w-5 text-indigo-600" />;
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
          <h1 className="text-2xl font-bold text-gray-800">Market & Portfolio Alerts</h1>
          <p className="text-gray-600 mt-2">
            Stay informed about price movements, market events, and important changes to your investments.
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
                      Price
                    </TabsTrigger>
                    <TabsTrigger value="request" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">
                      Volatility
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
                                  View Details
                                </Button>
                              )}
                              {notification.type === 'request' && (
                                <Button size="sm" variant="outline" className="h-8 text-blue-600 border-blue-200">
                                  Check Stock
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
                <CardTitle>Create New Alert</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                    <select className="w-full h-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <option value="price">Price Alert</option>
                      <option value="volume">Volume Alert</option>
                      <option value="change">% Change Alert</option>
                      <option value="portfolio">Portfolio Alert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Symbol</label>
                    <Input placeholder="AAPL, MSFT, etc." className="h-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                      <select className="w-full h-10 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <option value="above">Above</option>
                        <option value="below">Below</option>
                        <option value="change">% Change</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input placeholder="0.00" className="h-10 pl-8 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Popular Alert Templates</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Price Movement Alert</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Notifies you when a stock moves significantly</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <BarChart className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Volume Spike Alert</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Alerts when trading volume exceeds normal levels</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Target className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Target Price Alert</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Notifies when a stock reaches your target price</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <Percent className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Portfolio Threshold Alert</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Monitors when portfolio values cross key thresholds</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}