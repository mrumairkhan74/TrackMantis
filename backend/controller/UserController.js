const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel');
const { Readable } = require('stream');
const Cloudinary = require('../utils/Cloudinary');



const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(409).json({ error: "User Conflict" })
        }
        if (!req.file) {
            return res.status(404).json({ error: "Image not Uploaded" })
        }

        const bufferStream = new Readable();
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);

        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = Cloudinary.uploader.upload_stream({
                    folder: 'TrackMantisBug/User',
                    resource_type: 'image',
                },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                bufferStream.pipe(stream)
            })
        };
        const cloudinaryResult = await streamUpload();

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            image: {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id
            }

        })
        const token = jwt.sign({
            _id: user._id,
            image: {
                public_id: user.image?.public_id || "",
                url: user.image?.url || ""
            },

            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })

        // In your loginUser and createUser functions, update cookie settings:
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Enable in production
            sameSite: 'strict',
            maxAge: 30 * 60 * 1000, // 30 minutes to match JWT expiration
            path: '/',
        });

        return res.status(200).json({
            message: "User Created successfully", user: {
                _id: user._id,
                image: {
                    public_id: user.image?.public_id || "",
                    url: user.image?.url || ""
                },

                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}




const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "User Doesn't Exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect Password" })
        }
        const token = jwt.sign({
            _id: user._id,
            image: {
                public_id: user.image?.public_id || "",
                url: user.image?.url || ""
            },

            name: user.name,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '30m' })

        // In your loginUser and createUser functions, update cookie settings:
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Enable in production
            sameSite: 'strict',
            maxAge: 30 * 60 * 1000, // 30 minutes to match JWT expiration
            path: '/',
        });

        return res.status(200).json({
            message: "Login Successfully", user: {
                _id: user._id,
                image: {
                    public_id: user.image?.public_id || "",
                    url: user.image?.url || ""
                },

                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getUser = async (req, res) => {
    try {
        const users = await User.find().populate('Bugs');

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }

        return res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ error: 'User not Found' })
        }
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateUser = req.body;

        // If image is uploaded, handle cloudinary stream upload
        if (req.file && req.file.buffer) {
            const bufferStream = new Readable();
            bufferStream.push(req.file.buffer);
            bufferStream.push(null);

            const streamUpload = () => {
                return new Promise((resolve, reject) => {
                    const stream = Cloudinary.uploader.upload_stream({
                        folder: 'TrackMantisBug/User',
                        resource_type: 'image',
                    },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    bufferStream.pipe(stream);
                });
            };

            const cloudinaryResult = await streamUpload();

            updateUser.image = {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id
            };
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateUser, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User Not Found' });
        }

        return res.status(200).json({
            message: "Updated Successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.image?.url,
                role: updatedUser.role
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const DeleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;


        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ error: 'User Not Found' });
        }

        return res.status(200).json({
            message: "Deleted Successfully",

        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        // If you have admin tokens or other cookies
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const UpdateUserRole = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. First verify the bug exists and belongs to this user
        const user = await User.findOne({
            _id: id
        });

        if (!user) {
            return res.status(404).json({
                error: "User Invalid"
            });
        }

        // 2. Update the bug
        const UpdateRole = await User.findByIdAndUpdate(
            id, // Just pass the ID string directly
            req.body,
            {
                new: true // Ensures updates follow schema rules
            }
        );

        return res.status(200).json({
            message: "Bug Updated Successfully",
            user: UpdateRole
        });

    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    getUserById,
    updateUserById,
    logoutUser,
    DeleteUserById,
    UpdateUserRole
}