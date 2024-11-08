import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { EditIcon, Search, XIcon } from "@/Components/Icon/outline";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { InputNumber } from "primereact/inputnumber";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import InputIconWrapper from "@/Components/InputIconWrapper";
import InputError from "@/Components/InputError";
import { Switch } from '@headlessui/react'

export default function SpreadTable() {

    const [isLoading, setIsLoading] = useState(true);
    const [spreadData, setSpreadData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [spread, setSpread] = useState();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    const getSpread = async () => {
        try {
          const response = await axios.get('/getSpread');
          setSpreadData(response.data);
    
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
    };

    useEffect(() => {
        getSpread();
    }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: spread ? spread.id : '',
        spread: ''
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const EditSpread = (actionData) => {
        setIsOpen(true)
        setSpread(actionData)

        setData({
            id: actionData.id,
            spread: actionData.spread, // Assuming actionData has the 'spread' field
        });
    }

    const closeSpread = () => {
        setIsOpen(false);
    }

    const actionDiv = (actionData) => {
        return (
            <div className="flex justify-center items-center gap-4 cursor-pointer" onClick={() => EditSpread(actionData)}>
                <EditIcon />
            </div>
        )
    }
    
    const submit = (e) => {
        e.preventDefault();
    
        // Ensure all necessary fields are set
        setData('id', spread.id);
        setData('spread', spread.spread); // Add the updated spread value
    
        // Post to update spread
        post('/updateSpread', {
            onSuccess: () => {
                setIsLoading(false);
                reset(); // Reset the form after success
                closeSpread(); // Close modal on success
                getSpread();
            },
            onError: (errors) => {
                // Handle errors if needed
                console.log(errors);
            }
        });
    };

    const statusTemplate = (rowData) => {

        const [enabled, setEnabled] = useState(rowData.status === 'active' ? true : false)

        useEffect(() => {
            setEnabled(rowData.status === 'active'); 
        }, [rowData]);

        const handleChange = async (checked) => {
            
            const id = rowData.id;

            try {

                setEnabled(rowData.status === 'active' ? false : true);

                await axios.post('/updateSpreadStatus', {
                    id: id,
                });

                fetchData();

            } catch (error) {
                console.error('Error updating status:', error);
                setEnabled(!checked);
            }
        };

        const value = rowData;
        const isChecked = rowData.status === 'active';

        return (
            <div className="flex align-items-center gap-4">
                <div className="flex items-center">
                    <Switch
                        checked={enabled}
                        onChange={() => handleChange(rowData.id)}
                        className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-green-400"
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                        />
                    </Switch>
                </div>
            </div>
        )
    }
    
    

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
                            placeholder="Keyword Search"
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
                spreadData.length > 0 ? (
                    <>
                        <DataTable 
                            value={spreadData} 
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
                            {/* <Column field="status" body={statusTemplate} header="Status"></Column> */}
                            <Column field="symbol" sortable header="Symbol"></Column>
                            <Column field="group_name" sortable header="Group"></Column>
                            <Column field="spread" sortable header="Spread"></Column>
                            <Column field="actions" header="" body={actionDiv} style={{ minWidth: '50px' }}></Column>
                        </DataTable>

                        {
                            spread && (
                                <Modal
                                    title='Spread Adjustment'
                                    maxWidth='md'
                                    maxHeight='md' 
                                    isOpen={isOpen} close={closeSpread}
                                    closeIcon={<XIcon />}
                                    footer={
                                        <div className="flex items-center gap-4 justify-end">
                                            <div>
                                                <Button
                                                    variant="gray-border"
                                                    size="lg"
                                                    onClick={closeSpread}
                                                >Cancel</Button>
                                            </div>
                                            <div>
                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    onClick={submit}
                                                >Save
                                                </Button>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="p-3 space-y-2">
                                        <InputLabel value='Spread' />
                                        <InputNumber 
                                            inputId="integeronly" 
                                            value={spread.spread}
                                            onValueChange={(e) => setData('spread', e.value)}
                                            className="w-full font-bold border border-neutral-100 rounded-md focus:outline-none focus:ring-0"
                                        />
                                        <InputError message={errors.spread} className="mt-2" /> 
                                    </div>
                                </Modal>
                            )
                        }
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </div>
    )
}