import { Router, Request, Response } from "express";
import { UserService } from "../service/user.ts";
import { ResponseType } from "../types/response.type.ts";
import { UserSchema } from "../schema/user.js";
import { UserType } from "../types/user.type.ts";

const UserRouter = Router();
const userservice: UserService = new UserService();

UserRouter.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  const user = await userservice.post(body);

  const result: ResponseType<UserType> = {
    message: "성공적으로 생성되었습니다.",
    data: user,
  };

  res.json(result);
});

UserRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userservice.get(id);

  if (!user) {
    return res.status(501).json({
      message: "사용자를 찾을 수 없습니다.",
    });
  }

  const result: ResponseType<UserType> = {
    message: "성공적으로 조회되었습니다.",
    data: user,
  };

  return res.json(result);
});

UserRouter.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { body } = req;
  const user = await userservice.patch(id, body);

  const result = {
    message: "성공적으로 수정되었습니다.",
    data: user,
  };

  res.json(result);
});

UserRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userservice.delete(id);

  const result = {
    message: "성공적으로 삭제되었습니다.",
    data: user,
  };

  res.json(result);
});

export default UserRouter;
