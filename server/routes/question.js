import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
 try {
	const data = await Question.find();
	res.status(200).send({message: 'success', contents: data});
 } catch (err) {
	res.status(403).send({message: 'error', contents: []});
 } 
//  const data2 = await Answer.find();
//  console.log(data2);

}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  const {answers} = req.body;
  let score = 0;
  
  console.log(answers)
  try {
	  const data = await Answer.find();
		const len = parseInt(data.length);
	  for(let i = 0; i < len; i++){
		  console.log(data[i].answer + ",,, " + (parseInt(answers[i])+1));
		 if(data[i].answer == parseInt(answers[i])+1){
			 score += 1;
		 }
	  }
	  res.send({message: 'success', score: score});
	  return;
	} catch (err) {
		console.log(err);
		res.status(403).send({message: 'error', score: -1});
		return;
	} 


}
