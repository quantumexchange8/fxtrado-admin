import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import OrderTable from "./Partials/OrderTable";
import { useTranslation } from 'react-i18next';

export default function Order() {

    const { t } = useTranslation();

    return (
        <AuthenticatedLayout header={<span>{t('ongoing_order')}</span>} >
            <Head title="Ongoing Orders" />

            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <OrderTable />
            </div>

        </AuthenticatedLayout>
    )
}