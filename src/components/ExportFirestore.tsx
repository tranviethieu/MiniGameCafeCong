import { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { db } from "../lib/firebaseConfig"; // Cấu hình Firebase
import { collection, getDocs } from "firebase/firestore";
import { Table, Button } from "antd";
import { IUser, IUserContext, UserContext } from "../context/UserProvider";

const ExportToExcel = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext<IUserContext>(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users")); // Thay "users" bằng collection của bạn
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(
        items?.map((e: any) => ({
          id: e?.id,
          name: e?.name,
          phone: e.phone?.startsWith("+84") ? e.phone.slice(3) : e.phone || "",
          level: e?.level,
          linkb1: e?.linkb1,
          linkb2: e?.linkb2,
          linkb3: e?.linkb3,
          linkb4: e?.linkb4,
          linkb5: e?.linkb5,
          giftCode: e?.giftCode,
          status:
            e?.status === 1
              ? "Có thể làm" + ` nhiệm vụ ${e?.level}`
              : e?.status === 2
              ? "Đang làm" + ` nhiệm vụ ${e?.level}`
              : e?.status === 3
              ? "Hoàn thành" + ` nhiệm vụ ${e?.level}`
              : "---",
        }))
      );
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
      "giftCode",
      "Trạng thái (1: có thể làm, 2: đang làm, 3: hoàn thành)",
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
    setUser({
      phone: "",
      name: "",
      level: 1,
      status: 1,
      linkb1: "",
      linkb2: "",
      linkb3: "",
      linkb4: "",
      linkb5: "",
      giftCode: "",
    });
  };

  // Cột bảng Ant Design
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Nhiệm vụ 1", dataIndex: "linkb1", key: "linkb1" },
    { title: "Nhiệm vụ 2", dataIndex: "linkb2", key: "linkb2" },
    { title: "Nhiệm vụ 3", dataIndex: "linkb3", key: "linkb3" },
    { title: "Nhiệm vụ 4", dataIndex: "linkb4", key: "linkb4" },
    { title: "Nhiệm vụ 5", dataIndex: "linkb5", key: "linkb5" },
    { title: "Gift Code", dataIndex: "giftCode", key: "giftCode" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
  ];

  return (
    <div style={{ margin: 10 }}>
      <h2>Quản lý người dùng</h2>
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
        scroll={{ x: 1200, y: 500 }} // Thêm scroll ngang & dọc
      />
    </div>
  );
};

export default ExportToExcel;
