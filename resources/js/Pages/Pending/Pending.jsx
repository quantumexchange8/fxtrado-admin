import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import InputIconWrapper from "@/Components/InputIconWrapper";
import { ExportIcon, PlusIcon, Search } from "@/Components/Icon/outline";
import SearchInput from "@/Components/SearchInput";
import Button from "@/Components/Button";
import PendingTable from "./Partials/PendingTable";
import { useTranslation } from 'react-i18next';

export default function Pending() {

    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    });

    const searchVal = data.search;

    return (
        <AuthenticatedLayout header={<span>{t('pending')}</span>}>
            <Head title="Pending" />
            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <div className="hidden md:block text-neutral-950 text-base font-bold">
                    {t('pending_transaction')}
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-5">
                    <div>
                        <InputIconWrapper 
                            icon={  
                                <Search
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                />
                            }
                        >
                            <SearchInput 
                                id="search"
                                type="email"
                                name="search"
                                value={data.search}
                                className="block w-full md:w-64"
                                isFocused={false}
                                handleChange={(e) => setData('search', e.target.value)}
                                hasError={!!errors.search}
                                placeholder={t('search')}
                                withIcon
                                size='lg'
                            />
                        </InputIconWrapper>
                    </div>
                    <div className="flex md:flex-row gap-3 md:w-auto">
                        {/* <div className="w-full md:w-auto">
                            <Button
                                variant='gray-border'
                                size="lg"
                                iconOnly
                                className="w-full flex gap-2 items-center justify-center"
                            >
                                <div className="md:px-4 xl:px-0">
                                    <ExportIcon />
                                </div>
                                <span className="text-sm font-medium hidden xl:block">Export</span>
                            </Button>
                        </div> */}
                    </div>
                </div>

                <PendingTable />
            </div>
        </AuthenticatedLayout>
    )
}