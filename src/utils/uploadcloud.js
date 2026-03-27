import axios from "axios";
import { toast } from "react-toastify";

const uploadCloudinary = async (file, toastContainerId) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'cc22-upload');
            const resp = await axios.post('https://api.cloudinary.com/v1_1/dc8ywsgsf/image/upload', formData);
            return resp.data.secure_url;
        } catch (err) {
            console.error('Upload Cloudinary Error:', err);
            toast.error("Upload Image Error",{containerId:toastContainerId})
            throw err;
        }
    };

    export default uploadCloudinary