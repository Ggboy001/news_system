import axios from "axios";
const postForm = (path, formData) => {
    axios.post(path, formData)
}
export default postForm;