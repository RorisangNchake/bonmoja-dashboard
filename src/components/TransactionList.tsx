import type { ITransaction } from "../types/transaction";
import { formatDate } from "../../utils/format-date";
import StatusBadge from "./StatusBadge";
import { currencySymbol } from "../constants/currency-symbol";
import { motion } from "motion/react";
import { isTransactionListPending, transactionList } from "../signals/transactionsSignal";
import { useSignals } from "@preact/signals-react/runtime";

const TransactionList = () => {
    useSignals();
    return (
        <div className="w-full max-w-md mx-auto py-4">
            <h2 className="text-gray-700 text-lg font-semibold mb-2 text-center">Recent Transactions: {isTransactionListPending.value ? "loading..." : transactionList.value.length}</h2>
            <ul className="space-y-4">
                {transactionList.value.length > 0 ? transactionList.value.map((transaction: ITransaction) => (
                    <motion.li whileHover={{ scale: 1.05 }} key={transaction.id} className="hover:bg-zinc-200 bg-white rounded-2xl p-4 border-1 border-zinc-400">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">
                                {formatDate(transaction.date)}
                            </span>
                            <span className={`font-semibold ${
                                transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {currencySymbol[transaction.currency]}{transaction.amount.toFixed(2)}
                            </span>
                        </div>
                        <StatusBadge status={transaction.status} />
                    </motion.li>
                )) : (
                    <li className="text-gray-500 text-center mt-4">No transactions available</li>
                )}
            </ul>
        </div>
    );
}

export default TransactionList;