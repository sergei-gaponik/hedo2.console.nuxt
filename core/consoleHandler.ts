import { LoadingState } from "~/types"

interface ConsoleHandlerResponse {
  loadingState: LoadingState
  data?: any
  errors?: string[]
}

interface ConsoleAPIRequest {
  path: string
  args?: any
}

export default async function consoleHandler(body: ConsoleAPIRequest): Promise<ConsoleHandlerResponse>{

  try{
    const res = await fetch(`${process.env.CONSOLE_API_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CONSOLE_API_SECRET_KEY}`
      }
    })

    if(!res.ok) throw new Error();

    const data = await res.json()

    console.log(data)

    if(data.errors && data.errors.length)
      throw new Error(data.errors.join(", "))

    return { 
      ...data, 
      loadingState: LoadingState.ready
    }
  }
  catch(e){
    return { loadingState: LoadingState.error }
  }

}