import { signUp } from "@/services/auth/services";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await signUp(req.body, (status) => {
        if (status) {
          res
            .status(200)
            .json({ status: true, statusCode: 200, message: "success" });
        } else {
          res
            .status(400)
            .json({ status: false, statusCode: 400, message: "failed" });
        }
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res
        .status(500)
        .json({
          status: false,
          statusCode: 500,
          message: "Internal server error",
        });
    }
  } else {
    res.status(405).json({
      status: false,
      statusCode: 405,
      message: "Method not allowed",
    });
  }
}
