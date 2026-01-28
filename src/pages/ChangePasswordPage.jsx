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

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone_password");
  const [loading, setLoading] = useState(false);
  const [clientForm, setClientForm] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
    confirm_password: "",
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (clientForm.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    if (clientForm.password != clientForm.confirm_password) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const response = await authApi.changePassword({
      new_password: clientForm?.password,
    });
    setLoading(false);

    if (response?.code === "GS200") {
      toast({
        title: "Password change successful!",
        description: "You have successfully changed your password",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast({
        title: "Change password Failed",
        description: response?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Password - Driver Mo Insurance</title>
        <meta
          name="description"
          content="Change the password to your Driver Mo account."
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
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
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
                  Client Password Change
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Change the password to your driver mo account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={loginMethod}
                  onValueChange={setLoginMethod}
                  className="w-full"
                >
                  {/* <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone_password">
                      Phone & Password
                    </TabsTrigger>
                    <TabsTrigger value="phone">Phone & OTP</TabsTrigger>
                  </TabsList> */}
                  <TabsContent value="phone_password">
                    <form
                      onSubmit={handleResetPassword}
                      className="space-y-6 pt-4"
                    >
                      {/* <div className="bg-orange-50 border-l-4 border-orange-400 text-orange-800 p-3 rounded-r-lg">
                        <p className="text-sm">
                          Phone Number:{" "}
                          <span className="font-mono">0248448374</span> | Pass:{" "}
                          <span className="font-mono">password123</span>
                        </p>
                      </div> */}
                      <div className="space-y-2">
                        <Label htmlFor="client-phone">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="client-new-password"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            value={clientForm.phone}
                            onChange={(e) =>
                              setClientForm({
                                ...clientForm,
                                phone: e.target.value,
                              })
                            }
                            className="pl-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            {showNewPassword ? (
                              <Eye className="w-5 h-5" />
                            ) : (
                              <EyeOff className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-confirm-password">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="client-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={clientForm.confirm_password}
                            onChange={(e) =>
                              setClientForm({
                                ...clientForm,
                                confirm_password: e.target.value,
                              })
                            }
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                          >
                            {showConfirmPassword ? (
                              <Eye className="w-5 h-5" />
                            ) : (
                              <EyeOff className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      {/* <div className="mt-6 text-end">
                        <p className="text-sm text-gray-600">
                          Already have an account?{" "}
                          <span
                            onClick={() => navigate("/login")}
                            className="font-semibold text-orange-600 hover:underline cursor-pointer"
                          >
                            Login
                          </span>
                        </p>
                      </div> */}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 text-lg"
                      >
                        {loading ? "Changing password..." : "Change Password"}
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

export default ChangePasswordPage;
