import { FC } from "react";

const LoaderPage : FC = function () {
    return (
        <>  
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
                <div className="w-16 h-16 border-8 border-gray-600 border-t-blue-700 rounded-full animate-spin"></div>
            </div>
        </>
    );
}

export default LoaderPage;