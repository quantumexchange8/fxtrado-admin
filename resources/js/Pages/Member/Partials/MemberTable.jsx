import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { formatDateTime } from "@/Composables";
import { ViewDetialIcon } from "@/Components/Icon/outline";
import Tooltip from "@/Components/Tooltip";
import { Link } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';

export default function MemberTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [memberData, setMemberData] = useState([]);

    const getMember = async () => {
        try {
          const response = await axios.get('/getMemberListing');
          setMemberData(response.data);
    
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
    };

    useEffect(() => {
        getMember();
    }, []);


    const userTemplate = (userData) => {

        return (
            <div className="flex gap-2 items-center">
                <div>
                    <img className='object-cover w-6 h-6 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                </div>
                <div className="flex flex-col">
                    <div className="leading-tight">
                        {userData.name}
                    </div>
                    <div className="leading-tight">
                        {userData.email}
                    </div>
                </div>
            </div>
        )
    }

    const viewDetail = (details) => {
        
    }

    const actionDiv = (actionData) => {
        return (
            <div className="flex justify-center items-center gap-4">
                <Link href={`/member-details/${actionData.id}`}>
                    <div className="flex justify-center items-center cursor-pointer text-green-500 hover:text-green-600 w-5 h-5 rounded-full hover:bg-gray-100" >
                        <Tooltip text="View Details">
                            <ViewDetialIcon />
                        </Tooltip>
                    </div>
                
                </Link>
            </div>
        )
    }

    // const statusTemplate = (statusData) => {
    //     return (
    //         <div>
    //             {
    //                 statusData.status === 'verified' && (
    //                     <Badge value="Verified" severity="success"></Badge>
    //                 )
    //             }
    //             {
    //                 statusData.status === 'unverify' && (
    //                     <Badge value="Unverify" severity="danger"></Badge>
    //                 )
    //             }
    //         </div>
    //     )
    // }

    const phoneTemplate = (phoneData) => {
        return (
            <div>
                {
                    phoneData.phone_number ? (
                        phoneData.phone_number
                    ) : (
                        '-'
                    )
                }
            </div>
        )
    }

    const  dateTemplate = (dateData) => {
        return (
            <div>
                {formatDateTime(dateData.created_at)}
            </div>
        )
    }

    const { t } = useTranslation();

    return (
        <>
            <div>
                {
                    memberData.length > 0 ? (
                        <>
                            <DataTable 
                                value={memberData} 
                                tableStyle={{ minWidth: '50rem' }} 
                                // header={header}
                                scrollable 
                                paginator
                                removableSort
                                // rowClassName={rowClassName}
                                rows={10}
                                // filters={filters}
                                // onRowClick={selectedRow}
                            >
                                <Column field="name" body={userTemplate} sortable header={<span>{t('member')}</span>}></Column>
                                <Column field="phone_number" body={phoneTemplate} sortable header={<span>{t('phone')}</span>}></Column>
                                <Column field="created_at" body={dateTemplate} sortable header={<span>{t('joined_date')}</span>}></Column>
                                {/* <Column field="status" body={statusTemplate} sortable header="Status"></Column> */}
                                <Column field="actions" header="" body={actionDiv} style={{ minWidth: '50px' }}></Column>
                            </DataTable>
                        </>
                    ) : (
                        <>
                        
                        </>
                    )
                }
            </div>
        </>
    )
}