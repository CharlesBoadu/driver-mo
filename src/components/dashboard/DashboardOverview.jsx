import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Shield, DollarSign, FileText, Bell, PlusCircle, History, Car, Droplets, Coins as HandCoins } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const premiumData = [
  { name: 'Jan', paid: 40 },
  { name: 'Feb', paid: 30 },
  { name: 'Mar', paid: 50 },
  { name: 'Apr', paid: 45 },
  { name: 'May', paid: 60 },
  { name: 'Jun', paid: 55 },
];

function DashboardOverview({ user }) {
  const handleFeatureClick = (feature) => {
    toast({
      title: `🚧 ${feature} Coming Soon!`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.driverName || 'Driver'}!</h2>
        <p className="text-gray-500">Here's a summary of your insurance activities.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Number of Vehicles" value="1" icon={Car} color="text-blue-500" />
        <StatCard title="Total Volume & Value Purchased" value="110L / GHS 1,650" icon={Droplets} color="text-green-500" />
        <StatCard title="Total Premiums Paid" value="GHS 19.00" icon={DollarSign} color="text-orange-500" />
        <StatCard title="Total Claims Paid" value="GHS 1,500.00" icon={HandCoins} color="text-purple-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Premium Trends</CardTitle>
            <CardDescription>Your cumulative premiums paid over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={premiumData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `GHS ${value}`} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Legend />
                <Bar dataKey="paid" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="text-sm text-gray-600">Your policy <span className="font-semibold text-gray-800">AUTO-12345</span> is due for renewal in 15 days.</li>
                <li className="text-sm text-gray-600">New promotional offer available at Frimps Fuel stations.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-orange-500 text-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3">
              <Button variant="secondary" onClick={() => handleFeatureClick('File a Claim')} className="justify-start gap-2"><PlusCircle className="w-4 h-4" /> File a New Claim</Button>
              <Button variant="secondary" onClick={() => handleFeatureClick('View History')} className="justify-start gap-2"><History className="w-4 h-4" /> View Purchase History</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;