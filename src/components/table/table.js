import React from "react"
import {
    useTable,
    usePagination,
    useGlobalFilter,
    useFilters
} from "react-table";
import { matchSorter } from "match-sorter";


function DefaultColumnFilter({
    column: { filterValue, setFilter }
}) {

    return (
        <input
            value={filterValue || ""}
            style={{ border: '2px solid #2418d7' }}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
        />
    );
}

function textFilter(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

textFilter.autoRemove = val => !val;

export default function TableWithFilte({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            Text: textFilter,
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageindex: 2 },
            defaultColumn,
            filterTypes
        },
        useFilters,
        useGlobalFilter,
        usePagination

    );

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{ fontSize: '2em' }} >
                                    {column.render("Header")}
                                    <div>
                                        {column.canFilter ? column.render("Filter") : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}>{cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="float-right mb-3">
                <select
                    style={{
                        padding: "7px",
                        border: "2px solid #007bff"
                    }}
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}>
                    {[10, 15, 20, 25, 30].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            String {pageSize}
                        </option>
                    ))}
                </select>{" "}
                <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}>
                    {">>"}
                </button>
            </div>
        </>
    );
}