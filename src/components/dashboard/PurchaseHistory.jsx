import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { toast } from "@/components/ui/use-toast";
import {
  Download,
  Filter,
  Search,
  Eye,
  CreditCard,
  Smartphone,
  DollarSign,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import policyAndPlanApi from "../../services/api/policyAndPlanApi";
import formatMoney from "../../lib/utils";

const historyData = {
  "July 2025": [
    {
      id: "TXN72943",
      date: "2025-07-28",
      time: "08:15 AM",
      location: "Frimps Fuel - Adum",
      quantity: "30L",
      amount: "450.00",
      premium: "5.00",
      paymentMethod: "Card Payment",
    },
    {
      id: "TXN72942",
      date: "2025-07-25",
      time: "05:45 PM",
      location: "Frimps Fuel - Tech Junc.",
      quantity: "25L",
      amount: "375.00",
      premium: "4.50",
      paymentMethod: "Momo",
    },
    {
      id: "TXN72941",
      date: "2025-07-22",
      time: "10:00 AM",
      location: "Frimps Fuel - Sofoline",
      quantity: "35L",
      amount: "525.00",
      premium: "5.50",
      paymentMethod: "Cash Bind",
    },
    {
      id: "TXN72940",
      date: "2025-07-20",
      time: "09:30 PM",
      location: "Frimps Fuel - KNUST",
      quantity: "20L",
      amount: "300.00",
      premium: "4.00",
      paymentMethod: "Card Payment",
    },
  ],
  "June 2025": [
    {
      id: "TXN72939",
      date: "2025-06-18",
      time: "07:30 AM",
      location: "Frimps Fuel - Adum",
      quantity: "28L",
      amount: "420.00",
      premium: "4.80",
      paymentMethod: "Momo",
    },
  ],
};

const MonthlySummary = ({ month, transactions, onTransactionSelect }) => {
  console.log("Transactiopns", transactions);
  const [isOpen, setIsOpen] = useState(true);
  const totalPurchase = transactions
    ?.reduce((acc, t) => acc + parseFloat(t.amount), 0)
    .toFixed(2);
  const totalLitres = transactions[0]?.totalLitres;
  const premiumDue = transactions[0]?.premiumDue;
  const deficitPremium = transactions[0]?.deficitPremium;
  // reduce((acc, t) => acc + parseFloat(t.totalLitres), 0) ||
  // ("N/A");
  const totalPremiums = transactions
    ?.reduce((acc, t) => acc + parseFloat(t.premiumDue || 0), 0)
    .toFixed(2);

  return (
    <div className="border-b">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
          <p className="font-bold text-lg text-gray-800">{month}</p>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-sm text-gray-500">Total Purchase</p>
            <p className="font-semibold">GHS {totalPurchase}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Litres</p>
            <p className="font-semibold">{totalLitres}L</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Premium Due</p>
            <p className="font-semibold">GHS {premiumDue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Premiums</p>
            <p className="font-semibold text-orange-600 flex flex-row">
              GHS {totalPremiums}{" "}
              {deficitPremium < 0 ? (
                <ArrowUp color="green" />
              ) : (
                <ArrowDown color="red" />
              )}
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Station Name / Location</TableHead>
                    <TableHead className="text-right">
                      Earned Premium (GHS)
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="font-medium">{item.date}</div>
                        <div className="text-sm text-gray-500">{item.time}</div>
                      </TableCell>
                      <TableCell>{item.location?.station_name}</TableCell>
                      <TableCell className="text-right font-semibold text-orange-600">
                        GHS {formatMoney(item.amount)}
                      </TableCell>
                      <TableCell className="text-center">
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onTransactionSelect(item)}
                          >
                            <Eye className="w-5 h-5 text-gray-500" />
                          </Button>
                        </DialogTrigger>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function PurchaseHistory() {
  const [fetchedPremiumHistory, setFetchedPremiumHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleDownload = (format) => {
    toast({
      title: "🚧 Download Starting!",
      description: `This feature isn't fully implemented, but your ${format.toUpperCase()} download would start now! 🚀`,
    });
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case "Card Payment":
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case "Momo":
        return <Smartphone className="w-4 h-4 text-yellow-500" />;
      case "Cash Bind":
        return <DollarSign className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchPremiumHistory = async () => {
      setLoading(true);
      const clientData =
        JSON.parse(localStorage.getItem("clientDetails")) || {};
      const response = await policyAndPlanApi.fetchPremiumHistory({
        policy_holder_id: clientData?.policy_holder_id || "",
      });
      // console.log("Response", response);
      setLoading(false);
      if (response?.data?.length > 0) {
        setFetchedPremiumHistory(
          Object.fromEntries(
            (response?.data?.reverse() || []).map((data) => [
              data?.month,
              data?.transactions?.map((item) => ({
                id: item?.transaction_id || "N/A",
                date:
                  item?.date_paid.split("T")[0] ||
                  item?.date_paid.split(" ")[0] ||
                  "N/A",
                time:
                  item?.date_paid.split("T")[1] ||
                  item?.date_paid.split(" ")[1] ||
                  "N/A",
                location: item?.location || "N/A",
                quantity: item?.total_litres || "N/A",
                amount: item?.total_amount_paid || "0.00",
                premium: item?.earned_premium || "0.00",
                paymentMethod: item?.payment_method || "N/A",
                premiumDue: data?.premium_due || "N/A",
                deficitPremium: data?.deficit_premium || "N/A",
                totalLitres:
                  data?.total_units === 0 ? "0" : data?.total_units || "N/A",
              })) || [],
            ])
          )
        );
      } else {
        setFetchedPremiumHistory([]);
      }
    };

    fetchPremiumHistory();
  }, []);

  // console.log("Fetched premium history:", fetchedPremiumHistory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel & Insurance Purchase History</CardTitle>
        <CardDescription>
          A detailed log of all your transactions.
        </CardDescription>
      </CardHeader>
      {loading ? (
        <CardContent>
          <p className="text-center py-10">Loading purchase history...</p>
        </CardContent>
      ) : (
        <>
          {fetchedPremiumHistory?.length === 0 && (
            <CardContent>
              <p className="text-center py-10">
                No purchase history available.
              </p>
            </CardContent>
          )}
          {fetchedPremiumHistory && (
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by location..."
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span>Filter by Date</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7">Last 7 Days</SelectItem>
                    <SelectItem value="last30">Last 30 Days</SelectItem>
                    <SelectItem value="last90">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => handleDownload("pdf")}
                  className="w-full md:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              <Dialog>
                <div className="rounded-md border">
                  {Object.entries(fetchedPremiumHistory || []).map(
                    ([month, transactions]) => (
                      <MonthlySummary
                        key={month}
                        month={month}
                        transactions={transactions}
                        onTransactionSelect={setSelectedTransaction}
                      />
                    )
                  )}
                </div>
                {selectedTransaction && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Transaction Details</DialogTitle>
                      <DialogDescription>
                        Full details for transaction {selectedTransaction.id}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          Transaction ID:
                        </span>
                        <span className="font-mono text-sm">
                          {selectedTransaction.id}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          Date & Time:
                        </span>
                        <span>{selectedTransaction.date}</span>
                        <span>{selectedTransaction.time}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          Station Name / Location:
                        </span>
                        <span>{selectedTransaction.location}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          Fuel Quantity:
                        </span>
                        <span>{selectedTransaction.quantity}</span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          Total Amount:
                        </span>
                        <span className="font-semibold">
                          GHS {selectedTransaction.amount}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          Insurance Premium:
                        </span>
                        <span className="font-semibold text-orange-600">
                          GHS {selectedTransaction.premium}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <span className="text-sm font-medium text-gray-500">
                          Payment Method:
                        </span>
                        <span className="flex items-center gap-2">
                          {getPaymentIcon(selectedTransaction.paymentMethod)}
                          {selectedTransaction.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </CardContent>
          )}
        </>
      )}
    </Card>
  );
}

export default PurchaseHistory;
