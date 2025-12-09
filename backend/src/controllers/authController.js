import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Session from '../models/Sessions.js'
const ACCESS_TOKEN_TTL = '30m';
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const signUp = async (req,res) => {
    try {
        const { username, password, email, firstname, lastname } = req.body;
        if (!username || !password || !email || !firstname || !lastname) {
            return res
            .status(400)
            .json({
                message : " Không thể thiếu bất kỳ thông tin nào!"
            });
        }

        // kiểm tra User có tồn tại hay chưa
        const duplicate = await User.findOne({username}); 
        if (duplicate) { 
            return res
            .status(409)
            .json({
                message : " Username đã tồn tại, vui lòng nhập username khác!"
            })
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password,10); // salt rounds = 10

        //Tạo user mới
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstname} ${lastname}`
        })

        //return
        return res
        .status(204)
        .json({
            message: "Đăng ký thành công!"
        })
        
    } catch (error) {
        console.error("Lỗi đăng ký tài khoản:", error);
        return res
        .status(500)
        .json({
            message: "Lỗi máy chủ, vui lòng thử lại sau!"
        });
    }
};

export const signIn = async (req, res) => {
    try {
    // lấy input
    const { username, password } = req.body;

    if (!username || !password) {
        return res
        .status(400)
        .json({
            message : " Thiếu username hoặc password!"
        });
    }

    // lấy hashedPassword từ db để so sánh
    const user = await User.findOne({username});

    if (!user) {
        return res.status(401).json({ message: "Sai username hoặc password!" });
    }

    //Kiểm tra password
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
        return res.status(401).json({ message: "Sai username hoặc password!" });
    }
    
    // nếu khớp, tạo accessToken với JWT
    const accessToken = jwt.sign(
        {userId: user._id}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: ACCESS_TOKEN_TTL}
    );

    // Tạo refreshToken
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // Tạo session mới để lưu refreshToken
    await Session.create({
        userId: user._id,
        refreshToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // trả refresh token về trong cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // không thể bị truy cập bởi javascript
            secure: true, // đảm bảo chỉ gửi qua https
            sameSite: 'none', //backend , frontend chạy trên 2 miền khác nhau
            maxAge: REFRESH_TOKEN_TTL,
        })
    // trả accessToken về trong res 
        return res.status(200).json({message: `User ${user.displayName} đã đăng nhập thành công`, accessToken})
    } catch (error) {
        console.error("Lỗi đăng nhập tài khoản:", error);
        return res
        .status(500)
        .json({
            message: "Lỗi máy chủ, vui lòng thử lại sau!"
        });
    }
};

export const signOut = async (req, res) => {
    try{
        // lấy refresh token từ cookie
        const token = req.cookies?.refreshToken; //hoạt động được nhờ cookie-parse

        if(token){
        // xóa refresh token trong session
            await Session.deleteOne({refreshToken: token}) // hủy phiên đăng nhập người dùng 
        // xóa cookie
            res.clearCookie("refreshToken");
        }

        return res.sendStatus(204);
    } catch (error){
        console.error("Lỗi đăng xuất tài khoản:", error);
        return res
        .status(500)
        .json({
            message: "Lỗi máy chủ, vui lòng thử lại sau!"
        });
    }
};

// tạo access token mới từ refresh token
export const refreshToken = async (req, res) => {
  try {
    // lấy refresh token từ cookie
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Token không tồn tại." });
    }

    // so với refresh token trong db
    const session = await Session.findOne({ refreshToken: token });

    if (!session) {
      return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    // kiểm tra hết hạn chưa
    if (session.expiresAt < new Date()) {
      return res.status(403).json({ message: "Token đã hết hạn." });
    }

    // tạo access token mới
    const accessToken = jwt.sign(
      {
        userId: session.userId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // return
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi refreshToken", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};