export const uploadToCloudinary = async (
  file: File
): Promise<string | null> => {
  try {
    // Chuyển ảnh sang base64 và vẽ lên canvas
    const compressedFile = await compressImage(file, 0.6); // 👈 chất lượng 60%

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", "cafeCong");
    formData.append("cloud_name", "dsqfsapjd");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsqfsapjd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Lỗi upload Cloudinary:", err);
    return null;
  }
};
const compressImage = (file: File, quality = 0.7): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    reader.onerror = reject;
    img.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 1080;
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Không thể nén ảnh"));
          }
        },
        "image/jpeg", // 👈 chuyển về jpeg
        quality // 👈 giảm chất lượng
      );
    };

    reader.readAsDataURL(file);
  });
};
