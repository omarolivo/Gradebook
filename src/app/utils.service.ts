import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  isNumeric(str: any) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }
  
  isEmpty(str: any)  {
    switch (str) {
      case "":
      case null:
      case false:
      case typeof str === "undefined": return true;
      default: return false;
    }
  }
}
