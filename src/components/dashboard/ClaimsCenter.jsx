import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Upload, PlusCircle, History, FileText, Eye, User, Hash, Phone, Mail, Users, Calendar, Heart, ShieldHalf, ShieldCheck, MapPin, Stethoscope, Building, Coins as HandCoins, ChevronsRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const claimsHistory = [
  { id: 'CLM-002', date: '2025-07-02', type: 'Death', status: 'Pending', amount: '10,000.00', details: { type: 'Death', name: 'Kwame Appiah', dateOfDeath: '2025-06-30', cause: 'Natural Causes' } },
  { id: 'CLM-001', date: '2025-06-15', type: 'Hospitalization', status: 'Approved', amount: '1,500.00', details: { type: 'Hospitalization', name: 'Mark Larbi', admissionDate: '2025-06-10', dischargeDate: '2025-06-14', diagnosis: 'Malaria' } },
];

const policyData = {
  principal: { name: 'Mark Larbi', email: 'demo@drivermo.com', contact: '020111222' },
  secondary1: { name: 'Kwame Appiah', email: 'demo@drivermo.com', contact: '020111222' },
  secondary2: { name: 'Maame Ama', email: 'demo@drivermo.com', contact: '020111222' },
};

const ClaimSection = ({ title, children }) => (
  <div className="space-y-4 border-t pt-6 mt-6">
    <h3 className="text-md font-semibold text-gray-700">{title}</h3>
    {children}
  </div>
);

const DocumentUploader = ({ id, label }) => (
  <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50/50">
    <div className="flex items-center space-x-2">
      <Checkbox id={id} />
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
    <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
      <Upload className="w-3 h-3" />
      Upload
    </Button>
  </div>
);

const InputWithIcon = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <Input {...props} className="pl-10" />
  </div>
);

