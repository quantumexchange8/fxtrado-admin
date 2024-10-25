import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatDateTime } from "@/Composables";
import { CheckIcon, RejectIcon, XIcon } from "@/Components/Icon/outline";
import Tooltip from "@/Components/Tooltip";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { QRCode } from 'react-qrcode-logo';
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

export default function PendingTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [pendingData, setPendingData] = useState([]);

    const getPendingData = async () => {
        try {
          const response = await axios.get('/getPendingData');
          setPendingData(response.data);
    
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
    };

    useEffect(() => {
        getPendingData();
    }, []);

    const dateTemplate = (date) => {
        return (
            <div>
                {formatDateTime(date.created_at)}
            </div>
        )
    }

    const approveModal = (action) => {
        setIsOpen(true);
        console.log('Modal should open', isOpen);
        setModalData(action)

    }

    const closeApproveModal = () => {
        setIsOpen(false);
    }

    const actionDiv = (action) => {
        return (
            <div className="flex justify-center items-center gap-4">
                <div className="flex justify-center items-center cursor-pointer text-green-500 hover:text-green-600 w-5 h-5 rounded-full hover:bg-gray-100" onClick={() => approveModal(action)}>
                    <Tooltip text="Approve">
                        <CheckIcon />
                    </Tooltip>
                </div>
                <div className="flex justify-center items-center cursor-pointer text-red-500 hover:text-red-600 w-5 h-5 rounded-full hover:bg-gray-100">
                    <Tooltip text="Reject">
                        <RejectIcon />
                    </Tooltip>
                </div>
            </div>
        )
    }

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // post('/item/new-item', {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         reset();
        //         setIsOpen(false)
        //         setIsLoading(false);
        //         if (itemAdded) {
        //             itemAdded();
        //         }
        //         toast.success('Item added successfully.', {
        //             title: 'Item added successfully.',
        //             description: 'This item has been added to your item listing.',
        //             duration: 3000,
        //             variant: 'variant1',
        //         });
        //     }
        // })
    }

    return (
        <>
            <div>
                {
                    pendingData.length > 0 ? (
                        <>
                            <DataTable 
                                value={pendingData} 
                                tableStyle={{ minWidth: '50rem' }} 
                                // header={header}
                                scrollable 
                                paginator
                                removableSort
                                // rowClassName={rowClassName}
                                rows={10}
                                // filters={filters}
                                // onRowClick={selectedRow}
                            >
                                <Column field="created_at" body={dateTemplate} sortable header="Requested Date"></Column>
                                <Column field="user_id" header="User" sortable></Column>
                                <Column field="wallet_no" header="Wallet No." sortable></Column>
                                <Column field="to_wallet" header="Wallet Address" sortable></Column>
                                <Column field="amount" header="Amount" sortable></Column>
                                <Column field="status" header="Status" sortable></Column>
                                <Column field="actions" header="" body={actionDiv} style={{ minWidth: '50px' }}></Column>
                            </DataTable>
                        </>
                    ) : (
                        <div>
                            
                        </div>
                    )
                }

                {
                    isOpen && (
                        <Modal
                            title='Approve Withdrawal'
                            maxWidth='md'
                            maxHeight='md' 
                            isOpen={isOpen} close={closeApproveModal}
                            closeIcon={<XIcon />}
                            footer={
                                <div className="flex gap-5">
                                    <Button
                                        size="lg"
                                        variant="gray-border"
                                        className="w-full flex justify-center"
                                        type="button"
                                        onClick={closeApproveModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="w-full flex justify-center"
                                        type="submit"
                                        onClick={submit}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            }
                        >
                            <div className="flex flex-col gap-4 p-4">
                                <div className="flex justify-center">
                                    <QRCode 
                                        value={modalData.to_wallet}
                                        fgColor="#000000"
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-2 p-1">
                                    <div className="flex flex-col items-center gap-2">
                                        <div>
                                            User Wallet: <span className="font-bold">{modalData.to_wallet}</span>
                                        </div>
                                        <div>
                                            Withdraw Amount: <span className="font-bold">$ {modalData.amount}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="min-w-20 w-full">
                                                <InputLabel htmlFor="wallet_address" value="Wallet Address: " />
                                            </div>
                                            <div>
                                                <TextInput 
                                                
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="min-w-20 w-full">
                                                <InputLabel htmlFor="txid" value="TXID: " />
                                            </div>
                                            <div>
                                                <TextInput 
                                                
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )
                }
            </div>
            
        </>
    )
}