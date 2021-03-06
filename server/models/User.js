const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nanoid = require("nanoid");

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(value) {
                if (!this.isModified('username')) return true;

                const user = await User.findOne({username: value});
                if (user) throw new Error('This user is already registered');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value.length >= 6;
            },
            message: "Password should be longer",
        }
    },
    displayName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\+?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})[-]?([0-9]{3})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    token: {
        type: String,
        required: true
    }
});

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;