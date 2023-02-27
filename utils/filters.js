


// host.com/api/unis/?country=&state=&page= (Advanced filter in body)

// {'detail.studies.arts': { B: true, M: true, D: true } }

const getFilterQuery = (body,queryParams) => {
    

    let page = 1
    let sort = {
        local_rank : 1
    }
    let query = {}

    page = queryParams.page != undefined? queryParams.page : 1

    if (body.sort){
        sort = body.sort
    }

    if (queryParams.country == undefined){
        throw Error("Country must be provided in query parameters")
    }

    query.country = {$regex: queryParams.country}

    if(queryParams.state != undefined){
        query.state = {$regex: queryParams.state}
    }
    
    if( body.filter.studies == undefined ){

        return {
            page:page,
            query:query,
            sort:sort
        }
    }
    
    const studies = getStudiesQuery(body.filter.studies)


    query = {...query,...studies}

    return {
        page:page,
        query:query,
        sort:sort
    }

    
}


const getStudiesQuery = (filterStudies) => {


    let studies = {}

    for ( let i =0; i < filterStudies.length; i++ ){

        const studyField =  "detail.studies."+filterStudies[i].field
        const degrees = filterStudies[i].degrees
        const studyDegrees = {'B':false, 'M':false, 'D':false}
        
        if (studies[studyField] != undefined){
            continue
        }

        studies[studyField] = studyDegrees


        for ( let j =0; j < degrees.length; j++ ){

            if ( studies[studyField][degrees[j]] == undefined){
                continue
            }
            studies[studyField][degrees[j]] = true
        }
    }

    return studies
}


// const query = getFilterQuery({ country: "Cyprus", state: "Magusa"})
// console.log(query.query.detail)


module.exports = {
    getFilterQuery
}