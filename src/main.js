
let studentCounter = 1;
let GroupCounter = 1;

class EducationCenter
{
    constructor(name)
    {
        this._name = name;
        this._groups = [];
    }

    AddNewGroup(group)
    {
        this._groups.push(group);
    }

    RemoveGroup(groupId)
    {
        this._groups = this._groups.filter(g => g._id !== groupId);
    }

    FindGroupById(id)
    {
        return this._groups.find(g => g._id === id);
    }
}

class Group
{
    constructor(startDate, endDate, roomNumber)
    {
        this._id = GroupCounter;
        this._groupName = this.GroupNameGenerator();
        this._startDate = startDate;
        this._endDate = endDate;
        this._roomNumber = roomNumber;
        this._students = [];

        GroupCounter++;
    }

    AddNewStudent(student)
    {
        this._students.push(student);
    }

    RemoveStudent(studentId)
    {
        this._students = this._students.filter(stu => stu._id !== studentId);
    }

    GroupNameGenerator()
    {
        let result = "P";
        for(let i = 0; i < 4 - GroupCounter.toString().length; i++)
        {
            result += "0";
        }

        result += GroupCounter;
        return result;
    }
}

class Student
{
    constructor(firstname, lastname, email, birthdate)
    {
        this._firstname = firstname;
        this._lastname = lastname;
        this._email = email;
        this._birthdate = birthdate;
        this._scores = [];
        this._id = studentCounter++;
    }

    AddNewScore(score)
    {
        if(score >= 0 && score <= 100)
        {
            this._scores.push(score);
        }
        else
        {
            throw "Score is not valid."
        }
    }

    GetGPA()
    {
        return (this._scores.reduce((total, score) => total + score, 0) / this._scores.length).toFixed(2);
    }
}

const CodeAcademy = new EducationCenter("Code Academy");

const P110 = new Group(new Date(2019, 1, 10), new Date(2019, 8, 27), "Venus");
const P211 = new Group(new Date(2019, 4, 10), new Date(2019, 12, 27), "Pluto");

const stud1 = new Student("Perviz", "Muxcanov", "perviz@code.edu.az", new Date(1996, 2, 20));
const stud2 = new Student("Elchin", "Heyderov", "heyder@code.edu.az", new Date(1995, 4, 11));
const stud3 = new Student("Elchin", "Namazov", "namaz@code.edu.az", new Date(1992, 11, 11));
const stud4 = new Student("Medine", "Eliyeva", "medineel@code.edu.az", new Date(1997, 4, 15));

stud1.AddNewScore(75);
stud1.AddNewScore(55);
stud1.AddNewScore(91);

stud2.AddNewScore(75);
stud2.AddNewScore(87);
stud2.AddNewScore(44);

stud3.AddNewScore(0);
stud3.AddNewScore(0);
stud3.AddNewScore(100);

stud4.AddNewScore(100);
stud4.AddNewScore(100);
stud4.AddNewScore(100);

P110.AddNewStudent(stud1);
P110.AddNewStudent(stud2);
P211.AddNewStudent(stud3);
P211.AddNewStudent(stud4);


CodeAcademy.AddNewGroup(P110);
CodeAcademy.AddNewGroup(P211);

window.onload = function()
{
    //it only runs once when DOM loads
    CodeAcademy._groups.forEach(g => {
        const option = document.createElement('option');
        option.innerText = g._groupName;
        option.value = g._id;

        dropdownGroups.appendChild(option);
    })

    dropdownGroups.onchange = function()
    {
        if(this.value)
        {
            studentTable.lastElementChild.innerHTML = "";

            const selectedGroup = CodeAcademy.FindGroupById(+this.value);

            selectedGroup._students.forEach(student => {
                const tr = document.createElement('tr');

                const tdId = document.createElement('td');
                tdId.innerText = student._id;

                const tdName = document.createElement('td');
                tdName.innerText = student._firstname;

                const tdLastname = document.createElement('td');
                tdLastname.innerText = student._lastname;

                const tdEmail = document.createElement('td');
                tdEmail.innerText = student._email;

                const tdBirthdate = document.createElement('td');
                tdBirthdate.innerText = student._birthdate;

                const tdGPA = document.createElement('td');
                tdGPA.innerText = student.GetGPA();

                tr.appendChild(tdId);
                tr.appendChild(tdName);
                tr.appendChild(tdLastname);
                tr.appendChild(tdEmail);
                tr.appendChild(tdBirthdate);
                tr.appendChild(tdGPA);


                studentTable.lastElementChild.appendChild(tr);
            })
        }
        
    }

    btnAddGroup.onclick = function(e)
    {
        //read all values from inputs
        const startDate = document.getElementsByName("start-date")[0];
        const endDate = document.getElementsByName("end-date")[0];
        const roomName = document.getElementsByName("room-name")[0];

        //create startDate and endDate as Date type
        const startDateValue = new Date(startDate.value);
        const endDateValue = new Date(endDate.value);

        //create new Group with input values
        const newGroup = new Group(startDateValue, endDateValue, roomName.value);

        //Add new Group to the array of CodeAcademy groups
        CodeAcademy.AddNewGroup(newGroup);

        //clear previos group from drowdown
        dropdownGroups.innerHTML = "";
        
        //update groups dropdown to show new group
        CodeAcademy._groups.forEach(g => {
            const option = document.createElement('option');
            option.innerText = g._groupName;
            option.value = g._id;
    
            dropdownGroups.appendChild(option);
        })
    }

        
}

// CodeAcademy._groups.forEach(g => )


// let P110 = new Group(new Date(2019, 0, 14), new Date(2019, 8, 27), "Venus");

// let st1 = new Student("samir", "sdfsdf", "sdfsdf", new Date(1990, 10, 10));
// let st2 = new Student("medis", "asd", "sadfsfd", new Date(2015, 10, 10));
// let st3 = new Student("zakir", "asd", "sadfsfd", new Date(1990, 10, 10));

// P110.AddNewStudent(st1);
// P110.AddNewStudent(st2);
// P110.AddNewStudent(st3);

// P110.RemoveStudent(2);

// class Pupil extends Student
// {
//     constructor(firstname, lastname, email, birthdate, classNo)
//     {
//         super(firstname, lastname, email, birthdate);
//         this._classNo = classNo;
//     }
// } 




