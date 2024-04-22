import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { Transaction } from "../interfaces/Transaction";
import {EyeIcon} from "../assets/eyeicon.svg";

interface MyTableExtratoPropos {
    payload: Transaction []
}

const MyTableExtrato: React.FC<MyTableExtratoPropos> = ({payload}) => {
    
    const transactionsData: Transaction[] = payload || [];

    console.log(transactionsData);

    const columns = [
        {name: "DATA", uid: "transaction_data"},
        {name: "LANCAMENTO", uid: "transaction_description"},
        {name: "VALOR", uid: "transaction_value"},
        {name: "ACTIONS", uid: "actions"},
      ];
      

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(payload.length / rowsPerPage);

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
            case "actions":
                alert("actions")
                return(
                    
                        <p>wilson</p>
                    
                );
          default:
            return cellValue;
        }
      }, []);


    return(
        <Table isStriped
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
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
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

export default MyTableExtrato;