import { useState } from "react"
import Resizer from 'react-image-file-resizer';
import useToastHook from "./useToastHook";

export const usePreviewImage = () => {
	const [imgUrl, setImgUrl] = useState(null);
	const showToast = useToastHook();
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			Resizer.imageFileResizer(
				file,
				300,
				200,
				"JPEG",
				70,
				0,
				(uri) => {
					setImgUrl(uri);
				},
				"base64" // or 'blob' if you prefer a blob
			);
		} else {
			showToast("Invalid file type", "Please select an image file", "error");
			setImgUrl(null);
		}
	};
	return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImage;
