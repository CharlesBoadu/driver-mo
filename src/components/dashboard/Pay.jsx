import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";
import Pagination from "../ui/pagination";
import DropdownSearch from "../ui/dropdownsearch";

import { useEffect, useState } from "react";
function Pay() {
  const [payOption, setPayOption] = useState("");
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [policyType, setPolicyType] = useState("embedded");
  const [paymentMode, setPaymentMode] = useState("");
  const [fetchedAccounts, setFetchedAccounts] = useState([]);
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
  const [isCheckboxChecked, setIsCheckboxChecked] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [checkAll, setCheckAll] = useState(true);
  const [fetchedAssuredLives, setFetchedAssuredLives] = useState([]);
  const [assuredLives, setAssuredLives] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGroupItems = fetchedAssuredLives?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const currentRetailorEmbeddedItems = assuredLives?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(fetchedAssuredLives?.length / itemsPerPage);

  const getPremiumFrequency = () => {
    if (bankValues.frequency === "Monthly") return 1;
    if (bankValues.frequency === "Quarterly") return 3;
    if (bankValues.frequency === "Half-Yearly") return 6;
    if (bankValues.frequency === "Yearly") return 12;
    return 1;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const PayOptionSelection = ({ title, children }) => (
    <div className="space-y-4 border-t pt-6 mt-6">
      <h3 className="text-md font-semibold bg-primary text-white p-2">
        {title}
      </h3>
      {children}
    </div>
  );

  const handlePayOptionSelection = (value) => {
    setPayOption(value);
    // setClaimant("");
    // setFormDetails({});
    // if (value === "tpd" || value === "hospitalization") {
    //   handleClaimantChange("principal");
    // }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    toast({
      title: "Payment Initiated",
      description: "Thank you for choosing us!",
    });
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

  useEffect(() => {
    const clientDetails = JSON.parse(localStorage.getItem("clientDetails"));
    setClientDetails(clientDetails);
  }, []);

  return (
    <div>
      <form onSubmit={handlePayment} className="space-y-8">
        <PayOptionSelection title="Select Pay Option">
          <Select onValueChange={handlePayOptionSelection}>
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
                {/* <div className="flex items-center justify-between bg-[#017f8b] px-5 py-3 dark:bg-[#121c2c]">
                  <h5 className="text-lg font-bold text-white">Pay Premium</h5>
                  <div
                    className="text-lg text-white hover:cursor-pointer hover:text-black"
                    onClick={() => {
                      setIsOpen(false);
                      handleToggleTabs("members");
                      if (
                        paymentMode === "Bank Deposit / Cash" ||
                        paymentMode === "Bank Transfer" ? (
                          handleResetBankValues()
                        ) : paymentMode === "Momo" ? (
                          handleResetMomoValues()
                        ) : paymentMode === "Cheque" ? (
                          handleResetCheckValues()
                        ) : (
                          <></>
                        )
                      )
                        setStepOne(true);
                      setStepTwo(false);
                    }}
                  >
                    x
                  </div>
                </div> */}
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
                        {clientDetails?.policy_holder_member_number || "N/A"}
                      </div>
                    </div>
                    {policyType.toLowerCase() == "group" && (
                      <div>
                        <div className="my-4 flex justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-row">
                              <div className="md:w-[10vw] 2xl:w-[7vw]">
                                Date:
                              </div>
                              <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-row">
                              <div className="my-auto md:w-[10vw] 2xl:w-[7vw]">
                                Transaction ID:
                              </div>
                              <span>
                                {loading ? (
                                  <div className="flex items-center justify-center">
                                    <ThreeDots
                                      height="40"
                                      width="40"
                                      radius="9"
                                      color="#178491"
                                      ariaLabel="loading"
                                    />
                                  </div>
                                ) : (
                                  transactionID
                                )}
                              </span>
                            </div>
                            <div className="flex flex-row">
                              <div className="md:w-[10vw] 2xl:w-[7vw]">
                                Total Amount:
                              </div>
                              <div></div>
                              {/* <span className="text-3xl font-semibold">
                                GHS{" "}
                                {bankValues?.total_amount_paid ||
                                  amount *
                                    getPremiumFrequency() *
                                    isCheckboxChecked.length}
                              </span> */}
                            </div>
                          </div>
                          <div>
                            {/* <label htmlFor="paymentFrequency" className="block flex flex-row text-sm font-medium text-gray-700">
                                                        <TbCashBanknote /> Payment Frequency
                                                    </label> */}
                            <div className="space-y-4">
                              <select
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={bankValues.frequency}
                                onChange={(e) => {
                                  setBankValues({
                                    ...bankValues,
                                    frequency: e.target.value,
                                  });
                                  setMomoValues({
                                    ...momoValues,
                                    frequency: e.target.value,
                                  });
                                }}
                              >
                                <option value="" disabled>
                                  Select Payment Frequency
                                </option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Half-Yearly">Half-Yearly</option>
                                <option value="Yearly">Yearly</option>
                              </select>
                              <div className="w-full ltr:ml-auto rtl:mr-auto">
                                <input
                                  type="text"
                                  className="form-input w-full"
                                  placeholder="Search assured life..."
                                  onChange={handleSearch}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Table  */}
                        <div className="table-responsive mb-5">
                          <table className="table-hover">
                            <thead>
                              <tr>
                                <th>
                                  <input
                                    type="checkbox"
                                    checked={checkAll}
                                    onChange={() => {
                                      if (checkAll) {
                                        handleCheckboxChange(-2);
                                        setCheckAll(false);
                                      } else {
                                        handleCheckboxChange(-1);
                                        setCheckAll(true);
                                      }
                                    }}
                                  />
                                </th>
                                <th>Assured Lives</th>
                                <th>Policy Number</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td>Loading...</td>
                                  <td></td>
                                </tr>
                              ) : (
                                <>
                                  {currentGroupItems.length === 0 && (
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>No data found</td>
                                      <td></td>
                                    </tr>
                                  )}
                                  {currentGroupItems.map((data, index) => {
                                    const overallIndex =
                                      indexOfFirstItem + index + 1;

                                    return (
                                      <tr
                                        key={overallIndex}
                                        className="hover:cursor-pointer"
                                      >
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={
                                              isCheckboxChecked.includes(index)
                                                ? true
                                                : false
                                            }
                                            onChange={() => {
                                              handleCheckboxChange(index);
                                            }}
                                          />
                                        </td>
                                        <td>
                                          {data.first_name} {data.last_name}
                                        </td>
                                        <td>
                                          {data.policy_holder_member_number}
                                        </td>
                                        <td>
                                          {selectedPolicy?.premium?.premium_type?.toLowerCase() ===
                                          "micro contribution" ? (
                                            <input
                                              type="text"
                                              className="rounded-lg border-[1px] border-gray-300 p-2"
                                              value={amount}
                                              onChange={(e) =>
                                                setAmount(
                                                  Number(e.target.value)
                                                )
                                              }
                                            />
                                          ) : (
                                            <>
                                              {amount * getPremiumFrequency()}
                                            </>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* <Pagination
                          handleNextPage={handleNextPage}
                          handlePrevPage={handlePrevPage}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        /> */}
                      </div>
                    )}
                    {policyType.toLowerCase() == "embedded" && (
                      <div className="">
                        <div className="my-4">
                          <div className="md:space-y-2 space-y-5">
                            <div className="flex flex-row">
                              <div className="w-[30%]">Date:</div>
                              <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            {/* Transaction ID */}
                            <div className="flex flex-row">
                              <div className="md:w-[30%]">Transaction ID:</div>
                              <span className="md:pl-0 pl-4">
                                {loading ? (
                                  <div className="flex items-center justify-center">
                                    <ThreeDots
                                      height="40"
                                      width="40"
                                      radius="9"
                                      color="#178491"
                                      ariaLabel="loading"
                                    />
                                  </div>
                                ) : (
                                  transactionID || "N/A"
                                )}
                              </span>
                            </div>
                            {/* Total Amount  */}
                            <div className="flex md:flex-row flex-col">
                              <div className="w-[30%] my-auto">
                                Total Amount:
                              </div>
                              <div className="md:w-[50%]">
                                <input
                                  type="text"
                                  className="rounded-lg border-[1px] border-gray p-2 w-full"
                                  placeholder="Enter amount"
                                  // onChange={handleSearch}
                                />
                              </div>
                              {/* <span className="text-3xl font-semibold">
                                GHS{" "}
                                {bankValues?.total_amount_paid ||
                                  amount *
                                    getPremiumFrequency() *
                                    isCheckboxChecked.length}
                              </span> */}
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
                                  placeholder="Enter total units"
                                  id="totalUnits"
                                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  disabled={payOption === "premium"}
                                  // value={bankValues.account_number}
                                  // onChange={(e) =>
                                  //   setBankValues({
                                  //     ...bankValues,
                                  //     account_number: e.target.value,
                                  //   })
                                  // }
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
                                {/* <input
                                  type="text"
                                  name="location"
                                  placeholder="Enter Location"
                                  id="location"
                                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  // disabled
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
                                      name: "Mark Larbi",
                                    },
                                    {
                                      unique_id: "2",
                                      name: "Aisha Danku",
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
                          <div className="">
                            {selectedPolicy?.premium?.premium_type?.toLowerCase() ===
                              "micro contribution" && (
                              <div className="w-full ltr:ml-auto rtl:mr-auto">
                                <input
                                  type="text"
                                  className="form-input w-full"
                                  placeholder="Search assured life..."
                                  onChange={handleSearchMicroContributions}
                                />
                              </div>
                            )}
                            {selectedPolicy?.premium?.premium_type?.toLowerCase() ===
                              "flat rate contribution" && (
                              <div className="space-y-4">
                                <select
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  value={bankValues.frequency}
                                  onChange={(e) => {
                                    setBankValues({
                                      ...bankValues,
                                      frequency: e.target.value,
                                    });
                                    setMomoValues({
                                      ...momoValues,
                                      frequency: e.target.value,
                                    });
                                  }}
                                >
                                  <option value="" disabled>
                                    Select Payment Frequency
                                  </option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Quarterly">Quarterly</option>
                                  <option value="Half-Yearly">
                                    Half-Yearly
                                  </option>
                                  <option value="Yearly">Yearly</option>
                                </select>
                                {/* <div className="w-full ltr:ml-auto rtl:mr-auto">
                                                                        <input type="text" className="form-input w-full" placeholder="Search assured life..." onChange={handleSearch} />
                                                                    </div> */}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Table  */}
                        {/* <div className="overflow-auto mb-5">
                          <table className="w-full border-[1px]">
                            <thead>
                              <tr>
                                <th>
                                  <input
                                    type="checkbox"
                                    checked={checkAll}
                                    onChange={() => {
                                      if (checkAll) {
                                        handleCheckboxChange(-2);
                                        setCheckAll(false);
                                      } else {
                                        handleCheckboxChange(-1);
                                        setCheckAll(true);
                                      }
                                    }}
                                  />
                                </th>
                                <th>Assured Lives</th>
                                <th>Policy Number</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td>Loading...</td>
                                  <td></td>
                                </tr>
                              ) : (
                                <>
                                  {currentRetailorEmbeddedItems?.length ===
                                    0 && (
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>No data found</td>
                                      <td></td>
                                    </tr>
                                  )}
                                  {currentRetailorEmbeddedItems?.map(
                                    (data, index) => {
                                      const overallIndex =
                                        indexOfFirstItem + index + 1;

                                      // console.log('Data', data);

                                      return (
                                        <tr
                                          key={overallIndex}
                                          className="hover:cursor-pointer"
                                        >
                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                isCheckboxChecked.includes(
                                                  index
                                                )
                                                  ? true
                                                  : false
                                              }
                                              onChange={() => {
                                                handleCheckboxChange(index);
                                              }}
                                            />
                                          </td>
                                          <td>
                                            {data?.policy_holder?.first_name}{" "}
                                            {data.policy_holder?.last_name}
                                          </td>
                                          <td>
                                            {data.policy_holder
                                              ?.policy_holder_member_number ||
                                              "N/A"}
                                          </td>
                                          <td>
                                            {selectedPolicy?.premium?.premium_type?.toLowerCase() ===
                                            "micro contribution" ? (
                                              <input
                                                type="text"
                                                className="rounded-lg border-[1px] border-gray-300 p-2"
                                                value={amount}
                                                onChange={(e) =>
                                                  setAmount(
                                                    Number(e.target.value)
                                                  )
                                                }
                                              />
                                            ) : (
                                              <>{amount}</>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div> */}
                        {/* <Pagination
                          handleNextPage={handleNextPage}
                          handlePrevPage={handlePrevPage}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        /> */}
                      </div>
                    )}
                    {policyType.toLowerCase() == "retail" && (
                      <div>
                        <div className="my-4 flex justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-row">
                              <div className="md:w-[10vw] 2xl:w-[7vw]">
                                Date:
                              </div>
                              <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-row">
                              <div className="my-auto md:w-[10vw] 2xl:w-[7vw]">
                                Transaction ID:
                              </div>
                              <span>
                                {loading ? (
                                  <div className="flex items-center justify-center">
                                    <ThreeDots
                                      height="40"
                                      width="40"
                                      radius="9"
                                      color="#178491"
                                      ariaLabel="loading"
                                    />
                                  </div>
                                ) : (
                                  transactionID
                                )}
                              </span>
                            </div>
                            <div className="flex flex-row">
                              <div className="md:w-[10vw] 2xl:w-[7vw]">
                                Total Amount:
                              </div>
                              <span className="text-3xl font-semibold">
                                GHS{" "}
                                {bankValues?.total_amount_paid ||
                                  amount * isCheckboxChecked.length}
                              </span>
                            </div>
                          </div>
                          <div>
                            {selectedPolicy?.premium?.premium_type?.toLowerCase() ===
                              "micro contribution" && (
                              <div className="w-full ltr:ml-auto rtl:mr-auto">
                                <input
                                  type="text"
                                  className="form-input w-full"
                                  placeholder="Search assured life..."
                                  onChange={handleSearchMicroContributions}
                                />
                              </div>
                            )}
                            {selectedPolicy?.premium?.premium_type?.toLowerCase() ===
                              "flat rate contribution" && (
                              <div className="space-y-4">
                                <select
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  value={bankValues.frequency}
                                  onChange={(e) => {
                                    setBankValues({
                                      ...bankValues,
                                      frequency: e.target.value,
                                    });
                                    setMomoValues({
                                      ...momoValues,
                                      frequency: e.target.value,
                                    });
                                  }}
                                >
                                  <option value="" disabled>
                                    Select Payment Frequency
                                  </option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Quarterly">Quarterly</option>
                                  <option value="Half-Yearly">
                                    Half-Yearly
                                  </option>
                                  <option value="Yearly">Yearly</option>
                                </select>
                                {/* <div className="w-full ltr:ml-auto rtl:mr-auto">
                                                                        <input type="text" className="form-input w-full" placeholder="Search assured life..." onChange={handleSearch} />
                                                                    </div> */}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Table  */}
                        <div className="table-responsive mb-5">
                          <table className="table-hover">
                            <thead>
                              <tr>
                                <th>
                                  <input
                                    type="checkbox"
                                    checked={checkAll}
                                    onChange={() => {
                                      if (checkAll) {
                                        handleCheckboxChange(-2);
                                        setCheckAll(false);
                                      } else {
                                        handleCheckboxChange(-1);
                                        setCheckAll(true);
                                      }
                                    }}
                                  />
                                </th>
                                <th>Assured Lives</th>
                                <th>Policy Number</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td>Loading...</td>
                                  <td></td>
                                </tr>
                              ) : (
                                <>
                                  {currentRetailorEmbeddedItems?.length ===
                                    0 && (
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>No data found</td>
                                      <td></td>
                                    </tr>
                                  )}
                                  {currentRetailorEmbeddedItems?.map(
                                    (data, index) => {
                                      const overallIndex =
                                        indexOfFirstItem + index + 1;

                                      return (
                                        <tr
                                          key={overallIndex}
                                          className="hover:cursor-pointer"
                                        >
                                          <td>
                                            <input
                                              type="checkbox"
                                              checked={
                                                isCheckboxChecked.includes(
                                                  index
                                                )
                                                  ? true
                                                  : false
                                              }
                                              onChange={() => {
                                                handleCheckboxChange(index);
                                              }}
                                            />
                                          </td>
                                          <td>
                                            {data?.policy_holder?.first_name}{" "}
                                            {data?.policy_holder?.last_name}
                                          </td>
                                          <td>
                                            {data.policy_holder
                                              ?.policy_holder_member_number ||
                                              "N/A"}
                                          </td>
                                          <td>
                                            {selectedPolicy?.premium?.premium_type?.toLowerCase() ===
                                            "micro contribution" ? (
                                              <input
                                                type="text"
                                                className="rounded-lg border-[1px] border-gray-300 p-2"
                                                value={amount}
                                                onChange={(e) =>
                                                  setAmount(
                                                    Number(e.target.value)
                                                  )
                                                }
                                              />
                                            ) : (
                                              <>{amount}</>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                        {/* <Pagination
                          handleNextPage={handleNextPage}
                          handlePrevPage={handlePrevPage}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        /> */}
                      </div>
                    )}

                    <div className="my-4 flex justify-end">
                      <button
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
                    {/* <div className="px-4">
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
                    </div> */}
                    <div className="space-y-5 p-5">
                      {/* Select Mode of Payment */}
                      <div>
                        <label
                          htmlFor="contactPerson"
                          className="block flex flex-row text-sm font-medium text-gray-700"
                        >
                          {/* <Paymem /> */}
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
                              handleResetCheckValues();
                              handleResetMomoValues();
                            } else if (e.target.value === "Momo") {
                              handleResetBankValues();
                              handleResetCheckValues();
                            } else if (e.target.value === "Cheque") {
                              handleResetBankValues();
                              handleResetMomoValues();
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
                          {/* Network Provider  */}
                          {/* <div>
                            <label
                              htmlFor="networkProvider"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <Home /> Network Provider
                            </label>
                            <select
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              disabled
                              value={momoValues.network_provider}
                              onChange={(e) =>
                                setMomoValues({
                                  ...momoValues,
                                  network_provider: e.target.value,
                                })
                              }
                            >
                              <option value="" disabled>
                                Select Network Provider
                              </option>
                              <option value="MTN">MTN</option>
                              <option value="Telecel">Telecel</option>
                              <option value="AT">AT</option>
                            </select>
                          </div> */}

                          {/* Account Holder */}
                          {/* <div>
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
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                disabled
                                value={momoValues.account_holder}
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
                                    account_holder: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div> */}

                          {/* Account Number */}
                          {/* <div>
                            <label
                              htmlFor="mobileNumber"
                              className="block flex flex-row text-sm font-medium text-gray-700"
                            >
                              <User /> Account Number
                            </label>
                            <div>
                              <input
                                type="text"
                                name="mobileNumber"
                                placeholder="Enter Mobile Number"
                                id="mobileNumber"
                                disabled
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                value={momoValues.mobile_number}
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
                                    mobile_number: e.target.value,
                                  })
                                }
                              />{" "}
                            </div>
                          </div> */}

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
                                value={momoValues.total_amount_paid}
                                // onChange={(e) =>
                                //     setMomoValues({
                                //         ...momoValues,
                                //         amount_paid: e.target.value,
                                //     })
                                // }
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
                                value={momoValues.account_holder}
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
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
                              value={momoValues.network_provider}
                              onChange={(e) =>
                                setMomoValues({
                                  ...momoValues,
                                  network_provider: e.target.value,
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
                                value={momoValues.mobile_number}
                                onChange={(e) =>
                                  setMomoValues({
                                    ...momoValues,
                                    mobile_number: e.target.value,
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
                                value={momoValues.total_amount_paid}
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
                          {/* <div className="" onClick={() => setIsOpen(false)}>
                                                        <button type="button" className="btn btn-outline-dark h-full">
                                                            Cancel
                                                        </button>
                                                    </div> */}
                          <div className="">
                            <button
                              type="button"
                              className="flex flex-row space-x-2 rounded-lg bg-primary p-2 text-white"
                              onClick={() => {
                                paymentMode === "Bank Deposit / Cash" ||
                                paymentMode === "Bank Transfer"
                                  ? handlePayBankPremium()
                                  : paymentMode === "Cheque"
                                  ? handlePayCheckPremium()
                                  : handlePayMomoPremium();
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
    </div>
  );
}

export default Pay;
