const express = require('express');
//const eurekaClient = require('eureka-js-client');
//const eureka = eurekaClient.Eureka
const {Eureka} = require('eureka-js-client');
const e = require("express");

const app = express();
const port = 3000;

const router = express.Router();
router.get('/inventory', (req, res) => {
    res.json({
        items: ['apple', 'banana', 'orange'],
        massage: 'This is the inventory service'
    });
});

//application context path
app.use('/inventory-service', router);

// Eureka Client Configuration
const eurekaClient = new Eureka({
    instance: {
        instanceId: "inventory-service",
        app: "INVENTORY-SERVICE",
        hostName: "localhost",
        ipAddr: "127.0.0.1",
        port: {
            $: port,   // Ensure it matches app's running port
            "@enabled": true,
        },
        vipAddress: "inventory-service",
        dataCenterInfo: {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: "MyOwn",
        },
    },
    eureka: {
        host: "localhost",
        port: 8761,
        servicePath: "/eureka/apps/",  // Corrected service path
    },
});
app.listen(port, () => {
    console.log(`Inventory service is running on port ${port}`);
    eurekaClient.start((error)=>{
        if (error) {
            console.log("failed to register with eureka", error);
        }else {
            console.log("successfully registered with eureka");
        }
    });
})