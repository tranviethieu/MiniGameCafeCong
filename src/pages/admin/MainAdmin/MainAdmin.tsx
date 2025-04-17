import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { collection, getDocs } from "firebase/firestore";
import { Table, Button, TableColumnsType, Modal, Input } from "antd";
import { useAuth } from "~/context/AuthProvider";
import { db } from "~/lib/firebaseConfig";
import { IUser } from "~/types/user";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface IData {
  name: string;
  phone: string;
  level: number;
  link1: string;
  link2: string;
  link3: string;
  link4: string;
  link5: string;
  img: string;
  createdAt: string;
  updatedAt: string | null;
}
const MainAdmin = () => {
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "admin") navigate("/");
  }, [user?.role]);
  useEffect(() => {
    reloadPage();
  }, []);
  const reloadPage = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "users")); // Thay "users" bằng collection của bạn
    const items: IUser[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IUser[];
    const dataItems: any[] = items
      ?.filter((e) => e?.role === "user")
      ?.map((item) => {
        const date = dayjs.tz(
          item.createdAt,
          "DD/MM/YYYY HH:mm:ss",
          "Asia/Ho_Chi_Minh"
        );
        const timestamp = date.isValid() ? date.valueOf() : 0;

        return {
          ...item,
          timestamp,
        };
      })
      ?.sort((a, b) => b.timestamp - a.timestamp)
      ?.map((item) => {
        const [task1, task2, task3, task4, task5] = item.task || [];

        return {
          name: item.name,
          phone: item.phone,
          level: item.level,
          link1: task1?.link || "",
          link2: task2?.link || "",
          link3: task3?.link || "",
          link4: task4?.link || "",
          link5: task5?.link || "",
          img: task1?.image || "",
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
    setData(dataItems);
    setLoading(false);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Định dạng tiêu đề
    const header = [
      "Tên",
      "Số điện thoại",
      "Level",
      "link nhiệm vụ 1",
      "link nhiệm vụ 2",
      "link nhiệm vụ 3",
      "link nhiệm vụ 4",
      "link nhiệm vụ 5",
      "link ảnh",
      "Thời gian tạo tài khoản",
      "Thời gian làm nhiệm vụ gần nhất",
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
    saveAs(dataBlob, "du_lieu_tro_choi.xlsx");
  };

  const handleLogout = () => {
    logout();
  };

  // Cột bảng Ant Design
  const columns: TableColumnsType<IData> = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Mức sinh hoạt",
      dataIndex: "level",
      key: "level",
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "img",
      width: 100,
      render: (_: any, { img }: IData) =>
        img && (
          <>
            <img
              onClick={() => {
                setPreviewImg(img);
                setIsModalOpen(true);
              }}
              src={img}
              alt={img}
              className="w-20 h-20 object-cover"
            />
          </>
        ),
    },
    {
      title: "Nhiệm vụ 1",
      dataIndex: "link1",
      key: "link1",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Nhiệm vụ 2",
      dataIndex: "link2",
      key: "link2",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Nhiệm vụ 3",
      dataIndex: "link3",
      key: "link3",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Nhiệm vụ 4",
      dataIndex: "link4",
      key: "link4",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Nhiệm vụ 5",
      dataIndex: "link5",
      key: "link5",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Thời gian tạo tài khoản",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Thời gian làm nhiệm vụ gần nhất",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  return (
    <div style={{ margin: 10 }}>
      <h1 className="mb-4 text-xl bold font-[Cousine]">
        Quản lý tổng số ({data?.length || 0} người chơi)
      </h1>
      <Button
        type="primary"
        className="bg-[#3c4d2f]"
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
      <Button
        type="primary"
        danger
        onClick={reloadPage}
        style={{ marginLeft: 10 }}
      >
        Tải lại dữ liệu
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        //scroll={{ x: "1200px", y: "60vh" }}
      />
      {previewImg && (
        <Modal
          //title="Phóng to ảnh"
          key={"okeImg"}
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          centered
          width="80vw" // hoặc bạn có thể để 1000 nếu muốn cố định
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex flex-col items-center p-4 space-y-4">
            {/* Ảnh phóng to */}
            <img
              src={previewImg || ""}
              alt="preview"
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Đường dẫn ảnh */}
            <Input
              readOnly
              value={previewImg || ""}
              onFocus={(e) => e.target.select()}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MainAdmin;
