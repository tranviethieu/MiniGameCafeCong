export const uploadToImgBB = async (file: File): Promise<string | null> => {
  try {
    const compressedFile = await compressImage(file, 0.6); // 👈 chất lượng 60%

    const formData = new FormData();
    formData.append("image", compressedFile);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=c02207207b5e9cc4b687706be702c372", // 👈 thay key ở đây
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.success) {
      return data.data.url; // 👈 trả về link ảnh
    } else {
      console.error("Upload thất bại:", data);
      return null;
    }
  } catch (err) {
    console.error("Lỗi upload ImgBB:", err);
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
        "image/jpeg",
        quality
      );
    };

    reader.readAsDataURL(file);
  });
};
