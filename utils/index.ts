import { manufacturers } from "@/constants";
import { CarProps, FilterProps } from "@/types";
export async function  fetchCars (filters:FilterProps) {
    const {manufacturer,year,model,fuel,limit}= filters
    const headers={
        'X-RapidAPI-Key': 'e44580ec38msh1401f40132efe55p19075ejsndd8e5a11d88f',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const response = await fetch (`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
        headers:headers,
    });

    const result = await response.json();
    return result;
   
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

export const generateCarImageUrl = (car:CarProps,angle?:string) =>{
    
    const uri = new URL("https://cdn.imagin.studio/getimage");
    
    const { make, year, model } = car;

    uri.searchParams.append("customer","pksaadnaseercompany");
    uri.searchParams.append("make", make);
    uri.searchParams.append( "modelFamily", model.split(" ")[0]);
    uri.searchParams.append("zoomType", "fullscreen");
    uri.searchParams.append("modelYear", `${year}`);
    uri.searchParams.append("angle", `${angle}`);
    
    return `${uri}`;
     
  }
  export const updateSearchParams = (type: string, value: string ) => {

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type,value)

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    return newPathName
  }