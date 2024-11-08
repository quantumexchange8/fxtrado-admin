import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, useForm } from "@inertiajs/react";
import OrderTable from "./Partials/OrderTable";

export default function Order() {

    return (
        <AuthenticatedLayout header="Ongoing Orders">
            <Head title="Ongoing Orders" />

            <div className="flex flex-col gap-5 md:p-5 md:border md:border-neutral-100 md:bg-white md:shadow-container rounded-lg">
                <OrderTable />
            </div>

        </AuthenticatedLayout>
    )
}