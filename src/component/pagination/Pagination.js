import React from 'react';

export default function Pagination(props) {

    let paginationItem = [];
    for (let i = 1; i <= props.length; i++) {
        paginationItem[i] = (
            <a
                key={i}
                href="#"
                className="inline-flex items-center px-4 h-10 border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25"
            >
                {i}
            </a>
        )
    }
    return (
        <nav
            aria-label="Pagination"
            className="max-w-7xl mx-auto px-4 mt-6 flex justify-between text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
        >
            <div className="min-w-0 flex-1">
                <a
                    href="#"
                    className="inline-flex items-center px-4 h-10 border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25"
                >
                    Previous
                </a>
            </div>
            <div className="hidden space-x-2 sm:flex">
                {
                    paginationItem
                }
            </div>
            <div className="min-w-0 flex-1 flex justify-end">
                <a
                    href="#"
                    className="inline-flex items-center px-4 h-10 border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25"
                >
                    Next
                </a>
            </div>
        </nav>
    );
}
