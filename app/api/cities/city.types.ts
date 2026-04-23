export interface City {
    _id: string;
    name: string;
    startTime: string;
    endTime: string;
    address: string;
    zipCode: string;
    directionLink: string;
  }
  
  export interface TransformCity {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    address: string;
    zipCode: string;
    directionLink: string;
  }
  
  export interface TransformCityForFilters {
    data: TransformCity[];
    count: number;
  }
  
  export interface getAllCitiesType {
    searchValue: string;
    pageNo: number;
    recordPerPage: string;
  }
  