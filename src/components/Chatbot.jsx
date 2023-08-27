import React, { useEffect, useState } from 'react';
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';

import Navbar from './Navbar';
import Spinner from './Spinner';
import Equilizer from './Equilizer';

const apiKey = import.meta.env.VITE_MY_API_KEY;

const Chatbot = () => {
    const [input, setInput] = useState("");
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const initSpeechRecognition = () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'en-US'; // Set the desired language

            recognitionInstance.onstart = () => {
                setIsListening(true);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            recognitionInstance.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                onResult(transcript);
            };

            setRecognition(recognitionInstance);
        };

        initSpeechRecognition();
    }, []);
    const onResult = (transcript) => {
        setInput(transcript);
    };

    const handleToggleClick = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop();
                chatResponse();
            } else {
                recognition.start();
            }
        }
    };

    const changeHandler = (e) => {
        setInput(e.target.value);
    }

    const chatResponse = async () => {
        setLoading(true);
        const url = 'https://api.openai.com/v1/chat/completions';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const newInput = input;
        setInput("");

        const data = {
            model: 'gpt-3.5-turbo',
            messages: conversation.concat([{ role: 'user', content: newInput }]),
            temperature: 0.7
        };

        try {
            const response = await axios.post(url, data, { headers });
            if (response.data.choices && response.data.choices.length > 0) {
                const content = response.data.choices[0].message.content;
                setConversation([...conversation, { role: 'user', content: newInput }, { role: 'assistant', content }]);
            } else {
                toast.error('No Response Content found', {
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('error in fetching data ', error, {
                duration: 3000,
            })
        }
        setLoading(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            chatResponse();
        }
        else {
            toast.error('Input cannot be empty!', {
                duration: 3000,
            });
        }
    }

    return (
        <>
            <div className="flex justify-center items-center mx-auto">
                <div className="w-11/12 border rounded ">
                    <div>
                        <div className="w-full">
                            <Navbar name="Shruti" logo="https://i.postimg.cc/vBd2MN55/5cb480cd5f1b6d3fbadece79.png" />
                            <div className="relative w-full p-6 overflow-y-auto h-screen">
                                <ul className="space-y-2">
                                    {conversation.map((item, id) => (
                                        <li key={id} className={item.role === 'user' ? 'flex justify-start' : 'flex justify-end'}>
                                            <div className={`relative max-w-xl px-4 py-2 ${item.role === 'user' ? 'text-white text-bold bg-gray-500 rounded-lg rounded-tl-none' : 'text-white bg-[#766AC8] text-bold rounded-lg rounded-tr-none'} rounded shadow`}>
                                                <span className="block text-justify">{item.content}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="sticky bottom-0 z-10">

                                <div className="flex items-center">
                                    <div className='flex w-full space-x-1'>
                                        <input
                                            type="text"
                                            placeholder="Ask me something..."
                                            value={input}
                                            onChange={changeHandler}
                                            className="w-full px-4 py-2 mr-2 text-gray-700 border rounded focus:outline-none"
                                        />
                                        <button onClick={handleToggleClick}>
                                            {!isListening ? (<span className="material-symbols-outlined self-center pr-3">
                                                mic
                                            </span>) : (<Equilizer />)}
                                        </button>
                                    </div>

                                    <button onClick={submitHandler}
                                        type="submit"
                                        className="px-4 py-2 text-white bg-[#766AC8] rounded hover:bg-blue-700 focus:outline-none"
                                    >
                                        {loading ? <Spinner /> : "Send"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#fff',
                        color: '#363636',
                    },

                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </>
    );
};

export default Chatbot;