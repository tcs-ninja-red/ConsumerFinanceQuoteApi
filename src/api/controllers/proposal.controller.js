const httpStatus = require('http-status');
const quoteModel = require('../models/quote.model');
const pricingCollection = require('../models/pricing.model');
const planCollection = require('../models/plan.model');
const proposalCollection = require('../models/proposal.model');

exports.SubmitProposal = async (req, res, next) => { 
    try {
        console.log('we are on proposal controller - api/v1/proposals api');
        
        let chunk = req.body;
        let proposal_ref_number = "PRP_0001";

        console.log('Request Json Data: ', chunk);
        res.status(httpStatus.CREATED).json({
            "message": "Proposal Created Successfully",
            "proposal_ref_number": proposal_ref_number,
            "status_code": httpStatus.CREATED
        });
    }
    catch (er) {
        next(er);
    }
};