const {doSomeHeavyTask} = require('./util')
const express = require('express')
const responseTime = require('response-time')
const app = express();
const client = require('prom-client') //Metric Collection
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
// we are useing loki to show datalogs
const options = {
  transports: [
    new LokiTransport({
        labels:{
            appName : "express"
        },
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics; //we will take one function form collect default matrics
// collect default matrics will collect matrics like ram , memory etc..
collectDefaultMetrics({register:client.register})

// create a custom matrics to check latency
const reqResTime = new client.Histogram({
    name:"http_express_req_res_time",
    help:"This tells how much time is taken by req and res",
    labelNames:["method","route","status_code"],
    buckets:[1,50,100,200,400,500,800,1000,2000] // if anything goes beyond 2000 that means its very slow
})

// create a custom matrices to check how many request are comming onto the server
const totalReqCounter = new client.Counter({
    name:"total_req",
    help:"Tells total req"
})

// this will say us how much time each request is taking
app.use(responseTime((req,res,time)=>{
    totalReqCounter.inc();
    reqResTime.labels({
        method:req.method,
        route:req.url,
        status_code:req.statusCode
    }).observe(time)  //record what time we have taken
}))

app.get('/',(req,res)=>{
    logger.info('Req came on / router')
    res.send("Home")
})

app.get('/slow',async(req,res)=>{
    try{
        logger.info('Req came on /slow router')
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status:"Success",
            message:`Heavy task completed in ${timeTaken}`
        });

    }catch(err){
        logger.error(err.message)
        return res.status(500).json({status:"Error",error:"Internal server Error"});
    }
})

// collect the metrics recorded by collectDefault metrics to the /metrics route
app.get('/metrics',async(req,res)=>{
    res.setHeader('Content-Type',client.register.contentType)
    const metrics = await client.register.metrics();
    res.send(metrics)
})

app.listen(PORT,()=>{
    console.log(`Express Server Started at http://localhost:${PORT}`)
})