const baseUrl = import.meta.env.VITE_API_ENDPOINT;

export const getServerImage = (imgPath: string) => `${baseUrl}/${imgPath}`;
