let patientName = document.getElementById('name')
let patientGender = document.getElementById('gender')
let patientAge = document.getElementById('age')
let patientDOB = document.getElementById('date_of_birth')
let patientDH = document.getElementById('disgnosis_history')
let patientDL = document.getElementById('diagnosis_list')
let patientEC = document.getElementById('emergency_contact')
let patientIT = document.getElementById('insurance_type')
let patientLR = document.getElementById('lab_results')
let patientPN = document.getElementById('phone_number')
let patientPP = document.getElementById('profile_picture')
let username = 'coalition';
let password = 'skills-test';
const auth = btoa(`${username}:${password}`);
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json',
    'Authorization':  `Basic ${auth}`
      },
    redirect: 'follow'
  };
fetch('https://fedskillstest.coalitiontechnologies.workers.dev',requestOptions)
.then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data[3]);
    const {name, gender, age, 
        date_of_birth, diagnosis_history, diagnostic_list, 
        emergency_contact, 
        insurance_type, 
        lab_results, phone_number, profile_picture                       
        } = data[3]
    patientName.innerText = name
    patientGender.innerText = `${gender}, ${age}`
}).catch(function (error) {
	console.warn(error);
});

// -------------------------- CHART -------------------------------- //
let data = [30,40,35,50,49,60,70,91,125]
let options = {
  series: [{
  data: data.slice()
}],
  chart: {
  id: 'realtime',
  height: 350,
  type: 'line',
  animations: {
    enabled: true,
    easing: 'linear',
    dynamicAnimation: {
      speed: 1000
    }
  },
  toolbar: {
    show: false
  },
  zoom: {
    enabled: false
  }
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
title: {
  // text: 'Dynamic Updating Chart',
  align: 'left'
},
markers: {
  size: 0
},
xaxis: {
  // type: 'datetime',
  categories: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
},
yaxis: {
  max: 100
},
legend: {
  show: false
},
};

let chart = new ApexCharts(document.querySelector("#chart"), options);
console.log('chart', chart)
chart.render();


window.setInterval(function () {
getNewSeries(lastDate, {
  min: 10,
  max: 90
})

chart.updateSeries([{
  data: data
}])
}, 1000)