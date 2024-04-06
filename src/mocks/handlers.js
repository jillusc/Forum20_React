import { rest } from "msw";

const baseURL = "https://forum20-a5050d8397b8.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 5,
            "username": "jillusc",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 5,
            "profile_image": "https://res.cloudinary.com/dcipycm5s/image/upload/v1/media/images/profile_mulwvy"
        }))
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
];