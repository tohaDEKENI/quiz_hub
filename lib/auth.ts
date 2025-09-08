
import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
export const auth = betterAuth({
    database: createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders:{
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        },
    },
})