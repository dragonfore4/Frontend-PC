// toastUtils.ts
import { toast, Bounce, ToastOptions, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define types for toast options
interface CustomToastOptions extends ToastOptions {
  position?: ToastPosition;
//   transition?: any;
}

// Customizable toast function
export const showToast = (
  message: string,
  type: "success" | "warn" | "error" | "info" = "info",
  options: CustomToastOptions = {}
) => {
  const defaultOptions: CustomToastOptions = {
    position: "top-right" as ToastPosition, // Ensure the position matches the expected type
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "warn":
      toast.warn(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "info":
    default:
      toast.info(message, defaultOptions);
      break;
  }
};
