import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question

  const next = () => {
    // TODO : switch to the next question,
	// and check answers to set the score after you finished the last question
	const options = document.getElementById('options').childNodes;
	let have_select = false;
	for(let i = 0; i < options.length; i++){
		if(options[i].childNodes[0].checked == true){
			have_select = true;
			break;
		}
	}
	let n_ans = [...ans];
	if(!have_select){
		n_ans.push(-1);
		setAns(n_ans);
		console.log(n_ans);
	}else{
		for(let i = 0; i < options.length; i++){
			if(options[i].childNodes[0].checked == true){
				n_ans.push(options[i].childNodes[0].value);
				setAns(n_ans);
				console.log(n_ans);
				break;
			}
		}
	}


	if(current_question+1 < contents.length){
		setCurrentQuestion(current_question+1);
	}
	else{
		const score = checkAnswer({answers: n_ans}).then(score =>{
			console.log(score);
			setComplete(true);
			setScore(score);

		});
	}
  }

  const checkAnswer = async (answers) => {
	const res = await instance.post('/checkAns', answers);
	// console.log(res.data.score);
	return res.data.score;
  }

  const choose = () => {
    // TODO : update 'ans' for the option you clicked
  }

  const getQuestions = async () => {
	// TODO : get questions from backend
	const res = await instance.get('/getContents');


	setContents(res.data.contents);

  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
				Question {contents[current_question].questionID} of {contents.length}
            </div>
          </div>

          <div id="question-title">
            {complete? `Your Score : ${score} / ${contents.length}` :contents[current_question].question}
          </div>

          <div id="options">
				{complete?'': contents[current_question].options.map((option, index) => 
				<div key={`${current_question+1}_${index+1}`} className="each-option">
					<input id={`${current_question+1}_${index+1}`} type="radio" name="option" value={index}/>
					<span>{option}</span>
				</div>)}
          </div>
          {complete?'':
          <div id="actions" onClick={next}>
            NEXT
          </div>
		  }
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
