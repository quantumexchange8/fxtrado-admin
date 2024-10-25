import { Link } from '@inertiajs/react'

export default ({
    type = 'submit',
    className = '',
    processing,
    children,
    href,
    target,
    external,
    variant = 'primary',
    size = 'base',
    iconOnly,
    squared = false,
    pill = false,
    srText,
    onClick,
    disabled,
}) => {
    const baseClasses = `inline-flex items-center transition-colors font-medium text-center select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none`

    let variantClasses = ``

    switch (variant) {
        case 'secondary':
            variantClasses = `bg-gray-100 text-xs hover:bg-gray-200 disabled:text-primary-700 disabled:bg-gray-100`
            break
        case 'success':
            variantClasses = `bg-gradient-to-r from-[#00b827] via-[#06e432] via-[#06d22c] to-[#00c728] text-xs hover:bg-gradient-to-r hover:from-secondary-700 hover:to-secondary-700 text-white`
            break
        case 'gray-primary':
            variantClasses = `bg-gray-800 rounded hover:bg-gray-900 text-white text-xs disabled:bg-[#5c6c7b80] disabled:text-gray-100`
            break
        case 'gray-border':
            variantClasses = `bg-transparent border border-gray-900 hover:border-gray-950 text-xs text-gray-900 hover:text-gray-950 disabled:bg-gray-100 disabled:text-gray-900`
            break
        case 'danger-primary':
            variantClasses = `bg-error-600 text-white hover:bg-error-700 text-xs disabled:text-error-50 disabled:bg-[#e71b2580]`
            break
        default:
            variantClasses = `bg-primary-700 text-white text-xs hover:bg-primary-800 disabled:text-white disabled:bg-[#0060ff80]`
    }

    const sizeClasses = `${
        size == 'sm' ? (iconOnly ? 'p-1.5' : 'px-3 py-2 text-sm font-semibold') : ''
    } ${
        size == 'lg' ? (iconOnly ? 'p-3' : 'px-4 py-3 text-sm font-semibold') : ''
    }`

    const roundedClasses = `${!squared && !pill ? 'rounded-md' : ''} ${
        pill ? 'rounded-full' : ''
    }`

    const iconSizeClasses = `${size == 'sm' ? 'w-5 h-5' : ''} ${
        size == 'base' ? 'w-6 h-6' : ''
    } ${size == 'lg' ? 'w-7 h-7' : ''}`

    if (href) {
        const Tag = external ? 'a' : Link

        return (
            <Tag
                target={target}
                href={href}
                className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className} ${
                    processing ? 'pointer-events-none opacity-50' : ''
                }`}
                disabled={disabled}
            >
                {children}
                {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
            </Tag>
        )
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClasses} ${className}`}
            disabled={processing || disabled}
            onClick={onClick}
        >
            {children}
            {iconOnly && <span className="sr-only">{srText ?? ''}</span>}
        </button>
    )
}