import React from "react";
import jsPDF from "jspdf";
import { RobotoFont } from "../common/data";
import { LogoCong } from "../common/logo";

interface PdfGeneratorProps {
  name: string;
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ name }) => {
  console.log(RobotoFont);

  const generatePdf = async () => {
    const doc = new jsPDF();

    // 1️⃣ Nhúng font base64 vào jsPDF
    doc.addFileToVFS("Roboto-Regular.ttf", RobotoFont);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    // 2️⃣ Tiêu đề
    doc.setFontSize(18);
    doc.text("Giấy Chứng Nhận", 70, 50);

    doc.addImage(LogoCong, "JPEG", 50, 10, 100, 30); // (base64, type, x, y, width, height)
    // 3️⃣ Nội dung chính
    doc.setFontSize(14);
    doc.text("Chúng tôi xin trân trọng cảm ơn", 20, 70);
    doc.setFont("Roboto", "bold");
    doc.text(name, 20, 80);
    doc.setFont("Roboto", "normal");
    doc.text("đã tham gia vào sự kiện của chúng tôi.", 20, 90);
    doc.text("Hy vọng sẽ gặp lại bạn trong các sự kiện tiếp theo!", 20, 100);

    // 4️⃣ Lưu file PDF
    doc.save("CamOn.pdf");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Chứng Nhận Tham Gia</h2>
      <p>
        <strong>{name}</strong>
      </p>
      <button
        onClick={generatePdf}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Tải xuống PDF
      </button>
    </div>
  );
};

export default PdfGenerator;
