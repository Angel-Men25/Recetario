(function() {
  const form = document.querySelector('#form');

  let answers = {
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  }

  // QUESTION 1
  const selectInput = document.querySelector('#select');
  selectInput.addEventListener('change', (e) => {
    answers.question1 = e.target.value;
  })

  // QUESTION 2
  const ratingSpan1 = document.querySelectorAll('#rating-span-1');
  ratingSpan1.forEach(span => {
    span.addEventListener('click', (e) => {
      const active = document.querySelector('.span__checked-1');
      if (active) {
        active.classList.remove('span__checked-1');
      }
      const spanTargeted = e.target;
      spanTargeted.classList.add('span__checked-1');
      answers.question2 = e.target.innerText;
    })
  })

  // QUESTION 3
  const ratingSpan2 = document.querySelectorAll('#rating-span-2');
  ratingSpan2.forEach(span => {
    span.addEventListener('click', (e) => {
      const active = document.querySelector('.span__checked-2');
      if (active) {
        active.classList.remove('span__checked-2');
      }
      const spanTargeted = e.target;
      spanTargeted.classList.add('span__checked-2');
      answers.question3 = e.target.innerText;
    })
  })

  // QUESTION 4
  const ratingSpan3 = document.querySelectorAll('#rating-span-3');
  ratingSpan3.forEach(span => {
    span.addEventListener('click', (e) => {
      const active = document.querySelector('.span__checked-3');
      if (active) {
        active.classList.remove('span__checked-3');
      }
      const spanTargeted = e.target;
      spanTargeted.classList.add('span__checked-3');
      answers.question4 = e.target.innerText;
    })
  })

  // TEXTAREA
const inputTextarea = document.querySelector('#opinion-text');
inputTextarea.addEventListener('keyup', (e) => {
  answers.question5 = e.target.value;
})

  form.addEventListener('submit', validarFormulario);

  function validarFormulario(e) {
    e.preventDefault();

    console.log(answers);

    // if (Object.values(answers).every(input !== '')) {
    //   console.log('hola');
    // }

  }
})();