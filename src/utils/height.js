const getHeightInFt = (heightInNumber)=>{
  return Number(Number(heightInNumber)/30.48).toFixed(1) + 'ft'
}
export {getHeightInFt}