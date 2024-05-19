import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Buttons from "../../components/Buttons";
import TableContainer from "../../components/Table/TableContainer";
import TableHeading from "../../components/Table/TableHeading";
import Table from "../../components/Table/index";
import ActionContainer from "../../components/common/ActionContainer";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import PageContainer from "../../components/common/PagesHeader/PageContainer";
import PageHeaderContainer from "../../components/common/PagesHeader/PageHeaderContainer";
import PageHeading from "../../components/common/PagesHeader/PageHeading";
import Pagination from "../../components/common/Pagination";
import Skeleton from "../../components/common/Skeleton";
import Slugs from "../../helpers/Slugs";
import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/hasPermission";
import { Permission } from "../../utils/permissionStrings";
import HasButtonPermissions from "../../components/common/HasButtonPermissions";
import { deleteCoupons, useFetchCouponsQuery } from "../../services/coupon/couponService";

function Coupons() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState([]);
  const [cancellationModal, setCancellationModal] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // hooks for api call
  const { data: couponData, isFetching } = useFetchCouponsQuery({
    page: searchParams.get("page"),
    limit: searchParams.get("limit")
  });

  useEffect(() => {
    if (user && user.permissions) {
      const value = hasPermission(user.permissions, [
        Permission.DELETE_COUPON,
      ])
        ? []
        : undefined;
      setSelectedItems(value);
    }
  }, [user?.permissions]);



  const deleteCouponsMutation = useMutation({
    mutationFn: (ids) => {
      return deleteCoupons(ids);
    },
    onSuccess: (data, variables, context) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries("coupons");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  // here deleting the single data
  const handleDelete = (ids) => {
    deleteCouponsMutation.mutate(ids);
    setSelectedItems([]);
  };

  // here render action component -- like edit and delete
  const renderActionComponents = (data) => {
    return (
      <>
        <ActionContainer>
          <HasButtonPermissions
            buttonPermissions={Permission.UPDATE_COUPON}
          >
            <Buttons.Edit
              onClick={() =>
                navigate(`${Slugs.COUPON_UPDATE_PATH}/${data._id}`)
              }
            />
          </HasButtonPermissions>
          <HasButtonPermissions
            buttonPermissions={Permission.DELETE_COUPON}
          >
            <Buttons.Delete
              onClick={() => {
                setCancellationModal(data._id);
              }}
              disabled={deleteCouponsMutation.isPending}
            />
          </HasButtonPermissions>
        </ActionContainer>

        {cancellationModal === data._id && (
          <ConfirmationModal
            open={cancellationModal}
            setOpen={setCancellationModal}
            modalTitle={"Cancel Confirmation!"}
            modalDescription="Are you sure to delete this coupon?"
            handleFunction={() => handleDelete(data._id)}
          />
        )}
      </>
    );
  };

  if (isFetching || deleteCouponsMutation.isPending) {
    return <Skeleton />;
  }


  // // for test 
  // const data = [
  //   {
  //     id: 1, name: 'John Doe', age: 30, company: {
  //       details: {
  //         name: 'ABC Corp',
  //         tag: {
  //           name: 'hello 1'
  //         }
  //       }
  //     }
  //   },
  //   {
  //     id: 2, name: 'Jane Smith', age: 25, company: {
  //       details: {
  //         name: 'XYZ Inc',
  //         tag: {
  //           name: 'hello 2'
  //         }
  //       }
  //     }
  //   },
  //   // Add more data as needed
  // ];

  const data = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      company: {
        details: {
          name: 'ABC Corp',
          tag: {
            name: 'hello 1'
          }
        },
      },
      productName: 'Product A',
      productImage: 'https://example.com/product-a.jpg',
      productCategory: 'Category X',
      // category: {
      //   name: 'Category Y1',
      //   mainCategory: 'Category M1',
      // }
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 25,
      company: {
        details: {
          name: 'XYZ Inc',
          tag: {
            name: 'hello 1'
          }
        }
      },
      productName: 'Product B',
      productImage: 'https://example.com/product-b.jpg',
      productCategory: 'Category Y',
      category: {
        name: 'Category Y',
        mainCategory: 'Category M',
      }
    },
    // Add more products as needed
  ];


  // const columns = ['id', 'name'];
  const columns = ['id', 'name', 'age', 'company.details.name', 'company.details.tag.name', row => (
    <div>
      <p>{row.productName}</p>
      <img src={row.productImage} alt={row.productName} />
      <p>{row.category && row.category.name}</p>
    </div>
  ),
    row => (
      <div>
        <p>{row.category && row.category.name}</p>
        <p>{row.category && row.category.mainCategory}</p>
      </div>
    )

  ];

  const columnHeaders = ['my ID', 'Name', 'Age', 'Company', 'Tags', 'Product Info', 'Category Name & Main Category'];

  const actions = [
    { type: 'edit', icon: '✏️' },
    { type: 'delete', icon: '❌' },
    { type: 'delete', icon: '❌' },
    // Add more actions as needed
  ];

  const customStyles = {
    headerColor: 'bg-gray-300 text-[#745876]',
    rowColor: 'bg-gray-100',
    textColor: {
      0: 'text-blue-500', // Color for ID column
      // Add more as needed
      1: 'text-red-600',
      5: 'text-green-500',
      2: 'text-blue-500',
      4: 'text-red-500',
      // 6: 'text-center'
    },
    actionColor: {
      edit: 'text-green-500',
      delete: 'text-red-500',
      delete: 'text-green-500',
    },
    textHeaderStyle: {
      4: 'text-red-500',
    }
  };

  // Function to handle select all
  const handleSelectAll = (selectAll) => {
    console.log(selectAll);
    // Do something when select all checkbox is clicked
  };

  // Function to handle select row
  const handleSelectRow = (selectedRows) => {
    console.log(selectedRows);
    // Do something when individual row checkbox is clicked
  };


  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeading title="Coupons" isBack={false} />

        <HasButtonPermissions
          buttonPermissions={Permission.CREATE_COUPON}
        >
          <Buttons.Primary
            label="Add Coupon"
            onClick={() => navigate(Slugs.COUPON_CREATE_PATH)}
          />
        </HasButtonPermissions>
      </PageHeaderContainer>

      <TableContainer>
        <TableHeading
          title="Total Coupons"
          value={couponData?.totalDocuments || 0}
          selectedItems={selectedItems}
          setCancellationModal={setCancellationModal}
        />

        {cancellationModal === selectedItems && (
          <ConfirmationModal
            open={cancellationModal}
            setOpen={setCancellationModal}
            modalTitle={`Delete Confirmation!`}
            modalDescription={`Are you sure to delete these ${selectedItems.length} coupons?`}
            handleFunction={() => handleDelete(selectedItems)}
          />
        )}

        {/* <Table.Primary
          tableHeadsData={tableSchema.tableHeads}
          tableData={couponData?.docs}
          tableDataKeys={tableSchema.tableDataKeys}
          tableActionHeads={tableSchema.tableActionHeader}
          tableActionComponents={renderActionComponents}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
        /> */}
        <Table.Secondary
          data={data}
          columns={columns}
          columnHeaders={columnHeaders}
          actions={actions}
          textAlign="left"
          customStyles={customStyles}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          showCheckboxes={true}
        />

        <Pagination totalData={couponData?.totalDocuments} />
      </TableContainer>
    </PageContainer>
  )
}

// here mock object for table
const tableSchema = {
  tableHeads: [
    {
      title: "Coupon Code",
      // width: "w-[300px]",
    },
    {
      title: "Coupon Type",
      // width: "w-[250px]",
    },
    {
      title: "Coupon Amount",
      // width: "w-[250px]",
    },
    {
      title: "Coupon Usage Limit",
      // width: "w-[250px]",
    },
  ],
  tableActionHeader: [
    {
      title: "Action",
      width: "w-[158px]",
      align: "center",
    },
  ],
  tableDataKeys: [
    {
      title: "code",
      width: "w-[200px]",
    },
    {
      title: "type",
      width: "w-[200px]",
    },
    {
      title: "amount",
      width: "w-[200px]",
    },
    {
      title: "maxUsage",
      width: "w-[200px]",
    },
  ],
};

export default Coupons