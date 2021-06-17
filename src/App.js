import React from "react";
import mokData from "./components/data/dataNamor";
import TableWithFilte from "./components/table/table";

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        columns: [
          {
            Header: "Cars",
            accessor: "cars",
          },
          {
            Header: "Brand",
            accessor: "brand"
          },
          {
            Header: "Price",
            accessor: "price"
          },
          {
            Header: "Release",
            accessor: "release"
          }
        ]
      },
    ],
    []
  );

  const data = React.useMemo(() => mokData(100), []);

  return (
    <>
      <TableWithFilte 
      columns={columns} 
      data={data} />
    </>
  );
}

export default App;
