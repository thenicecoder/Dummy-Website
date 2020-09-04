"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TypeWriter =
/*#__PURE__*/
function () {
  function TypeWriter(txtElement, words) {
    var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

    _classCallCheck(this, TypeWriter);

    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  _createClass(TypeWriter, [{
    key: "type",
    value: function type() {
      var _this = this;

      //Current index of word
      var current = this.wordIndex % this.words.length; //Get full text of current word

      var fullTxt = this.words[current]; //Check if deleting

      if (this.isDeleting) {
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        //Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      } //Insert txt into element


      this.txtElement.innerHTML = "<span class='txt'>".concat(this.txt, "</span>"); //Initial Type Speed

      var typeSpeed = 50;

      if (this.isDeleting) {
        typeSpeed /= 2;
      } //If word is complete


      if (!this.isDeleting && this.txt === fullTxt) {
        //Make a pause at the end
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false; //Move to next word

        this.wordIndex++; //Pause before start typing

        typeSpeed = 400;
      }

      setTimeout(function () {
        return _this.type();
      }, typeSpeed);
    }
  }]);

  return TypeWriter;
}(); //Init on DOM load


document.addEventListener('DOMContentLoaded', init); //Init App

function init() {
  var txtElement = document.querySelector('.txt-type');
  var words = JSON.parse(txtElement.getAttribute('data-words'));
  var wait = txtElement.getAttribute('data-wait'); //Init TypeWriter

  new TypeWriter(txtElement, words, wait);
}

var appleHello = document.querySelectorAll('#apple-hello path');
var appleStroke = document.querySelector('#apple-stroke path'); // console.log(appleStroke.getTotalLength());

for (var i = 0; i < appleHello.length; i++) {} // console.log(`Letter ${i} is ${appleHello[i].getTotalLength()}`)
// let len = appleHello[i].getTotalLength();
// appleHello[i].style.strokeDashArray= len;
// appleHello[i].style.strokeDashOffset= len;
// let product = +i*0.3
// appleHello[i].style.animation = `line-anim 1s ease forwards ${product}s`
// console.log(appleHello[i]);
// console.log(`Letter ${i} has dash array as ${appleHello[i].style.strokeDashArray} and offset as ${appleHello[i].style.strokeDashOffset}` );
//FOR Mouse Cursor Effect


var mouseCursor = document.querySelector('.cursor');
window.addEventListener('mousemove', function (e) {
  mouseCursor.style.top = e.pageY + 'px';
  mouseCursor.style.left = e.pageX + 'px';
});
document.addEventListener('click', function () {
  mouseCursor.classList.add('expand');
  setTimeout(function () {
    mouseCursor.classList.remove('expand');
  }, 500);
}); //FOR preloader

var preloader = document.querySelector('.preloader');
setTimeout(function () {
  preloader.style.opacity = '0';
  preloader.style.zIndex = '-3'; // preloader.style.display='none';
}, 10000); //FOR Form Validation

var form = document.querySelector('.form');
var username = document.querySelector('#username');
var email = document.querySelector('#emailID');
var passwordEnter = document.querySelector('#password');
var passwordConfirm = document.querySelector('#passwordMatch');
var validInps = document.querySelectorAll('.form-control');
var respRecd = document.querySelector('#resp-recd');
var inputFields = document.querySelectorAll('.form-input');

function showError(input, message) {
  var formControl = input.parentElement; // console.log(formControl);

  formControl.classList.remove('success');
  formControl.classList.add('error');
  var small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input, message) {
  var formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
  var small = formControl.querySelector('small');
  small.innerText = message;
}

function isValidEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input, 'Successfully validated');
  } else {
    showError(input, 'Email is not valid');
  }
}

function passwordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === 'Successfully validated') {
      showError(input, "".concat(getFieldName(input), " is required"));
    } else {
      showSuccess(input, 'Successfully validated');
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, "".concat(getFieldName(input), " must be atleast ").concat(min, " characters"));
  } else if (input.value.length > max) {
    showError(input, "".concat(getFieldName(input), " must be atmost ").concat(max, " characters"));
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, passwordEnter, passwordConfirm]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkLength(passwordConfirm, 6, 25);
  isValidEmail(email);
  passwordMatch(passwordEnter, passwordConfirm);

  if (validInps[0].classList.contains('success') && validInps[1].classList.contains('success') && validInps[2].classList.contains('success') && validInps[3].classList.contains('success')) {
    respRecd.innerHTML = "Response recieved ! We'll get in touch with you soon &nbsp; <i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
    setTimeout(function () {
      inputFields.forEach(function (field) {
        field.value = '';
      });
      validInps.forEach(function (validInp) {
        validInp.classList.remove('success');
      });
      modalCont.classList.remove('show-modal');
      respRecd.innerHTML = "Response recieved ! We'll get in touch with you soon &nbsp; <i class=\"fa fa-check\" aria-hidden=\"true\"></i>";
      respRecd.innerHTML = '';
    }, 2000);
  }
}); //FOR Nav Togglen and Modal Toggle

var toggle = document.querySelector('.toggle');
var open = document.querySelector('#openForm');
var close = document.querySelector('#closeForm');
var modalCont = document.querySelector('.modal-container');
var navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function (navLink) {
  navLink.addEventListener('click', toggleBurger);
});

function toggleBurger() {
  document.body.classList.toggle('show-nav');
  toggle.classList.toggle('active');
  mouseCursor.classList.toggle('not-displayed');
}

toggle.addEventListener('click', toggleBurger);
open.addEventListener('click', function () {
  modalCont.classList.add('show-modal');
});
close.addEventListener('click', function () {
  modalCont.classList.remove('show-modal');
});
window.addEventListener('click', function (e) {
  e.target == modalCont ? modalCont.classList.remove('show-modal') : false;
});