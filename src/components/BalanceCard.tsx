import Button from "./Button";
import type { IWallet } from "../types/wallet";
import { currencySymbol } from "../constants/currency-symbol";
import { isOpen } from "../signals/isOpenSignal";
import { isTransactionListPending } from "../signals/transactionsSignal";
import { useSignals } from "@preact/signals-react/runtime";

const BalanceCard = ({ balance = 0, currency = "ZAR" }: IWallet) => {
    useSignals();
    return (
        <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-auto
                      border-1 border-zinc-400 max-h-90 lg:mt-8">
            <img src="src/assets/cropped-Bonmoja-Favicon-V2.webp" alt="Logo" className="w-16 h-16 mx-auto mb-4 rounded-full" />
            <h3 className="text-gray-700 text-lg font-semibold mb-2">Current Balance</h3>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {isTransactionListPending.value ? "Loading..." : `${currencySymbol[currency]}${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center px-2 items-center">
                <Button onClick={() => isOpen.value = !isOpen.value} color="primary">
                    <span className="flex items-center">
                        Deposit
                    </span>
                </Button>
                <Button color="secondary">
                    <span className="flex items-center">
                        Withdraw
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default BalanceCard;