import React from "react";
import {Routes, Route} from "react-router-dom";
import ChatBot from "./components/Chatbot/ChatBot";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<ChatBot />} />
			</Routes>
		</>
	);
};

export default App;
