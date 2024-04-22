import {Card, CardHeader, CardBody, CardFooter,  Button, Input} from "@nextui-org/react";
import React from "react";
import './MyCardPost.css'
import { useGetTransactions } from "../hooks/getTransactions";

interface InputFormProps {
    onSubmit: (agency :string, account :string) => void;
}

const MyCardPost: React.FC<InputFormProps> = ({ onSubmit }) => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    
    const [agency, setIsAgency] = React.useState('');
    const [account, setIsAccount] = React.useState('');

    //const { transactions, refetch } = useGetTransactions(agency, account);

    

    const handleFetching = () => {

        //setIsFollowed(true);
        //alert("antes")
        //refetch()
        //alert("depois")
        //console.log(transactions);
        //setIsFollowed(false);

        if (agency.trim() !== '' && account.trim() !== '') {
            onSubmit(agency, account);
        }

    };

    return(

        <div className="card">
            <Card>
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h2 className="text-2xl truncate font-bold  text-default-600">Ledger</h2>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small ">
                    <p>
                        Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                    </p>
                    <p> </p>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="text" label="Agency"
                            placeholder="Enter the agency" variant="bordered"
                            isRequired
                            onValueChange={setIsAgency} value={agency}
                        />
                        <Input
                            type="text" label="Account"
                            variant="bordered" placeholder="Enter the account"
                            isRequired
                            onValueChange={setIsAccount} value={account}
                        />
                    </div>
                </CardBody>
                <CardFooter className="gap-4">
                    <div className="flex gap-5">
                        <Button className="max-w-fit" color="primary"
                            onPress={handleFetching}>
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>  
                    </div >
                </CardFooter>
            </Card>
        </div>
    );
}

export default MyCardPost;
  
