import React from "react";
import "./Policies.css";

function RefundPolicy() {
    return (
        <div className="policies">
            <h1>Refund policy</h1>
                <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.</p>
                <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. 
                   You'll also need the receipt or proof of purchase.
                </p>
            <h3>Damages and issues</h3>
                <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>
            <h3>Exchanges</h3>
                <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>
            <h3>Refunds</h3>
                <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
            <h3>Customs and import charges</h3>
                <p>As a buyer, it’s your responsibility to check which customs and import charges may apply, and to pay them. We might be able to give you some information about import charges, but before you buy an item, it's a good idea to check with your country's customs office for more specific details.</p>
        </div>
    )
}

export default RefundPolicy;