import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, hasError, placeholder, withIcon = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                `bg-gray-50 hover:bg-white border-gray-50 py-2 px-4 text-gray-950 text-base leading-tight rounded shadow-sm
                ${withIcon ? 'pl-11 pr-4' : ''}
                ${hasError ? 'border border-error-500 focus:ring-0 focus:outline-none' : 'focus:border-primary-50 focus:ring-[#EDF8FF] hover:border-gray-200 '}` +
                className
            }
            ref={localRef}
            placeholder={placeholder}
        />
    );
});
