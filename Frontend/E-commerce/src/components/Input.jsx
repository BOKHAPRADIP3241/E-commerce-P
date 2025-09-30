export default function Input({ label, name, value, onChange, required, error }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`border rounded-lg px-3 py-2 focus:ring-2 focus:outline-none transition ${error
                        ? 'border-red-500 focus:ring-red-500 bg-red-50'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
            />
            {error && (
                <p className="text-sm text-red-600 mt-0.5">{error}</p>
            )}
        </div>
    );
}