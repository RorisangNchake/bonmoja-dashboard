import type { currency } from "./currency.type";

export interface ITransaction {
    id: string;
    type: "deposit" | "withdrawal";
    amount: number;
    currency: currency;
    status: "success" | "failed";
    date: string; // ISO date string
}