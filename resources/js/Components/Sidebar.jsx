import React from "react";
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { EinbillLogo } from "@/Components/Icon/logo";
import { AdminUserIcon, ConfigIcon, DashboardIcon, EinvoiceIcon, ItemListingIcon, MyBillingIcon, OngoingOrderIcon, PendingIcon, SaleReportIcon, SpreadIcon, TransactionIcon, XIcon } from "./Icon/outline";
import { LogoIcon, SmallLogoIcon } from "./Icon/Brand";

export default function SideBar({ user, showingNavigationDropdown, expanded, toggleSidebar }) {

    const { url } = usePage();

    return (
        <>
            <div className={`${expanded ? 'fixed inset-0 z-30 bg-black/50 md:hidden' : ''} `} onClick={toggleSidebar}></div>
            <aside className={`fixed inset-y-0 z-30 border-r border-transparent md:border-gray-200 overflow-auto p-4 max-w-60 bg-neutral-50
                scrollbar-thin scrollbar-webkit ease-in-out duration-200
                ${!expanded ? 'translate-x-[-100%] md:translate-x-0 md:w-[75px]' : 'translate-x-0 w-60'}
                ease-in-out duration-300`}
            >
                <nav className="flex flex-col gap-6">
                    {!expanded ? (
                        <div >
                            <SmallLogoIcon  />
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <LogoIcon className="bg-black rounded-lg" />
                            <div className="block md:hidden" onClick={toggleSidebar}>
                                <XIcon />
                            </div>
                        </div>
                    )}
                    <div className={`flex flex-col gap-2 ${!expanded ? 'items-center': ''}`}>
                        <div>
                            {
                                !expanded ? (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <DashboardIcon color='currentColor' className={`${url === '/dashboard' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('dashboard')} className={`${
                                        url === '/dashboard' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/dashboard' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <DashboardIcon color='currentColor' />
                                            <div className="text-sm">
                                                Dashboard
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }  
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('member-listing')} className={`${
                                        url === '/member-listing' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/member-listing' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <SaleReportIcon color='currentColor' className={`${url === '/member-listing' ? 'text-primary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('member-listing')} className={`${
                                        url === '/member-listing' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/member-listing' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <SaleReportIcon color='currentColor' />
                                            <div className="text-sm">
                                                Member Listing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('pending')} className={`${
                                        url === '/pending' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/pending' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <PendingIcon color='currentColor' className={`${url === '/pending' ? 'text-secondary-600' : 'text-gray-800'} w-5 h-5`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('pending')} className={`${
                                        url === '/pending' ? 'text-secondary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/pending' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <PendingIcon color='currentColor' className='w-5 h-5' />
                                            <div className="text-sm">
                                                Pending
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('transaction')} className={`${
                                        url === '/transaction' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/transaction' ? 'p-3 rounded drop-shadow bg-gray-100 hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <TransactionIcon color='currentColor' className={`${url === '/transaction' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('transaction')} className={`${
                                        url === '/transaction' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/transaction' ? "text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md" } `}>
                                            <TransactionIcon color='currentColor' className={`${url === '/transaction' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                            <div className="text-sm">
                                                Transactions
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('spread')} className={`${
                                        url === '/spread' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/spread' ? 'p-3 rounded drop-shadow bg-gray-100 hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <SpreadIcon color='currentColor' className={`${url === '/spread' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('spread')} className={`${
                                        url === '/spread' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/spread' ? "text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md" } `}>
                                            <SpreadIcon color='currentColor' className={`${url === '/spread' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                            <div className="text-sm">
                                                Spread Adjustment
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('orders')} className={`${
                                        url === '/orders' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/orders' ? 'p-3 rounded drop-shadow bg-gray-100 hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <OngoingOrderIcon color='currentColor' className={`${url === '/orders' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('orders')} className={`${
                                        url === '/orders' ? 'text-primary-700 font-bold' : 'text-gray-950 font-medium'
                                    }`}>
                                        <div className={`${url === '/orders' ? "text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md" : "py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md" } `}>
                                            <OngoingOrderIcon color='currentColor' className={`${url === '/orders' ? 'text-primary-700' : 'text-gray-800'}`}/>
                                            <div className="text-sm">
                                                Ongoing Orders
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                      {/*  <div >
                            {
                                !expanded ? (
                                    <Link href={route('admin.my-admin')} className={`${
                                        url === '/admin/my-admin' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/admin/my-admin' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <AdminUserIcon color='currentColor' className={`${url === '/admin/my-admin' ? 'text-primary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('admin.my-admin')} className={`${
                                        url === '/admin/my-admin' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/admin/my-admin' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <AdminUserIcon color='currentColor'/>
                                            <div className="text-sm">
                                                Admin User
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('billing.my-billing')} className={`${
                                        url === '/billing/my-billing' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/billing/my-billing' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <MyBillingIcon color='currentColor' className={`${url === '/billing/my-billing' ? 'text-primary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('billing.my-billing')} className={`${
                                        url === '/billing/my-billing' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/billing/my-billing' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <MyBillingIcon color='currentColor' />
                                            <div className="text-sm">
                                                My Billing
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div>
                        <div >
                            {
                                !expanded ? (
                                    <Link href={route('configuration.configuration')} className={`${
                                        url === '/configuration/configuration' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/configuration/configuration' ? 'p-3 rounded drop-shadow hover:bg-gray-50 hover:rounded hover:drop-shadow-md' : 'p-3 hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'}`}>
                                            <ConfigIcon color='currentColor' className={`${url === '/configuration/configuration' ? 'text-primary-600' : 'text-gray-800'}`}/>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link href={route('configuration.configuration')} className={`${
                                        url === '/configuration/configuration' ? 'text-primary-700 font-semibold' : 'text-gray-950'
                                    }`}>
                                        <div className={`${url === '/configuration/configuration' ? 'text-primary-700 font-bold bg-gray-100 rounded py-3 px-4 flex items-center gap-3 drop-shadow hover:drop-shadow-md' : 'py-3 px-4 flex items-center gap-3 font-medium hover:bg-gray-50 hover:rounded hover:text-primary-800 hover:drop-shadow-md'} `}>
                                            <ConfigIcon color='currentColor' />
                                            <div className="text-sm">
                                                Configuration
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                            
                        </div> */}
                    </div>
                </nav>
            </aside>
        </>
    )
}