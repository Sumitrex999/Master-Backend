import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be a positive number'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR'], // Add more currencies as needed
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['Entertainment', 'Productivity', 'Health', 'Education', 'sports', 'news', 'politics', 'technology', 'Other'], // Add more categories as needed
        required: [true, 'Subscription category is required'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default:'active',
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past or present',
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function(value){
                return value > this.startDate;
            },
            message: 'renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {timestamps: true});

// auto-calculate renewalDate based on frequency and startDate
subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

    }
    // auto - update status if renewalDate has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;