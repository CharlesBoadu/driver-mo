import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import PurchaseHistory from '@/components/dashboard/PurchaseHistory';
import ClaimsCenter from '@/components/dashboard/ClaimsCenter';
import PolicyDetails from '@/components/dashboard/PolicyDetails';
import Support from '@/components/dashboard/Support';
import { Shield, Fuel, HeartHandshake, LifeBuoy, FileText } from 'lucide-react';

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = localStorage.getItem('driverMoUser');
    // if (!userData) {
    //   navigate('/login');
    //   return;
    // }
    const parsedUser = JSON.parse(userData);
    const onboardingData = JSON.parse(localStorage.getItem('driverMoOnboarding'));
    setUser({ ...parsedUser, ...onboardingData });
  }, [navigate]);

  if (!user) {
    return <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-700">Loading your dashboard...</div>;
  }

  const tabs = [
    { value: 'overview', label: 'Dashboard', icon: Shield },
    { value: 'history', label: 'Purchase History', icon: Fuel },
    { value: 'claims', label: 'Claims Center', icon: FileText },
    { value: 'policy', label: 'Policy Details', icon: HeartHandshake },
    { value: 'support', label: 'Support', icon: LifeBuoy },
  ];

  return (
    <>
      <Helmet>
        <title>Client Dashboard - Driver Mo</title>
        <meta name="description" content="Manage your Driver Mo insurance policies, view purchase history, file claims, and more." />
      </Helmet>
      <DashboardLayout user={user}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-orange-100/80 rounded-lg p-1 h-auto mb-6">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex-col sm:flex-row h-14 sm:h-12 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md">
                <tab.icon className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="overview">
            <DashboardOverview user={user} />
          </TabsContent>
          <TabsContent value="history">
            <PurchaseHistory />
          </TabsContent>
          <TabsContent value="claims">
            <ClaimsCenter />
          </TabsContent>
          <TabsContent value="policy">
            <PolicyDetails />
          </TabsContent>
          <TabsContent value="support">
            <Support />
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </>
  );
}

export default DashboardPage;