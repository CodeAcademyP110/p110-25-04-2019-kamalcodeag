"use strict";



// let animal = {
//     name: "tiger",
//     color: "orange",
//     speed: "160 km/h"
// }

// console.log(animal["speed"]); //animal.speed




// Simple version

// let employee1 = {
//     name: "Rashad",
//     surname: "Guluzadeh",
//     birthdate: "1996.05.01",
//     position: "developer"
// }

// let employee2 = {
//     name: "Abdul",
//     surname: "Memishov",
//     birthdate: "1992.05.01",
//     position: "driver"
// }

// let employee3 = {
//     name: "Turkan",
//     surname: "Mammadova",
//     birthdate: "1988.05.01",
//     position: "manager"
// }

// let employee4 = {
//     name: "Elchin",
//     surname: "Maqsudov",
//     birthdate: "1997.05.01",
//     position: "developer"
// }


// console.log(employee1,employee2,employee3,employee4);


// Class version

// class employee
// {
//     constructor(name,surname,age,position,salary)
//     {
//         this._name = name;
//         this._surname = surname;
//         this._age = age;
//         this._position = position;
//         this._salary = +salary;
//         this._bonus = []; //700,250

//     }
//     AddNewBonus(bonus)
//     {
//         if(bonus > 0)
//         {
//             this._bonus.push(bonus)
//         }
//         else
//         {
//             throw "Given bonus is not eligible"
//         }
//     }
//     TotalIncome()
//     {
//         return this._bonus.reduce((total,current) => total + current) + this._salary
//     }

// }

// let rashad = new employee("rashad","guluzade",new Date(1996,4,1),"developer","1200");
// rashad.AddNewBonus(700);
// rashad.AddNewBonus(250);
// console.log(rashad,rashad.TotalIncome());




// class worker extends employee
// {
//     constructor(name,surname,age,position,salary,uniform)
//     {
//         super(name,surname,age,position,salary)
//         this._uniform = "uniform";
//     }
// }

// let newWorker = new worker("ali","aliyev","35","accountant","800","jeans");
// newWorker.AddNewBonus(200);
// console.log(newWorker,newWorker.TotalIncome());














// OOP with DOM

// class employee 
// {
//     constructor(name, surname, age, position, salary) 
//     {
//         this._name = name;
//         this._surname = surname;
//         this._age = age;
//         this._position = position;
//         this._salary = +salary;
//         // this._bonus = []; //700,250

//     }
//     // AddNewBonus(bonus)
//     // {
//     //     if(bonus > 0)
//     //     {
//     //         this._bonus.push(bonus)
//     //     }
//     //     else
//     //     {
//     //         throw "Given bonus is not eligible"
//     //     }
//     // }
//     // TotalIncome()
//     // {
//     //     return this._bonus.reduce((total,current) => total + current) + this._salary
//     // }

// }

// let form = document.getElementsByTagName("form");
// let inputName = document.querySelector(".s-name");
// let inputSurname = document.querySelector(".s-surname");
// let inputAge = document.querySelector(".s-age");
// let selectPos = document.querySelector(".s-pos");
// let inputSal = document.querySelector(".s-sal");
// let table = document.querySelector("table");
// let employees = [];
// // console.log(form[0],table[0]);

// form[0].onsubmit = function (e) 
// {
//     e.preventDefault();
//     if (selectPos.value !== "0") 
//     {
//         let newEmployee = new employee(inputName.value.trim(), inputSurname.value.trim(), inputAge.value.trim(), selectPos.value, inputSal.value.trim());
//         // console.log(newEmployee);
//         employees.push(newEmployee);

//         let number = 0;

//         for (let i = 0; i < 1; i++) 
//         {
//             let tr = document.createElement("tr");            
//             let tdNo = document.createElement("td");
//             number++;
//             tdNo.innerText = number;
//             tr.appendChild(tdNo);

//             for (const key in newEmployee)
//             {
//                 if (newEmployee.hasOwnProperty(key)) 
//                 {
//                     let td = document.createElement("td");
//                     td.innerText = newEmployee[key];
//                     tr.appendChild(td);
//                 }
//             }
//             table.lastElementChild.appendChild(tr);
//         }
//     }
//     inputName.value = "";
//     inputSurname.value = "";
//     inputAge.value = "";
//     selectPos.value = "0";
//     inputSal.value = "";
// }
    




// --- HOME TASK ---


let inputName = document.querySelector("#s-name");
let inputSurname = document.querySelector("#s-surname");
let inputEmail = document.querySelector("#s-email");
let inputPos = document.querySelector("#s-pos");
let select = document.querySelector("#s-select");
// console.log(select.value);
let btn = document.querySelector("#s-btn");
let btnPos = document.querySelector("#s-btn-pos");
let table = document.querySelector("#table");
let idPosition = 1;
let idEmployee = 1;
let positionList = [];


class Position
{
    constructor(name)
    {
         this._idPosition = idPosition++;
         this._name = name; //dev
         this._employees = [];//muhendis,huquqshunas
    }
    AddNewEmployees(employee)
    {
        this._employees.push(employee);
    }
}



class Employee
{
    constructor(name,surname,email) //,position
    {
        this._idEmployee = idEmployee++;
        this._name = name;
        this._surname = surname;
        this._email = email;
        // this._position = position;
    }

}


// let  rashad= new Employee("rashad","quluzade","mail@mail.com","hr")


// let hr=new Position("hr")
// hr.AddNewEmployees(rashad)
// console.log(hr);

btnPos.addEventListener("click",function()
{
    if(inputName.value.length > 0 && inputSurname.value.length > 0 && inputEmail.value.length > 0 && inputPos.value.length > 0)
    {
        // let newEmployee = new Employee(inputName.value.trim(),inputSurname.value.trim(),inputEmail.value.trim());
        let newPosition = new Position(inputPos.value.trim());
        // newPosition.AddNewEmployees(newEmployee); // [newEmployee, newEmployee1, newEmployee2...]
        positionList.push(newPosition); // [newPosition, newPosition1, newPosition2...]

        let value = 1;
        
        positionList.forEach(pos =>
        {
            let option = document.createElement("option");
            option.innerText = pos._name;
            option.setAttribute("value",`${value++}`)
            select.appendChild(option);
        })

        inputPos.value = "";
    }
}
)


select.addEventListener("change",function()
{
    btn.addEventListener("click",function()
    {
        if(inputName.value.length > 0 && inputSurname.value.length > 0 && inputEmail.value.length > 0,select.value !== 0)
        {
            let newEmployee = new Employee(inputName.value.trim(),inputSurname.value.trim(),inputEmail.value.trim(),select.value);
            let newPosition = new Position(inputPos.value.trim());
            newPosition.AddNewEmployees(newEmployee); // [newEmployee, newEmployee1, newEmployee2...]
            positionList.push(newPosition); // [newPosition, newPosition1, newPosition2...]
    
            newPosition._employees.forEach(emp =>
            {
                let tr = document.createElement("tr");
                
                for(let key in newEmployee)
                {
                    let td = document.createElement("td");
                    td.innerText = newEmployee[key];
                    tr.appendChild(td);
                }
    
                let tdPos = document.createElement("td");
                
                [...select.children].forEach(opt =>
                {
                    tdPos.innerText = opt.innerText;
                
                })
    
                tr.appendChild(tdPos);

                table.lastElementChild.appendChild(tr);
            })
        
            inputName.value = "";
            inputSurname.value = "";
            inputEmail.value = "";
            inputPos.value = "";
        } 
    }
    )
})

