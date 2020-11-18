import React from "react";

interface ButtonProps {
    totalPerPage: number,
    total: number,
    ClickHandler: (id: number) => void
}

export const Pagination: React.FC<ButtonProps> = ({
    total,
    totalPerPage,
    ClickHandler
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / totalPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                    <a onClick={() => ClickHandler(number)} className='page-link touch'>
                        {number}
                    </a>
                </li>
                ))}
            </ul>
        </nav>
    );

};