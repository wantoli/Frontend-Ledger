import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { useGetTransactions } from "../hooks/getTransactions";
import { Transaction } from "../interfaces/Transaction";

function MyTableToolTip() {
    const { transactions } = useGetTransactions();
    const transactionsData: Transaction[] = transactions || [];


    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(transactionsData.length / rowsPerPage);

    const itemData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return transactionsData.slice(start, end);
    }, [page, transactionsData]);
    
    const renderCell = React.useCallback((transactionData: Transaction, columnKey: React.Key) => {
        const cellValue = transactionData[columnKey as keyof Transaction];
    
        switch (columnKey) {
        
            case "transaction_description":
            return (
              <div className="flex flex-col">
                <Tooltip 
                    placement='top-start'
                    content={<div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <div> 
                                    <p className="font-mono text-right">Saldo Anterior:</p> 
                                    <p className="text-right"> {transactionData.previous_balance.transaction_balance} </p>
                                </div>
                                <div>
                                    <p className="font-mono text-right">Saldo Atual...:</p> 
                                    <p className="text-right">  {transactionData.current_balance.transaction_balance} </p>
                                </div>
                            </div>}>
                    <p className="text-bold text-sm capitalize">{cellValue}</p>
                </Tooltip>
              </div>
            );
            case "transaction_value":
            return(
                
                <div className="flex flex-col">
                    
                    <p className="text-bold text-sm capitalize text-right"
                        
                    >{cellValue}</p>
                    
                    
                </div>
            );
          default:
            return cellValue;
        }
      }, []);


    return(
        <Table 
            bottomContent={
            <div className="flex w-full justify-center">
                <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                />
            </div>
            }
        >
            <TableHeader>
                <TableColumn key="transaction_data" width='150' align='start'>Data</TableColumn>
                <TableColumn key="transaction_description" width='300' align='start'>Lancamento</TableColumn>
                <TableColumn key="transaction_value" align='end'>Valor</TableColumn>
            </TableHeader>
            <TableBody items={itemData}>
                {(item) => (
                    <TableRow key={item.transaction_identifier}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

}

export default MyTableToolTip;