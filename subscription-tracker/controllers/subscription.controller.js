import Subscription from '../models/subscription.models.js';
import { SERVER_URL } from '../config/env.js';
import { workflowClient } from '../config/upstash.js';

const buildWorkflowUrl = (req) => {
    const configuredBaseUrl = SERVER_URL?.trim();
    const forwardedProto = req.get('x-forwarded-proto') || req.protocol;
    const host = req.get('host');

    if (configuredBaseUrl && !configuredBaseUrl.includes('localhost') && !configuredBaseUrl.includes('127.0.0.1')) {
        return `${configuredBaseUrl.replace(/\/$/, '')}/api/v1/workflows/subscription/reminder`;
    }

    return `${forwardedProto}://${host}/api/v1/workflows/subscription/reminder`;
};

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const workflowUrl = buildWorkflowUrl(req);

        try {
            const triggerResponse = await workflowClient.trigger({
                url: workflowUrl,
                body: {
                    subscriptionID: subscription._id.toString(),
                },
            });

            console.log('Workflow trigger response:', triggerResponse);
            console.log('Workflow run ID:', triggerResponse?.workflowRunId);
        } catch (workflowError) {
            console.error('Workflow trigger failed:', workflowError?.message || workflowError);
        }

        res.status(201).json({success: true, data: subscription});

    } catch(e){
        next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        // Check if the user is the same as the one in the token 
        if(req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }


        const subscriptions = await Subscription.find({user: req.params.id});
        res.status(200).json({success: true, data: subscriptions});

    } catch(e){
        next(e);
    }
}