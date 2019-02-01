const cleanNullArgs = (args: any):any => {
    const notNull = {};
    Object.keys(args).forEach(key=>{
        if(args[key] !== null){
            notNull[key] = args[key];
        }
    })
    
    return notNull;
}

export default cleanNullArgs;