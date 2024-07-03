const filterObj = (obj,...allowedFields)=>{
    try {
        const newObj = {};

    Object.keys(obj).forEach((val)=>{
      
        if(allowedFields.includes(val)){
        newObj[val]= obj[val];
        }
        
    })
    return newObj;
    } catch (error) {
        console.log(error.message);
    }
console.log(newObj)
    
}

module.exports = filterObj;