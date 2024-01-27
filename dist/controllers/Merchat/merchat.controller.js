"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMerchant = exports.newMerchant = void 0;
const index_1 = require("../../prismaClient/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const jwt = __importStar(require("jsonwebtoken"));
const newMerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield index_1.prisma.merchant.findUnique({
            where: { email },
            select: { email: true },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ ok: false, message: "Merchant already exist" });
        }
        const salt = yield bcrypt_1.default.genSalt();
        const hashed_password = yield bcrypt_1.default.hash(password, salt);
        yield index_1.prisma.merchant.create({
            data: { name, email, password: hashed_password },
        });
        return res
            .status(201)
            .json({ ok: true, message: "Merchat Created Successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.newMerchant = newMerchant;
const loginMerchant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingMerchat = yield index_1.prisma.merchant.findUnique({
            where: { email },
            select: { email: true, password: true, id: true, name: true },
        });
        if (!existingMerchat) {
            return res
                .status(400)
                .json({
                ok: false,
                message: "Email not found. Please enter correct Email",
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, existingMerchat.password);
        if (!passwordMatch) {
            return res
                .status(400)
                .json({
                ok: false,
                message: "Wrong Password. Please enter correct password",
            });
        }
        var token = jwt.sign({
            email: existingMerchat.email,
            id: existingMerchat.id,
            role: "merchant",
            name: existingMerchat.name,
        }, process.env.JWTSECRET || "JWT_SECRET", { expiresIn: "1d" });
        res.cookie("token", token);
        return res
            .status(201)
            .json({ ok: true, message: "User Logged Successfully" });
    }
    catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
});
exports.loginMerchant = loginMerchant;
