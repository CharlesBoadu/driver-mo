import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, Shield, Heart, ShieldCheck, ShieldHalf, Mail, Phone, Calendar, Car, Hash, UserCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

function PolicyDetails() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
          <CardDescription>AUTO-INS-2025-07-29</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-orange-600">
                <User className="w-5 h-5" />
                Client Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-gray-50/50">
                <DetailItem icon={User} label="Name" value="Mark Larbi" />
                <DetailItem icon={Mail} label="Email" value="demo@drivermo.com" />
                <DetailItem icon={Phone} label="Contact" value="020111222" />
                <DetailItem icon={Calendar} label="Date of Birth" value="01-JAN-1990" />
                <DetailItem icon={Hash} label="Vehicle Number" value="GT-1234-56" />
                <DetailItem icon={Car} label="Vehicle Type" value="Private Saloon" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-orange-600">
                <Users className="w-5 h-5" />
                Secondary Lives
              </h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50/50">
                  <p className="font-semibold mb-4">1. Secondary Life 1</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem icon={User} label="Name" value="Kwame Appiah" />
                    <DetailItem icon={Calendar} label="Date of Birth" value="01-JAN-1990" />
                    <DetailItem icon={UserCheck} label="Relationship" value="Father" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50/50">
                  <p className="font-semibold mb-4">2. Secondary Life 2</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem icon={User} label="Name" value="Maame Ama" />
                    <DetailItem icon={Calendar} label="Date of Birth" value="01-JAN-1990" />
                    <DetailItem icon={UserCheck} label="Relationship" value="Mother-in-law" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-orange-600">
                <Shield className="w-5 h-5" />
                Cover Details
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Life</TableHead>
                      <TableHead className="text-right">Death Benefit</TableHead>
                      <TableHead className="text-right">TPD</TableHead>
                      <TableHead className="text-right">Hospitalization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Principal (Mark Larbi)</TableCell>
                      <TableCell className="text-right">GHS 10,000.00</TableCell>
                      <TableCell className="text-right">GHS 5,000.00</TableCell>
                      <TableCell className="text-right">GHS 3,000.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Secondary Life 1 (Kwame Appiah)</TableCell>
                      <TableCell className="text-right">GHS 5,000.00</TableCell>
                      <TableCell className="text-right text-gray-400">-</TableCell>
                      <TableCell className="text-right text-gray-400">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Secondary Life 2 (Maame Ama)</TableCell>
                      <TableCell className="text-right">GHS 5,000.00</TableCell>
                      <TableCell className="text-right text-gray-400">-</TableCell>
                      <TableCell className="text-right text-gray-400">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PolicyDetails;