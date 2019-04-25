"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var studentCounter = 1;
var GroupCounter = 1;

var EducationCenter =
/*#__PURE__*/
function () {
  function EducationCenter(name) {
    _classCallCheck(this, EducationCenter);

    this._name = name;
    this._groups = [];
  }

  _createClass(EducationCenter, [{
    key: "AddNewGroup",
    value: function AddNewGroup(group) {
      this._groups.push(group);
    }
  }, {
    key: "RemoveGroup",
    value: function RemoveGroup(groupId) {
      this._groups = this._groups.filter(function (g) {
        return g._id !== groupId;
      });
    }
  }, {
    key: "FindGroupById",
    value: function FindGroupById(id) {
      return this._groups.find(function (g) {
        return g._id === id;
      });
    }
  }]);

  return EducationCenter;
}();

var Group =
/*#__PURE__*/
function () {
  function Group(startDate, endDate, roomNumber) {
    _classCallCheck(this, Group);

    this._id = GroupCounter;
    this._groupName = this.GroupNameGenerator();
    this._startDate = startDate;
    this._endDate = endDate;
    this._roomNumber = roomNumber;
    this._students = [];
    GroupCounter++;
  }

  _createClass(Group, [{
    key: "AddNewStudent",
    value: function AddNewStudent(student) {
      this._students.push(student);
    }
  }, {
    key: "RemoveStudent",
    value: function RemoveStudent(studentId) {
      this._students = this._students.filter(function (stu) {
        return stu._id !== studentId;
      });
    }
  }, {
    key: "GroupNameGenerator",
    value: function GroupNameGenerator() {
      var result = "P";

      for (var i = 0; i < 4 - GroupCounter.toString().length; i++) {
        result += "0";
      }

      result += GroupCounter;
      return result;
    }
  }]);

  return Group;
}();

var Student =
/*#__PURE__*/
function () {
  function Student(firstname, lastname, email, birthdate) {
    _classCallCheck(this, Student);

    this._firstname = firstname;
    this._lastname = lastname;
    this._email = email;
    this._birthdate = birthdate;
    this._scores = [];
    this._id = studentCounter++;
  }

  _createClass(Student, [{
    key: "AddNewScore",
    value: function AddNewScore(score) {
      if (score >= 0 && score <= 100) {
        this._scores.push(score);
      } else {
        throw "Score is not valid.";
      }
    }
  }, {
    key: "GetGPA",
    value: function GetGPA() {
      return (this._scores.reduce(function (total, score) {
        return total + score;
      }, 0) / this._scores.length).toFixed(2);
    }
  }]);

  return Student;
}();

var CodeAcademy = new EducationCenter("Code Academy");
var P110 = new Group(new Date(2019, 1, 10), new Date(2019, 8, 27), "Venus");
var P211 = new Group(new Date(2019, 4, 10), new Date(2019, 12, 27), "Pluto");
var stud1 = new Student("Perviz", "Muxcanov", "perviz@code.edu.az", new Date(1996, 2, 20));
var stud2 = new Student("Elchin", "Heyderov", "heyder@code.edu.az", new Date(1995, 4, 11));
var stud3 = new Student("Elchin", "Namazov", "namaz@code.edu.az", new Date(1992, 11, 11));
var stud4 = new Student("Medine", "Eliyeva", "medineel@code.edu.az", new Date(1997, 4, 15));
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

window.onload = function () {
  //it only runs once when DOM loads
  CodeAcademy._groups.forEach(function (g) {
    var option = document.createElement('option');
    option.innerText = g._groupName;
    option.value = g._id;
    dropdownGroups.appendChild(option);
  });

  dropdownGroups.onchange = function () {
    if (this.value) {
      studentTable.lastElementChild.innerHTML = "";
      var selectedGroup = CodeAcademy.FindGroupById(+this.value);

      selectedGroup._students.forEach(function (student) {
        var tr = document.createElement('tr');
        var tdId = document.createElement('td');
        tdId.innerText = student._id;
        var tdName = document.createElement('td');
        tdName.innerText = student._firstname;
        var tdLastname = document.createElement('td');
        tdLastname.innerText = student._lastname;
        var tdEmail = document.createElement('td');
        tdEmail.innerText = student._email;
        var tdBirthdate = document.createElement('td');
        tdBirthdate.innerText = student._birthdate;
        var tdGPA = document.createElement('td');
        tdGPA.innerText = student.GetGPA();
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdLastname);
        tr.appendChild(tdEmail);
        tr.appendChild(tdBirthdate);
        tr.appendChild(tdGPA);
        studentTable.lastElementChild.appendChild(tr);
      });
    }
  };

  btnAddGroup.onclick = function (e) {
    //read all values from inputs
    var startDate = document.getElementsByName("start-date")[0];
    var endDate = document.getElementsByName("end-date")[0];
    var roomName = document.getElementsByName("room-name")[0]; //create startDate and endDate as Date type

    var startDateValue = new Date(startDate.value);
    var endDateValue = new Date(endDate.value); //create new Group with input values

    var newGroup = new Group(startDateValue, endDateValue, roomName.value); //Add new Group to the array of CodeAcademy groups

    CodeAcademy.AddNewGroup(newGroup); //clear previos group from drowdown

    dropdownGroups.innerHTML = ""; //update groups dropdown to show new group

    CodeAcademy._groups.forEach(function (g) {
      var option = document.createElement('option');
      option.innerText = g._groupName;
      option.value = g._id;
      dropdownGroups.appendChild(option);
    });
  };
}; // CodeAcademy._groups.forEach(g => )
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