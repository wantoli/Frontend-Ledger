import { Modal, Input, Radio, Button, RadioGroup, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {useFocusWithin} from 'react-aria'



interface MyModalProps {
    onClose: () => void;
    isOpen: boolean;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, onClose }) => {
    const [agency, setAgency] = useState('');
    const [account, setAccount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [financialValue, setFinancialValue] = useState('0.00');
    const [selected, setSelected] = useState("Credit");
    const [isPosting, setIsPosting] = useState(false);

    const [isAgencyFocus, setIsAgencyFocus] = useState<boolean>(false);

    const [todayDate, setTodayDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isTodayDateInvalid, setIsTodayDateInvalid] = useState<boolean>(true);

    const validateFinancialValue = (financialValue: string) => financialValue.match(/^\d+(\.\d{1,2})?$/);
    const validateAgencyValue = (agencyValue : string) => agencyValue.match(/^\d{4}$/);

    const isFinancialValueInvalid = React.useMemo(() => {
        if (financialValue === "") return false;

        return validateFinancialValue(financialValue) ? false : true;
    }, [financialValue]) ;

    const isAgencyInvalid = React.useMemo(() => {
        if (agency === "") return false;

        return  validateAgencyValue(agency) ? false : true;
    }, [agency]) ;

    const isAccountInvalid = React.useMemo(() => {
        if (account.trim ()) return false;

        return  true;
    }, [account]) ;

    const isDateInvalid = React.useMemo(() => {
        if (date.trim ()) return false;

        return  true;
    }, [date]) ;

    const isDescriptionInvalid = React.useMemo(() => {
        if (description.trim ()) return false;

        return  true;
    }, [description]) ;


    const handleFocus = () => {
        setIsAgencyFocus(true)
        validateAgency(agency);
    }

    const handleBlur = () => {
        setIsAgencyFocus(false)
    }

    const clearValues = () => {
        setDate('');
        setDescription('');
        setFinancialValue('');
        setAgency('');
        setAccount('');
    } 

    const handleSubmmit = async () => {
        if (isFinancialValueInvalid || isDescriptionInvalid || 
            isDateInvalid || isAgencyInvalid || isAccountInvalid){
            alert('Please fill all fields correctly.')
        return;
        }
        
        setIsPosting(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        
        setIsPosting(false);
        clearValues();  
        onClose();
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
                            isRequired
                            value={agency} onValueChange={setAgency}
                            errorMessage={isAgencyInvalid && "Please enter a agency value"}
                            color={isDateInvalid && isAgencyFocus ? 'danger' : 'secondary'}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        
                        />
                        <Input
                            type="text" label="Account"
                            variant="bordered" placeholder="Enter the account"
                            isRequired
                            value={account} onValueChange={setAccount}
                            onFocus={handleFocus}
                        />
                    </div>
                    <Divider/>
                    <Input
                        type="text" label="Date"
                        variant="bordered" placeholder="Please enter the date"
                        isRequired
                        value={todayDate} onValueChange={setTodayDate}
                        isInvalid={isTodayDateInvalid}
                        onFocus={handleFocus}
                    /> 
                    <Input
                        type="text"
                        label="Description"
                        variant="bordered"
                        placeholder="Please enter the description"
                        isClearable
                        isRequired
                        value={description}
                        onValueChange={setDescription}
                    />   
                    <Input
                        type="text"
                        label="Value"
                        variant="bordered"
                        placeholder="0.00"
                        value={financialValue}
                        errorMessage={isFinancialValueInvalid && "Please enter a valid value"}
                        color={isFinancialValueInvalid ? "danger" : "success"}
                        onValueChange={setFinancialValue}
                        isInvalid={isFinancialValueInvalid}
                        isClearable
                        >
                        </Input>
                        <Divider/>
                        <div className="flex flex-col gap-3">
                            <RadioGroup
                                label="Select Operation" orientation="horizontal"
                                value={selected}
                                onValueChange={setSelected}
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

export default MyModal;