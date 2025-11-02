import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, Phone, HelpCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const faqs = [
  {
    question: "How is my insurance premium calculated?",
    answer: "Your premium is calculated based on the amount of fuel you purchase. A small, fixed percentage of your fuel cost goes towards your insurance, ensuring you're always covered."
  },
  {
    question: "What do I do if I have an accident?",
    answer: "First, ensure everyone is safe and contact emergency services if needed. Then, open the Driver Mo app, navigate to the Claims Center, and file a new claim. You'll need to provide details of the incident and upload relevant documents like photos and a police report."
  },
  {
    question: "How long does a claim take to process?",
    answer: "Claim processing times can vary, but we aim to provide an initial response within 48 hours. You can track the real-time status of your claim in the 'Claims Center' section of your dashboard."
  },
  {
    question: "Can I use this insurance for my commercial vehicle?",
    answer: "Yes! Driver Mo is designed for both private and commercial vehicles, including Taxis, Trotros, Buses, and Trucks. Just ensure you selected the correct vehicle type during onboarding."
  }
];

function Support() {
  
  const handleSupportClick = (channel) => {
    toast({
      title: `🚧 ${channel} Not Available Yet`,
      description: `This feature is coming soon. In a real app, this would open a ${channel.toLowerCase()} window. 🚀`
    });
  };
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions (FAQ)</CardTitle>
            <CardDescription>Find answers to common questions about Driver Mo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Need more help? Reach out to us.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-2" onClick={() => handleSupportClick('Live Chat')}>
              <MessageSquare className="w-5 h-5" />
              Start Live Chat
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => handleSupportClick('Helpline')}>
              <Phone className="w-5 h-5" />
              Call Helpline
            </Button>
             <Button variant="outline" className="w-full justify-start gap-2" onClick={() => handleSupportClick('Help Center')}>
              <HelpCircle className="w-5 h-5" />
              Visit Help Center
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Support;