function ClaimsCenter() {
  const [view, setView] = useState('history');
  const [claimType, setClaimType] = useState('');
  const [claimant, setClaimant] = useState('');
  const [formDetails, setFormDetails] = useState({});
  const [selectedClaim, setSelectedClaim] = useState(null);

  const handleClaimantChange = (value) => {
    setClaimant(value);
    const data = policyData[value];
    if (data) {
      setFormDetails(prev => ({ ...prev, fullName: data.name, contactNumber: data.contact, email: data.email }));
    }
  };

  const handleClaimTypeChange = (value) => {
    setClaimType(value);
    setClaimant('');
    setFormDetails({});
    if (value === 'tpd' || value === 'hospitalization') {
      handleClaimantChange('principal');
    }
  };

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 Claim Submitted!',
      description: 'This is a demo. Your claim would be processed by our team shortly. 🚀',
    });
    setView('history');
  };

  return (
    <Dialog>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Claims Center</CardTitle>
            <CardDescription>Submit new claims and track their status.</CardDescription>
          </div>
          <div>
            {view === 'history' ? (
              <Button onClick={() => setView('new')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                File a New Claim
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setView('history')}>
                <History className="mr-2 h-4 w-4" />
                View Claim History
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {view === 'history' && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount (GHS)</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claimsHistory.map((claim, index) => (
                    <TableRow key={claim.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          claim.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {claim.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{claim.amount}</TableCell>
                      <TableCell className="text-center">
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedClaim(claim)}>
                            <Eye className="w-5 h-5 text-gray-500" />
                          </Button>
                        </DialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {view === 'new' && (
            <form onSubmit={handleSubmitClaim} className="space-y-8">
              <ClaimSection title="1. Claim Type Selection">
                <Select onValueChange={handleClaimTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select claim type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="death">Death Benefit (Primary/Secondary Life)</SelectItem>
                    <SelectItem value="tpd">Total & Permanent Disability (TPD) Benefit</SelectItem>
                    <SelectItem value="hospitalization">Hospitalization Benefit</SelectItem>
                  </SelectContent>
                </Select>
              </ClaimSection>

              {claimType && (
                <>
                  <ClaimSection title="2. Claimant & Policyholder Details">
                    <div className="grid md:grid-cols-2 gap-4">
                      {claimType === 'death' && (
                        <Select onValueChange={handleClaimantChange} value={claimant}>
                          <SelectTrigger><SelectValue placeholder="Select Insured Life..." /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="principal">Principal (Mark Larbi)</SelectItem>
                            <SelectItem value="secondary1">Secondary Life 1 (Kwame Appiah)</SelectItem>
                            <SelectItem value="secondary2">Secondary Life 2 (Maame Ama)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <InputWithIcon icon={User} placeholder="Full Name" value={formDetails.fullName || ''} readOnly={!!claimant} />
                      <InputWithIcon icon={Hash} placeholder="Policy Number" value="AUTO-INS-2025-07-29" disabled />
                      <InputWithIcon icon={Phone} placeholder="Contact Number" value={formDetails.contactNumber || ''} readOnly={!!claimant} />
                      <InputWithIcon icon={Mail} type="email" placeholder="Email" value={formDetails.email || ''} readOnly={!!claimant} />
                      <InputWithIcon icon={Users} placeholder="Relationship to Insured (if not policyholder)" />
                    </div>
                  </ClaimSection>

                  {claimType === 'death' && (
                    <ClaimSection title="3. Death Benefit Claim Section">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputWithIcon icon={Calendar} type="date" placeholder="Date of Death" />
                        <InputWithIcon icon={Heart} placeholder="Cause of Death" />
                        <InputWithIcon icon={MapPin} placeholder="Place of Death (Hospital/Home/Accident, etc.)" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 mt-4">Required Documents</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <DocumentUploader id="doc_death_cert" label="Certified Death Certificate" />
                          <DocumentUploader id="doc_policyholder_id" label="Policyholder’s ID/Proof of Relationship" />
                          <DocumentUploader id="doc_medical_report_death" label="Medical Reports (if applicable)" />
                          <DocumentUploader id="doc_police_report" label="Police Report (if death was accidental)" />
                        </div>
                      </div>
                    </ClaimSection>
                  )}

                  {claimType === 'tpd' && (
                    <ClaimSection title="4. Total & Permanent Disability (TPD) Claim Section">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputWithIcon icon={Calendar} type="date" placeholder="Date of Disability" />
                        <InputWithIcon icon={ShieldHalf} placeholder="Medical Condition" />
                        <InputWithIcon icon={Stethoscope} placeholder="Attending Physician’s Name" />
                        <InputWithIcon icon={Building} placeholder="Hospital/Clinic Details (Name and Location)" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 mt-4">Required Documents</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <DocumentUploader id="doc_tpd_cert" label="Medical Certification of TPD" />
                          <DocumentUploader id="doc_diagnostic" label="Diagnostic Reports (MRI/X-ray/Lab Tests)" />
                          <DocumentUploader id="doc_employment" label="Proof of Employment (if work-related)" />
                        </div>
                      </div>
                    </ClaimSection>
                  )}

                  {claimType === 'hospitalization' && (
                    <ClaimSection title="5. Hospitalization Benefit Claim Section">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputWithIcon icon={Calendar} type="date" placeholder="Admission Date" />
                        <InputWithIcon icon={Calendar} type="date" placeholder="Discharge Date" />
                        <InputWithIcon icon={ShieldCheck} placeholder="Diagnosis" />
                        <InputWithIcon icon={Building} placeholder="Hospital Name" />
                        <InputWithIcon icon={HandCoins} type="number" placeholder="Total Bill Amount" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 mt-4">Required Documents</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <DocumentUploader id="doc_discharge" label="Hospital Discharge Summary" />
                          <DocumentUploader id="doc_bills" label="Itemized Medical Bills" />
                          <DocumentUploader id="doc_receipts" label="Payment Receipts" />
                        </div>
                      </div>
                    </ClaimSection>
                  )}

                  <ClaimSection title="6. Declaration & Submission">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="declaration" />
                      <Label htmlFor="declaration">I confirm that the information provided is accurate.</Label>
                    </div>
                    <Button type="submit" className="w-full md:w-auto">Submit Claim <ChevronsRight className="w-4 h-4 ml-2"/></Button>
                  </ClaimSection>
                </>
              )}
            </form>
          )}
        </CardContent>
      </Card>
      {selectedClaim && (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Claim Details: {selectedClaim.id}</DialogTitle>
            <DialogDescription>
              Viewing details for a {selectedClaim.type} claim submitted on {selectedClaim.date}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {selectedClaim.details.type === 'Death' && (
              <>
                <p><strong>Claimant:</strong> {selectedClaim.details.name}</p>
                <p><strong>Date of Death:</strong> {selectedClaim.details.dateOfDeath}</p>
                <p><strong>Cause of Death:</strong> {selectedClaim.details.cause}</p>
              </>
            )}
            {selectedClaim.details.type === 'Hospitalization' && (
              <>
                <p><strong>Patient:</strong> {selectedClaim.details.name}</p>
                <p><strong>Admission Date:</strong> {selectedClaim.details.admissionDate}</p>
                <p><strong>Discharge Date:</strong> {selectedClaim.details.dischargeDate}</p>
                <p><strong>Diagnosis:</strong> {selectedClaim.details.diagnosis}</p>
              </>
            )}
            <p><strong>Status:</strong> {selectedClaim.status}</p>
            <p><strong>Amount:</strong> GHS {selectedClaim.amount}</p>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ClaimsCenter;