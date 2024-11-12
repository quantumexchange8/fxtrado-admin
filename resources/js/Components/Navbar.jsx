import { Fragment, useEffect, useState } from 'react';
import { EditIcon, LogoutIcon, MenuIcon, NotificationIcon, XIcon } from './Icon/outline';
import { useForm, usePage } from '@inertiajs/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Modal from './Modal';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ConfirmLogoutIcon } from "@/Components/Icon/Brand";
import Button from './Button';
import toast from 'react-hot-toast';
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';
import i18n from '@/Composables/i18n';


export default function Navbar({ user, header, toggleSidebar }) {

    const { auth } = usePage().props;

    const [isOpen, setIsOpen] = useState(false)
    const [scroll, setScroll] = useState(true)
    const { t } = useTranslation();

    const { data, setData, post, processing, reset } = useForm({});

    const controlNavbar = () => {
        if (window.scrollY > 100) {
            setScroll(false)
        } else {
            setScroll(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [])

    const toggleProfile = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const acceptNavbar = () => {
        submit();
    };

    const rejectNavbar = () => {
        
    };

    const confirmNavbar = () => {
        
        confirmDialog({
            group: 'navbar',
            message: t('are_you_sure_logout'),
            header: t('log_out'),
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept: acceptNavbar,
            reject: rejectNavbar,
            
        });
    };
    const onSubmit = () => {
        submit();
    }
    const submit = () => {
        post(route('logout'), {
                method: 'POST',
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('You’ve successfully log out.', {
                        title: 'You’ve successfully log out.',
                        duration: 3000,
                        variant: 'variant1',
                    });
                }
            }
        );
    };

    const [selectedLocales, setSelectedLocales] = useState(i18n.language);

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
        <nav className={`sticky top-0 z-20 ease-in duration-500 w-full bg-neutral-50 border-b border-gray-200 md:shadow-navbar py-2 px-3 md:px-4`}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <div className='p-2.5 cursor-pointer bg-neutral-100 hover:bg-neutral-300 rounded-[4px]' onClick={toggleSidebar}>
                        <MenuIcon />
                    </div>
                    <div className='text-gray-950 text-base font-bold'>
                        {header}
                    </div>
                </div>

                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-3'>
                        <div className='p-1'>
                            <Dropdown 
                                value={selectedLocales} 
                                onChange={(e) => toggleLanguage(e.value)} 
                                options={locales} 
                                optionLabel="name"
                                placeholder={t('language')}
                                className="border-none bg-neutral-50 focus:border-none focus:border-neutral-50" 
                            />
                        </div>
                        <div className='w-6 h-6 hover:rounded hover:bg-gray-25 hover:shadow flex items-center justify-center cursor-pointer'>
                            <NotificationIcon />
                        </div>
                        
                        {/* <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            <div className='w-6 h-6 hover:rounded hover:bg-gray-25 hover:shadow flex items-center justify-center cursor-pointer'>
                                <LogoutIcon />
                            </div>
                        </ResponsiveNavLink> */}

                        

                        <div className='w-6 h-6 hover:rounded hover:bg-gray-25 hover:shadow flex items-center justify-center cursor-pointer' onClick={confirmNavbar}>
                            <LogoutIcon />
                        </div>
                    </div>
                    <div className='hidden md:flex items-center gap-3 p-2 hover:bg-gray-25 rounded drop-shadow hover:drop-shadow-md'>
                        <div className='flex flex-col items-end gap-1'>
                            <div className='text-neutral-950 font-semibold text-sm'>
                                {auth.user.name}
                            </div>
                            <div className='text-gray-600 text-xss font-medium'>
                                ID: 12345{/* {auth.user.role_id} */}
                            </div>
                        </div>
                        <img className='object-cover w-8 h-8 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                    </div>
                </div>
            </div>

            {/* <PrimeModal header='Profile Details' visible={visible} setVisible={setVisible} size="xl">
                <div>
                    test
                </div>
            </PrimeModal> */}
            <Modal 
                title='Profile Detail' 
                maxWidth='md' 
                maxHeight='md' 
                isOpen={isOpen} 
                close={closeModal}
                closeIcon={<XIcon />}
                showFooter='hidden'
            >

                <div className='flex flex-col p-5 gap-5'>
                    <div className='bg-gray-50 p-5 flex flex-col gap-4 items-center'>
                        <div className='w-20 h-20'>
                            <img src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt="" />
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='text-neutral-950 text-base font-bold font-sf-pro'>{auth.user.name}</div>
                            <div><EditIcon /></div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center '>
                            <div className='text-neutral-950 text-sm font-sf-pro w-24'>Client ID</div>
                            <div className='text-neutral-950 font-bold font-sf-pro w-full'>{auth.user.role_id}</div>
                        </div>
                        <div className='flex items-center '>
                            <div className='text-neutral-950 text-sm font-sf-pro w-24'>Password</div>
                            <div className='text-neutral-950 font-bold font-sf-pro w-full'></div>
                        </div>
                    </div>
                </div>
                
            </Modal>

            <ConfirmDialog
                group="navbar"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="relative flex flex-col gap-6 items-center p-5 rounded-lg border border-primary-200 max-w-[300px] bg-white">
                        <div className="w-full flex justify-center h-3 pt-4">
                            <div className="absolute top-[-42px]">
                                <ConfirmLogoutIcon />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className="font-bold text-lg text-neutral-950 font-sf-pro" ref={headerRef}>
                                {message.header}
                            </div>
                            <div className='text-neutral-950 text-base font-sf-pro text-center' ref={contentRef}>
                                {message.message}
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-2 " ref={footerRef}>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    rejectNavbar();
                                }}
                                size='lg'
                                variant='secondary'
                                className="w-full flex justify-center font-sf-pro"
                            >{t('cancel')}</Button>
                            <Button
                                onClick={(event) => {
                                    hide(event);
                                    acceptNavbar();
                                    onSubmit();
                                }}
                                size='lg'
                                className="w-full flex justify-center font-sf-pro bg-[#0060FF]"
                            >{t('confirm')}</Button>
                            
                        </div>
                    </div>
                )}
            />
        </nav>
    )
}