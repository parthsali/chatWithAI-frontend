import React, {useState} from "react";
// import {CopyToClipboard} from "react-copy-to-clipboard";
import axios from "axios";
import "./Chatbot.css";

const ChatBot = () => {
	let array = [];
	let newdata;
	const [prompt, setPrompt] = useState("");
	const [output, setOutput] = useState(array);
	const [isCode, setIsCode] = useState(false);

	const handleSubmit = async () => {
		if (!prompt) {
			return;
		}
		let promptArray = prompt
			.split(" ")
			.map((word) => word.toLowerCase());
		for (let i = 0; i < promptArray.length; i++) {
			if (promptArray[i] === "code") {
				setIsCode(true);
			}
		}
		console.log(isCode);
		console.log("req sent to axios");
		axios.post("http://localhost:8000/chat", {
			prompt,
		}).then((res) => {
			newdata = res.data.split("\n");

			for (let i = 0; i < newdata.length; i++) {
				array.push(newdata[i]);
			}
			array = array.slice(2);

			if (array[0] === "My name is John.") {
				setOutput([
					"",
					"",
					"Hey, My name is Emma watson",
				]);
				return;
			}

			setOutput(array);
			setIsCode(false);
		});
	};

	return (
		<>
			<div className='main-container'>
				<div className='center-container'>
					<div className='input-fields'>
						<input
							onChange={(e) =>
								setPrompt(
									e.target
										.value,
								)
							}
							type='text'
							placeholder='Enter Your Query Here..'
						/>
						<input
							id='button'
							type='submit'
							onClick={handleSubmit}
							value='Submit'
						/>
					</div>
					{/* <div className='copy-div'>
						<button onClick={copyContent}>
							{copybtn}
						</button>
					</div> */}
					<div className='output'>
						{output.map((line) => {
							if (isCode) {
								return (
									<h4>
										<pre>
											{
												line
											}
										</pre>
									</h4>
								);
							} else {
								return (
									<h4>
										{
											line
										}
									</h4>
								);
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatBot;
