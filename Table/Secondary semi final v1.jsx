import React, { useState } from 'react';


const Secondary = ({ data, columns, columnHeaders, actions, textAlign, customStyles, showCheckboxes, onSelectAll, onSelectRow }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Function to handle actions
  const handleAction = (action, rowData) => {
    // Handle action here
    console.log(action, rowData);
  };

  // Function to get nested value from object
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc[key], obj);
  };

  // Function to handle checkbox change for select all
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
    if (typeof onSelectAll === 'function') {
      onSelectAll(!selectAll);
    }
  };

  // Function to handle checkbox change for individual row
  const handleSelectRow = (rowId) => {

    console.log(rowId);

    const index = selectedRows.indexOf(rowId);
    let newSelectedRows = [...selectedRows];
    if (index === -1) {
      newSelectedRows.push(rowId);
    } else {
      newSelectedRows.splice(index, 1);
    }
    setSelectedRows(newSelectedRows);
    if (typeof onSelectRow === 'function') {
      onSelectRow(newSelectedRows);
    }
    setSelectAll(newSelectedRows.length === data.length);
  };

  return (

    // <div className="overflow-x-auto w-full">
    //   <table className="w-full table-auto border border-gray-300">
    //     <thead className="bg-gray-200">
    //       <tr>
    //         {showCheckboxes && (
    //           <th className="px-6 py-3">
    //             <input
    //               type="checkbox"
    //               checked={selectAll}
    //               onChange={handleSelectAll}
    //               className="form-checkbox h-5 w-5 text-blue-500"
    //             />
    //           </th>
    //         )}
    //         {columns.map((column, index) => (
    //           <th
    //             key={index}
    //             className={`px-6 py-3 text-left font-semibold ${customStyles && customStyles.headerColor
    //               }`}
    //           >
    //             {columnHeaders[index] || column}
    //           </th>
    //         ))}
    //         {actions && (
    //           <th
    //             className={`px-6 py-3 text-left font-semibold ${customStyles && customStyles.headerColor
    //               }`}
    //           >
    //             Actions
    //           </th>
    //         )}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((row, rowIndex) => (
    //         <tr key={rowIndex} className={`${customStyles && customStyles.rowColor}`}>
    //           {showCheckboxes && (
    //             <td className="px-6 py-4">
    //               <input
    //                 type="checkbox"
    //                 checked={selectedRows.includes(row.id)}
    //                 onChange={() => handleSelectRow(row.id)}
    //                 className="form-checkbox h-5 w-5 text-blue-500"
    //               />
    //             </td>
    //           )}
    //           {columns.map((column, colIndex) => (
    //             <td
    //               key={colIndex}
    //               className={`px-6 py-4 whitespace-nowrap ${customStyles && customStyles.textAlign
    //                 ? customStyles.textAlign[colIndex] || 'text-left'
    //                 : 'text-left'
    //                 } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]
    //                 }`}
    //             >
    //               {/* Check if column name has nested path */}
    //               {typeof column === 'function' ? (
    //                 // If a function is provided, call it to get custom content
    //                 column(row)
    //               ) : column.includes('.') ? (
    //                 // If nested, get nested value
    //                 getNestedValue(row, column)
    //               ) : (
    //                 // If not nested, display directly
    //                 row[column]
    //               )}
    //             </td>
    //           ))}
    //           {actions && (
    //             <td className="px-6 py-4 whitespace-nowrap text-left">
    //               {actions.map((action, actionIndex) => (
    //                 <button
    //                   key={actionIndex}
    //                   className={`mr-2 text-blue-500 hover:text-blue-700 ${customStyles &&
    //                     customStyles.actionColor &&
    //                     customStyles.actionColor[action.type]
    //                     }`}
    //                   onClick={() => handleAction(action.type, row)}
    //                 >
    //                   {action.icon}
    //                 </button>
    //               ))}
    //             </td>
    //           )}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>


    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            {showCheckboxes && (
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
              </th>
            )}

            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left font-semibold ${customStyles && customStyles.headerColor
                  }`}
              >
                {columnHeaders[index] || column}
              </th>
            ))}
            {actions && (
              <th
                className={`px-6 py-3 text-left font-semibold ${customStyles && customStyles.headerColor
                  }`}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${customStyles && customStyles.rowColor}`}>
              {showCheckboxes && (
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 whitespace-nowrap ${customStyles && customStyles.textAlign
                    ? customStyles.textAlign[colIndex] || 'text-left'
                    : 'text-left'
                    } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]
                    }`}
                >
                  {/* Check if column name has nested path */}
                  {typeof column === 'function' ? (
                    // If a function is provided, call it to get custom content
                    column(row)
                  ) : column.includes('.') ? (
                    // If nested, get nested value
                    getNestedValue(row, column)
                  ) : (
                    // If not nested, display directly
                    row[column]
                  )}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`mr-2 text-blue-500 hover:text-blue-700 ${customStyles &&
                        customStyles.actionColor &&
                        customStyles.actionColor[action.type]
                        }`}
                      onClick={() => handleAction(action.type, row)}
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Secondary;
