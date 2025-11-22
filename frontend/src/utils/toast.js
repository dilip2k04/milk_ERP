// utils/toast.js
import { toast } from "@/components/ui/use-toast";

export const successToast = (message) => {
  toast({
    title: "Success",
    description: message,
  });
};

export const errorToast = (message) => {
  toast({
    title: "Error",
    variant: "destructive",
    description: message,
  });
};

export const infoToast = (message) => {
  toast({
    title: "Info",
    description: message,
  });
};
