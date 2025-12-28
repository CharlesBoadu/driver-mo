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

function ForgotPasswordPage() {
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await authApi.triggerResetPassword({
      email: clientForm?.email,
    });
    setLoading(false);

    if (response?.code === "GS200") {
      toast({
        title: "Reset password triggered successfully!",
        description: "Check your email for further instructions.",
      });
      navigate("/reset-password");
    } else {
      toast({
        title: "Login Failed",
        description: response?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Passsword - Driver Mo Insurance</title>
        <meta
          name="description"
          content="Initiate a request to reset your password"
        />
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
                  Forgot Password
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
                  <TabsContent value="phone_password">
                    <form
                      onSubmit={handleForgotPassword}
                      className="space-y-6 pt-4"
                    >
                      <div className="bg-orange-50 border-l-4 border-orange-400 text-orange-800 p-3 rounded-r-lg">
                        <p className="text-sm">
                          Email:{" "}
                          <span className="font-mono">test@gmail.com</span>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="client-email"
                            type="tel"
                            placeholder="Enter your email"
                            value={clientForm.email}
                            onChange={(e) =>
                              setClientForm({
                                ...clientForm,
                                email: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="mt-6 text-end">
                        <p className="text-sm text-gray-600">
                          Already have an account?{" "}
                          <span
                            onClick={() => navigate("/login")}
                            className="font-semibold text-orange-600 hover:underline cursor-pointer"
                          >
                            Login
                          </span>
                        </p>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-lg"
                      >
                        {loading ? "processing..." : "Reset"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
