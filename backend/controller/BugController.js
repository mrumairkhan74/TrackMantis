const Bug = require('../models/BugModel');
const User = require('../models/UserModel');
const cloudinary = require('../utils/Cloudinary');
const { Readable } = require('stream');

const uploadImageToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'TrackingMantisBug/Bug',
                resource_type: 'image'
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        bufferStream.pipe(stream);
    });
};
const uploadFileToCloudinary = (fileBuffer, originalname) => {
    return new Promise((resolve, reject) => {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'raw',
                folder: `TrackingMantisBug/Bug/Files/${Date.now()}_${originalname}`,
                public_id: originalname.split('.').slice(0, -1).join('') // name without extension
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        bufferStream.pipe(stream);
    });
};

const createBug = async (req, res) => {
    try {
        const {
            bugTitle, project, priority, severity,
            bugType, description, operatingSystem,
            browser, device, additionalInfo
        } = req.body;

        const userId = req.user._id;
        const user = await User.findById(userId).select("name");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userName = user.name;

        if (!req.files || (req.files.screenShot?.length === 0 && req.files.documentFiles?.length === 0)) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        // Upload all files to Cloudinary
        const screenShots = [];
        const documentFiles = [];

        // Upload screenshots
        if (req.files.screenShot) {
            for (const file of req.files.screenShot) {
                const uploadedImage = await uploadImageToCloudinary(file.buffer);
                screenShots.push({
                    url: uploadedImage.secure_url,
                    public_id: uploadedImage.public_id
                });
            }
        }

        // Upload document files
        if (req.files.documentFiles) {
            for (const file of req.files.documentFiles) {
                const uploadedFile = await uploadFileToCloudinary(file.buffer, file.originalname)
                documentFiles.push({
                    url: uploadedFile.secure_url,
                    public_id: uploadedFile.public_id,
                    fileName: file.originalname
                });
            }
        }


        const bug = await Bug.create({
            bugTitle,
            project,
            priority,
            severity,
            bugType,
            description,
            operatingSystem,
            browser,
            device,
            additionalInfo,
            status: 'open',
            screenShots, // plural field
            documentFiles, // plural field
            createdBy: { userId, userName }
        });

        await User.findByIdAndUpdate(userId, {
            $push: { Bugs: bug._id }
        });

        return res.status(201).json({ message: "Bug uploaded successfully", bug });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Controller
const getBug = async (req, res) => {
    try {
        const bugs = await Bug.find()
            .populate('createdBy', 'userName') // populate userName only
            .sort({ createdAt: -1 });

        if (bugs.length === 0) {
            return res.status(404).json({ error: "No Bug Available" });
        }

        const formattedBugs = bugs.map(bug => ({
            _id: bug._id,
            bugTitle: bug.bugTitle,
            createdBy: bug.createdBy?.userName || "Unknown User", // safe access
            userId: bug.createdBy?._id || null,
            createdAt: (bug.createdAt),
            priority: bug.priority,
            severity: bug.severity,
            screenShots: bug.screenShots,
            documentFiles: bug.documentFiles,
            description: bug.description,
            project: bug.project,
            operatingSystem: bug.operatingSystem,
            browser: bug.browser,
            device: bug.device,
            status: bug.status,
            additionalInfo: bug.additionalInfo,
            bugType: bug.bugType,
        }));

        res.status(200).json({
            message: "Bug details below",
            bugs: formattedBugs
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getBugById = async (req, res) => {
    try {
        const { id } = req.params;
        const bug = await Bug.findById(id);

        if (!bug) {
            console.log("No bug found");
            return res.status(404).json({ message: 'Bug not found' });
        }

        return res.status(200).json({ bug });
    } catch (error) {
        console.error("Error in getBugById:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
};




const getBugByUserId = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find all bugs created by this user
        const bugs = await Bug.find({ 'createdBy.userId': userId }).sort({ createdAt: -1 });

        if (bugs.length === 0) {
            return res.status(404).json({ error: "No bugs you reported" });
        }

        const formattedBugs = bugs.map(bug => ({
            _id: bug._id,
            bugTitle: bug.bugTitle,
            createdBy: bug.createdBy.userName,
            userId: bug.createdBy.userId,
            timeAgo: timeSince(bug.createdAt),
            priority: bug.priority,
            severity: bug.severity,
            screenShots: bug.screenShots,
            documentFiles: bug.documentFiles,
            description: bug.description,
            project: bug.project,
            status: bug.status,
            operatingSystem: bug.operatingSystem,
            browser: bug.browser,
            device: bug.device,
            additionalInfo: bug.additionalInfo,
            bugType: bug.bugType
        }));

        return res.status(200).json({
            message: 'Your uploaded bugs',
            bugs: formattedBugs
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


function timeSince(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);

    if (days > 0) {
        return `${days} day(s) ago`;
    } else if (hours > 0) {
        return `${hours} hour(s) ago`;
    } else {
        return `just now`;
    }
}


const updateBugStatus = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        // 1. First verify the bug exists and belongs to this user
        const bug = await Bug.findOne({
            _id: id,
            'createdBy.userId': userId
        });

        if (!bug) {
            return res.status(404).json({
                error: "Bug not found or you don't have permission"
            });
        }

        // 2. Update the bug
        const updatedBug = await Bug.findByIdAndUpdate(
            id, // Just pass the ID string directly
            req.body,
            {
                new: true // Ensures updates follow schema rules
            }
        );

        return res.status(200).json({
            message: "Bug Updated Successfully",
            bug: updatedBug
        });

    } catch (error) {
        console.error('Update error:', error);
        return res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
}



const DeleteBugByUser = async (req, res) => {
    try {
        const { id: userId, bugId } = req.params;

        const bug = await Bug.findById(bugId);

        if (!bug) {
            return res.status(404).json({ error: "Bug not found" });
        }

        if (!bug.createdBy || !bug.createdBy.userId) {
            return res.status(403).json({ error: "Invalid bug ownership data" });
        }

        if (bug.createdBy.userId.toString() !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this bug" });
        }

        await Bug.findByIdAndDelete(bugId);

        return res.status(200).json({
            message: 'Your bug has been deleted successfully',
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



module.exports = { createBug, getBugById, getBug, getBugByUserId, updateBugStatus, DeleteBugByUser };
