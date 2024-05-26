import { useState } from "react"
import useToastHook from "./useToastHook";

export const usePreviewImage = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const showToast = useToastHook();

    const handleImageChange = (e) => {
        const file = e.target.file[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = () => {
                setImageUrl(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            showToast("Invalid file type", "Please select an image file!", "error");
            setImageUrl(null);
        }
    };
    console.log(imageUrl);
    return { handleImageChange, imageUrl }
}

export default usePreviewImage;
