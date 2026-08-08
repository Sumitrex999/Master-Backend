import dayjs from 'dayjs';


import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');
import Subscription from '../models/subscription.models.js';


const REMINDERS = [7, 5, 2, 1]; // Days before renewal to send reminders

export const sendReminders = serve(async(context) => {
    const payload = typeof context.requestPayload === 'string'
        ? JSON.parse(context.requestPayload)
        : context.requestPayload;

    const {subscriptionID} = payload ?? {};

    if(!subscriptionID) {
        console.log('No subscription ID provided in workflow payload.');
        return;
    }

    const subscription = await fetchSubscription(context, subscriptionID);

    if(!subscription || subscription.status !== 'active') return;
    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionID}. Stopping workflow.`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        //  renewal date = 22 feb, reminder date = 15 feb, 17, 20, 21

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }

});

const fetchSubscription = async (context, subscriptionID) => {
    return await context.run('get subscription', async () => {
        return await Subscription.findById(subscriptionID)
            .populate('user', 'name email')
            .lean();
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} remainder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () =>{
        console.log(`Triggering ${label} reminder`); 
        // Send email , SMS, push notification, etc. to the user
    })
}