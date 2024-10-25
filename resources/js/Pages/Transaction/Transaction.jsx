import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import InputIconWrapper from "@/Components/InputIconWrapper";
import SearchInput from "@/Components/SearchInput";
import { ExportIcon, PlusIcon, Search } from "@/Components/Icon/outline";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import DepositTable from "./Partials/DepositTable";
import WithdrawTable from "./Partials/WithdrawTable";

export default function Transaction() {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    });

    const searchVal = data.search;

    return (
        <AuthenticatedLayout header="Transaction">
            <Head title="Pending" />

            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                {/* <div className="hidden md:block text-neutral-950 text-base font-bold">
                    Transaction History
                </div> */}

                <TabGroup className="flex flex-col gap-5">
                    <TabList className="flex">
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Deposit
                        </Tab>
                        <Tab
                            className="border-b border-neutral-300 py-1 px-3 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[selected]:border-primary-500 data-[selected]:text-primary-500 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            Withdrawal
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <DepositTable />
                        </TabPanel>
                        <TabPanel>
                            <WithdrawTable />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>


            </div>
        </AuthenticatedLayout>
    )
}