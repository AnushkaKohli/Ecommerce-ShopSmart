class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        //queryStr is the string of queries in the URL 
        this.queryStr = queryStr;
    };

    search () {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options: "i", //this means finding feature is case insensitive
            }
        } : {};

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        // const queryCopy = this.queryStr //this will only make a reference variable called queryCopy of queryStr so whenever queryCopy is changed, queryStr will also change and we dont want that
        const queryCopy = {...this.queryStr}; //this results in the actual copy of queryStr
        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        
        removeFields.forEach((key) => {
            delete queryCopy[key]
        });

        //Filter for price and rating
        //queryCopy is an object so we are converting it to string
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        //Converting it back to an object
        this.query = this.query.find(JSON.parse(queryStr));
        // this.query = this.query.find(queryCopy); -- for category
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        //if we are on second page then skip = 10 * (2-1) = 10 so 10 products from the start are skipped and the product is shown from 11th page
        const skip = resultPerPage * (currentPage-1);
        this.query.limit(resultPerPage).skip(skip); 
        return this;
    }
};

module.exports = ApiFeatures;