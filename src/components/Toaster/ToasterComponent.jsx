import { Toaster } from "react-hot-toast";
import "./toaster.css";

const ToasterComponent = () => {
  return (
    <Toaster
      position='top-center'
      reverseOrder={false}
      toastOptions={{
        /* style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "white",
          },
        },
        error: {
          duration: 5000,
          theme: {
            primary: "red",
            secondary: "white",
          },
        }, */
        className: "custom-toast",
      }}
    />
  );
};

export default ToasterComponent;
