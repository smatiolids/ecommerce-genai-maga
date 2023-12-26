import jsonServerProvider from "ra-data-json-server";
import {
  CreateParams,
  UpdateParams,
  DataProvider,
  fetchUtils,
} from "react-admin";

const endpoint = "http://localhost:5000/";
const baseDataProvider = jsonServerProvider(endpoint);

type SearchImageParams = {
  file: File;
};

const searchFormData = (params: CreateParams<SearchImageParams>) => {
  const formData = new FormData();
  params.data.file && formData.append("file", params.data.file);
  return formData;
};

export const DSEProvider: DataProvider = {
  ...baseDataProvider,
  searchByImage: (params) => {
    console.log(params);
    const formData = searchFormData(params);
    return fetchUtils
      .fetchJson(`${endpoint}/search-by-image`, {
        method: "POST",
        body: formData,
      })
      .then(({ json }) => ({ data: json }));
  },
};
