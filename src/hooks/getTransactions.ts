import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../interfaces/Transaction";
import axios, { AxiosPromise } from "axios";

const API_URL = 'http://localhost:8089/ledger';


const fetchData = async (agency : string, account :string): AxiosPromise<Transaction[]> => {
    const response = axios.get(API_URL + '/extrato?Agency=' + agency + '&Account=' + account);
    return response;
}


export function useGetTransactions(agency: string, account: string){
    const query = useQuery({
        queryFn: () => fetchData('0933', '00268419'),
        queryKey: ['extrato-data'],
        retry: 1,
        enabled: false
    })

    
    return {
        ...query,
        transactions: query.data?.data
    }
}
