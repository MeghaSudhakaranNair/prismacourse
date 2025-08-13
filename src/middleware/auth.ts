import { verify } from "jsonwebtoken";
interface JwtPayload {
  id: number;
}
export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const result = verify(
      token,
      process.env.WEB_TOKEN_SECRET as string
    ) as JwtPayload;
    console.log(result);
    req.user = result.id;
    console.log("called authenticated route");
    next();
  } catch (err) {
    console.log("caught error");
    return next(new Error("Authentication error"));
  }
};
