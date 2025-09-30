export default function Button({ children, onClick, type = "button", className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-5 py-2.5 
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-medium rounded-xl 
                       shadow-md hover:shadow-lg 
                       hover:from-blue-700 hover:to-indigo-700 
                       active:scale-95 transition duration-300
                       ${className}`}
        >
            {children}
        </button>
    );
}
