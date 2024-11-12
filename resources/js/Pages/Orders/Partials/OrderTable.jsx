import React, { useEffect, useState } from "react";
import InputIconWrapper from "@/Components/InputIconWrapper";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { EditIcon, Search, XIcon } from "@/Components/Icon/outline";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useTranslation } from 'react-i18next';

export default function OrderTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });
    const { t } = useTranslation();

    const getOrder = async () => {
        try {
          const response = await axios.get('/getOrder');
          setOrderData(response.data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
    };

    useEffect(() => {
        getOrder();

        const interval = setInterval(() => {
            getOrder();
        }, 5000); // Fetch data every 5 seconds

        // Clear interval on component unmount
        return () => clearInterval(interval);

    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const profitTemplate = (rowData) => {

        return (
            <div className="flex justify-between">
                {rowData.profit >= 0 && (<span className="text-green-700">+{rowData.profit}</span>)}
                {rowData.profit < 0 && (<span className="text-red-500">{rowData.profit}</span>)}
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between">
                <div>
                    <InputIconWrapper 
                        icon={  
                            <Search
                                aria-hidden="true"
                                className="w-7 h-7"
                            />
                        }
                    >
                        <TextInput 
                            value={globalFilterValue} 
                            onChange={onGlobalFilterChange} 
                            placeholder={t('search')}
                            withIcon
                            className='font-medium'
                        />
                    </InputIconWrapper>
                </div>
                
            </div>
        );
    };

    const header = renderHeader();

    return (
        <div>
            {
                orderData.length > 0 ? (
                    <div>
                        <DataTable 
                            value={orderData} 
                            tableStyle={{ minWidth: '50rem' }} 
                            // header={header}
                            scrollable 
                            paginator
                            removableSort
                            // rowClassName={rowClassName}
                            rows={10}
                            // filters={filters}
                            // onRowClick={selectedRow}
                            header={header} 
                            filters={filters}
                        >
                            <Column field="order_id" sortable header={<span>{t('order_id')}</span>}></Column>
                            <Column field="group_name" sortable header={<span>{t('group')}</span>} ></Column>
                            <Column field="symbol" sortable header={<span>{t('symbol')}</span>} ></Column>
                            <Column field="price" sortable header={<span>{t('open_price')}</span>} ></Column>
                            <Column field="profit" sortable body={profitTemplate} header={<span>{t('profit_loss')}</span>} ></Column>
                        </DataTable>
                    </div>
                ) : (
                    <div>
                        
                    </div>
                )
            }
        </div>
    )
}