import { L2User} from "../interfaces/index.interface";

class L2Client {
    getUsers() {
        const users: L2User[] = [
            {
                id: "1",
                first_name: "Kiki",
                last_name: "Smith",
                Street_address_1: "123 Cornelia St",
                Street_address_2: "Apt 1",
                City: "New York",
                Zip: "232423",
                Occupation: "Nail tech",
                Voting_registration: "democrat",
                Email: "neverwalkcorneliastreet@again.net",
                Phone: "123324343",
                Household: "123123-12312312",
            },
            {
                id: "2",
                first_name: "Missi",
                last_name: "Eliot",
                Street_address_1: "23 Hero St",
                Street_address_2: "Apt D",
                City: "New York",
                Zip: "32423",
                Occupation: "Dancer",
                Voting_registration: "republican",
                Email: "antihero@gmail.com",
                Phone: "5554343",
                Household: "23323232",
            },
            {
                id: "3",
                first_name: "Day",
                last_name: "Cuts",
                Street_address_1: "124 Beale St",
                Street_address_2: "Unit 400",
                City: "San Francisco",
                Zip: "94121",
                Occupation: "Teacher",
                Voting_registration: "democrat",
                Email: "athousandcuts@gmail.com",
                Phone: "5558966",
                Household: "123df-112312",
            },
            {
                id: "4",
                first_name: "Sean",
                last_name: "Con",
                Street_address_1: "123 Fleet St",
                Street_address_2: "Apt 33",
                City: "New York",
                Zip: "232923",
                Occupation: "Taxi Driver",
                Voting_registration: "independent",
                Email: "idrivecars@limo.net",
                Phone: "123324343",
                Household: "123123-112412",
            },
            {
                id: "5",
                first_name: "Sheri",
                last_name: "Super",
                Street_address_1: "1 Deer St",
                Street_address_2: "Apt 100",
                City: "Idaho",
                Zip: "232423",
                Occupation: "NA",
                Voting_registration: "democrat",
                Email: "sheri@super.com",
                Phone: "123324843",
                Household: "123123-199312",
            },
            {
                id: "6",
                first_name: "Harry",
                last_name: "Potss",
                Street_address_1: "123 Private Dr",
                Street_address_2: "Apt 1",
                City: "Colorado",
                Zip: "232423",
                Occupation: "Writer",
                Voting_registration: "republican",
                Email: "writer_harry@gmail.com",
                Phone: "129324343",
                Household: "1dfgdf-dfg2",
            },
        ];
        return Promise.resolve(users);
    }

}

export const l2Api = new L2Client();