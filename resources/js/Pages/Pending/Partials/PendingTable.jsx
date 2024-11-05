import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatAmount, formatDateTime } from "@/Composables";
import { CheckIcon, CopyIcon, RejectIcon, XIcon } from "@/Components/Icon/outline";
import Tooltip from "@/Components/Tooltip";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { QRCode } from 'react-qrcode-logo';
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function PendingTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [pendingData, setPendingData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [remark, setRemark] = useState('');
    const [tooltipText, setTooltipText] = useState('copy');

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
                $ {formatAmount(amount.amount)}
            </div>
        )
    }

    const approveModal = (action) => {
        setIsOpen(true);
        setModalData(action)

    }

    const closeApproveModal = () => {
        setIsOpen(false);
    }

    const cancelReject = () => {
        setRemark('');
    }

    const reject = async () => {
        try {
            await axios.post('/rejectWithdrawal', {
                id: selectedId,
                remark,
            });

            setRemark('');

            toast.success('Rejected.', {
                title: 'Rejected.',
                duration: 3000,
                variant: 'variant3',
            });

            getPendingData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const rejectWithdraw = (id) => {
        setSelectedId(id)

        confirmDialog({
            group: 'reject',
            message: 'Are you sure you want to Reject this transaction?',
            header: 'Reject',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: reject,
            reject: cancelReject,
            
        });

    }

    const actionDiv = (action) => {
        return (
            <div className="flex justify-center items-center gap-4">
                <div className="flex justify-center items-center cursor-pointer text-green-500 hover:text-green-600 w-5 h-5 rounded-full hover:bg-gray-100" onClick={() => approveModal(action)}>
                    <Tooltip text="Approve">
                        <CheckIcon />
                    </Tooltip>
                </div>
                <div className="flex justify-center items-center cursor-pointer text-red-500 hover:text-red-600 w-5 h-5 rounded-full hover:bg-gray-100" onClick={() => rejectWithdraw(action.id)}>
                    <Tooltip text="Reject">
                        <RejectIcon />
                    </Tooltip>
                </div>
            </div>
        )
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        wallet_address: '',
        txid: '',
        transaction_id: modalData ? modalData.id : '',
    });

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/approveWithdrawal', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsOpen(false)
                setIsLoading(false);
                // if (itemAdded) {
                //     itemAdded();
                // }
                toast.success('Withdrawal Approved.', {
                    title: 'Withdrawal Approved.',
                    duration: 3000,
                    variant: 'variant3',
                });
            },
            onError: () => {
                setIsLoading(false); // Set loading state off in case of an error
                // toast.error('Error', {
                //     title: 'Error',
                //     description: 'Try again later.',
                //     duration: 3000,
                //     variant: 'variant1',
                // });
            }
        })
    }

    const handleCopy = (wallet_address) => {
        const textToCopy = wallet_address;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setTooltipText('Copied!');
            console.log('Copied to clipboard:', textToCopy);

            // Revert tooltip text back to 'copy' after 2 seconds
            setTimeout(() => {
                setTooltipText('copy');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };
    
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
                                <Column field="user_id" header="User" body={userTemplate} sortable></Column>
                                <Column field="wallet_no" header="Wallet No." sortable></Column>
                                <Column field="to_wallet" header="Wallet Address" sortable></Column>
                                <Column field="amount" header="Amount" body={amountTemplate} sortable></Column>
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
                                        <div className="flex gap-1 items-center">
                                            <span>User Wallet: </span>
                                            <div className="flex items-center font-bold gap-1">
                                                <span>{modalData.to_wallet}</span>
                                                <div onClick={() => handleCopy(modalData.to_wallet)}>
                                                    <Tooltip text={tooltipText}>
                                                        <CopyIcon />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            Withdraw Amount: <span className="font-bold">$ {formatAmount(modalData.amount)}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="flex items-center gap-2">
                                            <div className="max-w-32 w-full">
                                                <InputLabel htmlFor="wallet_address" value="Wallet Address: " />
                                            </div>
                                            <div>
                                                <TextInput 
                                                    id="wallet_address"
                                                    type="text"
                                                    name="wallet_address"
                                                    value={data.wallet_address}
                                                    className="mt-1 block w-full"
                                                    isFocused={true}
                                                    onChange={(e) => setData('wallet_address', e.target.value)}
                                                />
                                                <InputError message={errors.wallet_address} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="max-w-32 w-full">
                                                <InputLabel htmlFor="txid" value="TXID: " />
                                            </div>
                                            <div>
                                                <TextInput 
                                                    id="txid"
                                                    type="text"
                                                    name="txid"
                                                    value={data.txid}
                                                    className="mt-1 block w-full"
                                                    isFocused={true}
                                                    onChange={(e) => setData('txid', e.target.value)}
                                                />
                                                <InputError message={errors.txid} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )
                }

                <ConfirmDialog 
                    group="reject"
                    content={({ headerRef, contentRef, footerRef, hide, message }) => (
                        <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                            <div></div>
                            <div className='flex flex-col gap-3 items-center'>
                                <div className="font-bold text-lg text-neutral-950 font-sf-pro select-none" ref={headerRef}>
                                    {message.header}
                                </div>
                                <div className='text-neutral-950 text-base font-sf-pro text-center select-none' ref={contentRef}>
                                    {message.message}
                                </div>
                                <div className="w-full flex flex-col space-y-1">
                                    <InputLabel value='Remark' /> 
                                    <TextInput 
                                        className='w-full'
                                        type='text'
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                    />
                                    <InputError message={errors.remark} className="mt-2" />
                                </div>
                            </div>
                            <div className="w-full flex items-center gap-2 " ref={footerRef}>
                                <Button
                                    onClick={(event) => {
                                        hide(event);
                                        cancelReject();
                                    }}
                                    size='sm'
                                    variant='gray-border'
                                    className="w-full flex justify-center font-sf-pro"
                                >Cancel</Button>
                                <Button
                                    onClick={(event) => {
                                        hide(event);
                                        reject();
                                    }}
                                    variant="red"
                                    size='sm'
                                    className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                                >Confirm</Button>
                                
                            </div>
                        </div>
                    )}
                />
            </div>
            
        </>
    )
}