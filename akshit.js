const API_KEY1 = import.meta.env.VITE_API_KEY;

const butt=document.getElementById("Searchbttn");
const userinput=document.getElementById("Cityin")

const cityName=document.getElementById('cityName')
const cityTime=document.getElementById('cityTime')
const cityTemp=document.getElementById('cityTemp')

const Locationbuttonelements = document.querySelector('.blurred-box2');
const searchbuttonelements = document.querySelector('.blurred-box');


butt.addEventListener('click', async ()=>{
     Locationbuttonelements.style.display = 'none'
   
    const value=userinput.value
    const data=await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY1}&units=metric`
     )
     .then (async res=>{
        const result=await res.json()
        cityName.innerText=`${result.name} ${result.sys.country}`
        // console.log(result.sys.country)
        cityTime.innerText= `Timezone: ${result.timezone}`
        cityTemp.innerText=`Temp: ${result.main.temp} °C`

        searchbuttonelements.style.display = 'flex'
     })
  .catch (err =>{
console.log(err)
  });
  
})



//get location
const getbttn=document.getElementById("Getbttn")


async function getdat(latitude, longitude) {
    const response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY1}&units=metric`
    );
    
    return await response.json();
}

async function gotlocation(position) {
    const result = await getdat(
        position.coords.latitude,  
        position.coords.longitude , 
        position.temp
    );
    console.log(result); 
    document.getElementById('long').innerText = `Longitude: ${position.coords.longitude}`;
document.getElementById('lat').innerText = `Latitude: ${position.coords.latitude}`; 
const temperature = result.main?.temp; 
document.getElementById('temp').innerText = `Temp: ${temperature} °C`;
}

function failedToGetLocation(){
    console.log("there was some error");
 }
getbttn.addEventListener('click', async ()=>{
  searchbuttonelements.style.display = 'none'
   navigator.geolocation.getCurrentPosition( gotlocation, failedToGetLocation)   
   Locationbuttonelements.style.display = 'flex';})


//Time
function showtime(){
    const currentTime=new Date();
    const time='Time (Ind)-'+`${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
  document.getElementById('time').innerText=time

}
setInterval(showtime,1000)
