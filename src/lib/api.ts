import { ConstituentCreateRequest } from "../interfaces/index.interface";

const CREATE_CONSTITUENT_URI = "/api/constituents/create";

class ApiClient {
    createConstituent(requestData: ConstituentCreateRequest) : Promise<Response> {
        return fetch(CREATE_CONSTITUENT_URI, {
            method: "POST",
            body: JSON.stringify(requestData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
          })
    };
}

export const apiClient = new ApiClient();