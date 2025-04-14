import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { collection, getDocs } from "firebase/firestore";
import { Table, Button, Flex, TableColumnsType } from "antd";
import { useAuth } from "~/context/AuthProvider";
import { db } from "~/lib/firebaseConfig";
import { IUser } from "~/types/user";

const MainAdmin = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users")); // Thay "users" bằng collection của bạn
      const items: IUser[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IUser[];
      setData(items);
      setLoading(false);
    };

    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Định dạng tiêu đề
    const header = [
      "ID",
      "Tên",
      "Số điện thoại",
      "Level",
      "link nhiệm vụ 1",
      "link nhiệm vụ 2",
      "link nhiệm vụ 3",
      "link nhiệm vụ 4",
      "link nhiệm vụ 5",
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    // Căn chỉnh độ rộng cột tự động
    const columnWidths = header.map((col) => ({ wch: col.length + 10 }));
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Xuất file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "du_lieu_mini_game.xlsx");
  };

  const handleLogout = () => {
    logout();
  };

  // Cột bảng Ant Design
  const columns: TableColumnsType<IUser> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Level", dataIndex: "level", key: "level", width: 100 },
    ...Array.from({ length: 5 }, (_, index) => {
      const taskNumber = index + 1;
      return {
        title: `Nhiệm vụ ${taskNumber}`,
        key: `task${taskNumber}`,
        render: (_: any, { task }: IUser) => {
          const currentTask = task?.[index];
          return (
            <Flex vertical className="flex col">
              <Flex gap={10}>
                <span>link:</span>
                <span>{currentTask?.link}</span>
              </Flex>
              {currentTask?.image && (
                <>
                  <img
                    src={currentTask?.image}
                    alt={currentTask?.name}
                    className="w-20 h-20 object-cover"
                  />
                  <a>{currentTask?.image}</a>
                </>
              )}
            </Flex>
          );
        },
      };
    }),
  ];

  return (
    <div style={{ margin: 10 }}>
      <div className="mb-4">Quản lý người dùng</div>
      <Button
        type="primary"
        onClick={exportToExcel}
        style={{ marginBottom: 10 }}
      >
        Xuất File Excel
      </Button>
      <Button
        type="default"
        danger
        onClick={handleLogout}
        style={{ marginLeft: 10 }}
      >
        Đăng xuất
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content", y: "60vh" }}
      />
    </div>
  );
};

export default MainAdmin;
