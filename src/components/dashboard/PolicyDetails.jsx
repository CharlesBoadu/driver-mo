import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Users,
  Shield,
  Heart,
  ShieldCheck,
  ShieldHalf,
  Mail,
  Phone,
  Calendar,
  Car,
  Hash,
  UserCheck,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import policyAndPlanApi from "../../services/api/policyAndPlanApi";
import formatMoney from "../../lib/utils";

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

function PolicyDetails() {
  const [clientDetails, setClientDetails] = useState(null);
  const [fetchedPlan, setFetchedPlan] = useState(null);
  const [slbToShow, setSlbToShow] = useState({});

  useEffect(() => {
    const clientData = JSON.parse(localStorage.getItem("clientDetails"));
    setClientDetails(clientData);

    const fetchAllPlansAndPolicies = async () => {
      const response = await policyAndPlanApi.fetchAllPlans();
      const responseTwo = await policyAndPlanApi.fetchAllPolicies();
      const selectedPlan = response.data.find(
        (plan) =>
          plan.plan_details.plan_name.toLowerCase() ===
          clientData?.plan_type?.toLowerCase()
      );
      const selectedPolicy = responseTwo?.data?.find(
        (policy) => policy.policy.id === clientData?.policy_id
      );
      setSlbToShow({
        death_live_cover_included:
          selectedPolicy?.slb_death_life_cover?.included,
        critical_illness_included:
          selectedPolicy?.slb_critical_illness?.included,
        total_permanent_disability_included:
          selectedPolicy?.slb_total_permanent_disability?.included,
        hospital_cash_included: selectedPolicy?.slb_hospital_cash?.included,
        hospitalization_ipd_healthcare_included:
          selectedPolicy?.slb_hospitalization?.included,
        telemedicine_included: selectedPolicy?.slb_telemedicine?.included,
        credit_risk_guarantee_included:
          selectedPolicy?.slb_credit_risk_guarantee?.included,
        medical_expenses_opd_ipd_healthcare_included:
          selectedPolicy?.slb_medical_expense?.included,
        partial_withdrawal_included:
          selectedPolicy?.slb_partial_withdrawal?.included,
        surrender_benefit_included:
          selectedPolicy?.slb_surrender_benefit?.included,
        cash_back_included: selectedPolicy?.slb_cash_back?.included,
        maturity_included: selectedPolicy?.slb_maturity?.included,
        special_maternity_support_included:
          selectedPolicy?.slb_social_maternity_support?.included,
      });
      // console.log('selected plan', selectedPlan);
      setFetchedPlan(selectedPlan || []);
    };

    fetchAllPlansAndPolicies();
  }, []);

  const mainLifeData = [
    {
      id: 1,
      name: "Death/Life Cover",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.death_live_cover_included}
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.death_live_cover_amount}
        />
      ),
    },
    {
      id: 2,
      name: "Critical illness (C.I)",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.critical_illness_included}
        />
      ),
      progress: "23%",
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.critical_illness_amount}
        />
      ),
    },
    {
      id: 3,
      name: "Total Permanent Disability (T.P.D)",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={
            fetchedPlan?.main_live_benefit?.total_permanent_disability_included
          }
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={
            fetchedPlan?.main_live_benefit?.total_permanent_disability_amount
          }
        />
      ),
    },
    {
      id: 4,
      name: "Hospital Cash",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.hospital_cash_included}
        />
      ),
      progress: "60%",
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.hospital_cash_amount}
        />
      ),
    },
    {
      id: 5,
      name: "Hospitalization (IPD Healthcare)",
      status: "Canceled",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={
            fetchedPlan?.main_live_benefit
              ?.hospitalization_ipd_healthcare_included
          }
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={
            fetchedPlan?.main_live_benefit
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
    },
    {
      id: 6,
      name: "Telemedicine",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.telemedicine_included}
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.telemedicine_amount}
        />
      ),
    },
    {
      id: 7,
      name: "Credit Risk Guarantee",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={
            fetchedPlan?.main_live_benefit?.credit_risk_guarantee_included
          }
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.credit_risk_guarantee_amount}
        />
      ),
    },
    {
      id: 8,
      name: "Medical Expense (OPD & IPD Healthcare)",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={
            fetchedPlan?.main_live_benefit
              ?.medical_expenses_opd_ipd_healthcare_included
          }
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={
            fetchedPlan?.main_live_benefit
              ?.medical_expenses_opd_ipd_healthcare_amount
          }
        />
      ),
    },
    {
      id: 9,
      name: "Partial Withdrawal",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.partial_withdrawal_included}
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.partial_withdrawal_amount}
        />
      ),
    },
    {
      id: 10,
      name: "Surrender Benefit",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.surrender_benefit_included}
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.surrender_benefit_amount}
        />
      ),
    },
    {
      id: 11,
      name: "Cash back",
      status: "Canceled",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.cash_back_included}
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.cash_back_amount}
        />
      ),
    },
    {
      id: 12,
      name: "Maturity",
      status: "Canceled",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={fetchedPlan?.main_live_benefit?.maturity_included}
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          disabled
          value={fetchedPlan?.main_live_benefit?.maturity_amount}
        />
      ),
    },
    {
      id: 13,
      name: "Special Maternity Support",
      includeBenefit: (
        <input
          type="checkbox"
          disabled
          checked={
            fetchedPlan?.main_live_benefit?.special_maternity_support_included
          }
        />
      ),
      amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          placeholder="Amount"
          value={
            fetchedPlan?.main_live_benefit?.special_maternity_support_amount
          }
          disabled
        />
      ),
    },
  ];

  const secondaryLifeData = [
    {
      id: 1,
      name: "Main Life",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={fetchedPlan?.secondary_live_benefit?.main_life?.included}
          disabled
        />
      ),
      main_life_dl_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.death_live_cover_amount
          }
        />
      ),
      main_life_ci_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.critical_illness_amount
          }
        />
      ),
      main_life_tpd_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.total_permanent_disability_amount
          }
        />
      ),
      main_life_hc_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life?.hospital_cash_amount
          }
        />
      ),
      main_life_hi_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
      main_life_tel_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life?.telemedicine_amount
          }
        />
      ),
      main_life_cr_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.current_risk_guarantee_amount
          }
        />
      ),
      main_life_me_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.medical_expense_opd_ipd_healthcare_amount
          }
        />
      ),
      main_life_pw_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.partial_withdrawal_amount
          }
        />
      ),
      main_life_sb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.surrender_benefit_amount
          }
        />
      ),
      main_life_cb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life?.cashback_amount
          }
        />
      ),
      main_life_ma_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life?.maturity_amount
          }
        />
      ),
      main_life_sms_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.main_life
              ?.special_maternity_support_amount
          }
        />
      ),
    },
    // {
    //     id: 2,
    //     name: 'Spouse',
    //     benefitToInclude: <input type="checkbox" checked={fetchedPlan?.secondary_live_benefit?.spouse?.included} disabled />,
    //     spouse_dl_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.death_live_cover_amount} />,
    //     spouse_ci_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.critical_illness_amount} />,
    //     spouse_tpd_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.total_permanent_disability_amount} />,
    //     spouse_hc_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.hospital_cash_amount} />,
    //     spouse_hi_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.hospitalization_ipd_healthcare_amount} />,
    //     spouse_tel_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.telemedicine_amount} />,
    //     spouse_cr_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.current_risk_guarantee_amount} />,
    //     spouse_me_amount: (
    //         <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.medical_expense_opd_ipd_healthcare_amount} />
    //     ),
    //     spouse_pw_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.partial_withdrawal_amount} />,
    //     spouse_sb_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.surrender_benefit_amount} />,
    //     spouse_cb_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.cashback_amount} />,
    //     spouse_ma_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.maturity_amount} />,
    //     spouse_sms_amount: <input type="text" className="rounded-lg border-[1.7px] px-2 py-2" disabled value={fetchedPlan?.secondary_live_benefit?.spouse?.special_maternity_support_amount} />,
    // },
    {
      id: 3,
      name: "Adult Dependant 1",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1?.included
          }
          disabled
        />
      ),
      adult_dependant_1_dl_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.death_live_cover_amount
          }
        />
      ),
      adult_dependant_1_ci_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.critical_illness_amount
          }
        />
      ),
      adult_dependant_1_tpd_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.total_permanent_disability_amount
          }
        />
      ),
      adult_dependant_1_hc_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.hospital_cash_amount
          }
        />
      ),
      adult_dependant_1_hi_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
      adult_dependant_1_tel_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.telemedicine_amount
          }
        />
      ),
      adult_dependant_1_cr_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.current_risk_guarantee_amount
          }
        />
      ),
      adult_dependant_1_me_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.medical_expense_opd_ipd_healthcare_amount
          }
        />
      ),
      adult_dependant_1_pw_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.partial_withdrawal_amount
          }
        />
      ),
      adult_dependant_1_sb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.surrender_benefit_amount
          }
        />
      ),
      adult_dependant_1_cb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.cashback_amount
          }
        />
      ),
      adult_dependant_1_ma_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.maturity_amount
          }
        />
      ),
      adult_dependant_1_sms_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_1
              ?.special_maternity_support_amount
          }
        />
      ),
    },
    {
      id: 4,
      name: "Adult Dependant 2",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2?.included
          }
          disabled
        />
      ),
      adult_dependant_2_dl_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.death_live_cover_amount
          }
        />
      ),
      adult_dependant_2_ci_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.critical_illness_amount
          }
        />
      ),
      adult_dependant_2_tpd_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.total_permanent_disability_amount
          }
        />
      ),
      adult_dependant_2_hc_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.hospital_cash_amount
          }
        />
      ),
      adult_dependant_2_hi_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
      adult_dependant_2_tel_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.telemedicine_amount
          }
        />
      ),
      adult_dependant_2_cr_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.current_risk_guarantee_amount
          }
        />
      ),
      adult_dependant_2_me_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.medical_expense_opd_ipd_healthcare_amount
          }
        />
      ),
      adult_dependant_2_pw_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.partial_withdrawal_amount
          }
        />
      ),
      adult_dependant_2_sb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.surrender_benefit_amount
          }
        />
      ),
      adult_dependant_2_cb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.cashback_amount
          }
        />
      ),
      adult_dependant_2_ma_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.maturity_amount
          }
        />
      ),
      adult_dependant_2_sms_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.adult_dependant_2
              ?.special_maternity_support_amount
          }
        />
      ),
    },
    {
      id: 5,
      name: "Dependant Included",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={fetchedPlan?.secondary_live_benefit?.dependant_included}
          disabled
        />
      ),
    },
    {
      id: 8,
      name: "Child 1",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={fetchedPlan?.secondary_live_benefit?.child_1?.included}
          disabled
        />
      ),
      child_1_dl_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.death_live_cover_amount
          }
        />
      ),
      child_1_ci_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.critical_illness_amount
          }
        />
      ),
      child_1_tpd_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.total_permanent_disability_amount
          }
        />
      ),
      child_1_hc_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1?.hospital_cash_amount
          }
        />
      ),
      child_1_hi_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
      child_1_tel_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1?.telemedicine_amount
          }
        />
      ),
      child_1_cr_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.current_risk_guarantee_amount
          }
        />
      ),
      child_1_me_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.medical_expense_opd_ipd_healthcare_amount
          }
        />
      ),
      child_1_pw_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.partial_withdrawal_amount
          }
        />
      ),
      child_1_sb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.surrender_benefit_amount
          }
        />
      ),
      child_1_cb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_1?.cashback_amount}
        />
      ),
      child_1_ma_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_1?.maturity_amount}
        />
      ),
      child_1_sms_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_1
              ?.special_maternity_support_amount
          }
        />
      ),
    },
    {
      id: 7,
      name: "Child 2",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={fetchedPlan?.secondary_live_benefit?.child_2?.included}
          disabled
        />
      ),
      child_2_dl_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.death_live_cover_amount
          }
        />
      ),
      child_2_ci_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.critical_illness_amount
          }
        />
      ),
      child_2_tpd_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.total_permanent_disability_amount
          }
        />
      ),
      child_2_hc_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2?.hospital_cash_amount
          }
        />
      ),
      child_2_hi_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
      child_2_tel_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2?.telemedicine_amount
          }
        />
      ),
      child_2_cr_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.current_risk_guarantee_amount
          }
        />
      ),
      child_2_me_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.medical_expense_opd_ipd_healthcare_amount
          }
        />
      ),
      child_2_pw_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.partial_withdrawal_amount
          }
        />
      ),
      child_2_sb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.surrender_benefit_amount
          }
        />
      ),
      child_2_cb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_2?.cashback_amount}
        />
      ),
      child_2_ma_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_2?.maturity_amount}
        />
      ),
      child_2_sms_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_2
              ?.special_maternity_support_amount
          }
        />
      ),
    },
    {
      id: 8,
      name: "Child 3",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={fetchedPlan?.secondary_live_benefit?.child_3?.included}
          disabled
        />
      ),
      child_3_dl_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.death_live_cover_amount
          }
        />
      ),
      child_3_ci_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.critical_illness_amount
          }
        />
      ),
      child_3_tpd_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.total_permanent_disability_amount
          }
        />
      ),
      child_3_hc_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3?.hospital_cash_amount
          }
        />
      ),
      child_3_hi_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
      child_3_tel_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3?.telemedicine_amount
          }
        />
      ),
      child_3_cr_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.current_risk_guarantee_amount
          }
        />
      ),
      child_3_me_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.medical_expense_opd_ipd_healthcare_amount
          }
        />
      ),
      child_3_pw_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.partial_withdrawal_amount
          }
        />
      ),
      child_3_sb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.surrender_benefit_amount
          }
        />
      ),
      child_3_cb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_3?.cashback_amount}
        />
      ),
      child_3_ma_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_3?.maturity_amount}
        />
      ),
      child_3_sms_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_3
              ?.special_maternity_support_amount
          }
        />
      ),
    },
    {
      id: 9,
      name: "Child 4",
      benefitToInclude: (
        <input
          type="checkbox"
          checked={fetchedPlan?.secondary_live_benefit?.child_4?.included}
          disabled
        />
      ),
      child_4_dl_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.death_live_cover_amount
          }
        />
      ),
      child_4_ci_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.critical_illness_amount
          }
        />
      ),
      child_4_tpd_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.total_permanent_disability_amount
          }
        />
      ),
      child_4_hc_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4?.hospital_cash_amount
          }
        />
      ),
      child_4_hi_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.hospitalization_ipd_healthcare_amount
          }
        />
      ),
      child_4_tel_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4?.telemedicine_amount
          }
        />
      ),
      child_4_cr_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.current_risk_guarantee_amount
          }
        />
      ),
      child_4_me_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.medical_expense_opd_ipd_healthcare_amount
          }
        />
      ),
      child_4_pw_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.partial_withdrawal_amount
          }
        />
      ),
      child_4_sb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.surrender_benefit_amount
          }
        />
      ),
      child_4_cb_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_4?.cashback_amount}
        />
      ),
      child_4_ma_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={fetchedPlan?.secondary_live_benefit?.child_4?.maturity_amount}
        />
      ),
      child_4_sms_amount: (
        <input
          type="text"
          className="rounded-lg border-[1.7px] px-2 py-2"
          disabled
          value={
            fetchedPlan?.secondary_live_benefit?.child_4
              ?.special_maternity_support_amount
          }
        />
      ),
    },
  ];

  console.log("secondary Life data", secondaryLifeData);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
          <CardDescription>AUTO-INS-2025-07-29</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-orange-600">
                <User className="w-5 h-5" />
                Client Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-gray-50/50">
                <DetailItem
                  icon={User}
                  label="Name"
                  value={
                    clientDetails?.first_name + " " + clientDetails?.last_name
                  }
                />
                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={clientDetails?.email || "N/A"}
                />
                <DetailItem
                  icon={Phone}
                  label="Contact"
                  value={clientDetails?.msisdn || "N/A"}
                />
                <DetailItem
                  icon={Calendar}
                  label="Date of Birth"
                  value={clientDetails?.dob || "N/A"}
                />
                <DetailItem
                  icon={Hash}
                  label="Vehicle Number"
                  value={clientDetails?.product?.item_product || "N/A"}
                />
                <DetailItem
                  icon={Car}
                  label="Vehicle Type"
                  value={clientDetails?.product?.item_type || "N/A"}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-orange-600">
                <Users className="w-5 h-5" />
                Secondary Lives
              </h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50/50">
                  <p className="font-semibold mb-4">1. Secondary Life 1</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem
                      icon={User}
                      label="Name"
                      value={clientDetails?.dependent_one?.name || "N/A"}
                    />
                    <DetailItem
                      icon={Calendar}
                      label="Date of Birth"
                      value={clientDetails?.dependent_one?.dob || "N/A"}
                    />
                    <DetailItem
                      icon={UserCheck}
                      label="Relationship"
                      value={
                        clientDetails?.dependent_one?.relationship || "N/A"
                      }
                    />
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-gray-50/50">
                  <p className="font-semibold mb-4">2. Secondary Life 2</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem
                      icon={User}
                      label="Name"
                      value={clientDetails?.dependent_two?.name || "N/A"}
                    />
                    <DetailItem
                      icon={Calendar}
                      label="Date of Birth"
                      value={clientDetails?.dependent_one?.dob || "N/A"}
                    />
                    <DetailItem
                      icon={UserCheck}
                      label="Relationship"
                      value={
                        clientDetails?.dependent_one?.relationship || "N/A"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-orange-600">
                <Shield className="w-5 h-5" />
                Cover Details
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Life</TableHead>
                      {mainLifeData?.map((data) => (
                        <>
                          {data.includeBenefit.props.checked && (
                            <TableHead key={data.id} className="text-right">
                              {data.name}
                            </TableHead>
                          )}
                        </>
                      ))}
                      {/* <TableHead className="text-right">
                        Death Benefit
                      </TableHead>
                      <TableHead className="text-right">TPD</TableHead>
                      <TableHead className="text-right">
                        Hospitalization
                      </TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        {clientDetails?.first_name +
                          " " +
                          clientDetails?.last_name}
                      </TableCell>{" "}
                      {mainLifeData?.map(
                        (data) =>
                          data.includeBenefit.props.checked && (
                            <TableCell key={data.id} className="text-right">
                              GHS {formatMoney(data.amount.props.value)}
                            </TableCell>
                          )
                      )}
                    </TableRow>
                    {/* <TableRow>
                      <TableCell className="font-medium">
                        Principal (Mark Larbi)
                      </TableCell>
                      <TableCell className="text-right">
                        GHS 10,000.00
                      </TableCell>
                      <TableCell className="text-right">GHS 5,000.00</TableCell>
                      <TableCell className="text-right">GHS 3,000.00</TableCell>
                    </TableRow> */}
                    <TableRow>
                      <TableCell className="font-medium">
                        Secondary Life 1 ({clientDetails?.dependent_one?.name})
                      </TableCell>{" "}
                      {secondaryLifeData?.map((data, index) => {
                        if (data?.id !== 3) return null;

                        return (
                          <>
                            {slbToShow.death_live_cover_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_dl_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.critical_illness_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_ci_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.total_permanent_disability_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_tpd_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.hospital_cash_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_hc_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.hospitalization_ipd_healthcare_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_hi_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.telemedicine_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_tel_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.credit_risk_guarantee_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_cr_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.medical_expenses_opd_ipd_healthcare_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_me_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.partial_withdrawal_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_pw_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.surrender_benefit_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_sb_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.cash_back_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_cb_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.maturity_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_ma_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.special_maternity_support_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_1_sms_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}{" "}
                          </>
                        );
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Secondary Life 2 ({clientDetails?.dependent_two?.name})
                      </TableCell>{" "}
                      {secondaryLifeData?.map((data, index) => {
                        if (data?.id !== 4) return null;

                        return (
                          <>
                            {slbToShow.death_live_cover_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_dl_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.critical_illness_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_ci_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.total_permanent_disability_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_tpd_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.hospital_cash_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_hc_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.hospitalization_ipd_healthcare_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_hi_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.telemedicine_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_tel_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.credit_risk_guarantee_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_cr_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.medical_expenses_opd_ipd_healthcare_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_me_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.partial_withdrawal_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_pw_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.surrender_benefit_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_sb_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.cash_back_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_cb_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.maturity_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_ma_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}
                            {slbToShow.special_maternity_support_included && (
                              <TableCell key={data.id} className="text-right">
                                GHS{" "}
                                {formatMoney(
                                  String(
                                    data.adult_dependant_2_sms_amount?.props
                                      .value
                                  )
                                ) || "-"}
                              </TableCell>
                            )}{" "}
                          </>
                        );
                      })}
                    </TableRow>
                    {/* <TableRow>
                      <TableCell className="font-medium">
                        Secondary Life 1 (Kwame Appiah)
                      </TableCell>
                      <TableCell className="text-right">GHS 5,000.00</TableCell>
                      <TableCell className="text-right text-gray-400">
                        -
                      </TableCell>
                      <TableCell className="text-right text-gray-400">
                        -
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Secondary Life 2 (Maame Ama)
                      </TableCell>
                      <TableCell className="text-right">GHS 5,000.00</TableCell>
                      <TableCell className="text-right text-gray-400">
                        -
                      </TableCell>
                      <TableCell className="text-right text-gray-400">
                        -
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PolicyDetails;
