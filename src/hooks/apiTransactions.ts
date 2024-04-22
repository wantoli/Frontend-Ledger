const API_URL = 'http://localhost:8089/ledger';

export async function ledgerFetchingData(agency: string, account : string){
    
    const response = await fetch( API_URL + 'ledger?Agency=${agency}&Account=${account}');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}