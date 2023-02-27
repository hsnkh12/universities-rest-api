const express = require("express")
const router = express.Router();
const University = require("../models/university")
const {getFilterQuery} = require("../utils/filters")


const SAMPLE_BODY = {

    filter: {

        fees: {

            local_undergraduate_range: [100,1000],
            local_postgraduate_range: null,
            inter_undergraduate_range:[100,1000],
            inter_undergraduate_range:null

        },

        studies: [ 
            {
                field: 'arts',
                degrees: ['B','M','D']
            },
            {
                field: 'business',
                degrees: ['B','M','D']
            }
        ]

    },
    sort: {
        local_rank: 1
    }
}


// 13,292 of universities 

router.get('/unis/', async (req, res) => {

    try{
        const filter = getFilterQuery(SAMPLE_BODY,req.query)
        const unis = await University.findUnisByFilter(filter)
        
        console.log(unis)
        console.log(filter.query)
        return res.json({})

    }
    catch (err){
        console.log(err)
    }
})

router.get("/unis/:uniName", async (req, res) => {

    try{

        const uniName = req.params.uniName;
        const uni = await University.findUniByName(uniName)

        return res.json(uni)
    }
    catch(err){
        console.log(err)
    }

    
})


module.exports = { APIRoutes: router}