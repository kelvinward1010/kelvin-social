import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});

export const config = {
    matcher: [
        "/home/:path*",
        "/posts/:path*",
        "/notifications/:path*",
        "/people/:path*",
        "/users/:path*",
        "/conversations/:path*",
    ]
};