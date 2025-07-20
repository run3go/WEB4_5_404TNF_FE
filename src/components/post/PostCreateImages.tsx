import Icon from '../common/Icon';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

export default function PostCreateImages({
  pickedImages,
  setPickedImages,
}: {
  pickedImages: File[];
  setPickedImages: Dispatch<SetStateAction<File[]>>;
}) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imageFiles: File[] = [];
    const previewPromises: Promise<string>[] = [];

    for (
      let i = 0;
      i < files.length && pickedImages.length + imageFiles.length < 5;
      i++
    ) {
      const file = files[i];
      imageFiles.push(file);
      const previewPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      previewPromises.push(previewPromise);
    }

    Promise.all(previewPromises).then((newPreviewUrls) => {
      setPickedImages((prev) => [...prev, ...imageFiles]);
      setPreviews((prev) => [...prev, ...newPreviewUrls]);
    });
  };

  const handleRemoveImage = (index: number) => {
    setPickedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="mt-6 ml-12 flex gap-6 px-[8.37vw]">
        <label
          className="flex h-[120px] w-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] bg-[#E1E1E1]"
          htmlFor="inputFile"
        >
          <Icon width="22px" height="22px" left="-301px" top="-121px" />
          <p className="text-[16px] font-medium">{`${pickedImages.length} / 5`}</p>
        </label>
        <input
          type="file"
          id="inputFile"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />

        <div className="gpa-6 flex">
          {previews.map((preview, i) => (
            <div key={i} className="relative space-x-6">
              <Image
                className="h-[120px] w-[120px] rounded-[20px] object-cover"
                src={preview}
                alt={`선택한 이미지${i}`}
                width={120}
                height={120}
                priority
              />
              <div
                className="absolute top-[-10px] right-[14px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#FCC389]"
                onClick={() => handleRemoveImage(i)}
              >
                <Icon width="12px" height="12px" left="-72px" top="-126px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
