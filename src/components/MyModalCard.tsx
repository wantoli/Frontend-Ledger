import { Modal, Input, Radio, Button, RadioGroup, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider } from "@nextui-org/react";
import { useState } from "react";
import postTransaction from "../hooks/postTransactions";
import { TransactionData } from "../interfaces/TransactionData";
import { useQueryClient } from "react-query";



interface MyModalProps {
    onClose: () => void;
    isOpen: boolean;
    agencyIn: string;
    accountIn: string;
    onPostSuccess: () => void;

}

const MyModalCard: React.FC<MyModalProps> = ({ isOpen, onClose, agencyIn, accountIn, onPostSuccess }) => {
    const [isPosting, setIsPosting] = useState(false);
    const [agency, setAgency] = useState<string>(agencyIn);
    const [account, setAccount] = useState<string>(accountIn);
    const [description, setDescription] = useState<string>('');
    const [dateTransaction, setDateTransaction] = useState<string>(new Date().toISOString().split('T')[0]);
    const [valueTransaction, setValueTransaction] = useState<string>('0.00');
    const [selected, setSelected] = useState("Credit");

    const handleSubmmit = async () => {
        setIsPosting(true);
        /*await new Promise(resolve => setTimeout(resolve, 5000));
        
        
        setIsPosting(false);
        onClose();
        */

        const modalData : TransactionData = {
            agency: agencyIn,
            account: accountIn,
            transaction_description: description,
            transaction_date: dateTransaction,
            transaction_value: parseFloat(valueTransaction),
            transaction_operation: selected
        };

        try {
            postTransaction(modalData)
                .then((response) => {
                    setIsPosting(false);
                    onPostSuccess();
                    onClose();
                    
            
                });
        } catch (error) {
            alert('Post failed:' + error);
            setIsPosting(false);
            onClose();
        }
    }

    
    
    return(
        
            <Modal
                
                isOpen={isOpen} 
                onClose={onClose}
                placement="top-center"
                isDismissable={!isPosting} isKeyboardDismissDisabled={isPosting}
                
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Autorizar lancamento</ModalHeader>
                    <ModalBody>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text" label="Agency"
                            placeholder="Enter the agency" variant="bordered"
                            isRequired isDisabled={true}
                            onValueChange={setAgency} value={agencyIn}
                        
                        />
                        <Input
                            type="text" label="Account"
                            variant="bordered" placeholder="Enter the account"
                            isRequired isDisabled={true}
                            onValueChange={setAccount} value={accountIn}
                        />
                    </div>
                    <Divider/>
                    <Input
                        type="text" label="Date"
                        variant="bordered" placeholder="Please enter the date"
                        isRequired isDisabled={isPosting}
                        onValueChange={setDateTransaction} value={dateTransaction}
                    /> 
                    <Input
                        type="text"
                        label="Description"
                        variant="bordered"
                        placeholder="Please enter the description"
                        isRequired isDisabled={isPosting}
                        onValueChange={setDescription} value={description}
                    />   
                    <Input
                        type="text" label="Value"
                        isRequired isDisabled={isPosting}
                        variant="bordered" placeholder="0.00"
                        onValueChange={setValueTransaction} value={valueTransaction}
                        >
                        </Input>
                        <Divider/>
                        <div className="flex flex-col gap-3">
                            <RadioGroup
                                label="Select Operation" orientation="horizontal"
                                value={selected}
                                onValueChange={setSelected}
                                isDisabled={isPosting}
                            >
                                <Radio value="Credit">Credit</Radio>
                                <Radio value="Debit">Debit</Radio>
                            </RadioGroup>
                        </div>      
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose} isDisabled={isPosting}>
                        Close
                        </Button>
                        <Button color="primary" onPress={handleSubmmit} isLoading={isPosting}>
                            {isPosting ? 'postando...' : 'postar'}  
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
    
    );
};

export default MyModalCard;