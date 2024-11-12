import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {

    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <span>
                    {t('dashboard')}
                </span>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {t('logged_in')}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
