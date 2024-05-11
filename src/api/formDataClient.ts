import { createClient } from "./client";
import { onRequest, onResponseError, onResponseSuccess } from "./interceptors";

export const formDataClient = createClient({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

formDataClient.interceptors.request.use(onRequest);
formDataClient.interceptors.response.use(
  onResponseSuccess, 
  onResponseError(formDataClient),
);