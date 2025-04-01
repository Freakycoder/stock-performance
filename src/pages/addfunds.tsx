// src/pages/add-funds.tsx
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Check, CreditCard, Wallet, DollarSign, AlertCircle, Banknote, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AddFundsPage() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Reset after showing completion
      setTimeout(() => {
        setIsComplete(false);
        setAmount("");
      }, 3000);
    }, 2000);
  };

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <DashboardLayout title="Add Funds">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add Funds</h1>
          <p className="text-gray-600 mt-2">
            Add funds to your investment account to expand your portfolio and seize market opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main funding form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Add Funds to Your Account</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Amount selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deposit Amount
                      </label>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {predefinedAmounts.map((preAmount) => (
                          <Button
                            key={preAmount}
                            type="button"
                            variant={amount === preAmount.toString() ? "default" : "outline"}
                            className="py-6"
                            onClick={() => setAmount(preAmount.toString())}
                          >
                            ${preAmount}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                        <Input
                          type="text"
                          placeholder="Other amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="pl-10 py-6 text-lg"
                        />
                      </div>
                    </div>

                    {/* Payment method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <Tabs defaultValue="card" onValueChange={setPaymentMethod} className=" w-full">
                        <TabsList className="grid grid-cols-3 mb-6">
                          <TabsTrigger value="card" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit Card
                          </TabsTrigger>
                          <TabsTrigger value="bank" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">
                            <Banknote className="mr-2 h-4 w-4" />
                            Bank Transfer
                          </TabsTrigger>
                          <TabsTrigger value="wallet" className="rounded-md px-4 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 hover:text-blue-600">
                            <Wallet className="mr-2 h-4 w-4" />
                            Digital Wallet
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="card">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                              </label>
                              <Input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="py-6"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Expiration Date
                                </label>
                                <Input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="py-6"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  CVC
                                </label>
                                <Input
                                  type="text"
                                  placeholder="123"
                                  className="py-6"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="bank">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Number
                              </label>
                              <Input
                                type="text"
                                placeholder="Enter account number"
                                className="py-6"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Routing Number
                              </label>
                              <Input
                                type="text"
                                placeholder="Enter routing number"
                                className="py-6"
                              />
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="wallet">
                          <div className="grid grid-cols-3 gap-4">
                            {["PayPal", "Apple Pay", "Google Pay"].map((wallet) => (
                              <button
                                key={wallet}
                                type="button"
                                className="border border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <div className="h-12 flex items-center justify-center">
                                  {/* Placeholder for wallet logos */}
                                  <span className="font-medium">{wallet}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Submit button */}
                    <div className="mt-8">
                      <Button
                        type="submit"
                        disabled={!amount || isProcessing || isComplete}
                        className="w-full py-6 text-lg"
                      >
                        {isProcessing ? (
                          "Processing..."
                        ) : isComplete ? (
                          <span className="flex items-center">
                            <Check className="mr-2 h-5 w-5" />
                            Deposit Complete!
                          </span>
                        ) : (
                          `Deposit $${amount || "0"}`
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Invest?</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Your deposits enable portfolio diversification, reduce average costs through dollar-cost averaging, and help seize market opportunities.
                    </p>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-800">Benefits of Regular Investing</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            Every $100 invested monthly could potentially grow to over $15,000 in 10 years with average market returns.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Deposits</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Johnson", amount: 100, date: "2 days ago" },
                      { name: "Michael Chen", amount: 50, date: "3 days ago" },
                      { name: "Anonymous", amount: 250, date: "1 week ago" },
                    ].map((donor, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{donor.name}</p>
                          <p className="text-xs text-gray-500">{donor.date}</p>
                        </div>
                        <span className="font-semibold text-gray-800">${donor.amount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-blue-600 flex items-center">
                    <span>View all deposits</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}