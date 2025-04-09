export const uploadToCloudinary = async (
  file: File
): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cafeCong"); // 👈 preset bạn tạo
  formData.append("cloud_name", "dsqfsapjd"); // 👈 thay bằng cloud name của bạn

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsqfsapjd/image/upload", // 👈 thay cloud name
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url; // ✅ Link ảnh sau khi upload
  } catch (err) {
    console.error("Lỗi upload Cloudinary:", err);
    return null;
  }
};
