import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/userModel";
import bcrypt from "bcrypt";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not defined. Please check your .env file.");
}

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_ACCESS_SECRET,
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload: { id: string, tokenVersion: number }, done: any) => {
        try {

            const user = await UserModel.findOne(
                { _id: jwt_payload.id },
                {
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    tokenVersion: 1
                }
            ).exec();

            if (!user || Number(user.tokenVersion) !== jwt_payload.tokenVersion) {
                return done(null, false, {
                    email: "NOT FOUND",
                    errors: { username: { message: "The email is invalid" } },
                });
            }
            console.log("user", user)
            return done(null, { user });
        } catch (err) {
            return done(err);
        }
    })
);


passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
