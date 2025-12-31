import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import formatMoney from "../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Banknote,
  Calendar,
  CreditCard,
  DollarSign,
  Home,
  Type,
  User,
  Boxes,
  LocateIcon,
  Badge,
} from "lucide-react";
import Pagination from "../ui/pagination";
import DropdownSearch from "../ui/dropdownsearch";
import { useEffect, useState, useMemo, useRef } from "react";
import paymentApi from "../../services/api/payment";

const PayOptionSelection = ({ title, children }) => (
  <div className="space-y-4 border-t pt-6 mt-6">
    <h3 className="text-md font-semibold bg-primary text-white p-2">{title}</h3>
    {children}
  </div>
);

function Pay({ handleNavigate }) {
  const amountInputRef = useRef(null);
  const [payOption, setPayOption] = useState("");
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [policyType, setPolicyType] = useState("embedded");
  const [paymentMode, setPaymentMode] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const [amount, setAmount] = useState(0);
  const [bankValues, setBankValues] = useState({
    account_id: "",
    transaction_id: "",
    user_id: "",
    policy_holder_id: "",
    transaction_type: "",
    total_amount_paid: 0,
    date_paid: "",
    frequency: "Monthly",
    members_covered: "",
    bank_name: "",
    account_number: "",
    receipt_number: "",
    account_holder: "",
    amount_paid: "",
    sender_account_provider_name: "",
    sender_account_number: "",
    sender_account_holder_name: "",
    cvv: "",
    card_type: "",
  });
  const [checkValues, setCheckValues] = useState({
    account_id: "",
    transaction_id: "",
    user_id: "",
    policy_holder_id: "",
    transaction_type: "",
    total_amount_paid: 0,
    date_paid: "",
    frequency: "",
    members_covered: "",
    bank_name: "",
    account_number: "",
    check_no: "",
    receipt_number: "",
    account_holder: "",
    amount_paid: "",
    sender_account_provider_name: "",
    sender_account_number: "",
    sender_account_holder_name: "",
  });
  const [momoValues, setMomoValues] = useState({
    account_id: "",
    transaction_id: "",
    user_id: "",
    policy_holder_id: "",
    transaction_type: "", // premium/claim
    total_amount_paid: 0,
    date_paid: "",
    frequency: "monthly",
    members_covered: "",
    mobile_number: "",
    network_provider: "",
    reference: "",
    account_holder: "",
    amount_paid: "",
    sender_account_provider_name: "",
    sender_account_number: "",
    sender_account_holder_name: "",
  });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [checkAll, setCheckAll] = useState(true);
  const [fetchedAssuredLives, setFetchedAssuredLives] = useState([]);
  const [assuredLives, setAssuredLives] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  const handlePayOptionSelection = async (value) => {
    setPayOption(value);
    const response = await getTransactionID(value);
    setTransactionID(response);
    // setClaimant("");
    // setFormDetails({});
    // if (value === "tpd" || value === "hospitalization") {
    //   handleClaimantChange("principal");
    // }
  };

  const handlePayment = async () => {
    // e.preventDefault();
    setPaymentLoading(true);
    const finalBankValues = {
      transaction_id: transactionID || "",
      user_id: clientDetails?.id,
      policy_holder_id: clientDetails?.policy_holder_id,
      transaction_type: payOption?.toLowerCase(),
      total_amount_paid: amountToPay,
      date_paid: new Date().toISOString().slice(0, 19).replace("T", " ")[0],
      frequency: "daily",
      members_covered: clientDetails?.id,
      bank_name: bankValues.card_type,
      account_number: bankValues.account_number,
      receipt_number: bankValues.receipt_number,
      account_holder: bankValues.account_holder,
      sender_account_holder_name: bankValues.account_holder,
      sender_account_provider_name: bankValues.card_type,
      sender_account_number: bankValues.account_number,
      amount_paid: amountToPay,
      account_id: "7a573a61-5049-437b-918a-544720e538f3",
    };

    const finalMomoValues = {
      transaction_id: transactionID || "",
      user_id: clientDetails?.id,
      policy_holder_id: clientDetails?.policy_holder_id,
      transaction_type: payOption?.toLowerCase(), // premium/claim
      total_amount_paid: amountToPay,
      date_paid: new Date().toISOString().slice(0, 19).replace("T", " "),
      frequency: "daily",
      members_covered: clientDetails?.id,
      mobile_number: clientDetails?.msisdn,
      sender_account_number: momoValues.sender_account_number,
      network_provider: momoValues.sender_account_provider_name,
      sender_account_provider_name: momoValues.sender_account_provider_name,
      reference: momoValues.reference,
      account_holder:
        clientDetails?.first_name + " " + clientDetails?.last_name,
      amount_paid: amountToPay,
      account_id: "7a573a61-5049-437b-918a-544720e538f3",
      sender_account_holder_name: momoValues?.sender_account_holder_name,
    };

    const response = await paymentApi.makePayment(
      paymentMode === "Momo" ? finalMomoValues : finalBankValues,
      paymentMode
    );

    console.log("Response from payment: ", response);
    setPaymentLoading(false);
    if (response?.code === "GS200") {
      toast({
        title: "Payment Successful",
        description: "Thank you for choosing us!",
        variant: "success",
      });
      setShowPaymentSummary(false);
      handleNavigate("history")
    } else {
      toast({
        title: "Payment Failed",
        description: `${response?.message}. Please try again later.`,
        variant: "destructive",
      });
    }
  };

  const handleResetCheckValues = () => {
    setCheckValues({
      ...checkValues,
      sender_account_provider_name: "",
      sender_account_number: "",
      sender_account_holder_name: "",
      bank_name: "",
      account_number: "",
      check_no: "",
      receipt_number: "",
      account_holder: "",
    });
  };

  const handleResetMomoValues = () => {
    setMomoValues({
      ...momoValues,
      sender_account_provider_name: "",
      sender_account_number: "",
      mobile_number: "",
      network_provider: "",
      reference: "",
      account_holder: "",
    });
  };

  const handleResetBankValues = () => {
    setBankValues({
      ...bankValues,
      sender_account_provider_name: "",
      sender_account_number: "",
      sender_account_holder_name: "",
      bank_name: "",
      account_number: "",
      receipt_number: "",
      account_holder: "",
    });
  };

  const getTransactionID = async (transactionType) => {
    setLoading(true);
    const response = await paymentApi.getTransactionID({
      policy_holder_id: clientDetails?.policy_holder_id,
      user_id: clientDetails?.id,
      transaction_type: transactionType?.toLowerCase(),
    });
    setLoading(false);

    return response?.data?.transaction_id;
  };

  useEffect(() => {
    const clientDetails = JSON.parse(localStorage.getItem("clientDetails"));
    setClientDetails(clientDetails);
  }, []);

  const totalUnits = useMemo(() => {
    if (!clientDetails) return 0;

    const selectedProduct =
      clientDetails?.plan?.product_details?.linked_item_product?.find(
        (product) =>
          product?.product_name?.toLowerCase() ===
          clientDetails?.product?.item_product?.toLowerCase()
      );

    const minUnit = Number(selectedProduct?.min_purchase_unit || 0);
    const amount = Number(amountToPay);

    if (!amount || amount <= 0 || !minUnit) return 0;

    return amount / minUnit;
  }, [amountToPay, clientDetails]);

  return (
    <div>
      <form onSubmit={handlePayment} className="space-y-8">
        <PayOptionSelection title="Select Pay Option">
          <Select value={payOption} onValueChange={handlePayOptionSelection}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment option..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium Top-up</SelectItem>
              <SelectItem value="fuel">Fuel Purchase</SelectItem>
            </SelectContent>
          </Select>
        </PayOptionSelection>

        {payOption && (
          <>
            <PayOptionSelection
              title={`${
                payOption === "premium" ? "Premium Top Up" : "Fuel Purchase"
              }`}
            >
              <div>
                {stepOne && (
                  <div className="mx-auto border-[1px] rounded-lg shadow-md md:px-10 md:py-2 px-4 py-2">
                    <div className="">
                      {/* <img
                        src={
                          "https://storage.googleapis.com/hostinger-horizons-assets-prod/2508d51d-3209-478c-8611-2e55f445eb2e/9d58df4be2584daad64e7c4ce753e027.png"
                        }
                        alt="Logo"
                        width={250}
                        height={250}
                      /> */}
                      <div className="text-center font-bold text-lg">
                        {clientDetails?.first_name +
                          " " +
                          clientDetails?.last_name}
                      </div>
                      <div className="text-center font-bold text-lg">
                        {clientDetails?.policy_holder_member_number ||
                          "Policy holder member not found"}
                      </div>
                    </div>
                    {policyType.toLowerCase() == "embedded" && (
                      <div className="">
                        <div className="my-4">
                          <div className="md:space-y-2 space-y-5">
                            <div className="flex flex-row">
                              <div className="w-[30%] flex flex-row">
                                {" "}
                                <Calendar />
                                Date:
                              </div>
                              <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            {/* Transaction ID */}
                            <div className="flex flex-row">
                              <div className="md:w-[30%] flex flex-row">
                                <CreditCard />
                                Transaction ID:
                              </div>
                              <span className="md:pl-0 pl-4 ">
                                {loading ? (
                                  <div className="text-sm text-gray-500 font-semibold">
                                    Generating transaction id...
                                  </div>
                                ) : (
                                  <div className="font-bold">
                                    {transactionID ||
                                      "Could not generate Transaction ID"}
                                  </div>
                                )}
                              </span>
                            </div>
                            {/* Total Amount  */}
                            <div className="flex md:flex-row flex-col">
                              <div className="w-[30%] my-auto flex flex-row">
                                <Banknote /> Total Amount:
                              </div>
                              <div className="md:w-[50%]">
                                <input
                                  ref={amountInputRef}
                                  type="text" // ← changed from type="number"
                                  inputMode="decimal"
                                  pattern="[0-9]*\.?[0-9]*" // allows digits and one decimal point
                                  className="rounded-lg border-[1px] border-gray p-2 w-full"
                                  placeholder="Enter amount"
                                  value={amountToPay}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only valid number formats (including empty string)
                                    if (
                                      value === "" ||
                                      /^\d*\.?\d{0,2}$/.test(value)
                                    ) {
                                      setAmountToPay(value);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            {/* Total Units  */}
                            <div className="flex md:flex-row flex-col">
                              <label
                                htmlFor="totalUnits"
                                className="block flex flex-row md:w-[30%] my-auto"
                              >
                                <Boxes /> Total Units
                              </label>
                              <div className="md:w-[50%]">
                                <input
                                  type="text"
                                  name="totalUnits"
                                  placeholder="Automatically calculated"
                                  id="totalUnits"
                                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  disabled
                                  value={totalUnits.toFixed(2)}
                                />{" "}
                              </div>
                            </div>
                            {/* Location  */}
                            <div className="flex md:flex-row flex-col">
                              <label
                                htmlFor="location"
                                className="block flex flex-row md:w-[30%] my-auto"
                              >
                                <LocateIcon /> Station Name / Location
                              </label>
                              <div className="md:w-[50%]">
                                <DropdownSearch
                                  options={[
                                    {
                                      unique_id: "1",
                                      name: "Accra",
                                    },
                                    {
                                      unique_id: "2",
                                      name: "Kumasi",
                                    },
                                  ]?.map((data) => ({
                                    id: data.unique_id,
                                    label: data.name,
                                  }))}
                                  // onOptionSelect={handleOptionSelect}
                                  placeholder={"Location"}
                                  disabled={payOption === "premium"}
                                />
                              </div>
                            </div>
                            {/* Attendant ID/Name  */}
                            <div className="flex md:flex-row flex-col">
                              <label
                                htmlFor="attendant"
                                className="block flex md:w-[30%] flex-row my-auto"
                              >
                                <User /> Attendant ID / Name
                              </label>
                              <div className="md:w-[50%]">
                                <DropdownSearch
                                  options={[
                                    {
                                      unique_id: "1",
                                      name: "ID001 - Mark Larbi",
                                    },
                                    {
                                      unique_id: "2",
                                      name: "ID002 - Aisha Danku",
                                    },
                                  ]?.map((data) => ({
                                    id: data.unique_id,
                                    label: data.name,
                                  }))}
                                  // onOptionSelect={handleOptionSelect}
                                  placeholder={"Select Attendant name"}
                                  disabled={payOption === "premium"}
                                />
                                {/* <input
                                  type="text"
                                  name="attendant"
                                  placeholder="Enter attendant"
                                  id="attendant"
                                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  value={bankValues.account_number}
                                  onChange={(e) =>
                                    setBankValues({
                                      ...bankValues,
                                      account_number: e.target.value,
                                    })
                                  }
                                />{" "} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="my-4 flex justify-end">
                      <button
                        type="button"
                        className="rounded-lg text-white bg-primary cursor-pointer px-10 py-2"
                        onClick={() => {
                          setStepOne(false);
                          setStepTwo(true);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {stepTwo && (
                  <div className="border-[1px] rounded-lg shadow-md md:w-[70%] mx-auto p-2">
                    <div className="space-y-5 p-5">
                      {/* Select Mode of Payment */}
                      <div>
                        <label
                          htmlFor="contactPerson"
                          className="block flex flex-row text-sm font-medium text-gray-700"
                        >
                          {/* Payment Mode */}
                          Select Payment Mode
                        </label>
                        <select
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setPaymentMode(e.target.value);
                            if (
                              e.target.value === "Bank Deposit / Cash" ||
                              e.target.value === "Bank Transfer"
                            ) {
                              // handleResetCheckValues();
                              handleResetMomoValues();
                            } else if (e.target.value === "Momo") {
                              handleResetBankValues();
                              // handleResetCheckValues();
                            }
                          }}
                        >
                          <option value="">Select Payment Mode</option>
                          {/* <option value="Bank Deposit / Cash">
                            Bank Deposit / Cash
                          </option>
                          <option value="Bank Transfer">Bank Transfer</option> */}
                          <option value="Card">Card Payment</option>
                          <option value="Momo">Momo</option>
                        </select>
                      </div>

                      {/* Momo Payment */}
                      {paymentMode === "Momo" && (
                        <div className="space-y-4">
                          {/* Sender Network Provider  */}
                          <div>
                            <label
                              htmlFor="bankName"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <Home /> Sender Network Provider
                            </label>
                            <select
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              value={momoValues.sender_account_provider_name}
                              // disabled
                              onChange={(e) =>
                                setMomoValues({
                                  ...momoValues,
                                  sender_account_provider_name: e.target.value,
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Network Provider
                              </option>
                              <option value="Telecel">Telecel</option>
                              <option value="MTN">MTN</option>
                              <option value="Airteltigo">Airteltigo</option>
                            </select>
                          </div>

                          {/* Sender Account holder  */}
                          <div>
                            <label
                              htmlFor="accountHolder"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <User /> Sender Account Holder
                            </label>
                            <div>
                              <input
                                type="text"
                                name="accountHolder"
                                placeholder="Enter sender Account holder"
                                id="accountHolder"
                                className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                value={momoValues.sender_account_holder_name}
                                // disabled
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
                                    sender_account_holder_name: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>

                          {/* Sender Account Number  */}
                          <div>
                            <label
                              htmlFor="accountNumber"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <User /> Sender Account Number
                            </label>
                            <div>
                              <input
                                type="text"
                                name="accountNumber"
                                placeholder="Enter Sender Account Number"
                                id="accountNumber"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                // disabled
                                value={momoValues.sender_account_number}
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
                                    sender_account_number: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>

                          {/* Reference */}
                          <div>
                            <label
                              htmlFor="reference"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <User /> Reference
                            </label>
                            <div>
                              <input
                                type="text"
                                name="reference"
                                placeholder="Enter Reference"
                                id="reference"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={momoValues.reference}
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
                                    reference: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>

                          {/* Amount Paid  */}
                          <div>
                            <label
                              htmlFor="amountPaid"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <Banknote /> Amount Paid
                            </label>
                            <div>
                              <input
                                type="number"
                                name="amountPaid"
                                placeholder="Enter Amount Paid"
                                id="amountPaid"
                                disabled
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={amountToPay}
                              />{" "}
                            </div>
                          </div>

                          {/* Transaction Date & Time */}
                          <div>
                            <label
                              htmlFor="date"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <Calendar /> Transaction Date & Time
                            </label>
                            <div>
                              <input
                                type="datetime-local"
                                name="dateTime"
                                id="dateTime"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={momoValues.date_paid}
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
                                    date_paid: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMode === "Card" && (
                        <div className="space-y-4">
                          {/* Account Holder */}
                          <div>
                            <label
                              htmlFor="accountHolder"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <User /> Account Holder
                            </label>
                            <div>
                              <input
                                type="text"
                                name="accountHolder"
                                placeholder="Enter Account Holder"
                                id="accountHolder"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={bankValues.account_holder}
                                onChange={(e) =>
                                  setBankValues({
                                    ...bankValues,
                                    account_holder: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>

                          {/* Card Type  */}
                          <div>
                            <label
                              htmlFor="networkProvider"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <CreditCard /> Card Type
                            </label>
                            <select
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              value={bankValues.card_type}
                              onChange={(e) =>
                                setBankValues({
                                  ...bankValues,
                                  card_type: e.target.value,
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Card Type
                              </option>
                              <option value="Visa">Visa</option>
                              <option value="Mastercard">Mastercard</option>
                            </select>
                          </div>

                          {/* Card Number */}
                          <div>
                            <label
                              htmlFor="cardNumber"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <CreditCard /> Card Number
                            </label>
                            <div>
                              <input
                                type="text"
                                name="cardNumber"
                                placeholder="Enter Card Number"
                                id="cardNumber"
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={bankValues.account_number}
                                onChange={(e) =>
                                  setBankValues({
                                    ...bankValues,
                                    account_number: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>

                          {/* CVV  */}
                          <div>
                            <label
                              htmlFor="cvv"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <CreditCard /> CVV
                            </label>
                            <div>
                              <input
                                type="text"
                                name="cvv"
                                placeholder="Enter CVV"
                                id="cvv"
                                className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                value={bankValues.cvv}
                                // disabled
                                onChange={(e) =>
                                  setBankValues({
                                    ...bankValues,
                                    cvv: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>

                          {/* Expiry Date */}
                          <div>
                            <label
                              htmlFor="date"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <Calendar /> Expiry Date
                            </label>
                            <div>
                              <input
                                type="date"
                                name="dateTime"
                                id="dateTime"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={bankValues.date_paid}
                                onChange={(e) =>
                                  setBankValues({
                                    ...bankValues,
                                    date_paid: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>

                          {/* Amount Paid  */}
                          <div>
                            <label
                              htmlFor="amountPaid"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <Banknote /> Amount Paid
                            </label>
                            <div>
                              <input
                                type="number"
                                name="amountPaid"
                                placeholder="Enter Amount Paid"
                                id="amountPaid"
                                disabled
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={amountToPay}
                                // onChange={(e) =>
                                //     setMomoValues({
                                //         ...momoValues,
                                //         amount_paid: e.target.value,
                                //     })
                                // }
                              />{" "}
                            </div>
                          </div>

                          {/* Reference  */}
                          <div>
                            <label
                              htmlFor="reference"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <User /> Reference
                            </label>
                            <div>
                              <input
                                type="text"
                                name="reference"
                                placeholder="Enter Reference"
                                id="reference"
                                className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                value={bankValues.receipt_number}
                                // disabled
                                onChange={(e) =>
                                  setBankValues({
                                    ...bankValues,
                                    receipt_number: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex justify-between">
                        <div>
                          <button
                            type="button"
                            className="rounded-lg bg-black text-white px-10 py-2"
                            onClick={() => {
                              setStepOne(true);
                              setStepTwo(false);
                            }}
                          >
                            Back
                          </button>
                        </div>
                        <div className="flex justify-between space-x-6">
                          <div className="">
                            <button
                              type="button"
                              className="flex flex-row space-x-2 rounded-lg bg-primary p-2 text-white"
                              onClick={() => {
                                setShowPaymentSummary(true);
                              }}
                            >
                              <DollarSign />{" "}
                              <span className="text-sm my-auto">Pay Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </PayOptionSelection>
          </>
        )}
      </form>

      <Dialog open={showPaymentSummary} onOpenChange={setShowPaymentSummary}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Summary</DialogTitle>
            <DialogDescription>
              Making a payment for{" "}
              {payOption === "premium" ? "Premium Top Up" : "Fuel Purchase"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold flex flex-row">
                <CreditCard />
                Transaction ID:
              </span>
              <span>
                {transactionID || "Could not generate transaction ID"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold flex flex-row">
                <Banknote />
                Payment Mode:
              </span>
              <span>{paymentMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold flex flex-row">
                <Banknote />
                Amount to Pay:
              </span>
              <span>{formatMoney(amountToPay)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold flex flex-row">
                <Banknote />
                Total Units:
              </span>
              <span>{totalUnits.toFixed(2)}</span>
            </div>
            {/* Confirm Button */}

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-primary text-white px-10 py-2"
                onClick={handlePayment}
              >
                {paymentLoading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Pay;
