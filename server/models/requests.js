const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    request_subject: {
        type: String,
    },
    
    reason: {
        type: String
    },
    
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee" }
    ,
   
    request_status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: "pending"
    },

    startDate:{ type: Date  },
    
    endDate: { type: Date },

   }, {timestamps: true})


const requestModel = mongoose.model("request", requestSchema);

module.exports = requestModel