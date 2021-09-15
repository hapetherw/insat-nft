export default class Helpers {

  static convertImageURL(url) {
    return `https://gateway.ipfs.io/ipfs/${url}`;
  }
  
  static logstream(log) {
    const logElement = document.getElementById('log');
  
    logElement
        ? logElement.innerText = log
        : console.log(log);
  }

  static createAsyncOperation(operation) {
    return new Promise(async (resolve, reject) => {

        try {

            operation(resolve, reject);

        } catch (error) {
            reject(new Error(error));
            console.log(error);
        }
    });
  }

  static fetchEthToUsd() {
    return new Promise(function(resolve, reject) {
      try {
        const apiUrl = `https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT`;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            resolve(data)
          });
      } catch (ex) {
        return reject();
      }
    })
  }

  static calculateActualPrice(eth, ethPrice, fee) {
    let actualEth = eth * (1 - fee);
    let actualEthUSD = actualEth * ethPrice;
    return { actualEth, actualEthUSD };
  }

  static checkShortCodeInGroup(shortCode, array) {
    for(let i=0; i<array.length; i++) {
      if(array[i].shortcode === shortCode) {
        return true;
      }
    }
    return false;
  }

  static getPassedTime(time) {
    if(!time) return "";
    let returnTime = "";
    let offerTimestamp = new Date(time).getTime();
    let currentTimestamp = new Date().getTime();
    let diff = Number((currentTimestamp - offerTimestamp) / 1000);
    if(diff<60) return "Just Now";
    const day = parseInt(diff / (3600*24));
    if(day>0) {
      returnTime= returnTime + day.toString() + "Days "; 
    }
    const dayRest = parseInt(diff % (3600*24));
    const hr = parseInt(dayRest / 3600);
    if(hr>0) {
      returnTime= returnTime + hr + "Hours ";
    } 
    if(day>0) return returnTime + ' ago';
    let remainSecs = dayRest % 3600;
    const min = parseInt(remainSecs / 60);
    if(min>0) returnTime = returnTime + min + "Mins";
    return returnTime + ' ago';
  }
}
