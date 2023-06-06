const queue = require("../config/kue");
// Start Redis Server to use queue

const passwordUpdateMailer = require("../mailers/passwordUpdateMailer");

queue.process("emails", function(job, done){
    console.log("Emails worker is processing a job", job.data);

    passwordUpdateMailer.passwordUpdated(job.data);

    done();
})