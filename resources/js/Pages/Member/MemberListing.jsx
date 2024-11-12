import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import MemberTable from "./Partials/MemberTable";
import { useTranslation } from 'react-i18next';

export default function MemberListing() {

    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    });

    const searchVal = data.search;

    return (
        <AuthenticatedLayout header={
            <span>
                {t('member_listing')}
            </span>
        }>
            <Head title="Member Listing" />

            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <MemberTable />
            </div>

        </AuthenticatedLayout>
    )
}