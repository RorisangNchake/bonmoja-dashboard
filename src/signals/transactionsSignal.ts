import { computed, signal } from "@preact/signals-react";
import type { ITransaction } from "../types/transaction";
import type { currency } from "../types/currency.type";

const transactionState = signal<{
  data: ITransaction[]
  pending: boolean
  error: string | null
}>({
  data: [],
  pending: true,
  error: null,
})

export const transactionList = computed(() => {
  const transactions = transactionState.value.data
  return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export const isTransactionListPending = computed((() => transactionState.value.pending))

export const setInitialTransactions = async () => {
    transactionState.value = {
    ...transactionState.value,
    pending: true,
  };

    try {
          const response = await fetch('/api/transactions.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
    }
    
    const transactions: ITransaction[] = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000))

    transactionState.value = {
      data: transactions,
      pending: false,
      error: null,
    }

    console.log("Initial transactions set successfully:", transactionList.value);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to set initial transactions"
    console.error("Failed to set initial transactions:", error)

    transactionState.value = {
      ...transactionState.value,
      pending: false,
      error: errorMessage,
    }

    throw error
  }
}

export const addTransaction = async (amount: number, currency: currency = "ZAR", type: "deposit" = "deposit") => {
  transactionState.value = {
    ...transactionState.value,
    pending: true,
  };

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newTransaction: ITransaction = {
      id: crypto.randomUUID(),
      type,
      amount,
      currency,
      status: "success",
      date: new Date().toISOString(),
    };

    transactionState.value = {
      data: [...transactionState.value.data, newTransaction],
      pending: false,
      error: null,
    };

    console.log("Transaction added successfully:", newTransaction);
    return newTransaction;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to add transaction";
    console.error("Failed to add transaction:", error);

    transactionState.value = {
      ...transactionState.value,
      pending: false,
      error: errorMessage,
    };

    throw error;
  }
};
