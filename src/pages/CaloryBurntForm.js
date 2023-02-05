import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function CaloryBurntForm() {
  // const [gender, setGender] = useState('')
  // const [bsc, setBsc] = useState('')
  // const [workex, setWorkex] = useState('')
  // const [etest_p, setEtest_p] = useState('')
  // const [msc, setMsc] = useState('')

  const [Gender, setGender] = useState("");
  const [Age, setAge] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [Duration, setDuration] = useState("");
  const [Heart_Rate, setHeart_Rate] = useState("");
  const [Body_Temp, setBody_Temp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      Gender,
      Age,
      Height,
      Weight,
      Duration,
      Heart_Rate,
      Body_Temp,
    };

    axios
      .post("http://localhost:8080/prediction", params)
      .then((res) => {
        const data = res.data.data;
        const parameters = JSON.stringify(params);
        const msg = `Prediction: ${data.prediction}\nInterpretation: ${data.interpretation}\nParameters: ${parameters}`;
        alert(msg);
        reset();
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  const reset = () => {
    setGender("");
    setAge("");
    setHeight("");
    setWeight("");
    setDuration("");
    setHeart_Rate("");
    setBody_Temp("");
  };

  return (
    // <div className="bg-black flex flex-col items-center justify-center h-screen">
    <Layout
      children={
        <div className="bg-transparent space-y-2 mt-5">
          <h1 className="text-4xl font-medium text-center text-black">
            Prediction
          </h1>
          <p className="text-xl text-center text-gray-600">
            Enter the following details to predict the calories burnt
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="bg-transparent p-6 rounded-lg"
          >
            {/* <h4>Person Data</h4> */}
            <div className="mb-4">
              <input
                id="gender"
                className="form-input block w-full py-2 px-3 text-gray-700 bg-white rounded-md"
                placeholder="Gender (1 = Male or 0 = Female)"
                required
                autoFocus
                min="0"
                max="1"
                pattern="[0-9]{0,1}"
                title="Gender"
                type="number"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                id="age"
                className="form-input block w-full py-2 px-3 text-gray-700 bg-white rounded-md"
                placeholder="Age"
                required
                // min="0"
                // max="1"
                // pattern="[0-9]{0,1}"
                title="Age"
                type="number"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                id="height"
                className="form-input block w-full py-2 px-3 text-gray-700 bg-white rounded-md"
                placeholder="Height"
                required
                // min="0"
                // max="1"
                // pattern="[0-9]{0,1}"
                title="Height"
                type="number"
                value={Height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                id="weight"
                className="form-input block w-full py-2 px-3 text-gray-700 bg-white rounded-md"
                placeholder="Weight"
                required
                // min="0"
                // max="1"
                // pattern="[0-9]{0,1}"
                title="Weight"
                type="number"
                value={Weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                id="duration"
                className="form-input block w-full py-2 px-3 text-gray-700 bg-white rounded-md"
                placeholder="Duration"
                required
                // min="0"
                // max="1"

                // pattern="[0-9]{0,1}"
                title="Duration"
                type="number"
                value={Duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                id="heart_rate"
                className="form-input block w-full py-2 px-3 text-gray-700 bg-white rounded-md"
                placeholder="Heart Rate"
                required
                // min="0"
                // max="1"
                // pattern="[0-9]{0,1}"
                title="Heart Rate"
                type="number"
                value={Heart_Rate}
                onChange={(e) => setHeart_Rate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                id="body_temp"
                className="form-input block w-full py-2 px-3 text-gray-700 bg-white rounded-md"
                placeholder="Body Temperature"
                required
                // min="0"
                // max="1"
                // pattern="[0-9]{0,1}"
                title="Body Temperature"
                type="number"
                value={Body_Temp}
                onChange={(e) => setBody_Temp(e.target.value)}
              />
            </div>

            <div className="text-center mt-6">
              <button
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
}

export default CaloryBurntForm;
