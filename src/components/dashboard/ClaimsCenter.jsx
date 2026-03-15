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
  Download,
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
  const [claimDocuments, setClaimDocuments] = useState([]);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const DOWNLOAD_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clientData = JSON.parse(localStorage.getItem("clientDetails"));
    setClientDetails(clientData);

    const getAllClaims = async () => {
      setLoading(true);
      const response = await claimsApi.getAllClaimsByCreator(
        clientData?.id || ""
      );
      setLoading(false);
      setFetchedClaims(
        response?.data?.map((data) => ({
          name: data?.policy_holder_details?.name || "N/A",
          date: data?.claim_date || "N/A",
          type: data?.claim_type || "N/A",
          status: data?.current_status || "N/A",
          amount: data?.amount || "N/A",
          claimant: data?.claimant || "N/A",
          details: {
            type: data?.claim_type || "N/A",
            name: data?.policy_holder_details?.name || "N/A",
            dateOfDeath: data?.claim_date || "N/A",
            cause: data?.cause_of_death || "N/A",
          },
          death_certificate: data?.death_certificate,
          medical_reports: data?.medical_reports,
          proof_of_relationship: data?.proof_of_relationship,
          police_report: data?.police_report,
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
      carNumber: clientDetails?.product?.item_id,
    },
    secondary1: {
      name: clientDetails?.dependent_one?.name,
      email: clientDetails?.dependent_one?.email,
      contact: clientDetails?.dependent_one?.msisdn,
      relationship: clientDetails?.dependent_one?.relationship,
      carNumber: clientDetails?.product?.item_id,
    },
    secondary2: {
      name: clientDetails?.dependent_two?.name,
      email: clientDetails?.dependent_two?.email,
      contact: clientDetails?.dependent_two?.msisdn,
      relationship: clientDetails?.dependent_two?.relationship,
      carNumber: clientDetails?.product?.item_id,
    },
  };

  const handleClaimantChange = (value) => {
    setClaimant(value);

    const data = getPolicyData[value];
    // console.log("Data", data);
    if (data) {
      setFormDetails((prev) => ({
        ...prev,
        fullName: data.name,
        contactNumber: data.contact,
        email: data.email,
        relationship: data.relationship,
        carNumber: data?.carNumber,
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

  useEffect(() => {
    const extractClaimDocuments = (selectedClaim) => {
      const documentMap = [
        { key: "death_certificate", label: "Death Certificate" },
        { key: "medical_reports", label: "Medical Reports" },
        { key: "proof_of_relationship", label: "Proof of Relationship" },
        { key: "police_report", label: "Police Report" },
      ];

      return documentMap
        .filter((doc) => selectedClaim?.[doc.key]) // only include existing ones
        .map((doc, index) => ({
          id: index + 1,
          type: doc.label,
          url: selectedClaim[doc.key],
          key: doc.key,
        }));
    };

    setClaimDocuments(extractClaimDocuments(selectedClaim));
  }, [selectedClaim]);

  const handleDownloadPdf = async (pathUrl) => {
    setDownloadLoading(true);

    try {
      const response = await fetch(
        `${DOWNLOAD_BASE_URL}/attachments/download`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: pathUrl,
          }),
        }
      );
      setDownloadLoading(false);

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);

      // Open in new tab
      window.open(fileURL, "_blank");

      // Optional: revoke object URL later to free memory
      setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
    } catch (error) {
      toast({
        title: "Error downloading document",
        description: "File not found or could not download PDF",
        variant: "destructive",
      });
      console.error("Error fetching PDF:", error);
    }
  };

  const isDeathDocsComplete =
    formDetails?.documents?.doc_death_cert?.url &&
    formDetails?.documents?.doc_policyholder_id?.url;

  // console.log("Selected claim", selectedClaim);
  console.log("Form Details", formDetails);
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
                    <TableHead>Claimant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount (GHS)</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        loading claims...
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
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
                                {claim.name}
                              </TableCell>
                              <TableCell>{claim.date?.split("T")[0]}</TableCell>
                              <TableCell>{claim.type}</TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    claim?.current_status?.toLowerCase() ===
                                    "Approved"
                                      ? "bg-green-100 text-green-800"
                                      : claim?.current_status?.toLowerCase() ===
                                        "filed"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {claim?.current_status?.toLowerCase() || "-"}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                {claim.initial_amount || "0"}
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
                      <InputWithIcon
                        icon={User}
                        placeholder="Claimant"
                        value={formDetails.claimant || ""}
                        onChange={handleInputChange("claimant")}
                      />
                      {claimType === "death" && (
                        <Select
                          onValueChange={handleClaimantChange}
                          value={claimant}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Deaceased..." />
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
                        placeholder="Car Number"
                        value={formDetails?.carNumber || "AUTO-INS-2025-07-29"}
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
                      <InputWithIcon
                        icon={Phone}
                        placeholder="Contact Person's Number"
                        value={formDetails.contact_person_number || ""}
                        onChange={handleInputChange("contact_person_number")}
                      />
                    </div>
                  </ClaimSection>

                  {claimType === "death" && (
                    <ClaimSection title="3. Death Benefit Claim Section">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="incidentDate">Incident Date</label>
                          <InputWithIcon
                            icon={Calendar}
                            type="date"
                            placeholder="Date of Death"
                            value={formDetails.incident_date || ""}
                            onChange={handleInputChange("incident_date")}
                          />
                        </div>
                        <div>
                          <label htmlFor="causeOfDeath">Cause of Death</label>
                          <InputWithIcon
                            icon={Heart}
                            placeholder="Cause of Death"
                            value={formDetails.cause_of_death || ""}
                            onChange={handleInputChange("cause_of_death")}
                          />
                        </div>
                        <div>
                          <label htmlFor="placeOfDeath">Place of Death</label>

                          <InputWithIcon
                            icon={MapPin}
                            placeholder="Place of Death (Hospital/Home/Accident, etc.)"
                            value={formDetails.place_of_death || ""}
                            onChange={handleInputChange("place_of_death")}
                          />
                        </div>
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
                        Please note that submitting false information is fraudulent and
                        punishable by law.
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
            <DialogTitle>Claim Details for: {selectedClaim.name}</DialogTitle>
            <DialogDescription>
              Viewing details for a {selectedClaim.type} claim submitted on{" "}
              {selectedClaim.date.split("T")[0]}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4 h-[80vh] overflow-auto">
            {selectedClaim.details.type?.toLowerCase() === "death" && (
              <>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[12vw]">
                    <User />
                    Deceased:
                  </strong>{" "}
                  {selectedClaim.details.name}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[12vw]">
                    <User />
                    Claimant:
                  </strong>{" "}
                  {selectedClaim.claimant || "N/A"}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[12vw]">
                    <Calendar />
                    Date of Death:
                  </strong>{" "}
                  {selectedClaim.details.dateOfDeath.split("T")[0]}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[12vw]">
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
                  <strong className="flex flex-row w-[12vw]">
                    <User />
                    Patient:
                  </strong>{" "}
                  {selectedClaim.details.name}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[12vw]">
                    <Calendar />
                    Admission Date:
                  </strong>{" "}
                  {selectedClaim.details.admissionDate}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[12vw]">
                    <Calendar />
                    Discharge Date:
                  </strong>{" "}
                  {selectedClaim.details.dischargeDate}
                </p>
                <p className="flex flex-row">
                  <strong className="flex flex-row w-[12vw]">
                    <StickyNote />
                    Diagnosis:
                  </strong>{" "}
                  {selectedClaim.details.diagnosis}
                </p>
              </>
            )}
            <p className="flex flex-row">
              <strong className="flex flex-row w-[12vw]">
                <Circle />
                Status:
              </strong>{" "}
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full
              ${
                selectedClaim?.current_status?.toLowerCase() === "approved" ||
                selectedClaim?.current_status?.toLowerCase() === "verified"
                  ? "bg-green-100 text-green-800"
                  : selectedClaim?.current_status?.toLowerCase() === "filed"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
              >
                {selectedClaim?.current_status || "-"}
              </span>
            </p>
            <p className="flex flex-row">
              <strong className="flex flex-row w-[12vw]">
                <Banknote />
                Amount:
              </strong>{" "}
              GHS {selectedClaim.initial_amount || "0"}
            </p>
            {/* Claim Documents */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      SN
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      Document Type
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {claimDocuments.map((data, index) => {
                    return (
                      <tr
                        key={data.key}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 text-gray-700">{data.type}</td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleDownloadPdf(data?.url)}
                              className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-500 transition"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ClaimsCenter;
