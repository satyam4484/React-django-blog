
const url="http://127.0.0.1:8000/api/";

const useRequest = ()=>{

    const sendRequest = async (requestConfig,successHandler,errorhandler)=> {
        try{
            const response = await fetch(`${url}${requestConfig.url}`,{
                method:requestConfig.method?requestConfig.method:"GET",
                headers:requestConfig.headers?requestConfig.headers:{
                    "Content-Type": "multipart/form-data",
                    "Content-Type": "application/json",
                  },
                body:requestConfig.body?requestConfig.body:null
            });
            // if(!response.ok) {
            //     throw new Error("Request Failed");
            // }
            const data = await response.json();
            successHandler(data);

        }catch(error) {
            errorhandler(error);
        }
    };
    return {
        sendRequest
    };
};

export default useRequest;