import mongoose from "mongoose";
import crypto from "crypto";

const postSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    video: {
        type: String,
    },
    desc: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Units',
        required: true,
    },
},
    { timestamps: true }
);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpire: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

userSchema.methods.getVerificationToken = function () {
    const verificationToken = crypto.randomBytes(20).toString('hex');

    this.verifyToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

    return verificationToken;
};

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subjects',
        required: true,
    },
});

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export const Posts = mongoose.models.Posts || mongoose.model('Posts', postSchema);
export const Users = mongoose.models.Users || mongoose.model('Users', userSchema);
export const Units = mongoose.models.Units || mongoose.model('Units', unitSchema);
export const Subjects = mongoose.models.Subjects || mongoose.model('Subjects', subjectSchema);
