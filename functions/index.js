const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret); 

admin.initializeApp();

// Create a Stripe customer upon user sign-up
exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
    const customer = await stripe.customers.create({
        email: user.email,
    });
    console.log('creating stripe customer upon sign up and creating firebase doc', customer)
    // Save Stripe customer ID to Firestore
    return admin.firestore().collection('stripeCustomers').doc(user.uid).set({
        stripeCustomerId: customer.id,
        email: user.email,
    });
});


exports.stripeWebhook = functions.runWith({
    minInstances: 1, 
  }).https.onRequest(async (req, res) => {
    console.log('stripe webhook');
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, functions.config().stripe.webhook_secret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const subscription = event.data.object;

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created' || event.type === 'customer.subscription.deleted') {
        const customerId = subscription.customer;
        const userSnapshot = await admin.firestore().collection('stripeCustomers').where('stripeCustomerId', '==', customerId).limit(1).get();

        if (!userSnapshot.empty) {
            const userId = userSnapshot.docs[0].id;
            await admin.firestore().collection('stripeCustomers').doc(userId).update({
                subscriptionStatus: subscription.status,
            });
        }
    }

    res.json({ received: true });
});


exports.createCheckoutSession = functions.runWith({
    minInstances: 1, 
  }).https.onCall(async (data, context) => {
    const userId = context.auth.uid;

    const userDoc = await admin.firestore().collection('stripeCustomers').doc(userId).get();
    const customerId = userDoc.data().stripeCustomerId;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        customer: customerId,
        line_items: [
            {
                price: data.priceId,
                quantity: 1,
            },
        ],
        success_url: 'https://exprlabs.com',
        cancel_url: 'https://exprlabs.com',
    });

    return { id: session.id };
});

