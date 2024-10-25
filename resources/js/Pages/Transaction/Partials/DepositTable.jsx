import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatAmount, formatDateTime } from "@/Composables";
import Tooltip from "@/Components/Tooltip";
import { CheckIcon, RejectIcon, ViewDetialIcon, XIcon } from "@/Components/Icon/outline";
import { Badge } from 'primereact/badge';
import Modal from "@/Components/Modal";

export default function DepositTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [depositData, setDepositData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    
    const getDepositData = async () => {
        try {
            const response = await axios.get('/getDeposit');
            setDepositData(response.data);
      
            
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setIsLoading(false);
          }
    }

    useEffect(() => {
        getDepositData();
    }, []);

    const dateTemplate = (date) => {
        return (
            <div>
                {formatDateTime(date.created_at)}
            </div>
        )
    }

    const userTemplate = (user) => {
        return (
            <div className="flex flex-col">
                <div>{user.user.name}</div>
                <div>{user.user.email}</div>
            </div>
        )
    }

    const amountTemplate = (amount) => {
        return (
            <div>
                {amount.amount ? formatAmount(amount.amount) : '-'}
            </div>
        )
    }

    const statusTemplate = (status) => {
        return (
            <div>
                {
                    status.status === 'processing' && (
                        <>
                            <Badge value="Processing" severity="contrast"></Badge>
                        </>
                    )
                }
                {
                    status.status === 'successful' && (
                        <>
                            <Badge value="Success" severity="success"></Badge>
                        </>
                    )
                }
                {
                    status.status === 'failed' && (
                        <>
                            <Badge value="Failed" severity="danger"></Badge>
                        </>
                    )
                }
                {
                    status.status === 'rejected' && (
                        <>
                            <Badge value="Failed" severity="danger"></Badge>
                        </>
                    )
                }
            </div>
        )
    }

    const viewDetail = (details) => {
        console.log(details)
        setIsOpen(true);
        setModalData(details)
    }

    const closeDetail = () => {
        setIsOpen(false)
    }

    const actionDiv = (action) => {
        return (
            <div className="flex justify-center items-center gap-4">
                <div className="flex justify-center items-center cursor-pointer text-green-500 hover:text-green-600 w-5 h-5 rounded-full hover:bg-gray-100" onClick={() => viewDetail(action)}>
                    <Tooltip text="View Details">
                        <ViewDetialIcon />
                    </Tooltip>
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                {
                    depositData.length > 0 ? (
                        <>
                            <DataTable 
                                value={depositData} 
                                tableStyle={{ minWidth: '50rem' }} 
                                // header={header}
                                scrollable 
                                paginator
                                removableSort
                                // rowClassName={rowClassName}
                                rows={8}
                                // filters={filters}
                                // onRowClick={selectedRow}
                            >
                                <Column field="created_at" body={dateTemplate} sortable header="Requested Date"></Column>
                                <Column field="user_id" header="User" body={userTemplate} sortable></Column>
                                <Column field="transaction_number" header="ID" sortable></Column>
                                <Column field="amount" header="Amount" body={amountTemplate} sortable></Column>
                                <Column field="status" header="Status" body={statusTemplate} sortable></Column>
                                <Column field="actions" header="" body={actionDiv} style={{ minWidth: '50px' }}></Column>
                            </DataTable>
                        </>
                    ) : (
                        <>
                        
                        </>
                    )
                }
            </div>

            {
                isOpen && (
                    <Modal
                        title='Deposit Details'
                        maxWidth='md'
                        maxHeight='md' 
                        isOpen={isOpen} close={closeDetail}
                        closeIcon={<XIcon />}
                    >
                        <div className="flex flex-col gap-4 p-4">
                            <div className="grid grid-cols-3 items-center gap-3 p-1">
                                <div className="col-span-1 text-sm text-gray-500">Transaction Date</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{formatDateTime(modalData.created_at)}</div>

                                <div className="col-span-1 text-sm text-gray-500">Transaction ID</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.transaction_number}</div>

                                <div className="col-span-1 text-sm text-gray-500">User</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.user.email}</div>

                                <div className="col-span-1 text-sm text-gray-500">Wallet No.</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.wallet.wallet_no}</div>

                                <div className="col-span-1 text-sm text-gray-500">Amount</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">$ {modalData.amount ? formatAmount(modalData.amount) : '0.00'}</div>

                                <div className="col-span-1 text-sm text-gray-500">Status</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">
                                        {
                                            modalData.status === 'processing' && (
                                                <>
                                                    <Badge value="Processing" severity="contrast"></Badge>
                                                </>
                                            )
                                        }
                                        {
                                            modalData.status === 'successful' && (
                                                <>
                                                    <Badge value="Success" severity="success"></Badge>
                                                </>
                                            )
                                        }
                                        {
                                            modalData.status === 'failed' && (
                                                <>
                                                    <Badge value="Failed" severity="danger"></Badge>
                                                </>
                                            )
                                        }
                                        {
                                            modalData.status === 'rejected' && (
                                                <>
                                                    <Badge value="Failed" severity="danger"></Badge>
                                                </>
                                            )
                                        }
                                </div>

                                <div className="col-span-1 text-sm text-gray-500">Sent Address</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold truncate">{modalData.from_wallet ? modalData.from_wallet : '-'}</div>

                                <div className="col-span-1 text-sm text-gray-500">Receiving Address</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold truncate">{modalData.to_wallet ? modalData.to_wallet : '-'}</div>

                                <div className="col-span-1 text-sm text-gray-500">TxID</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold truncate">{modalData.txid ? modalData.txid : '-'}</div>

                                <div className="col-span-1 text-sm text-gray-500">Remark</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.remark ? modalData.remark : '-'}</div>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}