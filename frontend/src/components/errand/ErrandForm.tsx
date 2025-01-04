import hooks from "../../hooks.tsx";
import "./style.css";

const ErrandForm = (props) => {
    const formSubmission = hooks.useCreateErrand();

    const handleSubmit = (e) => {
        e.preventDefault();
        const description = e.target.elements.description.value.trim();
        formSubmission.mutate({ description });
        e.target.reset();
    }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-field ">
                    <input type="text" placeholder="What do you need to do?" name="description" className="description-field"/>
                </div>
                <div className="input-field submit-button">
                    <button type="submit">ADD</button>
                </div>
            </form>
        </div>
    );
};

export default ErrandForm;
