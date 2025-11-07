import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Car,
  Users,
  ArrowRight,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

function HomePage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Instant Coverage",
      description:
        "Get protected in seconds with our embedded insurance solutions",
    },
    {
      icon: Car,
      title: "No Hidden Charges",
      description:
        "Same price, same quantity while protecting your journey, life and family.",
    },
    {
      icon: Users,
      title: "Simple Onboarding",
      description:
        "Register your vehicle and get started in just a few minutes",
    },
  ];

  const benefits = [
    "Real-time insurance activation",
    "Seamless fuel station integration",
    "Competitive rates for drivers",
    "24/7 customer support",
    "Mobile-first experience",
  ];

  const images = [
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/2508d51d-3209-478c-8611-2e55f445eb2e/1f66633f306ac32f47743a1850964f41.jpg",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1470&q=80",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/2508d51d-3209-478c-8611-2e55f445eb2e/1f66633f306ac32f47743a1850964f41.jpg",
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const partners = [
    {
      name: "Goodwill Insurance Brokers",
      logo: "https://horizons-cdn.hostinger.com/2508d51d-3209-478c-8611-2e55f445eb2e/390e8daef08b94a494fdb8ef72305d0c.png",
    },
    {
      name: "miLife Insurance",
      logo: "https://horizons-cdn.hostinger.com/2508d51d-3209-478c-8611-2e55f445eb2e/d2dac2c46dee9ad969ebacb578c5ffa6.png",
    },
    { name: "Vivo Energy Ghana", logo: "/vevo-energy-logo.jpeg" },
    // { name: "Vivo Energy Ghana", logo: "https://horizons-cdn.hostinger.com/2508d51d-3209-478c-8611-2e55f445eb2e/d56c4673b886c9fe8cae11d8125009d9.png" },
  ];

  return (
    <>
      <Helmet>
        <title>Driver Mo - Thank You Driver Insurance</title>
        <meta
          name="description"
          content="Driver Mo provides embedded insurance solutions for drivers. Get instant coverage and thank you driver benefits."
        />
      </Helmet>

      <div className="min-h-screen overflow-hidden bg-gray-50">
        <header className="absolute top-0 left-0 right-0 z-20">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <img
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2508d51d-3209-478c-8611-2e55f445eb2e/9d58df4be2584daad64e7c4ce753e027.png"
              alt="Driver Mo Logo"
              className="h-16 w-auto"
            />
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="text-gray-600 hover:text-orange-600 font-medium"
              >
                Contact
              </a>
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-600 hover:bg-orange-500/10 hover:text-white"
                onClick={() => navigate("/login")}
              >
                Client Login
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        {/* <section className="relative h-screen w-full">
          <img
            alt="Driver looking at camera from inside his vehicle"
            className="w-full h-full object-cover"
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2508d51d-3209-478c-8611-2e55f445eb2e/1f66633f306ac32f47743a1850964f41.jpg"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white shadow-lg">
                Driver Mo
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Simple, embedded insurance solutions that recognize and protect
                drivers across the nation.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg pulse-glow"
                onClick={() => navigate("/onboarding")}
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section> */}

        <section className="relative h-screen w-full overflow-hidden">
          {/* Image Carousel */}
          <div className="absolute inset-0">
            <AnimatePresence>
              <motion.img
                key={images[current]}
                src={images[current]}
                alt={`Slide ${current + 1}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                Driver Mo
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                Simple, embedded insurance solutions that recognize and protect
                drivers across the nation.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg pulse-glow"
                onClick={() => router.push("/onboarding")}
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-8 w-full flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  current === index ? "bg-orange-500 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Why Choose Driver Mo?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're revolutionizing insurance for drivers with embedded
                solutions that work seamlessly with your daily routine.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-orange-200/80 border"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-orange-50 rounded-2xl p-8 md:p-12 border border-orange-100"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                    Built for all Drivers
                  </h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <img
                    alt="Driver using mobile insurance app at gas station"
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                    src="https://images.unsplash.com/photo-1696433370249-e88ab2b9f33b"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Have questions? We're here to help.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Location</h3>
                  <p className="text-gray-600">
                    1st Floor, Virtue Trust Buidling, Opp. Ghana Trade Fair
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">
                    info@brokers.goodwillinsure.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-8 h-8 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Contact Number</h3>
                  <p className="text-gray-600">+233 269 741 227</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Powered by Goodwill Insurance Brokers
            </h3>
            <p className="text-gray-500 mb-8">
              Underwritten by miLife Insurance & in partnership with leading
              OMCs
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <img
                    className="h-16 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                    alt={partner.name}
                    src={partner.logo}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
