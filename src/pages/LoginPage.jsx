import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Info,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSignInStore } from "../stores/authStore";
import authApi from "../services/api/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone_password");
  const [loading, setLoading] = useState(false);
  const [clientForm, setClientForm] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      loginMethod === "phone_password" &&
      (!clientForm.phone || !clientForm.password)
    ) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone and password.",
        variant: "destructive",
      });
      return;
    }

    if (loginMethod === "phone" && (!clientForm.phone || !clientForm.otp)) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number and OTP.",
        variant: "destructive",
      });
      return;
    }

    // Demo user login
    // if (
    //   (clientForm.email === "demo@driver.mo" &&
    //     clientForm.password === "password123") ||
    //   (clientForm.phone === "020111222" && clientForm.otp === "123456")
    // ) {
    //   const demoOnboardingData = {
    //     vehicleRegistration: "DEMO-001",
    //     driverName: "Demo Driver",
    //     contactNumber: "020111222",
    //     vehicleType: "private_saloon",
    //     region: "Greater Accra",
    //     location: "Accra",
    //   };
    //   localStorage.setItem(
    //     "driverMoOnboarding",
    //     JSON.stringify(demoOnboardingData)
    //   );
    // }

    // localStorage.setItem(
    //   "driverMoUser",
    //   JSON.stringify({
    //     type: "client",
    //     email: clientForm.email || "demo-phone@driver.mo",
    //     loginTime: new Date().toISOString(),
    //   })
    // );
    setLoading(true);
    const response = await authApi.login({
      msisdn: clientForm?.phone,
      password: clientForm?.password,
    });
    setLoading(false);

    if (response?.status === "GS200") {
      toast({
        title: "Welcome Back!",
        description: "Successfully logged in to your Driver Mo account.",
      });
      const onboardingData = {
        vehicleRegistration: "DEMO-001",
        driverName: "Demo Driver",
        contactNumber: "020111222",
        vehicleType: "private_saloon",
        region: "Greater Accra",
        location: "Accra",
      };
      localStorage.setItem(
        "driverMoOnboarding",
        JSON.stringify(onboardingData)
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast({
        title: "Login Failed",
        description: response?.message,
        variant: "destructive",
      });
    }
  };

  const handleOtpRequest = () => {
    if (!clientForm.phone) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number to receive an OTP.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "OTP Sent!",
      description:
        "An OTP has been sent to your phone number (Demo OTP: 123456).",
    });
  };

  return (
    <>
      <Helmet>
        <title>Login - Driver Mo Insurance</title>
        <meta name="description" content="Login to your Driver Mo account." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl floating-animation"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/10 rounded-full blur-2xl floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative z-10 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-col items-center"
          >
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2508d51d-3209-478c-8611-2e55f445eb2e/9d58df4be2584daad64e7c4ce753e027.png"
              alt="Driver Mo Logo"
              className="h-20 w-auto mb-4"
            />
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
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
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold gradient-text mb-2">
                  Client Login
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Access your Driver Mo account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={loginMethod}
                  onValueChange={setLoginMethod}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone_password">
                      Phone & Password
                    </TabsTrigger>
                    <TabsTrigger value="phone">Phone & OTP</TabsTrigger>
                  </TabsList>
                  <TabsContent value="phone_password">
                    <form onSubmit={handleLogin} className="space-y-6 pt-4">
                      <div className="bg-orange-50 border-l-4 border-orange-400 text-orange-800 p-3 rounded-r-lg">
                        <p className="text-sm">
                          Phone Number:{" "}
                          <span className="font-mono">0248448374</span> | Pass:{" "}
                          <span className="font-mono">password123</span>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="client-phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={clientForm.phone}
                            onChange={(e) =>
                              setClientForm({
                                ...clientForm,
                                phone: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="client-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={clientForm.password}
                            onChange={(e) =>
                              setClientForm({
                                ...clientForm,
                                password: e.target.value,
                              })
                            }
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-lg"
                      >
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="phone">
                    <form onSubmit={handleLogin} className="space-y-6 pt-4">
                      <div className="bg-orange-50 border-l-4 border-orange-400 text-orange-800 p-3 rounded-r-lg">
                        <p className="text-sm">
                          Phone: <span className="font-mono">020111222</span> |
                          OTP: <span className="font-mono">123456</span>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="client-phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={clientForm.phone}
                            onChange={(e) =>
                              setClientForm({
                                ...clientForm,
                                phone: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-otp">
                          One-Time Password (OTP)
                        </Label>
                        <div className="flex gap-2">
                          <div className="relative flex-grow">
                            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="client-otp"
                              type="text"
                              placeholder="Enter OTP"
                              value={clientForm.otp}
                              onChange={(e) =>
                                setClientForm({
                                  ...clientForm,
                                  otp: e.target.value,
                                })
                              }
                              className="pl-10"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleOtpRequest}
                          >
                            Get OTP
                          </Button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-lg"
                      >
                        Sign In with OTP
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate("/onboarding")}
                      className="font-semibold text-orange-600 hover:underline cursor-pointer"
                    >
                      Register here
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
