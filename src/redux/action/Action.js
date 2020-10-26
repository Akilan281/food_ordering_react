export const HOME_LIST = 'home_list';
export const LOADER = 'loader'


export function homeData(data){
 return{
    type:HOME_LIST,
    payload:data
 }


}
export const loaderAction = (data) => {
   console.log('loaderAction')
   return {
       type: LOADER,
       payload: data
   }
}

