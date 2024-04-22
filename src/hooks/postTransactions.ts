import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { formToJSON } from 'axios';
import { TransactionData } from '../interfaces/TransactionData';

import apiClient from '../components/http-common';

interface ApiResponseSuccess {
  result: string;
  previous_balance: number;
  current_balance: number;
}

interface ApiResponseError {
  statusCode: number;
  message: string;
}

const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
}


const postTransaction =  async (payload: TransactionData) => {
    try{
        
        const res = await apiClient.post("/transaction", payload);

        const result = {
            status: res.status + "-" + res.statusText,
            Headers: res.headers,
            data: res.data
        }
        

    
    } catch (err: any) {
        alert(formatResponse(err.response?.data || err))
    }


};

export default postTransaction;
