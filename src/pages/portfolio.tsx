// src/pages/portfolio.tsx
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { PortfolioAllocation } from "@/components/dashboard/PortfolioAllocation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortfolioPage() {
  return (
    <DashboardLayout title="Portfolio">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Portfolio Overview */}
        <div className="lg:col-span-6">
          <PortfolioOverview />
        </div>
        
        {/* Portfolio Allocation */}
        <div className="lg:col-span-6">
          <PortfolioAllocation />
        </div>
        
        {/* Performance Summary */}
        <Card className="lg:col-span-12">
          <CardHeader className="bg-blue-50 px-6 py-5 dark:bg-blue-950/20">
            <CardTitle className="text-lg font-semibold">
              Performance History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-500 dark:text-gray-400 text-center py-16">
              Detailed performance history will be added here
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}