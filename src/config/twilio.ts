import Twilio from "twilio";

const account_SID = "AC9a412c5765f1f37b7c7929854b0c355a";
const auth_Token = "4a89dd97c994accfecf61ad6d18b0ca7";

export const twilio = Twilio(account_SID,auth_Token);
export const twilioConfig = {from: "+12294514129"}