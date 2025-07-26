const mongoose = require('mongoose')


const bugSchema = mongoose.Schema({
    bugTitle: {
        type: String,
        required: true
    },
    project: {
        type: String,
        enum: ['WebsiteRedesign', 'MobileApp', 'ApiServices', 'AdminDashboard'],
        required: true
    },
    priority: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low'],
        required: true
    },
    severity: {
        type: String,
        enum: ['Blocker', 'Major', 'Minor', 'Cosmetic'],
        required: true
    },
    bugType: {
        type: String,
        enum: ['Functional', 'Visual', 'Performance', 'Security'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    screenShots: [  // 🔁 changed from singular object to array of objects
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
        }
    ],
    documentFiles: [  // 🔁 changed from singular object to array of objects
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            },
            fileName: String  
        }
    ],
    operatingSystem: {
        type: String,
        enum: ['Window', 'MacOS', 'Linux', 'Android', 'iOS'],
        required: true
    },
    browser: {
        type: String,
        enum: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'],
        required: true,
    },
    device: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
    },
    status: {
        type: String,
        enum: ['open', "inProgress", "closed"],
        default: 'open'
    },
    createdBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        userName: {
            type: String
        }
    }, comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, { timestamps: true })



const Bug = mongoose.model('Bug', bugSchema);


module.exports = Bug