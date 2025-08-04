import { computed, signal } from "@preact/signals-react";
import { addTransaction } from "./transactionsSignal";
import { isOpen } from "./isOpenSignal";

const amountState = signal<{
    data: string,
    error: string | null,
}>({
    data: "",
    error: null
})

export const amount = computed(() => amountState.value.data);

export const error = computed(() => amountState.value.error);

export const resetAmount = () => amountState.value = {
    data: "",
    error: null
};

export const updateAmount = (newAmount: string) => {
    if (isNaN(Number(newAmount)) || Number(newAmount) < 0) {
        amountState.value = {
            ...amountState.value,
            error: "Invalid amount"
        };
    } else {
        amountState.value = {
            data: newAmount,
            error: null
        };
    }
}

export const submitAmount = async () => {
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
        amountState.value = {
            ...amountState.value,
            error: "Invalid amount. add value greater than 0"
        };
        return;
    }
        await addTransaction(parseFloat(amount.value));
        isOpen.value = false;
    
    // Reset the amount after submission
    resetAmount();
}
