const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "zbfjkyqf87xdp4s9",
  publicKey: "853thk2mhvrxspdj",
  privateKey: "4725c3d85912fe901f8cba1b49a4aeff"
});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({} , function(err ,response) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    })
}
 

exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce ;

    let amountFromTheClient = req.body.amount ;
    gateway.transaction.sale(
        {
            amount: amountFromTheClient ,
            paymentMethodNonce : nonceFromTheClient ,
            
            options : {
                    submitForSettlement : true
            }
        },
        function(err ,result) {
            if(err) {
                res.status(500).json(err)
            } else {
                res.send(result);
            }
        }
    )
    
}