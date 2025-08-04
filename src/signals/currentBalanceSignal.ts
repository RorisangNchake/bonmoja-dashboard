import { computed, signal } from "@preact/signals-react";
import { transactionList } from "./transactionsSignal";
import type { IWallet } from "../types/wallet";
import type { currency } from "../types/currency.type";

export const currentBalance = computed(() => {
    return transactionList.value
            .filter((transaction) => transaction.status === "success")
            .reduce((acc, transaction) => {
                if(transaction.type === "deposit") return acc + transaction.amount;
                else if(transaction.type === "withdrawal") return acc - transaction.amount;

                return acc;
            }, 0)
})

export const walletBalance = signal<IWallet | null>(null);

export const currencySignal = signal<currency>("ZAR");

export const fetchWalletBalance = async () => {
  try {
    const response = await fetch('/api/wallet.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch wallet: ${response.status} ${response.statusText}`);
    }
    
    const wallet: IWallet = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    walletBalance.value = wallet;
    currencySignal.value = wallet.currency;
    console.log("Wallet balance fetched successfully:", wallet);
  } catch (error) {
    console.error("Failed to fetch wallet balance:", error);
    throw error;
  }
};