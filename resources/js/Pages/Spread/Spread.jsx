import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import SpreadTable from "./Partials/SpreadTable";

export default function Spread() {

    return (
        <AuthenticatedLayout header="Spread Adjustment">
            <Head title="Spread Adjustment" />

            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <SpreadTable />
            </div>

        </AuthenticatedLayout>
    )
}