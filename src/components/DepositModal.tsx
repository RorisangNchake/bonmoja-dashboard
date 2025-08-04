import { motion } from "motion/react";
import Button from "./Button";
import { isOpen } from "../signals/isOpenSignal";
import { isTransactionListPending } from "../signals/transactionsSignal";
import { useSignals } from "@preact/signals-react/runtime";
import { amount, error submitAmount, updateAmount } from "../signals/modalSignal";
import { ChevronDown } from 'lucide-react';
import { useState } from "react";

const DepositModal = () => {
  useSignals();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("debit");

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-auto border-2 border-zinc-900"
      >
        <div className="text-center mb-6">
          <h2 className="text-gray-700 text-xl font-semibold mb-2">Make a Deposit</h2>
          <p className="text-gray-500 text-sm">Enter the amount you'd like to deposit</p>
        </div>
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount (ZAR)
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                value={amount.value}
                onChange={(e) => updateAmount(e.target.value)}
                required
                disabled={isTransactionListPending.value}
                className="text-black w-full pl-8 pr-4 py-3 border-2 border-zinc-400 rounded-xl focus:border-zinc-900 focus:outline-none text-lg font-semibold"
              />
              <span className="text-red-500">{error.value}</span>
            </div>
          </div>

        <div className="relative">
        <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-3 border-2 border-zinc-400 rounded-xl focus:border-zinc-900 focus:outline-none text-lg font-semibold bg-white text-left flex items-center justify-between"
        >
            <span className="text-black">{selectedMethod === "debit" ? "Debit Card" : "Credit Card"}</span>
            <ChevronDown className="w-5 h-5 text-gray-500" />
        </button>
        
        {isDropdownOpen && (
            <div className="text-black absolute top-full left-0 right-0 mt-1 bg-white border-2 border-zinc-400 rounded-xl shadow-lg">
            <button
                type="button"
                onClick={() => { setSelectedMethod("debit"); setIsDropdownOpen(false); }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl"
            >
                Debit Card
            </button>
            <button
                type="button"
                onClick={() => { setSelectedMethod("credit"); setIsDropdownOpen(false); }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 last:rounded-b-xl"
            >
                Credit Card
            </button>
            </div>
        )}
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={() => isOpen.value = false} color="secondary">
              <span className="flex items-center justify-center">Cancel</span>
            </Button>
            <Button onClick={submitAmount} color="primary">
              <span className="flex items-center justify-center">
                {isTransactionListPending.value ? "Loading..." : "Confirm"}
              </span>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DepositModal;