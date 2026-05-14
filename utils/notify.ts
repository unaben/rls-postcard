import { toast } from "react-toastify";

type ToastifyType = "info" | "success" | "warning" | "error";
type ToastifyPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

const notify = (
  type: ToastifyType,
  msg: string,
  position: ToastifyPosition = "top-right",
  duration = 3000
) => {
  const toastParam = {
    position: position,
    autoClose: duration,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    newestOnTop: true,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    theme: "colored",
  };

  switch (type) {
    case "info":
      return toast.info(msg, toastParam);
    case "success":
      return toast.success(msg, toastParam);
    case "warning":
      return toast.warning(msg, toastParam);
    case "error":
      return toast.error(msg, toastParam);
    default:
      return toast.info(msg, toastParam);
  }
};

export default notify;
