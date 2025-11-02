import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Car, User, Phone, MapPin, Hash, Globe, Droplet } from 'lucide-react';

function OnboardingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleRegistration: '',
    driverName: '',
    contactNumber: '',
    vehicleType: '',
    fuelType: '',
    region: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { vehicleRegistration, driverName, contactNumber, vehicleType, fuelType, region, location } = formData;

    if (!vehicleRegistration || !driverName || !contactNumber || !vehicleType || !fuelType || !region || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields to complete your registration.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('driverMoOnboarding', JSON.stringify(formData));

    toast({
      title: "Registration Successful!",
      description: "Welcome to Driver Mo! You can now log in.",
    });

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Onboarding - Driver Mo Insurance</title>
        <meta name="description" content="Register for Driver Mo. Provide your vehicle and personal details to get started." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
        <div className="absolute top-10 left-5 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl floating-animation"></div>
        <div className="absolute bottom-10 right-5 w-40 h-40 bg-orange-400/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '2s'}}></div>

        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-col items-center"
          >
            <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2508d51d-3209-478c-8611-2e55f445eb2e/9d58df4be2584daad64e7c4ce753e027.png" alt="Driver Mo Logo" className="h-20 w-auto mb-4" />
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/80 backdrop-blur-lg border-gray-200 shadow-2xl shadow-orange-200/50">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold gradient-text mb-2">
                  Join Driver Mo
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Let's get you set up. It only takes a minute.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="driverName">Driver's Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input id="driverName" placeholder="e.g. John Doe" value={formData.driverName} onChange={handleInputChange} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input id="contactNumber" type="tel" placeholder="e.g. 024 123 4567" value={formData.contactNumber} onChange={handleInputChange} className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input id="vehicleRegistration" placeholder="e.g. AS 1234-23" value={formData.vehicleRegistration} onChange={handleInputChange} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select onValueChange={(value) => handleSelectChange('vehicleType', value)}>
                        <SelectTrigger id="vehicleType" className="w-full">
                          <div className="flex items-center">
                            <Car className="mr-2 h-5 w-5 text-gray-400" />
                            <SelectValue placeholder="Select vehicle type" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private_saloon">Private Saloon</SelectItem>
                          <SelectItem value="van_trotro">Van/Trotro</SelectItem>
                          <SelectItem value="bus_trucks">Bus/Trucks</SelectItem>
                          <SelectItem value="tricycle_bike">Tricycle/Bike</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select onValueChange={(value) => handleSelectChange('fuelType', value)}>
                        <SelectTrigger id="fuelType" className="w-full">
                          <div className="flex items-center">
                            <Droplet className="mr-2 h-5 w-5 text-gray-400" />
                            <SelectValue placeholder="Select fuel type" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrol">Petrol</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="lpg">LPG</SelectItem>
                          <SelectItem value="ev">EV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input id="region" placeholder="e.g. Ashanti" value={formData.region} onChange={handleInputChange} className="pl-10" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input id="location" placeholder="e.g. Kumasi" value={formData.location} onChange={handleInputChange} className="pl-10" />
                      </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg pulse-glow mt-4"
                  >
                    Complete Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default OnboardingPage;