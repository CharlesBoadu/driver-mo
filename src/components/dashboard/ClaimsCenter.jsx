import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Upload,
  PlusCircle,
  History,
  FileText,
  Eye,
  User,
  Hash,
  Phone,
  Mail,
  Users,
  Calendar,
  Heart,
  ShieldHalf,
  ShieldCheck,
  MapPin,
  Stethoscope,
  Building,
  Coins as HandCoins,
  ChevronsRight,
  StickyNote,
  Banknote,
  Dot,
  Circle,
  LoaderIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import claimsApi from "../../services/api/claims";
import attachmentsApi from "../../services/api/attachments";

const claimsHistory = [
  {
    id: "CLM-002",
    date: "2025-07-02",
    type: "Death",
    status: "Pending",
    amount: "10,000.00",
    details: {
      type: "Death",
      name: "Kwame Appiah",
      dateOfDeath: "2025-06-30",
      cause: "Natural Causes",
    },
  },
  {
    id: "CLM-001",
    date: "2025-06-15",
    type: "Hospitalization",
    status: "Approved",
    amount: "1,500.00",
    details: {
      type: "Hospitalization",
      name: "Mark Larbi",
      admissionDate: "2025-06-10",
      dischargeDate: "2025-06-14",
      diagnosis: "Malaria",
    },
  },
];

const policyData = {
  principal: {
    name: "Mark Larbi",
    email: "demo@drivermo.com",
    contact: "020111222",
  },
  secondary1: {
    name: "Kwame Appiah",
    email: "demo@drivermo.com",
    contact: "020111222",
  },
  secondary2: {
    name: "Maame Ama",
    email: "demo@drivermo.com",
    contact: "020111222",
  },
};

const ClaimSection = ({ title, children }) => (
  <div className="space-y-4 border-t pt-6 mt-6">
    <h3 className="text-md font-semibold text-gray-700">{title}</h3>
    {children}
  </div>
);

const DocumentUploader = ({
  id,
  label,
  checked,
  onCheckedChange,
  onFileChange,
  fileName,
}) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50/50">
      <div className="flex items-center space-x-2">
        {/* <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} /> */}
        <label htmlFor={id} className="text-sm font-medium leading-none">
          {label}
        </label>
      </div>

      <div className="flex items-center gap-2">
        {fileName && (
          <span className="text-xs text-green-600 truncate max-w-[120px]">
            {fileName}
          </span>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="relative overflow-hidden"
        >
          <Upload className="w-3 h-3 mr-1" />
          Upload
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileChange(file);
            }}
          />
        </Button>
      </div>
    </div>
  );
};

const InputWithIcon = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <Input {...props} className="pl-10" />
  </div>
);

