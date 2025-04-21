import { ITaskUser, Question } from "../../types/user";
export const STORAGE_KEY = "crossword-answers";
export const taskGameDefault: ITaskUser[] = [
  {
    id: 1,
    name: "Nhiệm vụ 1",
    link: "",
    status: 1,
  },
  {
    id: 2,
    name: "Nhiệm vụ 2",
    link: "",
    status: 1,
  },
  {
    id: 3,
    name: "Nhiệm vụ 3",
    link: "",
    status: 1,
  },
  {
    id: 4,
    name: "Nhiệm vụ 4",
    link: "",
    status: 1,
  },
  {
    id: 5,
    name: "Nhiệm vụ 5",
    link: "",
    status: 1,
  },
];
export const questions: Question[] = [
  {
    id: 1,
    text: "1. LẦN ĐẦU TIÊN, CỘNG ĐÃ TỚI ... CAM RANH? (6 chữ)",
    options: ["SÂN BAY", "MÁY BAY", "TÀU BAY"],
    correctIndex: 0,
  },
  {
    id: 2,
    text: "2. TÊN LOẠI TRÀ CỘNG SỬ DỤNG? (9 chữ)",
    options: ["TRÀ NÚI CAO", "SHAN TUYẾT", "TRÀ Ô LONG"],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "3. KỂ TÊN MỘT TRONG BA BỘ TRÀ MỚI CỘNG SẮP RA MẮT? (6 chữ)",
    options: ["KHỔ QUA", "HOA CÚC", "CÀ PHÊ"],
    correctIndex: 0,
  },
  {
    id: 4,
    text: "4. TÊN MỘT LOẠI DỤNG CỤ CỘNG CHUYÊN DÙNG ĐỂ PHA CÀ PHÊ? (4 chữ)",
    options: ["PHIN", "CHAI", "ẤM SỨ"],
    correctIndex: 0,
  },
  {
    id: 5,
    text: "5. TÊN ĐẦY ĐỦ CỦA ĐỒ UỐNG TRONG DÒNG CÀ PHÊ ĐƯỢC YÊU THÍCH TẠI CỘNG LÀ ? (6 chữ)",
    options: ["CỐT DỪA", "NÂU KEM", "BẠC XỈU"],
    correctIndex: 2,
  },
  {
    id: 6,
    text: "6. TẮC XÍ MUỘN LÀ ĐẶC SẢN Ở ĐÂU? (6 chữ)",
    options: ["SÀI GÒN", "GIA LAI", "THÁI BÌNH"],
    correctIndex: 0,
  },
  {
    id: 7,
    text: "7. TÊN GỌI ĐÚNG CỦA MỘT LOẠI TRÀ NẰM TRONG NHÓM TRÀ SHAN TUYẾT CỔ THỤ? (6 chữ)",
    options: ["HOA SEN", "HOA CÚC", "HOA ĐÀO"],
    correctIndex: 1,
  },
];
