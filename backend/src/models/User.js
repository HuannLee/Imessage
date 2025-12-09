import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    avatarUrl: {
        type: String, //link CDN để hiển thị hình
    },
    avatarID: {
        type: String, //Cloudinary public_id để xóa hình
    },
    bio: {
        type: String,
        maxlength: 160,
    },
    phone: {
        type: String,
        sparse: true, //cho phép null , nhưng không được trùng
    }

}, {
    timestamps: true //tự động thêm createdAt và updatedAt
}
);
const User = mongoose.model('User', userSchema); //tạo model từ schema
export default User; //export model để sử dụng ở nơi khác