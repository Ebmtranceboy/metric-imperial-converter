/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const regExNum = /^((\d+\.?\d*)|(\d+\.?\d*\/\d+\.?\d*))$/;
  const regExLetters = /^l|lbs|km|mi|kg|gal$/i;
  
  this.splitInput = function(input) {
    const num = input.replace(/[a-z]+/i,'');
    const letters = num==""?input:input.split(num)[1];
    return [num, letters];
  }
  
  this.getNum = function(input) {
    const [num, _] = this.splitInput(input);
    if(num == "") return 1;
    if(!regExNum.test(num)) return undefined;
    const k = num.match(regExNum);
    if(k[2]) return Number(k[2]);
    const [nume, deno] = k[3].split(/\//);
    return nume/deno;
  };
  
  this.getUnit = function(input) {
    const [_, letters] = this.splitInput(input);
    if(!letters || !regExLetters.test(letters)) return undefined;
    return letters;
  };
  
  this.getReturnUnit = function(initUnit) {
    if(!initUnit) return undefined;
    return {'gal':'l', 'l':'gal'
            ,'km': 'mi', 'mi': 'km'
            ,'lbs':'kg', 'kg':'lbs'} [initUnit.toLowerCase()]
 };

  this.spellOutUnit = function(unit) {
    if(!unit) return undefined;
    return {'gal': 'gallons'
            ,'l': 'liters'
            ,'km': 'kilometers'
            ,'kg': 'kilograms'
            ,'lbs': 'pounds'
            ,'mi': 'miles'} [unit.toLowerCase()];
   };
  
  this.convert = function(initNum, initUnit) {
    if(!initNum || ! initUnit) return undefined;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    return initNum * {'gal': galToL, 'l': 1/galToL
                      ,'lbs': lbsToKg, 'kg': 1/lbsToKg
                      ,'mi': miToKm, 'km': 1/miToKm} [initUnit.toLowerCase()];
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
