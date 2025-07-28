import { ReactNode } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import Icon from './Icon';
export const StyledToastContainer = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      newestOnTop
      closeOnClick
      pauseOnHover
      // pauseOnFocusLoss={false}
      theme="light"
      transition={Slide}
    />
  );
};

export const Toast = {
  info: (message: ReactNode) => {
    toast.info(message, {
      icon: <Icon width="16px" height="14px" left="-340px" top="-122px" />,
    });
  },
  success: (message: ReactNode) => {
    toast.success(message, {
      icon: <Icon width="16px" height="14px" left="-340px" top="-122px" />,
    });
  },
  error: (message: ReactNode) => {
    toast.error(message, {
      icon: <Icon width="14px" height="14px" left="-415px" top="-122px" />,
    });
  },
  warn: (message: ReactNode) => {
    toast.warn(message, {
      icon: <Icon width="16px" height="14px" left="-340px" top="-122px" />,
    });
  },
};
