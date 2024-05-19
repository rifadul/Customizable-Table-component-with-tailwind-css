import React, { useState } from 'react';


const Secondary = ({ data, columns, columnHeaders, actions, customStyles, selectedItems, setSelectedItems }) => {

  // Function to handle actions
  const handleAction = (action, rowData) => {
    // Handle action here
    console.log(action, rowData);
  };

  // Function to get nested value from object
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc[key], obj);
  };


  const handleCheckboxClicked = (value, itemId) => {
    if (value === "All") {
      if (selectedItems?.length === data?.length) {
        setSelectedItems([]);
      } else {
        const idArray = data.map((item) => item._id);
        setSelectedItems(idArray);
      }
    } else {
      const isItemPresent = selectedItems.includes(itemId);
      if (isItemPresent) {
        // If the item is already present, remove it
        setSelectedItems((prevArray) =>
          prevArray.filter((item) => item !== itemId)
        );
      } else {
        // If the item is not present, add it
        setSelectedItems((prevArray) => [...prevArray, itemId]);
      }
    }
  };




  return (


    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto">
        <thead className="">
          <tr>
            {selectedItems && (
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={
                    data?.length !== 0 &&
                      selectedItems?.length ===
                      data?.length
                      ? true
                      : false
                  }
                  onChange={() => {
                    handleCheckboxClicked("All");
                  }}
                  className="form-checkbox h-5 w-5 text-brand-blue-500 accent-brand-blue-500"
                />
                {/* <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-5 w-5 text-brand-blue-500 accent-brand-blue-500"
                /> */}
              </td>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className={`text-brand-blue-500 font-semibold text-sm px-6 py-3 ${customStyles && customStyles.headerColor
                  } ${customStyles && customStyles[column]}

                  ${customStyles && customStyles.textHeaderStyle ? customStyles.textHeaderStyle[index] : 'text-left'
                  }
                  `}
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
              {selectedItems && (
                <td className="px-6 py-4">
                  {/* <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    className="form-checkbox h-5 w-5 text-brand-blue-500 accent-brand-blue-500"
                  /> */}
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(
                      row._id
                    )}
                    onChange={() => {
                      handleCheckboxClicked(
                        row,
                        row._id
                      );
                    }}
                    className="form-checkbox h-5 w-5 text-brand-blue-500 accent-brand-blue-500"
                  />
                  {/* <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-brand-blue-500 accent-brand-blue-500"
                    name=""
                    id=""
                    checked={selectedItems?.includes(
                      row._id
                    )}
                    onChange={() => {
                      handleCheckboxClicked(
                        row,
                        row._id
                      );
                    }}
                  /> */}
                </td>
              )}
              {columns.map((column, colIndex) => (
                < td
                  key={colIndex}
                  className={`px-6 py-4 text-brand-blue-400 whitespace-nowrap 
                  ${customStyles && customStyles.rowStyle && customStyles.rowStyle[colIndex]
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
    </div >
  );
};

export default Secondary;
