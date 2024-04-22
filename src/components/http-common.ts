import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default axios.create({

    baseURL: "http://localhost:8089/ledger",
    headers: {
        "Content-Type": "application/json",
        "x-correlationid": uuidv4()
    }
});