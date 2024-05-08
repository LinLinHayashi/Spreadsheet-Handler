import "../styles/Upload.css";
import check from "../images/check.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", statusCode: "" });
  const [downloadFile, setDownloadFile] = useState();

  const navigate = useNavigate();

  // This function handles input changes.
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // This function displays a modal.
  const modalOpen = () => {
    const modal = document.getElementById("modal");
    modal.showModal();
  };

  // This function closes a modal, empties the input values, and reset "formData".
  const modalClose = () => {
    emptyInput();
    setFile();
    setDownloadFile();
    const modal = document.getElementById("modal");
    modal.close();
  };

  const emptyInput = () => {
    const file = document.getElementById("file");
    file.value = "";
  };

  // This function handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // This prevents refreshing the page when the form is submitted.
    setError({ message: "", statusCode: "" });
    const formData = new FormData();
    formData.append("file", file); // Add a new key/value pair to formData.
    try {
      if (!file) {
        setError({
          message: "Oops! You need to choose a spreadsheet!",
          statusCode: "",
        });
        return; // End "handleSubmit" function as we have an error.
      }
      setLoading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError({ message: data.message, statusCode: data.statusCode });
        return; // End "handleSubmit" function as we have an error.
      }

      // If we are here, then we have successfully uploaded the spreadsheet.
      setLoading(false);
      setDownloadFile(data);
      modalOpen();
    } catch (error) {
      // We use "try/catch" here to handle errors NOT defined in the backend.
      setLoading(false);
      setError({ message: error.message, statusCode: error.statusCode });
    }
  };

  // This function handles file download
  const handleDownload = async (e) => {
    e.preventDefault(); // This prevents refreshing the page when the form is submitted.
    setError({ message: "", statusCode: "" });
    try {

      // Note that fetch won't work for file download, we have to use axios.
      axios({
        url: `/api/download/${downloadFile}`,
        method: "GET",
        responseType: "blob",
      }).then(res => {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${downloadFile}`);
        document.body.appendChild(link);
        link.click();
      });
      modalClose();
    } catch (error) {
      setError({ message: error.message, statusCode: error.statusCode });
      modalClose();
    }
  };

  return (
    <div className="upload">
      <h1>Upload Your Spreadsheet</h1>
      <div className="upload-input-container">
        <input
          type="file"
          id="file"
          onChange={handleChange}
        />
        <button disabled={loading} type="button" onClick={handleSubmit}>
          {loading ? "LOADING..." : "UPLOAD"}
        </button>
      </div>
      {error && <p className="error">{error.message}</p>}
      <dialog id="modal">
        <div className="popup">
          <img src={check} alt="Check" />
          <h3>Thank You!</h3>
          <p>
            Your spreadsheet is ready for downloading. Please press OK to download.
          </p>
          <button onClick={handleDownload}>OK</button>
        </div>
      </dialog>
    </div>
  );
}
