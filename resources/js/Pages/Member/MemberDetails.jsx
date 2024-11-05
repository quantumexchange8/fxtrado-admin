import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Badge } from 'primereact/badge';
import Button from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { formatAmount } from "@/Composables";
import { DotHorizontalIcon, EditIcon, XIcon } from "@/Components/Icon/outline";
import Modal from "@/Components/Modal";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from 'primereact/inputnumber';

export default function MemberDetails({ user }) {

    const [isLoading, setIsLoading] = useState(true);
    const [memberWallet, setMemberWallet] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [walletData, setWalletData] = useState(null);
    const [walletType, setWalletType] = useState('');
    const [amountVal, setAmountVal] = useState(0);
    
    const getMemberWallet = async () => {
        try {
          const response = await axios.get(`/getMemberWallet?user_id=${user.id}`);
          setMemberWallet(response.data);
    
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
    };

    useEffect(() => {
        getMemberWallet();
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user.id,
        password: '',
        password_confirmation: '',
        wallet_type: '',
        amount: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('changePassword'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const walletAdjustment = (wallet) => {
        setIsOpen(true)
        setWalletData(wallet)
    }

    const closeWallet = () => {
        setIsOpen(false)
        setAmountVal(0)
    }

    const submitWallet = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post('/walletAdjustment', {
            walletData: {
                type: walletType,   // Add wallet type to request data
                amount: amountVal   // Add amount to request data
            },
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                reset();
                closeWallet();
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={`Member Details - ${user.name}`}
        >
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                    <div className="font-semibold text-base ">
                        User Profile
                    </div>
                    <div className="flex gap-4">
                        <div className="p-2 flex flex-col gap-3 w-full">
                            <div className="flex items-center gap-4">
                                <div>
                                    <img className='object-cover w-10 h-10 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                                </div>
                                <div className="font-bold text-lg flex items-center gap-4">
                                    <div>{user.name}</div>
                                </div>
                            </div>
                            <div className="h-[1px] w-full bg-gray-300">

                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-600 text-sm">Email</div>
                                    <div className="text-base font-bold">{user.email}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-600 text-sm">Phone</div>
                                    <div className="text-base font-bold">{user.phone_number ? user.phone_number : '-'}</div>
                                </div>

                                {/* <div className="flex flex-col gap-1">
                                    <div className="text-gray-600 text-sm">Address</div>
                                    <div className="text-base font-bold">{user.address ? user.address : '-'}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-600 text-sm">City</div>
                                    <div className="text-base font-bold">{user.city ? user.city : '-'}</div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-600 text-sm">State</div>
                                    <div className="text-base font-bold">{user.state ? user.state : '-'}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-600 text-sm">Zip Code</div>
                                    <div className="text-base font-bold">{user.zip ? user.zip : '-'}</div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="text-gray-600 text-sm">Country</div>
                                    <div className="text-base font-bold">{user.country ? user.country : '-'}</div>
                                </div> */}
                            </div>
                        </div>
                        <div className="p-2 flex flex-col gap-3 w-full">
                            <form className="flex flex-col gap-3 w-full">
                                <div className="space-y-2">
                                    <InputLabel value='Current Password' />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel value='New Password' />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        isFocused={true}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                                <div>
                                    <Button type="submit" onClick={submit} size="lg">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 md:border md:border-neutral-100 md:shadow-container rounded-lg">
                    <div className="font-semibold text-base ">
                        Wallet Adjustment
                    </div>

                    <div className="flex items-center gap-4">
                        {
                            memberWallet.length > 0 ? (
                                memberWallet.map((wallet, index) => (
                                    <div key={index} className="flex flex-col gap-5 p-5 min-w-80 border rounded-lg shadow-lg bg-white">
                                        <div className="flex justify-between">
                                            <div className="font-bold text-sm">
                                                {wallet.wallet_no}
                                            </div>
                                            <div className="cursor-pointer" onClick={() => walletAdjustment(wallet)}>
                                                <EditIcon />
                                            </div>
                                        </div>
                                        <div className="text-xs font-medium">
                                            <span className="text-gray-500">Balance: </span>$ {formatAmount(wallet.balance)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                walletData && (
                    <Modal
                        title='Wallet Adjustment'
                        maxWidth='md'
                        maxHeight='md' 
                        isOpen={isOpen} close={closeWallet}
                        closeIcon={<XIcon />}
                        footer={
                            <div className="flex items-center gap-4 justify-end">
                                <div>
                                    <Button
                                        variant="gray-border"
                                        size="lg"
                                        onClick={closeWallet}
                                    >Cancel</Button>
                                </div>
                                <div>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={submitWallet}
                                        disabled={true}
                                    >Save
                                    </Button>
                                </div>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-5 p-5">
                            <div className="w-full bg-slate-50 flex flex-col items-center gap-2 rounded-lg p-2">
                                <div className="text-xs text-gray-500 ">
                                    {walletData.wallet_no} - Wallet Balance
                                </div>
                                <div className="font-bold text-lg">
                                    $ {formatAmount(walletData.balance)}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-3">
                                <InputLabel value='Type' />
                                <div className="flex flex-wrap justify-center gap-8">
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="ingredient1" name="pizza" value="balance_in" onChange={(e) => setWalletType(e.value)} checked={walletType === 'balance_in'} />
                                        <label htmlFor="ingredient1" className="ml-2 select-none">Balance In</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="ingredient2" name="pizza" value="balance_out" onChange={(e) => setWalletType(e.value)} checked={walletType === 'balance_out'} />
                                        <label htmlFor="ingredient2" className="ml-2 select-none">Balance Out</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-3">
                                <InputLabel value='Amount' />
                                <InputNumber 
                                    inputId="amount" 
                                    value={amountVal} 
                                    onValueChange={(e) => setAmountVal( e.value)} 
                                    mode="currency" 
                                    currency="USD" 
                                    locale="en-US" 
                                    className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                    </Modal>
                )
            }
        </AuthenticatedLayout>
    )
}