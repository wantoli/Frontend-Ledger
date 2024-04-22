import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, getKeyValue } from "@nextui-org/react";
import { Transaction } from "../interfaces/Transaction";
import { useGetTransactions } from "../hooks/getTransactions";
import { useMemo, useState } from "react";


function MyTable() {
    const { transactions } = useGetTransactions();
    const transactionsData: Transaction[] = transactions || [];

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(transactionsData.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return transactionsData.slice(start, end);
    }, [page, transactionsData]);
    
    

    return (
        <Table aria-label="Example table with client side pagination"
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
            classNames={{
                wrapper: "min-h-[222px]",
            }}
            color="success"
            selectionMode="single" 
            
        >
        
        <TableHeader>
          <TableColumn key="transaction_data" width='150'>Data</TableColumn>
          <TableColumn key="transaction_description" width='300'>Lancamento</TableColumn>
          <TableColumn key="transaction_value" align='end'>Valor</TableColumn>
        </TableHeader>
        <TableBody items={items}>
        {(item) => (
          <TableRow key={item.transaction_identifier}>
            
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            
          </TableRow>
          
        )}
        </TableBody>
        
        </Table>
      );
}

export default MyTable;