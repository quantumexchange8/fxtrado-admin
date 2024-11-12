import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatAmount, formatDateTime } from "@/Composables";
import Tooltip from "@/Components/Tooltip";
import { CheckIcon, RejectIcon, ViewDetialIcon, XIcon } from "@/Components/Icon/outline";
import { Badge } from 'primereact/badge';
import Modal from "@/Components/Modal";
import { useTranslation } from 'react-i18next';

export default function DepositTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [depositData, setDepositData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const { t } = useTranslation();

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
                            <Badge value={t('processing')} severity="contrast"></Badge>
                        </>
                    )
                }
                {
                    status.status === 'successful' && (
                        <>
                            <Badge value={t('success')} severity="success"></Badge>
                        </>
                    )
                }
                {
                    status.status === 'failed' && (
                        <>
                            <Badge value={t('fail')} severity="danger"></Badge>
                        </>
                    )
                }
                {
                    status.status === 'rejected' && (
                        <>
                            <Badge value={t('rejected')} severity="danger"></Badge>
                        </>
                    )
                }
            </div>
        )
    }

    const viewDetail = (details) => {
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
                                <Column field="created_at" body={dateTemplate} sortable header={<span>{t('requested_date')}</span>}></Column>
                                <Column field="user_id" header={<span>{t('user')}</span>} body={userTemplate} sortable></Column>
                                <Column field="transaction_number" header="ID" sortable></Column>
                                <Column field="amount" header={<span>{t('amount')}</span>} body={amountTemplate} sortable></Column>
                                <Column field="status" header={<span>{t('status')}</span>} body={statusTemplate} sortable></Column>
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
                        title={<span>{t('deposit_details')}</span>}
                        maxWidth='md'
                        maxHeight='md' 
                        isOpen={isOpen} close={closeDetail}
                        closeIcon={<XIcon />}
                    >
                        <div className="flex flex-col gap-4 p-4">
                            <div className="grid grid-cols-3 items-center gap-3 p-1">
                                <div className="col-span-1 text-sm text-gray-500">{t('transaction_date')}</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{formatDateTime(modalData.created_at)}</div>

                                <div className="col-span-1 text-sm text-gray-500">{t('transaction')} ID</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.transaction_number}</div>

                                <div className="col-span-1 text-sm text-gray-500">{t('user')}</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.user.email}</div>

                                <div className="col-span-1 text-sm text-gray-500">{t('wallet_no')}</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.wallet.wallet_no}</div>

                                <div className="col-span-1 text-sm text-gray-500">{t('amount')}</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">$ {modalData.amount ? formatAmount(modalData.amount) : '0.00'}</div>

                                <div className="col-span-1 text-sm text-gray-500">{t('status')}</div>
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
                                                    <Badge value={t('success')} severity="success"></Badge>
                                                </>
                                            )
                                        }
                                        {
                                            modalData.status === 'failed' && (
                                                <>
                                                    <Badge value={t('fail')} severity="danger"></Badge>
                                                </>
                                            )
                                        }
                                        {
                                            modalData.status === 'rejected' && (
                                                <>
                                                    <Badge value={t('rejected')} severity="danger"></Badge>
                                                </>
                                            )
                                        }
                                </div>

                                <div className="col-span-1 text-sm text-gray-500">{t('send_address')}</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold truncate">{modalData.from_wallet ? modalData.from_wallet : '-'}</div>

                                <div className="col-span-1 text-sm text-gray-500">{t('receiving_address')}</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold truncate">{modalData.to_wallet ? modalData.to_wallet : '-'}</div>

                                <div className="col-span-1 text-sm text-gray-500">TxID</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold truncate">{modalData.txid ? modalData.txid : '-'}</div>

                                <div className="col-span-1 text-sm text-gray-500">{t('remark')}</div>
                                <div className="col-span-2 text-gray-700 text-sm font-bold">{modalData.remark ? modalData.remark : '-'}</div>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}