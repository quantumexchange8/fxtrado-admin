import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/Composables/i18n';
import { Dropdown } from 'primereact/dropdown';

export default function GuestLayout({ children }) {

    const [selectedLocales, setSelectedLocales] = useState(i18n.language);
    const { t } = useTranslation();

    const locales = [
        { name: 'English', value: 'en' },
        { name: '繁体中文', value: 'tw' },
    ];

    const toggleLanguage = (langCode) => {
        // console.log(langCode);
        i18n.changeLanguage(langCode);
        localStorage.setItem('i18nextLng', langCode);
        setSelectedLocales(langCode);
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-neutral-200 pt-6 sm:justify-center sm:pt-0">

            <div className=' absolute top-5 right-5'>
                <Dropdown 
                    value={selectedLocales} 
                    onChange={(e) => toggleLanguage(e.value)} 
                    options={locales} 
                    optionLabel="name"
                    placeholder={t('language')}
                    className="border-none bg-neutral-50 focus:border-none focus:border-neutral-50" 
                />
            </div>
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-8 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
