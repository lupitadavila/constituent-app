
import { ZendeskUser } from "@/src/interfaces/index.interface";

class ZendeskClient {
    getUsers() {
        const users: ZendeskUser[] = [
            {
                Id: 1,
                Name: "Terry Til",
                Email: "email@email.com",
                Phone: "555-555-5555",
                External_id: "123",
                Created_at: "",
                Updated_at: "",
                High_school: "Merry High School",
                Net_neutrality_stance: "pro",
            },
            {
                Id: 2,
                Name: "Joe Jim",
                Email: "joeyjim@email.com",
                Phone: "555-555-5555",
                External_id: "123df",
                Created_at: "",
                Updated_at: "",
                High_school: "Gateway High School",
                Net_neutrality_stance: "con",
            },
            {
                Id: 3,
                Name: "Margorie Mittiga",
                Email: "mmittiga@email.com",
                Phone: "555-555-5555",
                External_id: "123eee",
                Created_at: "",
                Updated_at: "",
                High_school: "Stanford High School",
                Net_neutrality_stance: "pro",
            },
            {
                Id: 4,
                Name: "Fernando Flores",
                Email: "fflores@email.com",
                Phone: "555-555-5555",
                External_id: "123ree",
                Created_at: "",
                Updated_at: "",
                High_school: "Garden High School",
                Net_neutrality_stance: "con",
            },
        ];
        return Promise.resolve(users);
    }

}

export const zendeskApi = new ZendeskClient();
