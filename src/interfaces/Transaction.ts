export interface Transaction {
    transaction_identifier: string;
    transaction_data: string;
    transaction_description: string;
    transaction_value: number;
    transaction_operation: string;
    current_balance: current_balance;
    previous_balance: previous_balance;
}

export interface current_balance{
    transaction_balance: string;
    transaction_id: string;
}

export interface previous_balance{
    transaction_balance: string;
    transaction_id: string;
}