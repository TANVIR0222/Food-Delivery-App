import { toast } from "sonner-native";

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      //   position: 'top',
    });
  },

  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      //   position: 'top',
    });
  },

  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
      //   position: 'top',
    });
  },

  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
      //   position: 'top',
    });
  },

  loading: (message: string) => {
    return toast.loading(message);
  },

  dismiss: (id?: string | number) => {
    toast.dismiss(id);
  },
};
