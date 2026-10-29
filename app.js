import express from "express";
import { uploadSimple, uploadWithFeatures } from "./utils/multermiddleware.js";
import dotenv from "dotenv"
dotenv.config()
import { sendWelcomeEmail } from "./resend.js";

const app = express()
app.use(express.json())

app.get("/health", (req, res) => {
    res.status(200).json({
        "msg": "This API is up and running"
    })
})

app.post("/register", async (req, res) => {
    try {
        const { name, email } = req.body
        const data = await sendWelcomeEmail(email, name);

        res.status(200).json({
            message: "Registered successfully. Welcome email sent!",
            data
        });

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: "Internal Server Error" })
    }
})
app.post("/upload-simple", uploadSimple.single("screenshot"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                "msg": "No file uploaded"
            })
        }

        console.log(req.file);
        res.status(200).json({
            "msg": "file uploaded successfully", file: req.file
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg": "internal server error"
        })
    }
})

app.post("/upload-multiple", uploadSimple.array("screenshots", 3), async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                "msg": "No file uploaded"
            })
        }

        console.log(req.files);
        res.status(200).json({
            "msg": "file uploaded successfully", files: req.files
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg": "internal server error"
        })
    }
})

app.post("/feature-single", uploadWithFeatures.single("screenshot"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                "msg": "No file uploaded"
            })
        }
        console.log(req.file);
        res.status(200).json({
            "msg": "file uploaded successfully", file: req.file
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg": "internal server error"
        })
    }
})

app.post("/feature-multi", uploadWithFeatures.array("screenshots", 3), async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                "msg": "No files uploaded"
            })
        }

        console.log(req.files);
        res.status(200).json({
            "msg": "file uploaded successfully", files: req.files
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "msg": "internal server error"
        })
    }
})

app.listen(5000, () => {
    console.log("server is running on port 5000");

})