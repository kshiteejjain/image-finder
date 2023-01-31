import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./FormSlice";

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOtherTopic, setIsOtherTopic] = useState();
    const disabledButton = <button type="submit" Link to="/ProfilePic" className='buttonPrimary' disabled>Next</button>;
    const [values, setValues] = useState({
        userName: '', surname: '', topic: '', otherTopic: ''
    });

     const handleChange = (e) => {
        setValues(prev => ({...prev, [e.target.name]:e.target.value}))
         if(e.target.value === 'Other'){
            setIsOtherTopic(true);
         }
         if(e.target.value === 'Select' || e.target.value === 'Travel' || e.target.value === 'Cars' || e.target.value === 'Wildlife' || e.target.value === 'Technology'){
            setIsOtherTopic(false);
         }
     }
     const formSubmit = (e) => {
         e.preventDefault();
         setValues({ userName: '', surname: '', topic: '', otherTopic: '' });
         setIsOtherTopic(false);
         dispatch(addUser({
            userName: values.userName,
            surname: values.surname,
            topic: values.topic,
            otherTopic: values.otherTopic,
         }))
         navigate("/ProfilePic");
     }

    return(
        <div>
            
            <form className="form" onSubmit={formSubmit}>
                <div className="formControl">
                    <label>Name</label>
                    <input type="text" className="formInput" value={values.userName} name="userName" onChange={handleChange} />
                </div>
                <div className="formControl">
                    <label>Surname</label>
                    <input type="text" className="formInput" value={values.surname} name="surname" onChange={handleChange} />
                </div>
                <div className="formControl">
                    <label>Preferred Topic</label>
                    <select className="formInput" name="topic" value={values.topic} onChange={handleChange}>
                        <option value="Select">Select</option>
                        <option value="Travel">Travel</option>
                        <option value="Cars">Cars</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Technology">Technology</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                {isOtherTopic && 
                    <div className="formControl">
                        <label>Other Topic</label>
                        <input type="text" className="formInput" value={values.otherTopic} name="otherTopic" onChange={handleChange} />
                    </div>
                }
                {values.userName === '' ? disabledButton : values.surname === '' || values.topic === '' ? disabledButton : <button type="submit" Link to="/ProfilePic" className='buttonPrimary'>Next</button>}
            </form>
        </div>
    )
};

export default Form;