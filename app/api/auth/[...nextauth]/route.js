import { Users } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
      
            async authorize(credentials) {
              const { email, password } = credentials;
      
              try {
                await connectToDB();
                const user = await Users.findOne({ email });
      
                if (!user) {
                  return null;
                }
      
                const passwordsMatch = await bcrypt.compare(password, user.password);
      
                if (!passwordsMatch) {
                  return null;
                }
      
                return user;
              } catch (error) {
                console.log("Error: ", error);
              }
            },
          }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                try {
                    await connectToDB();

                    const existingUser = await Users.findOne({ email: user.email });
                    const { name, email, image } = user;
                    const [firstName, lastName] = name.split(" ");

                    if (!existingUser) {
                        const newUser = new Users({
                            email,
                            name: firstName,
                            surname: lastName || "",
                            image: image || null,
                        });

                        await newUser.save();
                    }

                    return true; 
                } catch (error) {
                    console.error("Error in Google sign-in:", error);
                    return false; 
                }
            }

            return true; 
        },
    },
    session: {
        strategy: "jwt", 
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
