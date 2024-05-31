import { useState } from "react";

export function useCreate({ ...props }) {
  const [formData, setFormData] = useState({
    ...props,
  });
  return {
    formData,
    setFormData,
  };
}
