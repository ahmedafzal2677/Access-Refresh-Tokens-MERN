var fetch = require('node-fetch');

fetch('https://api-m.sandbox.paypal.com/v1/billing/plans', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer access_token6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn3paCgRpdeMdVYmWzgbKSsECednupJ3Zx5Xd-g',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PayPal-Request-Id': 'PLAN-18062019-001',
        'Prefer': 'return=representation'
    },
    body: JSON.stringify({ "product_id": "PROD-XXCD1234QWER65782", "name": "Video Streaming Service Plan", "description": "Video Streaming Service basic plan", "status": "ACTIVE", "billing_cycles": [ 
        { "frequency": { "interval_unit": "MONTH", "interval_count": 1 }, "tenure_type": "TRIAL", "sequence": 1, "total_cycles": 2, "pricing_scheme": { "fixed_price": { "value": "3", "currency_code": "USD" } } }, 
        
        { "frequency": { "interval_unit": "MONTH", "interval_count": 1 }, "tenure_type": "TRIAL", "sequence": 2, "total_cycles": 3, "pricing_scheme": { "fixed_price": { "value": "6", "currency_code": "USD" } } },
        
        { "frequency": { "interval_unit": "MONTH", "interval_count": 1 }, "tenure_type": "REGULAR", "sequence": 3, "total_cycles": 12, "pricing_scheme": { "fixed_price": { "value": "10", "currency_code": "USD" } } } ],
        
        "payment_preferences": { "auto_bill_outstanding": true, "setup_fee": { "value": "10", "currency_code": "USD" }, "setup_fee_failure_action": "CONTINUE", "payment_failure_threshold": 3 }, "taxes": { "percentage": "10", "inclusive": false } })
});
