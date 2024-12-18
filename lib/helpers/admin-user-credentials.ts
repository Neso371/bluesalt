import { Credentials } from "./credentials"

export const AdminUserCredentials: Record<string, Credentials> = {
    demo: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
}
