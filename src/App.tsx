import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyTable from './components/MyTable'
import { Table, TableHeader, TableRow, TableColumn, TableBody, Button, Card } from '@nextui-org/react'
import MyModal from './components/MyModal'
import MyTableToolTip from './components/MyTableToolTip'
import MyModalPost from './components/MyModalPost'
import { useGetTransactions } from './hooks/getTransactions'
import { Transaction } from './interfaces/Transaction'
import MyCardPost from './components/MyCardPost'
import MyTableExtrato from './components/MyTableExtrato'
import MyModalCard from './components/MyModalCard'
import { useQueryClient } from 'react-query/types/react/QueryClientProvider'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [agency, setIsAgency] = useState('');
  const [account, setIsAccount] = useState('');

  const { transactions, isLoading, isError, refetch, } 
    = useGetTransactions(agency, account);

  //const transactionsData: Transaction[] = transactions || []

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (agency: string, account: string) => {
    alert("handleFormSubmit" + agency)
    setIsAgency(agency);
    setIsAccount(account);
    refetch();
  };

  const handlePostSuccess = () => {
    alert("handlePostSuccess")
    //invalidateQueries();
    refetch();
    
  };


  const handlePost = async (modalData: any) => {
    
    setIsExecuting(true);
    /*
    try {
      const response = await mutation.mutateAsync(modalData);
      setPostSuccessData(response.data);
      setIsModalOpen(false);
      mutation.reset(); // Invalidate the fetching
    } catch (error) {
      setPostErrorData({ statusCode: error.response.status, message: error.message });
    } finally {
      setIsExecuting(false);
    }
    */
   setIsExecuting(false);
  };

  return (
    <>
      <div className="container">
        <h1>Extrato</h1>
        
          <MyCardPost onSubmit={handleFormSubmit}/>
        
          {isLoading && <p>Loading...</p>}
        
          {isError && <p>Error fetching data</p>}

        <div className="card-grid">
          {/*<MyTableToolTip />*/}
          {console.log("app " + transactions)}
          {transactions && <MyTableExtrato payload={transactions} />}
        </div>

        <div className="flex flex-col gap-2">
          <Button color='primary' className="max-w-fit" onPress={handleOpenModal}>Novo</Button>
        </div>

        <MyModalCard isOpen={isModalOpen} onClose={handleCloseModal} agencyIn={agency} accountIn={account} onPostSuccess={handlePostSuccess} />
      </div>

      
    </>
  )
}

export default App
