import { ConstituentCreateRequest } from "../interfaces/index.interface";

const CREATE_CONSTITUENT_URI = "/api/constituents/create";
const CONSTITUENT_URI = "/api/constituents"

class ApiClient {
    createConstituent(requestData: ConstituentCreateRequest) : Promise<Response> {
        return fetch(CREATE_CONSTITUENT_URI, {
            method: "POST",
            body: JSON.stringify(requestData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
          });
    };
    fetchConstituentById(id: string) : Promise<Response> {
        return fetch(`${CONSTITUENT_URI}/${id}`);
    };
    fetchConstituentsByQuery(q: string) : Promise<Response> {
        return fetch(`${CONSTITUENT_URI}?q=${q}`);
    };
    fetchAllConstituents() : Promise<Response> {
        return fetch(CONSTITUENT_URI);
    };
    deleteConstituent(id: string) : Promise<Response> {
        return fetch(`${CONSTITUENT_URI}/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
          });
    };


}

export const apiClient = new ApiClient();