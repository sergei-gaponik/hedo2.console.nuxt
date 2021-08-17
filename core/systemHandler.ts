import { LoadingState } from "~/types"

interface SystemHandlerResponse {
  loadingState: LoadingState
  data?: any
  errors?: string[]
}

interface SystemAPIRequest {
  query: string
  variables?: any
}

export default async function systemHandler(args: SystemAPIRequest | string): Promise<SystemHandlerResponse>{

  try{

    let body: any = {}

    if(typeof args == "string"){
      body.query = args
    }
    else{
      body = args
      
      if(!args.variables)
        body.variables = ""
    }


    const res = await fetch(process.env.SYSTEM_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    if(!res.ok) throw new Error();

    const data = await res.json()

    if(data.errors && data.errors.length)
      throw new Error(data.errors.join(", "))

    return { 
      ...data, 
      loadingState: LoadingState.ready
    }
  }
  catch(e){
    console.log(e)
    return { loadingState: LoadingState.error }
  }

}