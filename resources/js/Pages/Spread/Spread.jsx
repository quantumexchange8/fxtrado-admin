import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import SpreadTable from "./Partials/SpreadTable";
import { useTranslation } from 'react-i18next';

export default function Spread() {

    const { t } = useTranslation();
    
    return (
        <AuthenticatedLayout header={<span>{t('spread_adjustment')}</span>}>
            <Head title="Spread Adjustment" />

            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <SpreadTable />
            </div>

        </AuthenticatedLayout>
    )
}