function ClaimsCenter() {
  const [view, setView] = useState("history");
  const [claimType, setClaimType] = useState("");
  const [claimant, setClaimant] = useState("");
  const [formDetails, setFormDetails] = useState({});
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [fetchedClaims, setFetchedClaims] = useState([]);

  useEffect(() => {
    const clientData = JSON.parse(localStorage.getItem("clientDetails"));
    setClientDetails(clientData);

    const getAllClaims = async () => {
      const response = await claimsApi.getAllClaims();
      setFetchedClaims(
        response?.data?.map((data) => ({
          id: data?.id || "N/A",
          date: data?.claim_date || "N/A",
          type: data?.claim_type || "N/A",
          status: data?.status || "N/A",
          amount: data?.amount || "N/A",
          details: {
            type: data?.claim_type || "N/A",
            name: data?.policy_holder_details?.name || "N/A",
            dateOfDeath: data?.claim_date || "N/A",
            cause: data?.cause_of_death || "N/A",
          },
        })) || []
      );
    };

    getAllClaims();
  }, []);

  const getPolicyData = {
    principal: {
      name: clientDetails?.first_name + " " + clientDetails?.last_name,
      email: clientDetails?.email,
      contact: clientDetails?.msisdn,
      relationship: "policyholder",
    },
    secondary1: {
      name: clientDetails?.dependent_one?.name,
      email: clientDetails?.dependent_one?.email,
      contact: clientDetails?.dependent_one?.msisdn,
      relationship: clientDetails?.dependent_one?.relationship,
    },
    secondary2: {
      name: clientDetails?.dependent_two?.name,
      email: clientDetails?.dependent_two?.email,
      contact: clientDetails?.dependent_two?.msisdn,
      relationship: clientDetails?.dependent_two?.relationship,
    },
  };

  const handleClaimantChange = (value) => {
    setClaimant(value);
    const data = getPolicyData[value];
    if (data) {
      setFormDetails((prev) => ({
        ...prev,
        fullName: data.name,
        contactNumber: data.contact,
        email: data.email,
        relationship: data.relationship,
      }));
    }
  };

  const handleClaimTypeChange = (value) => {
    setClaimType(value);
    setClaimant("");
    setFormDetails((prev) => ({
      ...prev,
      claim_type: value,
    }));
    if (value === "tpd" || value === "hospitalization") {
      handleClaimantChange("principal");
    }
  };

  const handleSubmitClaim = async (e) => {
    try {
      e.preventDefault();
      setFileLoading(true);
      const user = JSON.parse(localStorage.getItem("clientDetails"));
      const docs = formDetails?.documents || {};

      const finalValues = {
        creator_id: user?.id,
        claim_type: formDetails?.claim_type,
        policy_holder_details: {
          id: user?.policy_holder_id,
          name: formDetails?.fullName,
          relationship: formDetails?.relationship,
          email: formDetails?.email,
          phone_number: formDetails?.contactNumber,
          sex: "",
          dob: "",
        },
        claim_date: formDetails.claim_date,
        is_declaration_submission_checked: formDetails?.declaration,
        cause_of_death: formDetails?.cause_of_death, //optional
        place_of_death: formDetails?.place_of_death, //optional
        death_certificate: docs?.doc_death_cert?.url || "",
        medical_reports: docs?.doc_medical_report_death?.url || "",
        proof_of_relationship: docs?.doc_policyholder_id?.url || "",
        police_report: docs?.doc_police_report?.url || "",
      };
      const response = await claimsApi.fileNewClaim(finalValues);
      if (response?.code === "GS200" || response?.code === "GS201") {
        toast({
          title: "🚧 Claim Submitted!",
          description: "Your claim would be processed by our team shortly",
        });
        setView("history");
      } else {
        toast({
          title: "Failed to file a claim",
          description: response?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Error filing new claim", error);
    } finally {
      setFileLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDocumentCheck = (docId, checked) => {
    setFormDetails((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docId]: {
          ...prev.documents?.[docId],
          required: checked,
        },
      },
    }));
  };

  const handleDocumentFile = async (docId, file) => {
    try {
      setFileLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await attachmentsApi.uploadAttachment(formData);

      // Assuming API returns: { url: "https://file-url.com/xyz.pdf" }
      const fileUrl = response?.data?.path;

      if (!fileUrl) {
        throw new Error("Upload failed");
      }

      setFormDetails((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docId]: {
            ...prev.documents?.[docId],
            file,
            url: fileUrl, // store uploaded file URL
          },
        },
      }));

      toast({
        title: "Upload successful",
        description: `${file.name} uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not upload file",
        variant: "destructive",
      });
    } finally {
      setFileLoading(false);
    }
  };

  const isDeathDocsComplete =
    formDetails?.documents?.doc_death_cert?.url &&
    formDetails?.documents?.doc_policyholder_id?.url;

  return (
    <Dialog>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Claims Center</CardTitle>
            <CardDescription>
              Submit new claims and track their status.
            </CardDescription>
          </div>
          <div>
            {view === "history" ? (
              <Button onClick={() => setView("new")}>
                <PlusCircle className="mr-2 h-4 w-4" />
                File a New Claim
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setView("history")}>
                <History className="mr-2 h-4 w-4" />
                View Claim History
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {view === "history" && (
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
                  {!fetchedClaims || fetchedClaims.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No Claims found
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {fetchedClaims?.map((claim, index) => (
                        <TableRow key={claim.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">
                            {claim.id}
                          </TableCell>
                          <TableCell>{claim.date}</TableCell>
                          <TableCell>{claim.type}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                claim.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : claim.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {claim.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {claim.amount}
                          </TableCell>
                          <TableCell className="text-center">
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedClaim(claim)}
                              >
                                <Eye className="w-5 h-5 text-gray-500" />
                              </Button>
                            </DialogTrigger>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {view === "new" && (
            <form onSubmit={handleSubmitClaim} className="space-y-8">
              <ClaimSection title="1. Claim Type Selection">
                <Select onValueChange={handleClaimTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select claim type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="death">
                      Death Benefit (Primary/Secondary Life)
                    </SelectItem>
                    <SelectItem value="tpd">
                      Total & Permanent Disability (TPD) Benefit
                    </SelectItem>
                    <SelectItem value="hospitalization">
                      Hospitalization Benefit
                    </SelectItem>
                  </SelectContent>
                </Select>
              </ClaimSection>

              {claimType && (
                <>
                  <ClaimSection title="2. Claimant & Policyholder Details">
                    <div className="grid md:grid-cols-2 gap-4">
                      {claimType === "death" && (
                        <Select
                          onValueChange={handleClaimantChange}
                          value={claimant}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Insured Life..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="principal">
                              Principal (
                              {clientDetails?.first_name +
                                " " +
                                clientDetails?.last_name}
                              )
                            </SelectItem>
                            <SelectItem value="secondary1">
                              Secondary Life 1 (
                              {clientDetails?.dependent_one?.name})
                            </SelectItem>
                            <SelectItem value="secondary2">
                              Secondary Life 2 (
                              {clientDetails?.dependent_two?.name})
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <InputWithIcon
                        icon={User}
                        placeholder="Full Name"
                        value={formDetails.fullName || ""}
                        readOnly={!!claimant}
                      />
                      <InputWithIcon
                        icon={Hash}
                        placeholder="Policy Number"
                        value="AUTO-INS-2025-07-29"
                        disabled
                      />
                      <InputWithIcon
                        icon={Phone}
                        placeholder="Contact Number"
                        value={formDetails.contactNumber || ""}
                        readOnly={!!claimant}
                      />
                      <InputWithIcon
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        value={formDetails.email || ""}
                        readOnly={!!claimant}
                      />
                      <InputWithIcon
                        icon={Users}
                        placeholder="Relationship to Insured (if not policyholder)"
                        value={formDetails.relationship || ""}
                        readOnly={!!claimant}
                      />
                    </div>
                  </ClaimSection>

                  {claimType === "death" && (
                    <ClaimSection title="3. Death Benefit Claim Section">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputWithIcon
                          icon={Calendar}
                          type="date"
                          placeholder="Date of Death"
                          value={formDetails.claim_date || ""}
                          onChange={handleInputChange("claim_date")}
                        />
                        <InputWithIcon
                          icon={Heart}
                          placeholder="Cause of Death"
                          value={formDetails.cause_of_death || ""}
                          onChange={handleInputChange("cause_of_death")}
                        />
                        <InputWithIcon
                          icon={MapPin}
                          placeholder="Place of Death (Hospital/Home/Accident, etc.)"
                          value={formDetails.place_of_death || ""}
                          onChange={handleInputChange("place_of_death")}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 mt-4">
                          Required Documents
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <DocumentUploader
                            id="doc_death_cert"
                            label="Certified Death Certificate"
                            checked={
                              !!formDetails.documents?.doc_death_cert?.required
                            }
                            fileName={
                              formDetails.documents?.doc_death_cert?.file?.name
                            }
                            onCheckedChange={(checked) =>
                              handleDocumentCheck("doc_death_cert", checked)
                            }
                            onFileChange={(file) =>
                              handleDocumentFile("doc_death_cert", file)
                            }
                          />
                          <DocumentUploader
                            id="doc_policyholder_id"
                            label="Policyholder’s ID/Proof of Relationship"
                            checked={
                              !!formDetails.documents?.doc_policyholder_id
                                ?.required
                            }
                            fileName={
                              formDetails.documents?.doc_policyholder_id?.file
                                ?.name
                            }
                            onCheckedChange={(checked) =>
                              handleDocumentCheck(
                                "doc_policyholder_id",
                                checked
                              )
                            }
                            onFileChange={(file) =>
                              handleDocumentFile("doc_policyholder_id", file)
                            }
                          />
                          <DocumentUploader
                            id="doc_medical_report_death"
                            label="Medical Reports (if applicable)"
                            checked={
                              !!formDetails.documents?.doc_medical_report_death
                                ?.required
                            }
                            fileName={
                              formDetails.documents?.doc_medical_report_death
                                ?.file?.name
                            }
                            onCheckedChange={(checked) =>
                              handleDocumentCheck(
                                "doc_medical_report_death",
                                checked
                              )
                            }
                            onFileChange={(file) =>
                              handleDocumentFile(
                                "doc_medical_report_death",
                                file
                              )
                            }
                          />
                          <DocumentUploader
                            id="doc_police_report"
                            label="Police Report (if death was accidental)"
                            checked={
                              !!formDetails.documents?.doc_police_report
                                ?.required
                            }
                            fileName={
                              formDetails.documents?.doc_police_report?.file
                                ?.name
                            }
                            onCheckedChange={(checked) =>
                              handleDocumentCheck("doc_police_report", checked)
                            }
                            onFileChange={(file) =>
                              handleDocumentFile("doc_police_report", file)
                            }
                          />
                        </div>
                      </div>
                    </ClaimSection>
                  )}

                  {claimType === "tpd" && (
                    <ClaimSection title="4. Total & Permanent Disability (TPD) Claim Section">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputWithIcon
                          icon={Calendar}
                          type="date"
                          placeholder="Date of Disability"
                        />
                        <InputWithIcon
                          icon={ShieldHalf}
                          placeholder="Medical Condition"
                        />
                        <InputWithIcon
                          icon={Stethoscope}
                          placeholder="Attending Physician’s Name"
                        />
                        <InputWithIcon
                          icon={Building}
                          placeholder="Hospital/Clinic Details (Name and Location)"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 mt-4">
                          Required Documents
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <DocumentUploader
                            id="doc_tpd_cert"
                            label="Medical Certification of TPD"
                          />
                          <DocumentUploader
                            id="doc_diagnostic"
                            label="Diagnostic Reports (MRI/X-ray/Lab Tests)"
                          />
                          <DocumentUploader
                            id="doc_employment"
                            label="Proof of Employment (if work-related)"
                          />
                        </div>
                      </div>
                    </ClaimSection>
                  )}

                  {claimType === "hospitalization" && (
                    <ClaimSection title="5. Hospitalization Benefit Claim Section">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputWithIcon
                          icon={Calendar}
                          type="date"
                          placeholder="Admission Date"
                        />
                        <InputWithIcon
                          icon={Calendar}
                          type="date"
                          placeholder="Discharge Date"
                        />
                        <InputWithIcon
                          icon={ShieldCheck}
                          placeholder="Diagnosis"
                        />
                        <InputWithIcon
                          icon={Building}
                          placeholder="Hospital Name"
                        />
                        <InputWithIcon
                          icon={HandCoins}
                          type="number"
                          placeholder="Total Bill Amount"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 mt-4">
                          Required Documents
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <DocumentUploader
                            id="doc_discharge"
                            label="Hospital Discharge Summary"
                          />
                          <DocumentUploader
                            id="doc_bills"
                            label="Itemized Medical Bills"
                          />
                          <DocumentUploader
                            id="doc_receipts"
                            label="Payment Receipts"
                          />
                        </div>
                      </div>
                    </ClaimSection>
                  )}

                  <ClaimSection title="6. Declaration & Submission">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="declaration"
                        checked={!!formDetails.declaration}
                        onCheckedChange={(checked) =>
                          setFormDetails((prev) => ({
                            ...prev,
                            declaration: checked,
                          }))
                        }
                      />
                      <Label htmlFor="declaration">
                        I confirm that the information provided is accurate.
                      </Label>
                    </div>
                    {fileLoading ? (
                      <Button type="submit" className="w-full md:w-auto">
                        Submitting...
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full md:w-auto"
                        disabled={
                          !formDetails.declaration ||
                          (claimType === "death" && !isDeathDocsComplete)
                        }
                      >
                        Submit Claim <ChevronsRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
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
              Viewing details for a {selectedClaim.type} claim submitted on{" "}
              {selectedClaim.date}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {selectedClaim.details.type?.toLowerCase() === "death" && (
              <>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[9vw]">
                    <User />
                    Claimant:
                  </strong>{" "}
                  {selectedClaim.details.name}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[9vw]">
                    <Calendar />
                    Date of Death:
                  </strong>{" "}
                  {selectedClaim.details.dateOfDeath}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[9vw]">
                    <StickyNote />
                    Cause of Death:
                  </strong>{" "}
                  {selectedClaim.details.cause}
                </p>
              </>
            )}
            {selectedClaim.details.type === "Hospitalization" && (
              <>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[9vw]">
                    <User />
                    Patient:
                  </strong>{" "}
                  {selectedClaim.details.name}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[9vw]">
                    <Calendar />
                    Admission Date:
                  </strong>{" "}
                  {selectedClaim.details.admissionDate}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[9vw]">
                    <Calendar />
                    Discharge Date:
                  </strong>{" "}
                  {selectedClaim.details.dischargeDate}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[9vw]">
                    <StickyNote />
                    Diagnosis:
                  </strong>{" "}
                  {selectedClaim.details.diagnosis}
                </p>
              </>
            )}
            <p className="flex flex-row">
              <strong className="flex flex-row w-[9vw]">
                <Circle />
                Status:
              </strong>{" "}
              {selectedClaim.status}
            </p>
            <p className="flex flex-row">
              <strong className="flex flex-row w-[9vw]">
                <Banknote />
                Amount:
              </strong>{" "}
              GHS {selectedClaim.amount}
            </p>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ClaimsCenter;
