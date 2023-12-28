import { pageIdValues } from "../Types/CommonTypes";
import { convertDip20_init } from "../../Pages/ConvertDip20";



function init_javascript_code(tagValue){


        switch(tagValue)
        {
            case pageIdValues.PageConvertSliDip20:{
                convertDip20_init();
            };
            break;
            default:
                break;
        }
}

export async function DynamicPageContentLoad(tagName, tagValueToSearch) {
    var z, i, elmnt, file, xhttp; 
    z = document.getElementsByTagName("div");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      let pageIdValue = elmnt.getAttribute(tagName)
      if (!pageIdValue){
        continue;
      }
      if (pageIdValue != tagValueToSearch){
        elmnt.innerHTML = "";
        continue;
      };
  
      let htmlSource = elmnt.getAttribute("html-source");
      if (!htmlSource){
        continue;
      }
     
      /* Make an HTTP request using the attribute value as the file name: */
      
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;            
            init_javascript_code(tagValueToSearch);            
          }
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}          
        }
      }
      xhttp.open("GET", htmlSource, true);
      xhttp.send();          
      return;    
    }
  }