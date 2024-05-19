import React from 'react';
// secondary


const Secondary = ({ data, columns, columnHeaders, actions, textAlign, customStyles }) => {
  // Function to handle actions
  const handleAction = (action, rowData) => {
    // Handle action here
    console.log(action, rowData);
  };


  // Function to get nested value from object
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, key) => acc[key], obj);
  };

  return (

    // 5th way

    // <div className="overflow-x-auto">
    //   <table className="min-w-full border border-gray-300">
    //     <thead className="bg-gray-200">
    //       <tr>
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
    //         <tr key={rowIndex} className={`${customStyles && customStyles.rowColor} ${rowAlignments && rowAlignments[rowIndex]}`}>
    //           {columns.map((column, colIndex) => (
    //             <td
    //               key={colIndex}
    //               className={`px-6 py-4 whitespace-nowrap ${(columnAlignments && columnAlignments[column]) || textAlign || 'text-left'
    //                 } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]}`}
    //             >
    //               {typeof renderCell === 'function' && renderCell(column, row)}
    //             </td>
    //           ))}
    //           {actions && (
    //             <td className="px-6 py-4 whitespace-nowrap text-left">
    //               {actions.map((action, actionIndex) => (
    //                 <button
    //                   key={actionIndex}
    //                   className={`mr-2 text-blue-500 hover:text-blue-700 ${customStyles &&
    //                     customStyles.actionColor &&
    //                     customStyles.actionColor[action.type]}`}
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

    // 4rd way
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
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
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 whitespace-nowrap ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'
                    } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]}`}
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
                        customStyles.actionColor[action.type]}`}
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


    // 3rd way
    // <div className="overflow-x-auto">
    //   <table className="min-w-full border border-gray-300">
    //     <thead className="bg-gray-200">
    //       <tr>
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
    //           {columns.map((column, colIndex) => (
    //             <td
    //               key={colIndex}
    //               className={`px-6 py-4 whitespace-nowrap ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'
    //                 } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]}`}
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
    //                     customStyles.actionColor[action.type]}`}
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


    // 2nd way
    // <div className="overflow-x-auto">
    //   <table className="min-w-full border border-gray-300">
    //     <thead className="bg-gray-200">
    //       <tr>
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
    //           {columns.map((column, colIndex) => (
    //             <td
    //               key={colIndex}
    //               className={`px-6 py-4 whitespace-nowrap ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'
    //                 } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]}`}
    //             >
    //               {/* Check if column name has nested path */}
    //               {column.includes('.') ? (
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
    //                     customStyles.actionColor[action.type]}`}
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

    // 1st way
    // <div className="overflow-x-auto w-full">
    //   <table className="w-full border border-gray-300">
    //     <thead className="bg-gray-200 w-full">
    //       <tr>
    //         {columns.map((column, index) => (
    //           <th
    //             key={index}
    //             className={`px-6 py-3 text-left font-semibold capitalize ${customStyles && customStyles.headerColor
    //               }`}
    //           >
    //             {column}
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
    //           {
    //             columns.map((column, colIndex) => (

    //               // <td
    //               //   key={colIndex}
    //               //   className={`px-6 py-4 whitespace-nowrap ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'
    //               //     } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]}`}
    //               // >
    //               //   {/* <p>{row.name}</p> */}
    //               //   {/* <p>{column}</p> */}
    //               //   {row[column]}
    //               // </td>
    //               <td
    //                 key={colIndex}
    //                 className={`px-6 py-4 whitespace-nowrap ${textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'
    //                   } ${customStyles && customStyles.textColor && customStyles.textColor[colIndex]}`}
    //               >
    //                 {/* Check if column name has nested path */}
    //                 {column.includes('.') ? (
    //                   getNestedValue(row, column)
    //                 ) : (
    //                   // If not nested, display directly
    //                   row[column]
    //                 )}
    //               </td>
    //             ))}
    //           {actions && (
    //             <td className="px-6 py-4 whitespace-nowrap text-left">
    //               {actions.map((action, actionIndex) => (
    //                 <button
    //                   key={actionIndex}
    //                   className={`mr-2 text-blue-500 hover:text-blue-700 ${customStyles &&
    //                     customStyles.actionColor &&
    //                     customStyles.actionColor[action.type]}`}
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
  );
};

export default Secondary;
