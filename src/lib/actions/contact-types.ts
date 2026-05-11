export type ContactFormState = {
  status: "idle" | "ok" | "error";
  message: string;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};
